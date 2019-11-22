import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import data from '../sidebar/new_tree/data';
import contentFlow from '../../../service/content.service';

class ResultFrame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: (this.props.location.state && this.props.location.state.data)? this.props.location.state.data : data,
            cursor: (this.props.location.state && this.props.location.state.cursor)? this.props.location.state.cursor : {"content": "<!-- Select a file to code -->"},
            urlHtml: (this.props.location.state && this.props.location.state.urlHtml)? this.props.location.state.urlHtml : '/index.html',
        }
    }

    componentDidMount(){
        this.contentFlowSub = contentFlow.subscribe((value)=>{
            this.setState({ code: value });  
        });
        this.props.history.listen((location) => this.setState({
            data: (location.state && location.state.data)? location.state.data : this.state.data,
            cursor: (location.state && location.state.cursor)? location.state.cursor : {"content": "<!-- Select a file to code -->"},
        }))
    }
    
    componentWillUnmount() {
        if (this.contentFlowSub) {
            this.contentFlowSub.unsubscribe();
            this.contentFlowSub = null;
        }
    }

    urlNavigation = (ev) => {
        let url = document.getElementById("url_navigation").value;
        let index = url.indexOf('/');
        url = url.slice(index);
        if (ev.keyCode === 13) {
          this.setState({urlHtml: url});
          this.props.history.push({
            pathname: this.props.location.pathname,
            state: {...this.props.location.state, urlHtml: url},
          })
        }
      }
    
    getContent = (path, node) => {
        let content = 'Enter the url of html file to display the web review';
        if (node.path === path) content = node.content;
        if (node.children && path.includes(node.path))
            for (let i = 0; i < node.children.length; i ++) {
                content = this.getContent(path, node.children[i]);
                if (content !== 'Enter the url of html file to display the web review') break;
            }
        return content;
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
    
    render() {
        return (
            <div className="ResultFrame">
                <div className="url_navigation">
                    <span onClick={() => this.saveCode()} title="Save & Run" className="run_btn" style={{display: 'flex', alignItems: 'center', backgroundColor:'#0d9e5b', color: '#f0f0f0', padding: '3px 5px', marginRight: '5px', borderRadius: '5px', width: '50px', cursor: 'pointer'}}>
                        <span style={{fontFamily: 'Source Sans Pro,Open Sans,Segoe UI,sans-serif', fontWeight: '600'}}>Run</span>
                        <i className="fas fa-play"style={{width: '15px', height: '15px', paddingLeft: '5px'}}></i>
                    </span>
                    <span className="url_inp" style={{display: 'flex', alignItems: 'center', width: 'calc(100% - 65px)', border: '1px solid #80808080', borderRadius: '10px'}}>
                        <i className="fas fa-globe-asia" style={{color: 'gray', width: '15px', height: '15px', padding: '4px 5px'}}></i>
                        <input type="text" spellCheck="false" autoComplete="off" id="url_navigation" defaultValue={(localStorage.projectName || "New-Project") + this.state.urlHtml} onKeyDown={(ev) => this.urlNavigation(ev)} style={{width: 'calc(100% - 25px)', backgroundColor: 'transparent', color: '#0f0f0f', borderStyle: 'none', outline: 'none'}} />
                    </span>
                </div>
                <iframe srcDoc={this.getContent(this.state.urlHtml, this.state.data)} className="iframe" title="Result" id="iframe"></iframe>
            </div>
        );
    }
}

export default withRouter(ResultFrame);