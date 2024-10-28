import { randomUUID } from "node:crypto";
import DBStore, { UserCredentials } from "../data/db";
import { ResponseRegData, ResponseUpdateWinnersData, ResponseWS } from "../interfaces/player-interfaces";
import { CreateGameData, RoomUsers, UpdateRoomStateData } from "../interfaces/room-interfaces"
import { WebSocket } from "ws";

const db = new DBStore();

const usersInARoom: RoomUsers[] = [];
const rooms: UpdateRoomStateData[] = [];

 const wsHandler = (ws: WebSocket) => {
    console.log('Client is connected');
    const roomId = randomUUID();
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
            console.log(roomId);
        
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
            console.log(usersInARoom);
            usersInARoom.push({name: name, index: index});

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
            //  const createGameData: CreateGameData = {
            //     idGame: randomUUID(),
            //     idPlayer: randomUUID(),
            // }

            // const responseCreateGame = {
            //     type: "create_game",
            //     data: JSON.stringify(createGameData),
            //     id: 0,
            // }
            // ws.send(JSON.stringify(responseCreateGame));
            console.log('Another type: add_user_to_room, create_game')
        } else if (type === "add_ships") {
            console.log('Another type: add_ships');
        } else {
            console.log("No such a type");
        }
      };

       ws.on("close", (ws: WebSocket, code: number, reason: Buffer) => {
        console.log(`Client is disconnected ${code}`)
      })
}

export default wsHandler;