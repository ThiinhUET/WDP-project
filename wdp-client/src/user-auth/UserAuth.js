import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Auth from '../Authenticate';

class UserAuth extends Component {
    user_container = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            isUserDrop: false,
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
        Auth.signout(() => {
            this.props.history.push('/' + this.props.currentPage);
        });
        this.setState({isUserDrop: false});
    }
    handleChange = () => {
        this.setState({isUserDrop: !this.state.isUserDrop});
    }
    render() {
        return (
            <div className="UserAuth">
                {Auth.isAuthenticated && <span className="user" ref={this.user_container}>
                    <span className="username">{this.props.userName}</span>
                    <button className="avatar" onClick={this.handleChange}>
                        <i className="fas fa-user-circle" style={{width: '30px', height: '30px', color: 'white'}}></i>
                    </button>
                    {this.state.isUserDrop && <div className="userdrop_container">
                        <div className="profile">
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