import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './css/codemirror.css';
import SideBar from './SideBar';
import NewEditor from './NewEditor';
import UserInfo from '../user-info/UserInfo';
import '@fortawesome/fontawesome-free/js/all';
import logo from '../../assets/logo.png';
import './css/editor.css';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.location.state,
            projectName: this.props.location.pathname.split('/')[2]
        }
    }

    componentDidMount(){
        localStorage.setItem("projectName", this.state.projectName);
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
                <div className="maincontent" style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'row',
                    height: 'calc(94vh - 10px)'}}>
                    <SideBar />
                    <NewEditor valueCode = {this.state.code} />
                    
                </div>
            </div>
        );
    }
}

export default withRouter(Editor);
