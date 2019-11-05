import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import logo from '../../assets/logo.png';

import UserInfo from '../user-info/UserInfo';
import './style.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        localStorage.setItem('redirect', '/home');
    }
    componentDidMount() {
        let bio_content = document.getElementById("bio_content");
        if (bio_content.offsetWidth > 232) bio_content.style.textAlign = "left";
    }
    
    getCreatedTime() {
        let update = new Date(localStorage.updated_at);
        let create = new Date(localStorage.created_at);
        let years = update.getFullYear() - create.getFullYear();
        let months = update.getMonth() - update.getMonth();
        let dates = update.getDate() - update.getDate();
        if (years !== 0) return years.toString() + ((years > 1) ? " years " : " year ");
        else if (months !== 0) return months.toString + ((months > 1) ? "months" : "month");
        else if (dates !== 0) return dates.toString + ((dates > 1) ? "days" : "day");
        else return "few hours"
    }
    returnHome() {
        this.props.history.push('/home');
    }
    
    render() {
        return (
            <div className="Profile">
                <div className="header">
                    <div className="header_left">
                        <button className="homebtn" title="Home" onClick={() => this.returnHome()}>
                            <img src={logo} className="App-logo" alt="logo" width={40} height={40} />
                        </button>
                        <span className="title">Profile</span>
                    </div>
                    <div className="header_right">
                        {!localStorage.uid && <button className="signin" onClick={() => this.openSignIn()}>Sign In</button>}
                        <UserInfo />
                    </div>
                </div>
                <div className="maincontent" style={{fontFamily: 'Fira Sans, sans-serif'}}>
                    <div className="top_content">
                        <div className="avatar_profile">
                            <img src={localStorage.photoURL} width={200} height={200} style={{border: '3px solid white'}} />
                        </div>
                        <div style={{color: '#f0f0f0'}}>
                            <span className="displayName_profile">{localStorage.displayName}</span>
                            <span className="username_profile">{localStorage.username}</span>
                            <a className="github_link" href={localStorage.html_url} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-github" style={{color: 'gray', paddingLeft: '10px', width: '35px', height: '35px'}}></i>
                            </a>
                            <div className="created_time">
                                <i className="fas fa-clock" style={{paddingRight: '10px'}}></i>
                                Created {this.getCreatedTime()} ago
                            </div>
                            <div className="bio_profile">
                                <div className="bio_title">Bio</div>
                                <div className="bio_content" id="bio_content">{localStorage.bio}</div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom_content">
                        <div className="profile_items">
                            {localStorage.company && <div className="profile_item">
                                <i className="fas fa-users" style={{color: 'gray', width: '20px', height: '20px', paddingRight: '10px'}}></i>
                                <span>{localStorage.company}</span>
                            </div>}
                            {localStorage.location && <div className="profile_item">
                                <i className="fas fa-map-marker-alt" style={{color: 'gray', width: '20px', height: '20px', paddingRight: '10px'}}></i>
                                <span>{localStorage.location}</span>
                            </div>}
                            {localStorage.email && <div className="profile_item">
                                <i className="fas fa-envelope" style={{color: 'gray', width: '20px', height: '20px', paddingRight: '10px'}}></i>
                                <a href="mailto: {localStorage.email}">{localStorage.email}</a>
                            </div>}
                            {localStorage.blog && <div className="profile_item">
                                <i className="fas fa-globe-asia" style={{color: 'gray', width: '20px', height: '20px', paddingRight: '10px'}}></i>
                                <a href={(localStorage.blog).includes("https://")? localStorage.blog : "https://" + localStorage.blog} target="_blank" rel="noopener noreferrer">{localStorage.blog}</a>
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <span>v1.0</span>
                    <span>© 2019 Web Development Platform | Develop by HoiThanhDucChuaTroi</span>
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);