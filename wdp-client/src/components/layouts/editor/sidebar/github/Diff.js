import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {DiffEditor} from '@monaco-editor/react';

class Diff extends Component{
    constructor(props) {
        super(props);
        const location = this.props.location;
        this.state = {
            modifiedCursor: (location.state && location.state.modifiedCursor) ? location.state.modifiedCursor : ''
        }
    }

    componentDidMount() {
        this.props.history.listen((location) => this.setState({
            modifiedCursor: (location.state && location.state.modifiedCursor) ? location.state.modifiedCursor : this.state.modifiedCursor
        }))
    }
    
    render() {
        return (
             <div className="Diff" style = {{position: 'absolute', display: 'none', backgroundColor: '#202124', left: '255px', width: 'calc(100vw - 255px)', height: '100%', zIndex: '999'}}>
                <div className="header_tab">
                    <div className="header_tab_element">Test (Working Tree)</div>
                </div>
                <DiffEditor
                    original = "<h1>Hello Thinh</h1>"
                    modified = "<h1>Hello Thinh modified</h1>"
                    language = "html"
                    theme = "dark"
                    width = "100%"
                    height = "calc(100% - 30px)"
                />
             </div>
        );
    }
}

export default withRouter(Diff);