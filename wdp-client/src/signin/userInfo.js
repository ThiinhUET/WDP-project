import React, { Component, Fragment } from "react";
import firebase from "firebase";
import Login from "./login";
import base, { firebaseApp } from "./base";
import UserAuth from '../user-auth/UserAuth';
import { __esModule } from "react-console-emulator";

class UserInfo extends Component {
  state = {
    email: null,
    displayName: null
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
    this.setState({
      photoURL: user.photoURL,
      email: user.email,
      displayName: user.displayName
    });
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
        <UserAuth userName = {this.state.displayName} />
      </Fragment>
    );
  }
}

export default UserInfo;
