import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCzDuYF20cE6jfqgAUVC-yedoJcI2ZkEFI",
  authDomain: "wdp-project-e42e0.firebaseapp.com",
  databaseURL: "https://wdp-project-e42e0.firebaseio.com"
});

const base = Rebase.createClass(firebase.database());

export { firebaseApp };
export default base;