import { httpServer } from "./src/http_server/index";
import { wssServer } from "./src/websocket_server/ws-server.js";
import { randomUUID } from "crypto";

import DBStore from "./src/data/db";

const HTTP_PORT = 8181;
const id = randomUUID();

interface I {
  type: string,
  data: string,
  id: number
}

const db = new DBStore();

wssServer.on('connection', (ws) => {
  console.log('Client is connected')

  ws.on('message', (rawData, error) => {
    const frame = JSON.parse(rawData.toString()) as I;
    const {type, data} = frame;
    const test = JSON.parse(data);
    const userInfo = {
      name: test.name,
      index: `${id}`,
      error: ``,
      errorText: '',
    }

    const response = {type: `${type}`, data: JSON.stringify(userInfo),
    id: 0
  }
    
    ws.send(JSON.stringify(response));
    db.addUser(test.name, test.password);
  });

  ws.on("close", (ws: WebSocket, code:number, reason: Buffer) => {
    console.log(`Client is disconnected ${code}`)
  })
});

httpServer.listen(HTTP_PORT);
