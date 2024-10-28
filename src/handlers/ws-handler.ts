import { randomUUID } from "node:crypto";
import DBStore, { UserCredentials } from "../data/db";
import { ResponseRegData, ResponseUpdateWinnersData, ResponseWS } from "../interfaces/player-interfaces";
import { CreateGameData, RoomUsers, UpdateRoomStateData } from "../interfaces/room-interfaces"
import { WebSocket } from "ws";
import { StartGameData } from "../interfaces/ships-interfaces";
import { library } from "webpack";

const db = new DBStore();

const usersInARoom: RoomUsers[] = [];
const rooms: UpdateRoomStateData[] = [];
const roomId = randomUUID(); // separated modules

const players: ResponseWS[] = [];
const playersShips: StartGameData[] = [];

const playersStartGameResponse: ResponseWS[] = [];

 const wsHandler = (ws: WebSocket) => {
    console.log('Client is connected');
    // const roomId = randomUUID();
    let currentUserId: string;

    ws.onmessage = (event) => {
        const rawData = event.data;
        const frame = JSON.parse(rawData.toString()) as ResponseWS;
        const {type, data} = frame;

        if (type === 'reg') {
            // reg user info
            const credentials = JSON.parse(data as string);
            const userData: ResponseRegData = {
                name: credentials.name,
                index: randomUUID(),
                error: false,
                errorText: '',
            }   
            const responseWSReg = {
                type: `${type}`, 
                data: JSON.stringify(userData),
                id: 0
            }    
            ws.send(JSON.stringify(responseWSReg));

            // db
            currentUserId = userData.index;
            db.addUser(credentials.name, credentials.password, userData.index, 0);

            // update_winners
            const updateWinnersData = db.store.reduce((acc: ResponseUpdateWinnersData[], {name, wins}) => {
                acc.push({name: name, wins: wins})
                return acc;
            }, [])
            const responseWSUpdtWinners = {
                type: "update_winners",
                data: JSON.stringify(updateWinnersData),
                id: 0,
            }
            ws.send(JSON.stringify(responseWSUpdtWinners));     

            // update_room
            
            const responseRoom: ResponseWS = {
                type: "update_room",
                data: JSON.stringify(rooms), 
                id: 0,
            }

            ws.send(JSON.stringify(responseRoom));
            
        } else if (type === "create_room"){
            // update_room
            const roomData: UpdateRoomStateData = {
                roomId: roomId,
                roomUsers: [],
            }

            rooms.push(roomData);
            const responseRoom: ResponseWS = {
                type: "update_room",
                data: JSON.stringify(rooms),
                id: 0,
            }
            console.log('Another type: create_room, update_room');
            ws.send(JSON.stringify(responseRoom));
        } else if (type === "add_user_to_room") {
            // update_room
            const currentUser = db.store.find((user) => user.index === currentUserId);
            const {name, index} = currentUser as UserCredentials;
            // console.log(usersInARoom);
            usersInARoom.push({name: name, index: index});

            console.log(roomId);
            const roomData: UpdateRoomStateData = {
                roomId: roomId,
                roomUsers: usersInARoom,
            }

            console.log(roomData);
            console.log(roomId);
            
            const responseRoom: ResponseWS = {
                type: "update_room",
                data: JSON.stringify([roomData]),
                id: 0,
            }
            ws.send(JSON.stringify(responseRoom));
            // rooms.push(roomData);
             // create_game
             const createGameData: CreateGameData = {
                idGame: roomId,
                idPlayer: index,
            }

            const responseCreateGame = {
                type: "create_game",
                data: JSON.stringify(createGameData),
                id: 0,
            }
            ws.send(JSON.stringify(responseCreateGame));
            console.log('Another type: add_user_to_room, create_game')
        } else if (type === "add_ships") {
            // attackFeedback + info abt player's turn
            const shipsPositionsParsed = JSON.parse(data);
            const { ships, indexPlayer } = shipsPositionsParsed;

            // add_ships
            const shipsData: StartGameData = {
                ships: ships,
                currentPlayerIndex: indexPlayer,
            }
            const responseStartGame = {
                type: "start_game",
                data: JSON.stringify(shipsData),
                id: 0
            }

            // turn

            const responseTurn = {
                type: "turn",
                data: JSON.stringify({currentPlayer: indexPlayer}),
                id: 0,
            }
            players.push(responseStartGame);
            if (players.length < 3) {
                playersShips.push(shipsData);
                ws.send(JSON.stringify(responseTurn));
                console.log("Game!");
                players.forEach((player) => ws.send(JSON.stringify(player)));
            } else {
                console.log("Wait a minute...");
            }
            console.log('Another type: add_ships');
        } else if (type === "attack") {
            const attackDataParsed = JSON.parse(data);
            console.log(attackDataParsed);
            const { gameId, x, y, indexPlayer } = attackDataParsed
            interface Position {x: number, y: number}
            const attackedPoint: Position = {x: x, y: y};
            let status!: string;
            const enemyFleet = playersShips.find((fleet) => fleet.currentPlayerIndex !== indexPlayer) as StartGameData;
            const enemyFleetPositions = enemyFleet.ships.reduce((acc: string[], {position}) => {
                acc.push(JSON.stringify(position))
                return acc;
            }, []);

            const enemyShipLength = enemyFleet.ships.reduce((acc: {length: number}[], {length}) => {
                acc.push({length: length})
                return acc;
            }, []);
            const shot = (point: string) => point === JSON.stringify(attackedPoint);

            const responseTurn = {
                type: "turn",
                data: JSON.stringify({currentPlayer: enemyFleet.currentPlayerIndex}),
                id: 0,
            }
            const touchedShip = enemyFleetPositions.indexOf(JSON.stringify(attackedPoint));
            
            if (
                    enemyFleetPositions.some(shot) && 
                    enemyFleet.ships[touchedShip].length &&
                    enemyFleet.ships[touchedShip].length > 2
                ) 
            {
                status = "shot";
            } else if (
                enemyFleetPositions.some(shot) &&
                enemyFleet.ships[touchedShip].length &&
                enemyFleet.ships[touchedShip].length === 1) {
                status = "killed";
            } else {
                status = "miss";
            }

            const attackData = {
                position: attackedPoint,
                currentPlayer: indexPlayer,
                status: status,
            }

            const responseAttack = {
                type: "attack",
                data: JSON.stringify(attackData),
                id: 0,
            }

            if (status === "shot") {
                ws.send(JSON.stringify(responseAttack));
            } else if (status === "miss" || status === "killed") {
                ws.send(JSON.stringify(responseAttack));
                ws.send(JSON.stringify(responseTurn));
            }
            console.log('Another type: attack');
        } else if(type === "randomAttack") {
            const randomAttackParsedData = JSON.parse(data);
            console.log(randomAttackParsedData);
            console.log('Another type: randomAttack');
        } else if (type === "finish") {
            console.log('Another type: finish');
        } else {
            console.log("No such a type");
        }
      };

       ws.on("close", (ws: WebSocket, code: number, reason: Buffer) => {
        console.log(`Client is disconnected ${code}`)
      })
}

export default wsHandler;