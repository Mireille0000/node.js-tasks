import { createServer } from "node:http";
import { randomUUID } from 'node:crypto';
import { Endpoints, Methods } from "../utils/requests-utils";
import { getUsers } from "../controllers/users-controller";

const userId = randomUUID();

export const server = createServer((req, res) => {
    if(req.url === Endpoints.GET && req.method === Methods.GET) {
        getUsers(req, res)
    } else {
        res.writeHead(404, {'Content-type': 'application/json', });
        res.end(JSON.stringify({message: 'Bad Request'}))
    }
})