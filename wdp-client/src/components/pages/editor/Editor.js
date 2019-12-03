import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Header from '../../layouts/header/Header';
import SideBar from '../../layouts/editor/sidebar/SideBar';
import Loading from '../../layouts/loading/Loading';
import ResultFrame from '../../layouts/editor/resultframe/ResultFrame';
import CodeEditor from '../../layouts/editor/codeeditor/CodeEditor';
import Console from '../../layouts/editor/console/Console';
import Diff from '../../layouts/editor/sidebar/github/Diff';

import { defaultdata } from '../../layouts/editor/sidebar/data';
import '@fortawesome/fontawesome-free/js/all';
import './style.css';


class Editor extends Component {
    constructor(props) {
        super(props);
        const location = this.props.location;
        this.state = {
            data: (location.state && location.state.data)? location.state.data : defaultdata,
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

    render() {
        const { isLoading } = this.state;
        return (
            <div className="Editor">
                { isLoading && <Loading size='30' /> }
                <Header title="Editor" />
                <div className="maincontent editor">
                    <div className="editor_pane vertical pane1" >
                        <SideBar />
                    </div>
                    <div className="resizer vertical"></div>
                    <div className="editor_pane vertical pane2" id="pane2">
                        <Diff />
                        <CodeEditor/>
                    </div>
                    <div className="resizer vertical"></div>
                    <div className="editor_pane vertical pane3" id="pane3">
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
