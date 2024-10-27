interface UserCredentials {
    name: string;
    password: string;
}

export default class DBStore {
    // public storeItem!: UserCredentials;
    public store!: UserCredentials[];

    constructor() {
        this.store = [];
    }

    // getUser () {
    //     return this.storeItem.name || null
    // }

    addUser (nm: string, pswrd: string) {
        const storeItm = {name: nm, password: pswrd};
        if (this.store.length < 1) {
            this.store.push(storeItm);
        } else {
            this.store.some((user) => {
                if (user.name === storeItm.name && user.password === storeItm.password) {
                    console.log('User already exists');
                    return this.store;
                    // return false;
                } else {
                    console.log('New user!');
                    this.store.push(storeItm);
                    return this.store;
                }
            })
        }
        console.log(this.store);
    }
}