import { firebaseApp } from "./base"

class Database {
    async readData(uid) {
        let data = '';
        const users = firebaseApp.database().ref('users/' + uid);
        await users.once('value').then(async (snapshot) => {
            data = await snapshot.val();
        }).catch();
        return data;
    }
    async writeData(uid, newData) { 
        let oldData = await this.readData(uid);
        await firebaseApp.database().ref('users/' + uid).set({
            ...oldData,
            ...newData
        })
    }
}

export default Database;