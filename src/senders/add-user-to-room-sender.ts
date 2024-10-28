import { WebSocket } from "ws";
import { CreateGameData, RoomUsers, UpdateRoomStateData } from "../interfaces/room-interfaces";
import { ResponseWS } from "../interfaces/player-interfaces";
import DBStore, { UserCredentials } from "../data/db";

const addUserToRoomSender = (
    ws: WebSocket, 
    db: DBStore, 
    currentUser: {currentUserId: string},
    usersInARoom: RoomUsers[],
    roomId: string
) => {
// update_room
const currentUserData = db.store.find((user) => user.index === currentUser.currentUserId);
const {name, index} = currentUserData as UserCredentials;

usersInARoom.push({name: name, index: index});

console.log(roomId);
const roomData: UpdateRoomStateData = {
    roomId: roomId,
    roomUsers: usersInARoom,
}

const responseRoom: ResponseWS = {
    type: "update_room",
    data: JSON.stringify([roomData]),
    id: 0,
}
ws.send(JSON.stringify(responseRoom));

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
}

export default addUserToRoomSender;