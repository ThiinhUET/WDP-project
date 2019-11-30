import React, { Component } from 'react';
import { Div } from 'react-treebeard/dist/components/common'
import { withRouter } from 'react-router-dom';
import defaultStyles from '../defaultStyles';
import { defaultdata } from '../data';
import { dataFlow } from '../../../../../services';

class CreateFile extends Component {
    constructor(props) {
        super(props);
        const location = this.props.location;
        this.state = {
            data: (location.state && location.state.data)? location.state.data : defaultdata,
            err: false
        };
    }

    componentDidMount() {
        this.dataFlowSub = dataFlow.subscribe((value) => this.setState({ data: value }));
    }

    componentWillUnmount() {
        if (this.dataFlowSub) {
            this.dataFlowSub.unsubscribe();
            this.dataFlowSub = null;
        }
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
            let path0 = path.slice(0, index0 + 1);
            let name = path.slice(index0 + 1);
            if (path.includes(data.path) && data.children) {
                let isExist = -1;
                let indexfile = 0;
                let indexfolder = 0;
                if (path0 === data.path) {
                    for (let i = 0; i < data.children.length; i ++) {
                        if (data.children[i].name === name) isExist = i;
                        if (data.children[i].type === 'folder' && data.children[i].name.toLowerCase() < name.toLowerCase()) indexfolder = i + 1;
                        if (data.children[i].type !== 'folder' && data.children[i].name.toLowerCase() < name.toLowerCase()) indexfile = i + 1;
                    }
                    switch (type) {
                        case "delete":
                            if (isExist > -1) {
                                data.children.splice(isExist, 1);
                                this.addBoxClear();
                            }
                            break;
                        case "folder":
                            if (isExist === -1) {
                                data.children.splice(indexfolder, 0, { path: path + '/', type: type, name: name, toggled: false, content: '', children: [] });
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
                                    if (newType === 'js') newType = 'javascript';
                                }
                                data.children.splice(indexfile, 0, { path: path, type: newType, name: name, toggled: false, content: '', oldcontent: '' });
                                this.addBoxClear();
                            }
                            break;
                        default: break;
                    }
                }
                else for (let i = 0; i < data.children.length; i ++) this.addData(data.children[i], path, type);
            }
        }
        this.setState(() => ({ data: Object.assign({}, data) }));
        this.props.history.push({
            state: {...this.props.location.state, data: data}
        })
    } 
    
    render() {
        const { data } = this.state;
        return (
            <Div style={defaultStyles.addFileBox}>
                <input 
                    id="addFile"
                    title="Type path of file or folder and click the button to add or delete"
                    autoComplete="off"
                    placeholder="Path start with '/'..."
                    spellCheck="false"
                    type="text"
                    onKeyDown={() => {document.getElementById("addFile").style.borderColor = 'gray'}}
                    style={defaultStyles.addFileBox.input}
                />
                <span title="Add file" style={defaultStyles.addFileBox.icon_holder}
                    onClick={() => {
                        this.setState({err: false});
                        this.addData(data, document.getElementById('addFile').value, 'file');
                        setTimeout(() => {if (!this.state.err) this.addErr()}, 200);
                    }}
                >
                    <span style={{position: 'absolute', transform: 'translateX(-50%) translateY(-60%)'}}>+</span>
                    <i className="fas fa-file" style={defaultStyles.addFileBox.icon}></i>
                </span>
                <span title="Add folder" style={defaultStyles.addFileBox.icon_holder}
                    onClick={() => {
                        this.setState({err: false});
                        this.addData(data, document.getElementById('addFile').value, 'folder');
                        setTimeout(() => {if (!this.state.err) this.addErr()}, 10);
                    }}
                >
                    <span style={{position: 'absolute', transform: 'translateX(-70%) translateY(-60%)'}}>+</span>
                    <i className="fas fa-folder" style={defaultStyles.addFileBox.icon}></i>
                </span>
                <span title="Delete file/folder" style={defaultStyles.addFileBox.icon_holder}
                    onClick={() => {
                        this.setState({err: false});
                        this.addData(data, document.getElementById('addFile').value, 'delete')
                        setTimeout(() => {if (!this.state.err) this.addErr()}, 10);
                    }}
                >
                    <i className="fas fa-minus-square" style={defaultStyles.addFileBox.icon}></i>
                </span>
            </Div>
        );
    }
}

export default withRouter(CreateFile);