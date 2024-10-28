"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wssServer = void 0;
const ws_1 = require("ws");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const WS_PORT = Number(process.env.PORT);
console.log(`WebSocket server is listening on port ${WS_PORT}`);
exports.wssServer = new ws_1.WebSocketServer({ port: WS_PORT });
