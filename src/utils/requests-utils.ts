import { IncomingMessage } from "node:http";
import { UserData } from "./interfaces";

export enum Methods {
    GET = 'GET',
    POST ='POST',
    PUT = 'PUT',
    DELETE ='DELETE'
}

export const isValid = (id: string) => {
    if (id.match(/^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/)) {
        return true;
    } else {
        return false;
    }
}

export const getPostUserData = (req:IncomingMessage): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (data) => {
                body += data.toString();
            })

            req.on("end", () => {
                resolve(body);
            })
            
        } catch (error) {
            console.error(error);
        }
    })
}

export const isValidUserData = (name: string, age: number, hobbies: string[]) => {
    if ( typeof name === "string" && typeof age === "number" && Array.isArray(hobbies)) {
        return true;
    } else {
        return false;
    }
}