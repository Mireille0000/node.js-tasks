import { UserData } from "../utils/interfaces";

import { createReadStream } from "node:fs";

import { randomUUID } from 'node:crypto';

export const userId = randomUUID();

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
        let usersStream = createReadStream('src/data/users-data.json');
        usersStream.on("data", (data) => {
            const users: UserData[] = JSON.parse(data as string);
            const user = users.find((user) => user.id === id) as UserData;
            resolve(user);
        })
    })
}