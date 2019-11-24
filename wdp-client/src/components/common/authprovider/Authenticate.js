import firebase from "firebase";
import { firebaseApp } from "./base"
import axios from 'axios';

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
      localStorage.setItem('photoURL', user.photoURL);
      localStorage.setItem('email', user.email);
      localStorage.setItem('username', additionalUserInfo.username);
      localStorage.setItem('displayName', user.displayName);
      localStorage.setItem('uid', user.providerData[0].uid);
      localStorage.setItem('bio', additionalUserInfo.profile.bio);
      localStorage.setItem('blog', additionalUserInfo.profile.blog);
      localStorage.setItem('company', additionalUserInfo.profile.company);
      localStorage.setItem('email', additionalUserInfo.profile.email);
      localStorage.setItem('location', additionalUserInfo.profile.location);
      localStorage.setItem('html_url', additionalUserInfo.profile.html_url);
      localStorage.setItem('created_at', additionalUserInfo.profile.created_at);
      localStorage.setItem('updated_at', additionalUserInfo.profile.updated_at);
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
        .then(this.authHandler).then( ()=>{
          axios.post('http://localhost:8080/git/user-repos', {accessToken : localStorage.getItem('accessToken'), login : localStorage.getItem('username')}).then(res => {
            let repo = [];
            res.data.repositories.map((value) => repo.push(value.name) );
            localStorage.setItem('repositories', repo);
          }).then(() => setTimeout(cb,0));
        });
    };
  
    signout = async (cb) => {
      await firebase.auth().signOut();
      localStorage.clear();
      setTimeout(cb, 100);
    };
}
export default Authenticate;