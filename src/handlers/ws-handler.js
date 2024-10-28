"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = require("node:crypto");
const db_1 = __importDefault(require("../data/db"));
const db = new db_1.default();
const usersInARoom = [];
const rooms = [];
// const roomId = randomUUID();
const wsHandler = (ws) => {
    console.log('Client is connected');
    const roomId = (0, node_crypto_1.randomUUID)();
    let currentUserId;
    ws.onmessage = (event) => {
        const rawData = event.data;
        const frame = JSON.parse(rawData.toString());
        const { type, data } = frame;
        if (type === 'reg') {
            // reg user info
            const credentials = JSON.parse(data);
            const userData = {
                name: credentials.name,
                index: (0, node_crypto_1.randomUUID)(),
                error: false,
                errorText: '',
            };
            const responseWSReg = {
                type: `${type}`,
                data: JSON.stringify(userData),
                id: 0
            };
            ws.send(JSON.stringify(responseWSReg));
            // db
            currentUserId = userData.index;
            db.addUser(credentials.name, credentials.password, userData.index, 0);
            // update_winners
            const updateWinnersData = db.store.reduce((acc, { name, wins }) => {
                acc.push({ name: name, wins: wins });
                return acc;
            }, []);
            const responseWSUpdtWinners = {
                type: "update_winners",
                data: JSON.stringify(updateWinnersData),
                id: 0,
            };
            ws.send(JSON.stringify(responseWSUpdtWinners));
            // update_room
            const responseRoom = {
                type: "update_room",
                data: JSON.stringify(rooms),
                id: 0,
            };
            ws.send(JSON.stringify(responseRoom));
        }
        else if (type === "create_room") {
            // update_room
            console.log(roomId);
            const roomData = {
                roomId: roomId,
                roomUsers: [],
            };
            rooms.push(roomData);
            // const idenfifyRoom = rooms.find((room) => room.roomId === roomId);
            // console.log(idenfifyRoom);
            const responseRoom = {
                type: "update_room",
                data: JSON.stringify(rooms),
                id: 0,
            };
            console.log('Another type: create_room, update_room');
            ws.send(JSON.stringify(responseRoom));
        }
        else if (type === "add_user_to_room") {
            // update_room
            const currentUser = db.store.find((user) => user.index === currentUserId);
            const { name, index } = currentUser;
            console.log(usersInARoom);
            usersInARoom.push({ name: name, index: index });
            const roomData = {
                roomId: roomId,
                roomUsers: usersInARoom,
            };
            console.log(roomData);
            console.log(roomId);
            const responseRoom = {
                type: "update_room",
                data: JSON.stringify([roomData]),
                id: 0,
            };
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
            console.log('Another type: add_user_to_room, create_game');
        }
        else if (type === "add_ships") {
            console.log('Another type: add_ships');
        }
        else {
            console.log("No such a type");
        }
    };
    ws.on("close", (ws, code, reason) => {
        console.log(`Client is disconnected ${code}`);
    });
};
exports.default = wsHandler;
