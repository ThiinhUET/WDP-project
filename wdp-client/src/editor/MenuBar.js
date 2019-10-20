import React, { Component } from 'react';
import Menu, { SubMenu, MenuItem, MenuItemGroup } from 'rc-menu';
import { withRouter } from 'react-router-dom';
import './css/menubar.css'

class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFileAppear: false,
            isEditAppear: false
        }
    }
    changeFileAppearance = () => {
        this.setState({
            ...this.state,
            isFileAppear: !this.state.isFileAppear,
            isEditAppear: false
        })
    }
    changeEditAppearance = () => {
        this.setState({
            ...this.state,
            isEditAppear: !this.state.isEditAppear,
            isFileAppear: false
        })
    }
    render() {
        return (
            <div className="menubar">
                <div className="menu_item" onClick={this.changeFileAppearance}>
                    File
                    {this.state.isFileAppear && <div className="item_holder">
                        Hello
                    </div>}
                </div>
                <div className="menu_item" onClick={this.changeEditAppearance}>
                    Edit
                    {this.state.isEditAppear && <div className="item_holder">
                        Hello
                    </div>}
                </div>
                <div className="menu_item">Selection</div>
                <div className="menu_item">View</div>
                <div className="menu_item">Go</div>
                <div className="menu_item">Debug</div>
                <div className="menu_item">Terminal</div>
                <div className="menu_item">Help</div>
            </div>
        );
    }
}

export default withRouter(MenuBar);