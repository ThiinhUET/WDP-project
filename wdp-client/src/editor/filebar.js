import React, { Component } from 'react';
import Menu, { SubMenu, MenuItem, MenuItemGroup } from 'rc-menu';
import { withRouter } from 'react-router-dom';
import './css/filebar.css'

class FileBar extends Component {
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
            <div className="filebar">
                <div className="file-item" onClick={this.changeFileAppearance}>
                    File
                    {this.state.isFileAppear && <div className="dropdown" style={{position: 'absolute', color: 'white', fontSize: '20pt', top: '50px',zIndex: '2', borderStyle: 'solid', backgroundColor: 'black', left: '0'}}>
                        Hello
                    </div>}
                </div>
                <div className="file-item" onClick={this.changeEditAppearance}>
                    Edit
                    {this.state.isEditAppear && <div className="dropdown" style={{position: 'absolute', color: 'white', fontSize: '20pt', top: '50px',zIndex: '2', borderStyle: 'solid', backgroundColor: 'black', left: '0'}}>
                        Hello
                    </div>}
                </div>
                <div className="file-item">Selection</div>
                <div className="file-item">View</div>
                <div className="file-item">Go</div>
                <div className="file-item">Debug</div>
                <div className="file-item">Terminal</div>
                <div className="file-item">Help</div>
            </div>
        );
    }
}

export default withRouter(FileBar);