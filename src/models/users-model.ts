import { UserData } from "../utils/interfaces";

import { createReadStream, writeFile } from "node:fs";

import { randomUUID } from 'node:crypto';

export const userRandomId = randomUUID();

export const findUsers = (): Promise<UserData[]> => {
    return new Promise((resolve, reject) => {
        const users = createReadStream('src/data/users-data.json');
        users.on("data", (data) => {
            console.log(JSON.parse(data as string))
            resolve(JSON.parse(data as string));
        })

    })
}

export const findUserById = (id: string): Promise<UserData> => {
    return new Promise((resolve, reject) => {
        const usersStream = createReadStream('src/data/users-data.json');
        usersStream.on("data", (data) => {
            const users: UserData[] = JSON.parse(data as string);
            console.log(users);
            const user = users.find((user) => user.id === id) as UserData;
            resolve(user);
        })
    })
}

export const postNewUser = (user: UserData): Promise<UserData> => {
    return new Promise((resolve, reject) => {
        const {username, age, hobbies} = user

        const newUser = {id: userRandomId, username, age, hobbies};
        const usersStream = createReadStream('src/data/users-data.json');
        usersStream.on("data", (data) => {
           const usersArr = JSON.parse(data as string);
           usersArr.push(newUser)
           writeFile('src/data/users-data.json', JSON.stringify(usersArr), () => {});
           resolve(newUser);
        })
    })

}