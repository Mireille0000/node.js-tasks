interface UserCredentials {
    name: string;
    password: string;
}

export default class DBStore {
    public storeItem!: UserCredentials;
    public store!: UserCredentials[];

    constructor() {
        this.storeItem = {name: '', password: ''};
        this.store = [];
    }

    getUser () {
        return this.storeItem.name || null
    }

    addUser (nm: string, pswrd: string) {
        const storeItm = {name: nm, password: pswrd}
        this.store.push(storeItm);
        console.log(this.store)
        return this.store;
    }
}