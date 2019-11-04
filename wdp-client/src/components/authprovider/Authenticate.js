import firebase from "firebase";
import base, { firebaseApp } from "./base"

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
      const user = authData.user;
      localStorage.setItem('isAuth', true);
      localStorage.setItem('photoURL', user.photoURL);
      localStorage.setItem('email', user.email);
      localStorage.setItem('displayName', user.displayName);
      localStorage.setItem('uid', user.providerData[0].uid);
    };
    
    signin = (cb) => {
      const authProvider = new firebase.auth.GithubAuthProvider();
      firebaseApp
        .auth()
        .signInWithPopup(authProvider)
        .then(async function(authData) {
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
          setTimeout(cb,100);
        });
    };
  
    signout = async (cb) => {
      await firebase.auth().signOut();
      localStorage.removeItem('photoURL');
      localStorage.removeItem('email');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
      localStorage.removeItem('displayName');
      localStorage.removeItem('uid');
      setTimeout(cb, 100);
    };
}
export default Authenticate;