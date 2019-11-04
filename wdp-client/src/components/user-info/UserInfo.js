import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Authenticate from '../../Authenticate';
import firebase from "firebase";
import Login from '../signin/login';
import base, { firebaseApp } from '../signin/base';
import { __esModule } from "react-console-emulator";


class UserInfo extends Component {
    user_container = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            isUserDrop: false
        }
    }
    
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
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
        const authenticate = new Authenticate();
        authenticate.signout(() => this.props.history.push(localStorage.currentPage));
    }
    handleChange = () => {
        this.setState({isUserDrop: !this.state.isUserDrop});
    }

    profileRouter =() =>{
        this.props.history.push('/test')
    }
    render() {
        return (
            <div className="UserInfo">
                {localStorage.isAuth && <span className="user" ref={this.user_container}>
                    <span className="username">{localStorage.displayName}</span>
                    <button className="avatar" onClick={this.handleChange}>
                        <img src={localStorage.photoURL} style={{width: '30px', height: '30px', color: 'white'}} />
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
                        <div className="signout" onClick={() => this.signOut()}>
                            <i className="fas fa-sign-out-alt" style={{paddingRight: '20px'}}></i>
                            Sign out
                        </div>
                    </div>}
                </span>}
            </div>
        );
    }
}

export default withRouter(UserInfo);