import { createServer } from "node:http";
// import { randomUUID } from 'node:crypto';
import {  Methods } from "../utils/requests-utils";
import { getUserById, getUsers, postUser } from "../controllers/users-controller";

export const server = createServer((req, res) => {
    if (req.url === '/api/users' && req.method === Methods.GET) {
        getUsers(req, res);
    } else if ((req.url as string).match(/\/api\/users\/([0-9a-f])/) && req.method === Methods.GET) {
        const id = (req.url as string).split('/')[3];
        getUserById(req, res, id);
    } else if (req.url === '/api/users' && req.method === Methods.POST) {
        postUser(req, res);
    } else {
        res.writeHead(404, {'Content-type': 'application/json', });
        res.end(JSON.stringify({message: 'Bad Request'}))
    }
})