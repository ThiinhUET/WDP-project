import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {DiffEditor} from '@monaco-editor/react';
import Loading from '../../../loading/Loading';

class Diff extends Component{
    constructor(props) {
        super(props);
        const location = this.props.location;
        this.state = {
            cursor: (location.state && location.state.cursor) ? location.state.cursor : '',
            isLoading: true
        }
        setTimeout(() => this.setState({isLoading: false}), 300);
    }

    componentDidMount() {
        this.props.history.listen((location) => {
            this.setState({
                cursor: (location.state && location.state.cursor) ? location.state.cursor : '',
                isLoading: true
            })
            setTimeout(() => this.setState({isLoading: false}), 300);
        })
    }
    
    render() {
        const { cursor, isLoading } = this.state;
        return (
             <div className="Diff" style = {{position: 'relative', display: 'none', backgroundColor: '#202124', width: '100%', height: '100%', zIndex: '999'}}>
                <div className="header_tab">
                    <div className="header_tab_element">{cursor.name + " (Working Tree)"}</div>
                </div>
                {isLoading && <Loading size='30' />}
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