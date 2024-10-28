export interface UserCredentials {
    name: string;
    password: string;
    index: string;
    wins: number;
}

export default class DBStore {
    public roomIds!: string[];
    public store!: UserCredentials[];

    constructor() {
        this.store = [];
        this.roomIds = []
    }

    // getUser () {
    //     return this.storeItem.name || null
    // }

    addUser (nm: string, pswrd: string, i: string, wins: number) {
        const storeItm = {name: nm, password: pswrd, index: i, wins: wins};
        if (this.store.length < 1) {
            this.store.push(storeItm);
        } else {
            this.store.some((user) => {
                if (user.name === storeItm.name && user.password === storeItm.password) {
                    console.log('User already exists');
                    return this.store;
                } else {
                    console.log('New user!');
                    this.store.push(storeItm);
                    return this.store;
                }
            })
        }
        // console.log(this.store);
    }

    addRoomId(id: string) {
        return this.roomIds.push(id)
    }
}