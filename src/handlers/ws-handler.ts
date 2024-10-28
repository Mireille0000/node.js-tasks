import { randomUUID } from "node:crypto";
import DBStore, { UserCredentials } from "../data/db";
import { ResponseRegData, ResponseUpdateWinnersData, ResponseWS } from "../interfaces/player-interfaces";
import { CreateGameData, RoomUsers, UpdateRoomStateData } from "../interfaces/room-interfaces"
import { WebSocket } from "ws";
import { StartGameData } from "../interfaces/ships-interfaces";

import regSender from "../senders/reg-sender";
import createRoomSender from "../senders/create-room-sender";
import addUserToRoomSender from "../senders/add-user-to-room-sender";
import addShipSender from "../senders/add-ships-sender";
import attackSender from "../senders/attack-sender";

const db = new DBStore();

const usersInARoom: RoomUsers[] = [];
const rooms: UpdateRoomStateData[] = [];
const roomId = randomUUID(); // separated modules ?

const players: ResponseWS[] = [];
const playersShips: StartGameData[] = [];

 const wsHandler = (ws: WebSocket) => {
    console.log('Client is connected');
    const currentUser = {
        currentUserId: "",
    };

    ws.onmessage = (event) => {
        const rawData = event.data;
        const parsedRowData = JSON.parse(rawData.toString()) as ResponseWS;
        const {type, data} = parsedRowData;

        if (type === 'reg') {
            // reg
            regSender(ws, data, type, currentUser, db, rooms);    
        } else if (type === "create_room"){
            // update_room
            createRoomSender(ws, roomId, rooms);
        } else if (type === "add_user_to_room") {
            // update_room, create_game
            addUserToRoomSender(ws, db, currentUser, usersInARoom, roomId);
        } else if (type === "add_ships") {
            // start_game, turn
            addShipSender(ws, data, players, playersShips);
        } else if (type === "attack") {
            // attack, turn
            attackSender(ws, data, playersShips);
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