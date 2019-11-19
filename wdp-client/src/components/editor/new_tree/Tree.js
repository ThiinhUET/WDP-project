import React, { Fragment, PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { includes } from 'lodash';
import { Treebeard, decorators } from 'react-treebeard';
import { Div } from 'react-treebeard/dist/components/common';
import data from './data';
import defaultStyles from './defaultStyles'
import * as filters from './filter';
import Header from './Header';
import Toggle from './Toggle';
import NodeViewer from './NodeViewer';
import axios from 'axios';
import Loading from '../../loading/Loading';

class NewTree extends PureComponent {
    constructor(props) {
        super(props);
        window.data = this.state;
        this.state = {
            data: (this.props.location.state)? this.props.location.state.data : data,
            err: false,
            loading: false,
        };
        console.log(this.props);
        this.onToggle = this.onToggle.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('accessToken');
        let login = localStorage.getItem('username');
        let repo = localStorage.getItem('projectName');
        
        if (this.state.data === data) {
            if (localStorage.projectName) this.setState({loading: true});
            
            axios.post('http://localhost:8080/git/user-listfile', {
                accessToken: accessToken,
                login: login, 
                repo: repo
            }).then((res) => {
                this.setState({ data: res.data.filetree, loading: false});
                this.props.history.push({
                    pathname: this.props.location.pathname,
                    state: {data: this.state.data},
                })
            })
        }
    }

    onToggle(node, toggled) {
        const { cursor, data } = this.state;
        if (cursor) {
            this.setState(() => ({ cursor, active: false }));
        }

        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }

        this.setState(() => ({ cursor: node, data: Object.assign({}, data) }));
    }

    onSelect(node) {
        const { cursor, data } = this.state;

        if (cursor) {
            this.setState(() => ({ cursor, active: false }));
            if (!includes(cursor.children, node)) {
                cursor.toggled = false;
                cursor.selected = false;
            }
        }

        node.selected = true;
        this.setState(() => ({ cursor: node, data: Object.assign({}, data) }));
    }

    onFilterMouseUp({ target: { value } }) {
        const filter = value.trim();
        if (!filter) {
            return this.setState(() => ({ data }));
        }
        let filtered = filters.filterTree(data, filter);
        filtered = filters.expandFilteredNodes(filtered, filter);
        this.setState(() => ({ data: filtered }));
    }

    addErr() {
        document.getElementById("addFile").style.borderColor = '#dd4b39';
        document.getElementById("addFile").focus();
    }

    addBoxClear() {
        document.getElementById("addFile").style.borderColor = 'gray';
        document.getElementById("addFile").value = null;
        this.setState({err: true});
    }

    addData(data, path, type) {
        if (path[0] === '/') {
            let index0 = path.lastIndexOf('/');
            let path0 = path.slice(0, index0);
            let name = path.slice(index0 + 1);
            if (path.includes(data.path) && data.children) {
                let isExist = -1;
                if (path0 === data.path) {
                    for (let i = 0; i < data.children.length; i ++)
                        if (data.children[i].name === name) isExist = i;
                    switch (type) {
                        case "delete":
                            if (isExist > -1) {
                                data.children.splice(isExist, 1);
                                this.addBoxClear();
                            }
                            break;
                        case "folder":
                            if (isExist === -1) {
                                data.children.push({ path: path, type: type, name: name, toggled: false, content: '', children: [] });
                                this.addBoxClear();
                            }
                            break;
                        case "file":
                            if (isExist === -1) {
                                let newType;
                                if (!name.includes('.')) newType = 'file';
                                else {
                                    let nameEx = name.split('.');
                                    newType = nameEx[nameEx.length - 1];
                                }
                                data.children.push({ path: path, type: newType, name: name, toggled: false, content: '' });
                                this.addBoxClear();
                            }
                            break;
                    }
                }
                else for (let i = 0; i < data.children.length; i ++) this.addData(data.children[i], path, type);
            }
        }
        this.setState(() => ({ data: Object.assign({}, data) }));
    } 

    render() {
        const { data, cursor } = this.state;
        return (
            <Fragment>
                <Div style={defaultStyles.searchBox}>
                    <Div className="input-group" style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="input-group-addon" style={{ color: '#aeafad', padding: '5px' }}>
                            <i className="fa fa-search" />
                        </span>
                        <input
                            className="form-control"
                            onKeyUp={this.onFilterMouseUp.bind(this)}
                            placeholder="Search the file..."
                            type="text"
                            style={{ outline: 'none', padding: '0px 5px', width: '75%' }}
                        />
                    </Div>
                </Div>
                <Div style={defaultStyles.addFileBox}>
                    <input 
                        id="addFile"
                        title="Type path of file or folder and click the button to add or delete"
                        autoComplete="off"
                        placeholder="Path start with '/'..."
                        type="text"
                        onKeyDown={() => {document.getElementById("addFile").style.borderColor = 'gray'}}
                        style={defaultStyles.addFileBox.input}
                    />
                    <span title="Add file" style={defaultStyles.addFileBox.icon_holder}
                        onClick={() => {
                            this.setState({err: false});
                            this.addData(this.state.data, document.getElementById('addFile').value, 'file')
                            setTimeout(() => {if (!this.state.err) this.addErr()}, 10);
                        }}
                    >
                        <span style={{position: 'absolute', transform: 'translateX(-50%) translateY(-60%)'}}>+</span>
                        <i className="fas fa-file" style={defaultStyles.addFileBox.icon}></i>
                    </span>
                    <span title="Add folder" style={defaultStyles.addFileBox.icon_holder}
                        onClick={() => {
                            this.setState({err: false});
                            this.addData(this.state.data, document.getElementById('addFile').value, 'folder');
                            setTimeout(() => {if (!this.state.err) this.addErr()}, 10);
                        }}
                    >
                        <span style={{position: 'absolute', transform: 'translateX(-70%) translateY(-60%)'}}>+</span>
                        <i className="fas fa-folder" style={defaultStyles.addFileBox.icon}></i>
                    </span>
                    <span title="Delete file/folder" style={defaultStyles.addFileBox.icon_holder}
                        onClick={() => {
                            this.setState({err: false});
                            this.addData(this.state.data, document.getElementById('addFile').value, 'delete')
                            setTimeout(() => {if (!this.state.err) this.addErr()}, 10);
                        }}
                    >
                        <i className="fas fa-minus-square" style={defaultStyles.addFileBox.icon}></i>
                    </span>
                </Div>
                <Div style={defaultStyles.component}>
                    {this.state.loading && <Loading size='20'/>}
                    <Treebeard
                        style={defaultStyles}
                        data={data}
                        onToggle={this.onToggle}
                        onSelect={this.onSelect}
                        decorators={{ ...decorators, Toggle, Header }}
                        customStyles={{
                            header: {
                                title: {
                                    color: 'red'
                                }
                            }
                        }}
                    />
                </Div>
                <NodeViewer node={cursor} />
            </Fragment>
        );
    }
}

export default withRouter(NewTree);
