import { httpServer } from "./src/http_server/index";
import { wssServer } from "./src/websocket_server/ws-server.js";
import wsHandler from "./src/handlers/ws-handler";

const HTTP_PORT = 8181;

wssServer.on('connection', (ws) => {
  wsHandler(ws);
});

httpServer.listen(HTTP_PORT);
