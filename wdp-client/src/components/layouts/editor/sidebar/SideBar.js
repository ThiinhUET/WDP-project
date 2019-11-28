import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Explorer from './explorer/Explorer';
import Github from './github/Github';
import './style.css';
import Export from './export/Export';
class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeItem: "explorer"
        }
    }
    setActiveItem = (name) => {
        this.setState({
            ...this.setState,
            activeItem: name
        })
    }
    explorer() {
        var x = document.getElementById("explorer");
        if (this.state.activeItem !== "explorer") {
            this.setActiveItem("explorer");
            x.className += " open";
            document.getElementById("github").className = "icon";
            document.getElementById("export").className = "icon";
            document.getElementsByClassName("Diff")[0].style.display = "none";
            document.getElementsByClassName("Diff")[0].style.left = "255px";
            document.getElementsByClassName("Diff")[0].style.width = "calc(100vw - 255px)";
        }
        else {
            document.getElementsByClassName("Diff")[0].style.left = "55px";
            document.getElementsByClassName("Diff")[0].style.width = "calc(100vw - 55px)";
            this.setActiveItem("none");
            x.className = "icon";
        }
    }
    github() {
        var x = document.getElementById("github");
        if (this.state.activeItem !== "github") {
            this.setActiveItem("github");
            x.className += " open";
            document.getElementById("explorer").className = "icon";
            document.getElementById("export").className = "icon";
            document.getElementsByClassName("Diff")[0].style.display = "block";
            document.getElementsByClassName("Diff")[0].style.left = "255px";
            document.getElementsByClassName("Diff")[0].style.width = "calc(100vw - 255px)";
        }
        else {
            document.getElementsByClassName("Diff")[0].style.left = "55px";
            document.getElementsByClassName("Diff")[0].style.width = "calc(100vw - 55px)";
            this.setActiveItem("none");
            x.className = "icon";
        }
        
    }

    download() {
        var x = document.getElementById("export");
        if (this.state.activeItem !== "export") {
            this.setActiveItem("export");
            x.className += " open";
            document.getElementById("explorer").className = "icon";
            document.getElementById("github").className = "icon";
            document.getElementsByClassName("Diff")[0].style.display = "none";
            document.getElementsByClassName("Diff")[0].style.left = "255px";
            document.getElementsByClassName("Diff")[0].style.width = "calc(100vw - 255px)";
        }
        else {
            document.getElementsByClassName("Diff")[0].style.left = "55px";
            document.getElementsByClassName("Diff")[0].style.width = "calc(100vw - 55px)";
            this.setActiveItem("none");
            x.className = "icon";
        }
        
    }
    render() {
        let username = localStorage.getItem('username');
        let projectName = localStorage.getItem('projectName');
        
        return (
            <div className="sidebar">
                <div className="sbar_icons">
                    <div className="icon open" id="explorer" title="Explorer" onClick = {() => this.explorer()}>
                        <i className="fas fa-file" id="icon" style={{width: '25px', height: '25px', margin: '10px auto'}}></i>
                    </div>
                    <div className="icon" id="github" title="GitHub" onClick = {() => this.github()}>
                        <i className="fab fa-github" style={{width: '25px', height: '25px', margin: '10px auto'}}></i>
                    </div>
                    <div className="icon" id="export" title="Export" onClick = {() => this.download()}>
                        <i className="fas fa-download" style={{width: '25px', height: '25px', margin: '10px auto'}}></i>
                    </div>
                </div>
                <div className="sbar_content">
                    {this.state.activeItem === "explorer" && <Explorer />}
                    {this.state.activeItem === "github" && <Github />}
                    {this.state.activeItem === "export" && <Export />}
                </div>
            </div>
        );
    }
}

export default withRouter(SideBar);