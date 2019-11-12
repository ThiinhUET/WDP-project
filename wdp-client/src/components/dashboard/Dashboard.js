import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import spinnerImage from '../../assets/spinner.gif';
import logo from '../../assets/logo.png';

import UserInfo from '../user-info/UserInfo';

import './style.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedElement: 'overview',
            gridTitle: 'Recent Projects'
        }
    }

    
    returnHome() {
        this.props.history.push('/home');
    }
    
    openEditor(project) {
        this.props.history.push('/editor' + project);
    }
    
    onSelect = evt => {
        let target = evt.target;
        let x = document.getElementById('overview');
        let y = document.getElementById('trash');
        if (x.contains(target)) {
            this.state.selectedElement = 'overview';
            this.setState({titleGrid: 'Recent Projects'});
            x.className += ' active';
            y.classList = 'pane1 element';
        }
        if (y.contains(target)) {
            this.state.selectedElement = 'trash';
            this.setState({titleGrid: 'Deleted Projects'});
            y.className += ' active';
            x.classList = 'pane1 element';
        }
    }
    
    render() {
        let projects = ['project1', 'project2', 'project3', 'project1', 'project2', 'project3', 'project1', 'project2', 'project3'];
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
                        <div className="pane1 container" href={this.pane1_container} onClick={(evt) => this.onSelect(evt)}>
                            <div className="pane1 element active" id="overview">
                                <i className="fas fa-th-large" style={{width: '20px', height: '20px', paddingRight: '10px'}}></i>
                                <span>Overview</span>
                            </div>
                            <div className="pane1 element" id="trash">
                                <i className="fas fa-trash" style={{width: '20px', height: '20px', paddingRight: '10px'}}></i>
                                Trash
                            </div>
                        </div>
                    </div>
                    <div className="pane vertical pane2">
                        <div className="pane2 header_container">
                            <div className="grid_title">{this.state.gridTitle}</div>
                        </div>
                        <div className="pane2 grid_container">
                            <div className="grid_element new" onClick={() => this.openEditor('')}>
                                <i className="fas fa-plus" style={{height: '6vh', width: '6vh', color: 'rgb(70,70,70)'}}></i>
                            </div>
                            {projects.map((name, idx) => (
                                <div className="grid_element project" key={idx} onClick={() => this.openEditor('/' + name)}>
                                    {name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Dashboard);