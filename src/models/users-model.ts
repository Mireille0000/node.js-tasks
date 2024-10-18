import { UserData } from "../utils/interfaces";

import { createReadStream } from "node:fs";

export const findUsers = (): Promise<UserData[]> => {
    return new Promise((resolve, reject) => {
        let users = createReadStream('src/data/users-data.json');
        users.on("data", (data) => {
            resolve(JSON.parse(data as string));
        })

    })
}

export const findUserById = (id: string): Promise<UserData> => {
    return new Promise((resolve, reject) => {
        resolve
    })
}