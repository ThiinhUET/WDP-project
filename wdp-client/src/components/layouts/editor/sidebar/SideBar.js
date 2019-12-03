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
            document.getElementById("github").className = "sbar_icon";
            document.getElementById("export").className = "sbar_icon";
            document.getElementsByClassName("Diff")[0].style.display = "none";
            document.getElementById("pane2").style.flex = "1";
            document.getElementById("pane3").style.flex = "1";
        }
        else {
            this.setActiveItem("none");
            x.className = "sbar_icon";
        }
    }
    github() {
        var x = document.getElementById("github");
        if (this.state.activeItem !== "github") {
            this.setActiveItem("github");
            x.className += " open";
            document.getElementById("explorer").className = "sbar_icon";
            document.getElementById("export").className = "sbar_icon";
            document.getElementsByClassName("Diff")[0].style.display = "block";
            document.getElementById("pane2").style.flex = "2";
            document.getElementById("pane3").style.flex = "1";
        }
        else {
            this.setActiveItem("none");
            x.className = "sbar_icon";
        }
    }
    export() {
        var x = document.getElementById("export");
        if (this.state.activeItem !== "export") {
            this.setActiveItem("export");
            x.className += " open";
            document.getElementById("explorer").className = "sbar_icon";
            document.getElementById("github").className = "sbar_icon";
            document.getElementsByClassName("Diff")[0].style.display = "none";
            document.getElementById("pane2").style.flex = "1";
            document.getElementById("pane3").style.flex = "1";
        }
        else {
            this.setActiveItem("none");
            x.className = "sbar_icon";
        }
    }
    help() {
        window.open(
            '/help',
            'Help',
            "width=500, height=500"
        );          
    }
    render() {
        return (
            <div className="sidebar">
                <div className="sbar_iconContainer">
                    <div className="sbar_icon open" id="explorer" title="Explorer" onClick = {() => this.explorer()}>
                        <i className="fas fa-file" id="icon" style={{width: '25px', height: '25px', margin: '10px auto'}}></i>
                    </div>
                    <div className="sbar_icon" id="github" title="GitHub" onClick = {() => this.github()}>
                        <i className="fab fa-github" style={{width: '25px', height: '25px', margin: '10px auto'}}></i>
                    </div>
                    <div className="sbar_icon" id="export" title="Export" onClick = {() => this.export()}>
                        <i className="fas fa-download" style={{width: '25px', height: '25px', margin: '10px auto'}}></i>
                    </div>
                    <div className="sbar_help_icon" id="help" title="Help" onClick = {() => this.help()}>
                        <i className="fas fa-question-circle" style={{width: '25px', height: '25px', margin: '10px auto'}}></i>
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