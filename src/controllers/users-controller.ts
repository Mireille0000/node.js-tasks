import { IncomingMessage, ServerResponse } from "http";
import { findUsers } from "../models/users-model";
import { UserData } from "../utils/interfaces";


export const getUsers = async(req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    try {
        const users: UserData[] = await findUsers();
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(JSON.stringify({users: users, message: 'Request Completed Successfully Get'}))
        
    } catch (error) {
        console.error(error);
    }

}