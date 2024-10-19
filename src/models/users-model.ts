import { UserData } from "../utils/interfaces";

import { createReadStream, readFile, writeFile } from "node:fs";

import { randomUUID } from 'node:crypto';
import { error } from "node:console";
import { isValidUserData } from "../utils/requests-utils";

export const userRandomId = randomUUID();

export const findUsers = (): Promise<UserData[] | {}> => {
    return new Promise((resolve, reject) => {
        try {
            readFile('src/data/users-data.json', {encoding: 'utf-8'}, (err,data) => {
                if (err) console.log("Error");
                if (data.length === 0) {
                    resolve(data);
                } else {
                    resolve(JSON.parse(data));
                }
            })
        } catch(err) {
            reject(err);
        }
    })
}

export const findUserById = (id: string): Promise<UserData> => {
    return new Promise((resolve, reject) => {
        const usersStream = createReadStream('src/data/users-data.json');
        usersStream.on("data", (data) => {
            const users: UserData[] = JSON.parse(data as string);
            if (users) {
                const user = users.find((user) => user.id === id) as UserData;
                resolve(user);
            } else {
                reject(error);
            }
        })
    })
}

export const addNewUser = (user: UserData): Promise<UserData | {}> => {
    return new Promise((resolve, reject) => {
        try {
            const {username, age, hobbies} = user
            const newUser = {id: userRandomId, username, age, hobbies};
            const isValidData = isValidUserData(username, age, hobbies);

            readFile('src/data/users-data.json', {encoding: 'utf-8'}, (err, data) => {
                if(data.length === 0 && isValidData) {
                    const usersArr: UserData[] = [];
                    usersArr.push(newUser);
                    writeFile('src/data/users-data.json', JSON.stringify(usersArr), () => {});
                    resolve(newUser);
                } else if (isValidData) {
                    const usersArr: UserData[] = JSON.parse(data as string);
                    usersArr.push(newUser);
                    writeFile('src/data/users-data.json', JSON.stringify(usersArr), () => {});
                    resolve(newUser);
                } else {
                    resolve([]);
                    console.log("Invalid data");
                }
            })
        } catch(err){
            console.log(err);
        }
    })
}

export const findUserToUpdate = (id: string, user: UserData): Promise<UserData | []> => {
    return new Promise((resolve, reject) => {
        try {
            const {id, username, age, hobbies} = user;
            const updatedUser = {id, username, age, hobbies};
            const isValidData = isValidUserData(username, age, hobbies);

            readFile('src/data/users-data.json', {encoding: 'utf-8'}, (err, data) => {
                if(data.length === 0 && isValidData) {
                    const usersArr: UserData[] = [];
                    usersArr.push(updatedUser);
                    writeFile('src/data/users-data.json', JSON.stringify(usersArr), () => {});
                    resolve([]);
                } else if (isValidData) {
                    const usersArr: UserData[] = JSON.parse(data as string);
                    const i = usersArr.findIndex((user) => user.id === id);
                    usersArr[i] = {id, username, age, hobbies};
                    writeFile('src/data/users-data.json', JSON.stringify(usersArr), () => {});
                    resolve(updatedUser);
                } else {
                    resolve([]);
                    console.log("Invalid data");
                }
            })
        } catch(err){
            console.log(err);
        }
    })
}