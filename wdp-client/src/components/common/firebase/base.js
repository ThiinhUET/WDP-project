import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBgZ_SajO2iyNID3x6128Uli1PBfT5ax1U",
  authDomain: "wdp-2019.firebaseapp.com",
  databaseURL: "https://wdp-2019.firebaseio.com",
  projectId: "wdp-2019",
  storageBucket: "wdp-2019.appspot.com",
  messagingSenderId: "332425622172",
  appId: "1:332425622172:web:2b517d41609c1ba2773359",
  measurementId: "G-XC5XGN25YL"
});

const base = Rebase.createClass(firebase.database());

export { firebaseApp };
export default base;