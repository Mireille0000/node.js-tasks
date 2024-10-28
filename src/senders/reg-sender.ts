import { randomUUID } from "node:crypto";
import { ResponseRegData, ResponseUpdateWinnersData, ResponseWS } from "../interfaces/player-interfaces";
import DBStore from "../data/db";
import { UpdateRoomStateData } from "../interfaces/room-interfaces";
import { WebSocket } from "ws";

const regSender = (
        ws: WebSocket, 
        // event: MessageEvent<any>, 
        data: string,
        type: string,
        currentUser: {currentUserId: string}, 
        db: DBStore, 
        rooms: UpdateRoomStateData[]
    ) => {
    // const rawData = event.data;
    // const parsedRowData = JSON.parse(rawData.toString()) as ResponseWS;
    // const {type, data} = parsedRowData;
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
    currentUser.currentUserId = userData.index
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
   
}

export default regSender;