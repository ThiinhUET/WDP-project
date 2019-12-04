import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Loading from '../../layouts/loading/Loading';
import Header from '../../layouts/header/Header';
import Database from '../../common/firebase/Database'

import './style.css';

const database = new Database();

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedElement: 'overview',
            gridTitle: 'Recent Projects',
            repositories : [],
            trashRepositories: [],
            isLoading: true,
            isDeleting: false
        }
    }
    
    async componentDidMount(){
        let gitData = await database.readData(localStorage.username);
        this.setState({
            repositories : gitData.repositories || [],
            trashRepositories: gitData.trashRepositories || [],
            isLoading: false
        });
    }

    openEditor(project) {
        window.open('/editor' + project, '_self');  
    }
    openEditorInNewTab(project) {
        window.open('/editor' + project, '_blank');          
    }
    moveToTrash(project, idx) {
        let newRepos = this.state.repositories;
        newRepos.splice(idx, 1);
        this.setState({
            repositories: newRepos,
            trashRepositories : [project, ...this.state.trashRepositories]
        });
        database.writeData(localStorage.username,
        {
            repositories: newRepos,
            trashRepositories: [project, ...this.state.trashRepositories]
        });
        localStorage.setItem('repositories', newRepos);
    }
    restore(project, idx) {
        let newTrashRepos = this.state.trashRepositories;
        newTrashRepos.splice(idx, 1);
        this.setState({
            repositories: [project, ...this.state.repositories],
            trashRepositories : newTrashRepos
        });
        database.writeData(localStorage.username,
        {
            repositories: [project, ...this.state.repositories],
            trashRepositories: newTrashRepos
        });
        localStorage.setItem('repositories', [project, ...this.state.repositories]);
    }
    delete(name, idx) {
        let userName = localStorage.username;
        let accessToken = localStorage.accessToken;
        this.setState({isDeleting: true});
        axios.delete('https://api.github.com/repos/' + userName + '/' + name, {
            headers: {'Authorization': 'token ' + accessToken}
        }).then(() => {
            let newTrashRepos = this.state.trashRepositories;
            newTrashRepos.splice(idx, 1);
            this.setState({ trashRepositories : newTrashRepos });
            database.writeData(userName, {trashRepositories: newTrashRepos});
            this.setState({isDeleting: false});
        }).catch(err => console.log(err));
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

    openProjectOptions = (evt, title) => {
        let optionsContainer = evt.currentTarget.children[1];
        if (optionsContainer.style.display === 'none') {
            optionsContainer.style.display = 'block';
            let gridContainer = document.getElementById(title);
            let gridElement = optionsContainer.offsetParent.offsetParent;
            if (optionsContainer.offsetParent.offsetHeight + optionsContainer.offsetParent.offsetTop + gridElement.offsetTop - gridContainer.scrollTop + optionsContainer.offsetHeight > gridContainer.offsetHeight)
                optionsContainer.style.bottom = '18px';
            else optionsContainer.style.bottom = '';
            if (gridElement.offsetLeft >= gridElement.offsetParent.offsetWidth * 2 / 3) optionsContainer.style.right = '0';
        }
        else {
            optionsContainer.style.display = 'none';
        }
    }
    
    render() {
        const { repositories, trashRepositories, isLoading, isDeleting, gridTitle } = this.state;
        return (
            <div className="Dashboard">
                { isLoading && <Loading size='30' /> }
                <Header title="Dashboard" />
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
                                        <span className="project_icon" onClick={(evt) => this.openProjectOptions(evt, "recent_projects")}>
                                            <i className="fas fa-ellipsis-v" style={{height: '14px', width: '14px'}}></i>
                                            <div className="projectOptions_container" style={{display: 'none'}}>
                                                <div className="projectOptions_item" onClick={() => this.openEditor('/' + name)}>Open</div>
                                                <div className="projectOptions_row_divider"></div>
                                                <div className="projectOptions_item" onClick={() => this.openEditorInNewTab('/' + name)}>Open in new tab</div>
                                                <div className="projectOptions_row_divider"></div>
                                                <div className="projectOptions_item" onClick={() => this.moveToTrash(name, idx)}>Move to Trash</div>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="dashboard_pane2 grid_container" id="deleted_projects">
                            {isDeleting && <Loading size='25'/>}
                            {trashRepositories.map((name, idx) => (
                                <div className="grid_element project" key={idx}>
                                    <div className="project_image"><i className="fas fa-code" style={{width: '60px', height: '60px', color: 'gray'}}></i></div>
                                    <div className="project_name">
                                        {name}
                                        <span className="project_icon" onClick={(evt) => this.openProjectOptions(evt, "deleted_projects")}>
                                            <i className="fas fa-ellipsis-v" style={{height: '14px'}}></i>
                                            <div className="projectOptions_container" style={{display: 'none'}}>
                                                <div className="projectOptions_item" onClick={() => this.restore(name, idx)}>Restore</div>
                                                <div className="projectOptions_row_divider"></div>
                                                <div className="projectOptions_item" onClick={() => this.delete(name, idx)}>Delete</div>
                                            </div>
                                        </span>
                                    </div>
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