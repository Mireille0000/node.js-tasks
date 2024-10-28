"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./src/http_server/index");
const ws_server_js_1 = require("./src/websocket_server/ws-server.js");
const ws_handler_1 = __importDefault(require("./src/handlers/ws-handler"));
const HTTP_PORT = 8181;
ws_server_js_1.wssServer.on('connection', (ws) => {
    (0, ws_handler_1.default)(ws);
});
index_1.httpServer.listen(HTTP_PORT);
