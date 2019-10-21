import React, { Component } from 'react';
import Menu, { SubMenu, MenuItem, MenuItemGroup } from 'rc-menu';
import { withRouter } from 'react-router-dom';
import './css/menubar.css'

class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: "none"
        }
    }
    setActiveItem = (name) => {
        this.setState({
            ...this.state,
            activeItem: name
        })
    }
    file() {
        var x = document.getElementById("file_items");
        if (this.state.activeItem !== "file") {
            this.setActiveItem("file");
            x.className += " open";
            document.getElementById("edit_items").className = "menu_items";
        }
        else {
            this.setActiveItem("none");
            x.className = "menu_items";
        }
    }
    edit() {
        var x = document.getElementById("edit_items");
        if (this.state.activeItem !== "edit") {
            this.setActiveItem("edit");
            x.className += " open";
            document.getElementById("file_items").className = "menu_items";
        }
        else {
            this.setActiveItem("none");
            x.className = "menu_items";
        }
    }
    render() {
        return (
            <div className="menubar">
                <div className="menu_items" id="file_items" onClick={() => this.file()}>
                    File
                    {this.state.activeItem === "file" && <div className="items_container">
                        <div className="item_holder 1">New File</div>
                        <div className="item_holder 1">New Project</div>
                        <div className="item_holder 1">Open File</div>
                        <div className="item_holder 1">Open Project</div>
                        <div className="item_holder 1">Save</div>
                        <div className="item_holder 1">Export to zip</div>
                    </div>}
                </div>
                <div className="menu_items" id="edit_items" onClick={() => this.edit()}>
                    Edit
                    {this.state.activeItem === "edit" && <div className="items_container">
                        Hello
                    </div>}
                </div>
                <div className="menu_items">Selection</div>
                <div className="menu_items">View</div>
                <div className="menu_items">Go</div>
                <div className="menu_items">Debug</div>
                <div className="menu_items">Terminal</div>
                <div className="menu_items">Help</div>
            </div>
        );
    }
}

export default withRouter(MenuBar);