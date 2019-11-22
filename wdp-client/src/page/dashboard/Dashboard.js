import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import logo from '../../assets/logo.png';

import UserInfo from '../../components/user-info/UserInfo';

import './style.css';
import Loading from '../../components/loading/Loading';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedElement: 'overview',
            gridTitle: 'Recent Projects',
            repositories : [],
            isLoading: true
        }
        setTimeout(() => this.setState({isLoading: false}), 500);
    }

    componentDidMount(){
        let repos = localStorage.getItem('repositories').split(',');
        this.setState({repositories : repos});
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
            this.setState({gridTitle: 'Recent Projects', selectedElement: 'overview'});
            x.className += ' active';
            y.className = 'dashboard_pane1 element';
            document.getElementById("recent_projects").style.display = "grid";
            document.getElementById("deleted_projects").style.display = "none";
        }
        if (y.contains(target)) {
            this.setState({gridTitle: 'Deleted Projects', selectedElement: 'trash'});
            y.className += ' active';
            x.className = 'dashboard_pane1 element';
            document.getElementById("recent_projects").style.display = "none";
            document.getElementById("deleted_projects").style.display = "grid";
        }
    }
    
    render() {
        const { repositories, isLoading, gridTitle } = this.state;
        return (
            <div className="Dashboard">
                { isLoading && <Loading size='30' /> }
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
                <div className="maincontent dashboard">
                    <div className="dashboard_pane vertical dashboard_pane1">
                        <div className="dashboard_pane1 container" onClick={(evt) => this.onSelect(evt)}>
                            <div style={{width: '100%', height: '5px', backgroundColor: '#1e1e1e'}}></div>
                            <div className="dashboard_pane1 element active" id="overview">
                                <i className="fas fa-th-large" style={{width: '20px', height: '20px', paddingRight: '10px'}}></i>
                                <span>Overview</span>
                            </div>
                            <div className="dashboard_pane1 element" id="trash">
                                <i className="fas fa-trash" style={{width: '20px', height: '20px', paddingRight: '10px'}}></i>
                                Trash
                            </div>
                        </div>
                    </div>
                    <div className="dashboard_pane vertical dashboard_pane2">
                        <div className="dashboard_pane2 header_container">
                            <div className="grid_title">{gridTitle}</div>
                        </div>
                        <div className="dashboard_pane2 grid_container" id="recent_projects">
                            <div className="grid_element new" onClick={() => this.openEditor('')}>
                                <i className="fas fa-plus" style={{height: '6vh', width: '6vh', color: '#0d9e5bbf'}}></i>
                            </div>
                            {repositories.map((name, idx) => (
                                <div className="grid_element project" key={idx} onDoubleClick={() => this.openEditor('/' + name)}>
                                    <div className="project_image"><i className="fas fa-code" style={{width: '60px', height: '60px', color: 'gray'}}></i></div>
                                    <div className="project_name">
                                        {name}
                                        <span className="project_icon">
                                            <i className="fas fa-ellipsis-v" style={{height: '14px'}}></i>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="dashboard_pane2 grid_container" id="deleted_projects">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Dashboard);