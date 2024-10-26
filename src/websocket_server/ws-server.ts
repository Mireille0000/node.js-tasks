import { WebSocketServer } from "ws";

const WS_PORT = 3000;

export const wssServer = new WebSocketServer({port: WS_PORT});
// wssServer.on('connection', (ws) => {
//     console.log('Client is connected')
//     ws.on('message', (data) => {
//       console.log(JSON.parse(data.toString()));
//       const decoder = JSON.parse(data.toString());
//       ws.send(JSON.stringify(decoder));
//     });
//   });
console.log(`WebSocket server is listening on port ${WS_PORT}`);