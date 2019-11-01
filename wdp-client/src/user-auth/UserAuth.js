import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Auth from '../Authenticate';
import firebase from "firebase";
import Login from '../signin/login';
import base, { firebaseApp } from '../signin/base';
import { __esModule } from "react-console-emulator";


class UserAuth extends Component {
    user_container = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            isUserDrop: false,
            email: null,
            displayName: null
        }
    }
    
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
        let displayName = localStorage.getItem('displayName');
        let photoURL = localStorage.getItem('photoURL');
        this.setState({
            displayName : displayName,
            photoURL : photoURL
        })
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
          displayName: user.displayName,
        });
        localStorage.setItem('photoURL', this.state.photoURL);
        localStorage.setItem('displayName', this.state.displayName);
        localStorage.setItem('isSignedIn', this.state.isSignedIn);

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
        this.setState({ email: null, displayName: null,isSignedIn : false });
      };
    
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    handleClickOutside = event => {
        if (this.user_container.current && !this.user_container.current.contains(event.target)) {
            this.setState({
                isUserDrop: false,
            });
        }
    };
    signOut = () => {
        Auth.signout(() => {
            this.props.history.push('/home');
        });
        this.setState({isUserDrop: false});
    }
    handleChange = () => {
        this.setState({isUserDrop: !this.state.isUserDrop});
    }

    profileRouter =() =>{
        this.props.history.push('/test')
    }
    render() {
        return (
            <div className="UserAuth">
                {Auth.isAuthenticated && <span className="user" ref={this.user_container}>
                    <span className="username">{this.state.displayName}</span>
                    <button className="avatar" onClick={this.handleChange}>
                        <img src={this.state.photoURL} style={{width: '30px', height: '30px', color: 'white'}} />
                    </button>
                    {this.state.isUserDrop && <div className="userdrop_container">
                        <div className="profile" onClick={() => this.profileRouter()}>
                            <i className="fas fa-user" style={{paddingRight: '20px'}}></i>
                            My Profile
                        </div>
                        <div className="row_divider"></div>
                        <div className="dashboard">
                            <i className="fas fa-columns" style={{paddingRight: '20px'}}></i>
                            Dashboard
                        </div>
                        <div className="row_divider"></div>
                        <div className="signout" onClick={this.signOut}>
                            <i className="fas fa-sign-out-alt" style={{paddingRight: '20px'}}></i>
                            Sign out
                        </div>
                    </div>}
                </span>}
            </div>
        );
    }
}

export default withRouter(UserAuth);