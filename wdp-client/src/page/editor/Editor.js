import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import SideBar from '../../components/editor/sidebar/SideBar';
import UserInfo from '../../components/user-info/UserInfo';
import Loading from '../../components/loading/Loading';
import ResultFrame from '../../components/editor/resultframe/ResultFrame';
import CodeEditor from '../../components/editor/codeeditor/CodeEditor';
import Console from '../../components/editor/console/Console';

import logo from '../../assets/logo.png';
import data from '../../components/editor/sidebar/new_tree/data';
import '@fortawesome/fontawesome-free/js/all';
import './style.css';

class Editor extends Component {
    constructor(props) {
        super(props);
        const location = this.props.location;
        this.state = {
            data: (location.state && location.state.data)? location.state.data : data,
            cursor: (location.state && location.state.cursor)? location.state.cursor : {"content": "<!-- write your code here -->"},
            projectName: location.pathname.split('/')[2],
            isLoading: true,
        }
        setTimeout(() => this.setState({isLoading: false}), 500);
        if (location.pathname !== '/editor')
            localStorage.setItem("projectName", this.state.projectName);
        else localStorage.removeItem("projectName");
    }

    componentDidMount() {
        this.props.history.listen((location) => this.setState({
            data: (location.state && location.state.data)? location.state.data : this.state.data,
            cursor: (location.state && location.state.cursor)? location.state.cursor : {"content": "<!-- Select a file to code -->"},
        }))
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
        const { isLoading } = this.state;
        return (
            <div className="Editor">
                { isLoading && <Loading size='30' /> }
                <div className="header editor">
                    <div className="header_left">
                        <button className="homebtn" title="Home" onClick={() => this.returnHome()}>
                            <img src={logo} className="App-logo" alt="logo" width={40} height={40} />
                        </button>
                        <span className="title">Editor</span>
                    </div>
                    <div className="header_center">
                        <button style={{width: 'fit-content', padding: '0 10px', margin: '0 5px'}}>
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
                <div className="maincontent editor">
                    <div className="editor_pane vertical pane1" >
                        <SideBar />
                    </div>
                    <div className="resizer vertical"></div>
                    <div className="editor_pane vertical pane2">
                        <CodeEditor/>
                    </div>
                    <div className="resizer vertical"></div>
                    <div className="editor_pane vertical pane3">
                        <div className="editor_pane horizontal pane1" style = {{flex : '1'}}>
                            <ResultFrame />
                        </div>
                        <div className="editor_pane horizontal pane2" style = {{position : 'absolute', bottom : '0'}}>
                            <Console />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Editor);
