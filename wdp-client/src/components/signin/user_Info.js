import React, { Component, Fragment } from "react";
import firebase from "firebase";
import Login from "./login";
import base, { firebaseApp } from "./base";
import UserInfo from '../user-info/UserInfo';
import { __esModule } from "react-console-emulator";

class User_Info extends Component {
  state = {
    email: null,
    displayName: null,
    uid : null,
    token : null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    const user = authData.user;
    console.log(authData.credential);
    this.setState({
      photoURL: user.photoURL,
      email: user.email,
      displayName: user.displayName,
      uid: user.providerData[0].uid,
    });
    localStorage.setItem('photoURL', this.state.photoURL);
    localStorage.setItem('displayName', this.state.displayName);
  };
  
  authenticate = provider => {    
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ email: null, displayName: null });
    localStorage.clear();
  };

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;
    if (!this.state.email) {
      return <Login authenticate={this.authenticate} />;
    }
    return (
      <Fragment>
        <div>
          <img src={this.state.photoURL}></img>
        </div>
        <div className="user-info" style={{color: 'white'}}>
          <label>User id:</label>
          <span>
            {this.state.uid}
          </span>
        </div>
        <div className="user-info" style={{color: 'white'}}>
          <label>User name:</label>
          <span type="text" id="email">
            {this.state.displayName}
          </span>
        </div>
        <div className="user-info" style={{color: 'white'}}>
          <label>Email:</label>
          <span type="text" id="email">
            {this.state.email}
          </span>
        </div>
        <div>{logout}</div>
        {/* <UserAuth userName = {this.state.displayName} /> */}
      </Fragment>
    );
  }
}

export default User_Info;
