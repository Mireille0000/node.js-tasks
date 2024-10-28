import { WebSocket } from "ws";
import { UpdateRoomStateData } from "../interfaces/room-interfaces";
import { ResponseWS } from "../interfaces/player-interfaces";

const createRoomSender = (ws: WebSocket, roomId: string, rooms: UpdateRoomStateData[]) => {
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
}

export default createRoomSender;