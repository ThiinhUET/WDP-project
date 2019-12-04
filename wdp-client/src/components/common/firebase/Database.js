import { firebaseApp } from "./base"

class Database {
    async readData(user) {
        let data = '';
        const users = firebaseApp.database().ref('users/' + user);
        await users.once('value').then(async (snapshot) => {
            data = await snapshot.val();
        }).catch();
        return data;
    }
    async writeData(user, newData) { 
        let oldData = await this.readData(user);
        await firebaseApp.database().ref('users/' + user).set({
            ...oldData,
            ...newData
        })
    }
}

export default Database;