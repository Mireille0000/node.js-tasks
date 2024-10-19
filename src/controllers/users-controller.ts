import { IncomingMessage, ServerResponse } from "http";
import { findUserById, findUsers, postNewUser } from "../models/users-model";
import { UserData } from "../utils/interfaces";
import {createReadStream } from "node:fs";
import { isValid } from "../utils/requests-utils";


export const getUsers = async(req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    try {
        const users: UserData[] = await findUsers();
        if(users) {
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(JSON.stringify({users: users, message: 'Request Completed Successfully Get'})) 
        } else {
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(JSON.stringify({users: {}, message: 'Users Not Found Get'})) 
        }
    } catch (error) {
        console.error(error);
    }
}

export const getUserById = async(req: IncomingMessage, res: ServerResponse<IncomingMessage>, id: string) => {
    try {
        const user: UserData = await findUserById(id);

        if(!user && isValid(id) === true) {
            res.writeHead(404, {'Content-type': 'application/json'});
            res.end(JSON.stringify({message: 'User Not Found (GetById)'}));
        } else if(isValid(id) === false) {
            res.writeHead(400, {'Content-type': 'application/json'});
            res.end(JSON.stringify({message: 'Invalid Id (GetById)'})) 
        } else {
            console.log(user);
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(JSON.stringify({user, message: 'Request Completed Successfully Get_Id'}));
        } 
    } catch (error) {
        console.log(error);
    }
}


export const postUser = async(req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    try {
        let body = '';
        req.on('data', (data) => {
            body += data.toString();
        })

        req.on('end', async() => {
            const {username, age, hobbies} = JSON.parse(body);
            const user = {
                username,
                age,
                hobbies
            };
            const newUser: UserData = await postNewUser(user);

            res.writeHead(201, {'Content-type': 'application/json'});
            res.end(JSON.stringify({newUser}))  
        })
    } catch (error) {
        console.error(error);
    }
}