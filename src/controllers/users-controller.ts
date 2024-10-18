import { IncomingMessage, ServerResponse } from "http";
import { findUserById, findUsers } from "../models/users-model";
import { UserData } from "../utils/interfaces";
import {createReadStream } from "node:fs";


export const getUsers = async(req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    try {
        const users: UserData[] = await findUsers();
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(JSON.stringify({users: users, message: 'Request Completed Successfully Get'}))  
    } catch (error) {
        console.error(error);
    }
}

// export const getUserById = async(req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
//     try {
//         const user: UserData = await findUserById();
//         if(user) {
//             res.writeHead(200, {'Content-type': 'application/json'});
//             res.end(JSON.stringify({users: user, message: 'Request Completed Successfully (Get)'}))  
//         } else {
//             res.writeHead(404, {'Content-type': 'application/json'});
//             res.end(JSON.stringify({message: 'User Not Found (GetById)'})) 
//         } 
//     } catch (error) {
//         console.log(error);
//     }
// }