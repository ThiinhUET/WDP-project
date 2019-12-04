import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCzDuYF20cE6jfqgAUVC-yedoJcI2ZkEFI",
  authDomain: "wdp-project-e42e0.firebaseapp.com",
  databaseURL: "https://wdp-project-e42e0.firebaseio.com",
  projectId: "wdp-project-e42e0",
  storageBucket: "wdp-project-e42e0.appspot.com",
  messagingSenderId: "813548789298",
  appId: "1:813548789298:web:367aa780e2a3a08acae62b",
  measurementId: "G-5VS2YYKPVD"
});

const base = Rebase.createClass(firebase.database());

export { firebaseApp };
export default base;