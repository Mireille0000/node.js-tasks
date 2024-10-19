import { IncomingMessage, ServerResponse } from "http";
import { findUserById, findUsers, addNewUser } from "../models/users-model";
import { UserData } from "../utils/interfaces";
import { getPostUserData, isValid, isValidUserData } from "../utils/requests-utils";


export const getUsers = async(req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    try {
        const users = await findUsers();
        console.log("Users");
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(JSON.stringify({users: users, message: 'Request Completed Successfully Get'})) 
       
    } catch (error) {
        console.log("Nothing");
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
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(JSON.stringify({user, message: 'Request Completed Successfully Get_Id'}));
        } 
    } catch (error) {
        console.log(error);
    }
}


export const postUser = async(req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    try {
        const body = await getPostUserData(req);

        const {username, age, hobbies} = JSON.parse(body) as UserData;
            const user = {
                username,
                age,
                hobbies
            };
            const newUser = await addNewUser(user) as UserData;
            const isValidData = isValidUserData(username, age, hobbies);
            if (isValidData) {
                res.writeHead(201, {'Content-type': 'application/json'});
                res.end(JSON.stringify({newUser}));
            } else {
                res.writeHead(400, {'Content-type': 'application/json'});
                res.end(JSON.stringify({message: "Username, age and hobbies fields should be filled. Values of the fields should be of a proper type"}));
            }
    } catch (error) {
        console.error(error);
    }
}