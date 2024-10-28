import { WebSocketServer } from "ws";
import dotenv from "dotenv";
dotenv.config()

const WS_PORT = Number(process.env.PORT);
console.log(`WebSocket server is listening on port ${WS_PORT}`);

export const wssServer = new WebSocketServer({port: WS_PORT});