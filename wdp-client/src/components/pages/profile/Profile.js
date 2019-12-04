import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Loading from '../../layouts/loading/Loading';
import Header from '../../layouts/header/Header';

import './style.css';
import Database from '../../common/firebase/Database';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }
    async componentDidMount() {
        const database = new Database();
        let gitData = await database.readData(localStorage.uid);
        this.setState({profile: gitData.profile, isLoading: false})
        let bio_content = document.getElementById("bio_content");
        if (bio_content.offsetWidth > 232) bio_content.style.textAlign = "left";
        console.log(gitData)
    }
    
    getCreatedTime() {
        const { profile } = this.state;
        let update = new Date(profile.updated_at);
        let create = new Date(profile.created_at);
        let years = update.getFullYear() - create.getFullYear();
        let months = update.getMonth() - update.getMonth();
        let dates = update.getDate() - update.getDate();
        if (years !== 0) return years.toString() + ((years > 1) ? " years " : " year ");
        else if (months !== 0) return months.toString + ((months > 1) ? "months" : "month");
        else if (dates !== 0) return dates.toString + ((dates > 1) ? "days" : "day");
        else return "few hours"
    }
    
    render() {
        const { isLoading, profile } = this.state;
        return (
            <div className="Profile">
                {isLoading && <Loading size='30' />}
                <Header title="Profile" />
                {!isLoading && <div className="maincontent profile">
                    <div className="top_content">
                        <div className="avatar_profile">
                            <img src={localStorage.photoURL} alt="" width={200} height={200} style={{border: '3px solid white'}} />
                        </div>
                        <div style={{color: '#f0f0f0'}}>
                            <span className="displayName_profile">{profile.name}</span>
                            <span className="username_profile">{localStorage.username}</span>
                            <a className="github_link" title="GitHub" href={profile.html_url} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-github" style={{color: '#0d9e5b', paddingLeft: '10px', width: '35px', height: '35px'}}></i>
                            </a>
                            <div className="created_time">
                                <i className="fas fa-clock" style={{paddingRight: '10px'}}></i>
                                Created {this.getCreatedTime()} ago
                            </div>
                            <div className="bio_profile">
                                <div className="bio_title">Bio</div>
                                <div className="bio_content" id="bio_content">{(profile.bio === "null") ? "" : profile.bio}</div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom_content">
                        <div className="profile_items">
                            {profile.company && profile.company !=="null" && <div className="profile_item">
                                <i className="fas fa-users" style={{color: '#0d9e5b', width: '20px', height: '20px', paddingRight: '10px'}}></i>
                                <span>{profile.company}</span>
                            </div>}
                            {profile.location && profile.location !=="null" && <div className="profile_item">
                                <i className="fas fa-map-marker-alt" style={{color: '#0d9e5b', width: '20px', height: '20px', paddingRight: '10px'}}></i>
                                <span>{profile.location}</span>
                            </div>}
                            {profile.email && profile.email !=="null" && <div className="profile_item">
                                <i className="fas fa-envelope" style={{color: '#0d9e5b', width: '20px', height: '20px', paddingRight: '10px'}}></i>
                                <a title="Send Mail" href={"mailto: " + profile.email}>{profile.email}</a>
                            </div>}
                            {profile.blog && profile.blog !=="null" && <div className="profile_item">
                                <i className="fas fa-globe-asia" style={{color: '#0d9e5b', width: '20px', height: '20px', paddingRight: '10px'}}></i>
                                <a title="Website" href={(profile.blog.includes("https://")||profile.blog.includes("http://"))? profile.blog : "https://" + profile.blog} target="_blank" rel="noopener noreferrer">{profile.blog}</a>
                            </div>}
                        </div>
                    </div>
                </div>}
                <div className="footer">
                    <span>v1.0</span>
                    <span>© 2019 Web Development Platform | Develop by HoiThanhDucChuaTroi</span>
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);