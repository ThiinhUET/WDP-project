import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './css/menubar.css'

class MenuBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="menubar">
                <div className="menu_items">
                    File
                    <div className="items_container">
                        <div className="item_holder">New File</div>
                        <div className="item_holder">New Project</div>
                        <div className="item_divider"></div>
                        <div className="item_holder">
                            Open File
                            <input type="file" style= {{opacity: "0.0", position: "absolute", top: "0", left: "0", bottom: "0", right: "0", width: "100%", height:"100%"}} webkitdirectory mozdirectory directory/>
                        </div>
                        <div className="item_holder">Open Project</div>
                        <div className="item_divider"></div>
                        <div className="item_holder">Save</div>
                        <div className="item_holder">Export to zip</div>
                    </div>
                </div>
                <div className="menu_items">
                    Edit
                    <div className="items_container">
                        <div className="item_holder">Undo</div>
                        <div className="item_holder">Redo</div>
                        <div className="item_divider"></div>
                        <div className="item_holder">Cut</div>
                        <div className="item_holder">Copy</div>
                        <div className="item_divider"></div>
                        <div className="item_holder">Find</div>
                        <div className="item_holder">Replace</div>
                    </div>
                </div>
                <div className="menu_items">
                    Selection
                    <div className="items_container">
                        <div className="item_holder">Select All</div>
                        <div className="item_holder">Un Select All</div>
                    </div>
                </div>
                <div className="menu_items">
                    View
                    <div className="items_container">
                        <div className="item_holder">Command Palette</div>
                    </div>
                </div>
                <div className="menu_items">
                    Go
                    <div className="items_container">
                        <div className="item_holder">
                            Switch Editor
                            <span>
                                <i className="fas fa-chevron-right"></i>
                            </span>
                            <div className="items_container_2">
                                <div className="item_holder">Next Editor</div>
                                <div className="item_holder">Previous Editor</div>
                            </div>
                        </div>
                        <div className="item_divider"></div>
                        <div className="item_holder">Go to File..</div>
                    </div>
                </div>
                <div className="menu_items">
                    Terminal
                    <div className="items_container">
                        <div className="item_holder">New Terminal</div>
                        <div className="item_divider"></div>
                        <div className="item_holder">Open Terminal</div>
                    </div>
                </div>
                <div className="menu_items">
                    Help
                    <div className="items_container">
                        <div className="item_holder">About</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MenuBar);