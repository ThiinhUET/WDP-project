import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import SideBar from './SideBar';
import NewEditor from './NewEditor';
import UserInfo from '../user-info/UserInfo';
import '@fortawesome/fontawesome-free/js/all';
import logo from '../../assets/logo.png';
import data from './new_tree/data';
import './css/editor.css';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: (this.props.location.state && this.props.location.state.data)? this.props.location.state.data : data,
            cursor: (this.props.location.state && this.props.location.state.cursor)? this.props.location.state.cursor : {"content": "<!-- write your code here -->"},
            code: (this.props.location.state && this.props.location.state.code)? this.props.location.state.code : '',
            projectName: this.props.location.pathname.split('/')[2]
        }
        if (this.props.location.pathname !== '/editor')
            localStorage.setItem("projectName", this.state.projectName);
        else localStorage.removeItem("projectName");
    }

    componentDidMount() {
        this.props.history.listen((location) => this.setState({
            data: (location.state && location.state.data)? location.state.data : this.state.data,
            cursor: (location.state && location.state.cursor)? location.state.cursor : {"content": "<!-- Select a file to code -->"},
            code: (location.state && location.state.code)? location.state.code : '',
        }))
    }

    updateNode(rootNode, node, content) {
        if (rootNode === node) rootNode.content = content;
        if (node.path.includes(rootNode.path) && rootNode.children)
            for (let i = 0; i < rootNode.children.length; i ++) rootNode.children[i] = this.updateNode(rootNode.children[i], node, content);
            return rootNode;
    }
    saveCode() {
        this.setState({data: this.updateNode(this.state.data, this.state.cursor, this.state.code)});
        setTimeout(() => this.props.history.push({
            pathname: this.props.location.pathname,
            state: {...this.props.location.state, data: this.state.data},
        }), 1000)
    }
    returnHome(){
        this.props.history.push('/home');
    }

    openSignIn(redirectPage) {
        this.props.history.push({
            pathname: '/signin',
            state: {redirect: redirectPage}
        });
    }
    
    render() {
      
        return (
            
            <div className="Editor">
                <div className="header" style={{margin: '0 0 7px 0'}}>
                    <div className="header_left">
                        <button className="homebtn" title="Home" onClick={() => this.returnHome()}>
                            <img src={logo} className="App-logo" alt="logo" width={40} height={40} />
                        </button>
                        <span className="title">Editor</span>
                    </div>
                    <div className="header_center">
                        <button onClick={() => this.saveCode()} style={{width: 'fit-content', padding: '0 10px', margin: '0 5px'}}>
                            <i className="fas fa-cloud" style={{width: '30px', height: '30px', paddingRight: '10px'}}></i>
                            Save
                        </button>
                        <a href="/editor" target="_blank" rel="noopener noreferrer">
                            <button style={{width: 'fit-content', padding: '0 10px', margin: '0 5px'}}>
                                <i className="far fa-plus-square" style={{width: '30px', height: '30px', paddingRight: '10px'}}></i>
                                New
                            </button>
                        </a>
                    </div>
                    <div className="header_right">
                    {!localStorage.uid && <button className="signin" onClick={() => this.openSignIn('/editor')}>Sign In</button>}
                        <UserInfo />
                    </div>
                </div>
                <div className="maincontent" style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'row',
                    height: 'calc(94vh - 10px)'}}>
                    <SideBar />
                    <NewEditor/>
                    
                </div>
            </div>
        );
    }
}

export default withRouter(Editor);
