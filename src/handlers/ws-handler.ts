import { randomUUID } from "node:crypto";
import DBStore from "../data/db";
import { ResponseRegData, ResponseWS } from "../interfaces/player-interfaces";
import { WebSocket } from "ws";

const db = new DBStore();
const id = randomUUID();

 const wsHandler = (ws: WebSocket) => {
    console.log('Client is connected')
    ws.onmessage = (event) => {
        const rawData = event.data;
        const frame = JSON.parse(rawData.toString()) as ResponseWS;
        const {type, data} = frame;

        if (type === 'reg') {
            const credentials = JSON.parse(data);
            const userData: ResponseRegData = {
              name: credentials.name,
              index: `${id}`,
              error: false,
              errorText: '',
            }
            const responseWSReg = {
                type: `${type}`, 
                data: JSON.stringify(userData),
                id: 0
            }
    
            const updateWinnersData = [
                {
                        name: credentials.name,
                        wins: 0, // ?
                    },
                ]
    
            const responseWSUpdtWinners = {
                type: "update_winners",
                data: JSON.stringify(updateWinnersData),
                id: 0,
            }
            
            ws.send(JSON.stringify(responseWSReg));
            ws.send(JSON.stringify(responseWSUpdtWinners));
            db.addUser(credentials.name, credentials.password);
        } else {
            console.log('Another type');
        }
      };

       ws.on("close", (ws: WebSocket, code: number, reason: Buffer) => {
        console.log(`Client is disconnected ${code}`)
      })
}

export default wsHandler;