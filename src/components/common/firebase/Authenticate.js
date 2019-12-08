import firebase from "firebase";
import { firebaseApp } from "./base"
import axios from 'axios';

import Database from './Database';
import baseAPI from "../../../utils/baseAPI";

const database = new Database();

class Authenticate {
    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.authHandler({ user });
        }
      });
    }
    
    authHandler = async authData => {
      let user = authData.user;
      let credential, additionalUserInfo;
      if (authData.credential) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        credential = authData.credential;
        additionalUserInfo = authData.additionalUserInfo;
        // ...
      }
      localStorage.setItem('accessToken', credential.accessToken);
      localStorage.setItem('uid', user.uid);
      localStorage.setItem('email', user.email);
      localStorage.setItem('username', additionalUserInfo.username);
      localStorage.setItem('photoURL', user.photoURL);

      database.writeData(user.uid, {profile: additionalUserInfo.profile})
    };
    
    signin = (cb) => {
      const authProvider = new firebase.auth.GithubAuthProvider();
      authProvider.addScope('repo');
      authProvider.addScope('user');
      authProvider.addScope('admin:enterprise'); 
      authProvider.addScope('admin:org');
      authProvider.addScope('admin:org_hook')  
      authProvider.addScope('admin:public_key');
      authProvider.addScope('admin:repo_hook');
      authProvider.addScope('delete:packages');
      authProvider.addScope('delete_repo');
      authProvider.addScope('gist');
      authProvider.addScope('notifications');
      authProvider.addScope('read:packages');
      authProvider.addScope('write:discussion'); 
      authProvider.addScope('write:packages');

      firebaseApp
        .auth()
        .signInWithPopup(authProvider)
        .then(this.authHandler).then(async ()=>{
          await axios.get(baseAPI.gitURL + "/users/" + localStorage.username + "/repos", { headers: { Authorization: 'token ' + localStorage.accessToken } }).then(async res => {
            let repositories = res.data;
            let repo = [];
            await repositories.map((item) => {
                repo.push(item.name);
            });
            let gitData = await database.readData(localStorage.uid);
            if (gitData.repositories) {
              let i = 0;
              while (i < repo.length && gitData.trashRepositories) {
                if (gitData.trashRepositories.includes(repo[i])) await repo.splice(i, 1);
                else i ++;
              }
              database.writeData(localStorage.uid, {repositories: repo});
              localStorage.setItem('repositories', repo)
            }
            else {
              await database.writeData(localStorage.uid, {repositories: repo});
              localStorage.setItem('repositories', repo)
            }
            setTimeout(cb,0)
          })
        });
    };
  
    signout = async (cb) => {
      await firebase.auth().signOut();
      localStorage.clear();
      setTimeout(cb, 0);
    };
}
export default Authenticate;