import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import spinnerImage from '../../assets/spinner.gif';
import logo from '../../assets/logo.png';

import UserInfo from '../user-info/UserInfo';

import './style.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        
    }

    returnHome() {
        this.props.history.push('/home');
    }
    
    openEditor(project) {
        this.props.history.push({
            pathname: '/editor/' + project,
            state: {hi: project}
        });
    }
    
    render() {
        return (
            <div className="Dashboard">
                <div className="header">
                    <div className="header_left">
                        <button className="homebtn" title="Home" onClick={() => this.returnHome()}>
                            <img src={logo} className="App-logo" alt="logo" width={40} height={40} />
                        </button>
                        <span className="title">Dashboard</span>
                    </div>
                    <div className="header_right">
                        <UserInfo />
                    </div>
                </div>
                <div className="maincontent" style={{width: '100%', height: '94vh'}}>
                    <div className="pane vertical pane1">
                        <i className="fas fa-th-large" style={{color: '#f0f0f0', width: '20px', height: '20px'}}></i>
                    </div>
                    <div className="pane vertical pane2">
                        <div className="pane2 header_container">

                        </div>
                        <div className="pane2 grid_container">
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Dashboard);