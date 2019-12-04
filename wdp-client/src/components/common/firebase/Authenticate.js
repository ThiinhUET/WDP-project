import firebase from "firebase";
import { firebaseApp } from "./base"
import axios from 'axios';

import Database from './Database';

const database = new Database();

class Authenticate {
    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.authHandler({ user });
          console.log(user.providerData[0].uid)
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
      localStorage.setItem('uid', user.providerData[0].uid);
      localStorage.setItem('email', user.email);
      localStorage.setItem('username', additionalUserInfo.username);
      localStorage.setItem('photoURL', user.photoURL);

      database.writeData(additionalUserInfo.username, {profile: additionalUserInfo.profile})
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
          await axios.post('http://localhost:8080/git/user-repos', {accessToken : localStorage.accessToken, login : localStorage.username}).then(async res => {
            let repo = [];
            await res.data.repositories.map((value) => repo.push(value.name) );
            let gitData = await database.readData(localStorage.username);
            if (gitData.repositories && gitData.trashRepositories) {
              let i = 0;
              while (i < repo.length && gitData.trashRepositories) {
                if (gitData.trashRepositories.includes(repo[i])) await repo.splice(i, 1);
                else i ++;
              }
              database.writeData(localStorage.username, 
              {
                repositories: repo,
                trashRepositories: gitData.trashRepositories
              });
              localStorage.setItem('repositories', repo)
            }
            else {
              await database.writeData(localStorage.username, 
              {
                repositories: repo,
                trashRepositories: ''
              });
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