import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {DiffEditor} from '@monaco-editor/react';

class Diff extends Component{
    constructor(props) {
        super(props);
        const location = this.props.location;
        this.state = {
            cursor: (location.state && location.state.cursor) ? location.state.cursor : ''
        }
    }

    componentDidMount() {
        this.props.history.listen((location) => this.setState({
            cursor: (location.state && location.state.cursor) ? location.state.cursor : ''
        }))
    }
    
    render() {
        const { cursor } = this.state;
        return (
             <div className="Diff" style = {{position: 'absolute', display: 'none', backgroundColor: '#202124', left: '255px', width: 'calc(100vw - 255px)', height: '100%', zIndex: '999'}}>
                <div className="header_tab">
                    <div className="header_tab_element">{cursor.name + " (Working Tree)"}</div>
                </div>
                <DiffEditor
                    original = {cursor.oldcontent}
                    modified = {cursor.content}
                    language = {cursor.type}
                    theme = "dark"
                    width = "100%"
                    height = "calc(100% - 30px)"
                />
             </div>
        );
    }
}

export default withRouter(Diff);