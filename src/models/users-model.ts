import { UserData } from "../utils/interfaces";

export const findUsers = (): Promise<UserData[]> => {
    return new Promise((resolve, reject) => {
        resolve([{
            id: '',
            username: '',
            age: 0,
            hobbies: ['']
        }]);
    })
}