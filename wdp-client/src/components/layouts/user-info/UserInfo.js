import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Authenticate from '../../common/authprovider/Authenticate';
import './style.css';


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
        authenticate.signout(() => this.props.history.push(this.props.location.pathname));
    }
    handleChange = () => {
        this.setState({isUserDrop: !this.state.isUserDrop});
    }

    returnHome = () => {
        this.props.history.push('/home');
    }
    openEditor = () => {
        this.props.history.push('/editor');
    }
    openProfile = () => {
        this.props.history.push('/profile');
    }
    openDashboard = () => {
        this.props.history.push('/dashboard');
    }
    render() {
        return (
            <div className="UserInfo">
                {localStorage.uid && <span className="user" ref={this.user_container}>
                    <span className="username">{localStorage.username}</span>
                    <button className="avatar" onClick={this.handleChange}>
                        <img src={localStorage.photoURL} alt="" style={{width: '30px', height: '30px', color: 'white', border: '1px solid'}} />
                    </button>
                    {this.state.isUserDrop && <div className="userdrop_container">
                        <div className="user_item" id="home" onClick={() => this.returnHome()}>
                            <i className="fas fa-home" style={{width: '12px', height: '12px', paddingRight: '15px'}}></i>
                            Home
                        </div>
                        <div className="row_divider"></div>
                        <div className="user_item" id="profile" onClick={() => this.openProfile()}>
                            <i className="fas fa-user" style={{width: '12px', height: '12px', paddingRight: '15px'}}></i>
                            My Profile
                        </div>
                        <div className="row_divider"></div>
                        <div className="user_item" id="dashboard" onClick={() => this.openDashboard()}>
                            <i className="fas fa-columns" style={{width: '12px', height: '12px', paddingRight: '15px'}}></i>
                            Dashboard
                        </div>
                        <div className="row_divider"></div>
                        <div className="user_item" id="new" onClick={() => this.openEditor()}>
                            <i className="far fa-plus-square" style={{width: '12px', height: '12px', paddingRight: '15px'}}></i>
                            New Project
                        </div>
                        <div className="row_divider"></div>
                        <div className="user_item" id="signout" onClick={() => this.signOut()}>
                            <i className="fas fa-sign-out-alt" style={{width: '12px', height: '12px', paddingRight: '15px'}}></i>
                            Sign Out
                        </div>
                    </div>}
                </span>}
            </div>
        );
    }
}

export default withRouter(UserInfo);