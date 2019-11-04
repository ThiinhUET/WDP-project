import firebase from "firebase";
import base, { firebaseApp } from "./components/signin/base";

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
          const user = authData.user;
          localStorage.setItem('isAuth', true);
          localStorage.setItem('photoURL', user.photoURL);
          localStorage.setItem('email', user.email);
          localStorage.setItem('displayName', user.displayName);
          localStorage.setItem('uid', user.providerData[0].uid);
          setTimeout(cb,100);
        });
    };
  
    signout = async (cb) => {
      await firebase.auth().signOut();
      localStorage.clear();
      setTimeout(cb, 100);
    };
}
export default Authenticate;