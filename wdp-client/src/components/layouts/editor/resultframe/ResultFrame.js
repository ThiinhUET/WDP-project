import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { defaultdata } from '../sidebar/data';
import { contentFlow } from '../../../../services';

class ResultFrame extends Component {
    constructor(props) {
        super(props);
        const location = this.props.location;
        this.state = {
            data: (location.state && location.state.data)? location.state.data : defaultdata,
            cursor: (location.state && location.state.cursor)? location.state.cursor : {"content": "<!-- Select a file to code -->"},
            urlHtml: (location.state && location.state.urlHtml)? location.state.urlHtml : '/index.html',
        }
    }
    
    componentDidMount(){
        this.contentFlowSub = contentFlow.subscribe((value)=>{
            this.setState({ code: value });
        });
        this.props.history.listen((location) => this.setState({
            data: (location.state && location.state.data)? location.state.data : this.state.data,
            cursor: (location.state && location.state.cursor)? location.state.cursor : this.state.cursor,
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

    getHtml = (path, node) => {
        let dataView = this.getContent(path, node);

        let scriptPaths = dataView.split("<script");
        if (scriptPaths.length > 1) {
            let firstIndexs = [];
            let lastIndexs = [];
            let oldScriptContents = [];
            firstIndexs[0] = -7;
            for (let i = 0; i < scriptPaths.length; i ++) {
                firstIndexs[i + 1] = scriptPaths[i].length + firstIndexs[i] + 7;
                scriptPaths[i] = scriptPaths[i].split("</script>")[0];
                lastIndexs[i] = firstIndexs[i] + scriptPaths[i].length + 16;
                scriptPaths[i] = (scriptPaths[i].split(`"`)[1] || "").trim();
                oldScriptContents[i] = dataView.slice(firstIndexs[i], lastIndexs[i]);
            }
            for (let i = 1; i < scriptPaths.length; i ++) {
                let newScriptContent = "<script>" + this.getContent(scriptPaths[i], node) + "</script>";
                if (newScriptContent === "<script>Enter the url of html file to display the web review</script>") return `Invalid Syntax: Path of script file start with '/'`;
                dataView = dataView.replace(oldScriptContents[i], newScriptContent);
            }
        }

        let stylePaths = dataView.split("<link");
        if (stylePaths.length > 1) {
            let firstIndexs = [];
            let lastIndexs = [];
            let oldStyleContents = [];
            firstIndexs[0] = -5;
            for (let i = 0; i < stylePaths.length; i ++) {
                firstIndexs[i + 1] = stylePaths[i].length + firstIndexs[i] + 5;
                stylePaths[i] = stylePaths[i].split(">")[0];
                lastIndexs[i] = firstIndexs[i] + stylePaths[i].length + 6;
                stylePaths[i] = (stylePaths[i].split(`"`)[5] || "").trim();
                oldStyleContents[i] = dataView.slice(firstIndexs[i], lastIndexs[i]);
            }
            for (let i = 1; i < stylePaths.length; i ++) 
                if (oldStyleContents[i] && oldStyleContents[i].includes("stylesheet")) {
                    let newStyleContent = "<style>" + this.getContent(stylePaths[i], node) + "</style>";
                    if (newStyleContent === "<style>Enter the url of html file to display the web review</style>") return `Invalid Syntax: Path of style file start with '/'`;
                    dataView = dataView.replace(oldStyleContents[i], newStyleContent);
                }
        }

        return dataView;
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
        if (rootNode.path === node.path) {
            rootNode.content = content;
            rootNode.modified = true;
            node.content = content;
            node.modified = true;
            this.props.history.push({
                state: {...this.props.location.state, cursor: node}
            })
        }
        if (node.path.includes(rootNode.path) && rootNode.children)
        for (let i = 0; i < rootNode.children.length; i ++) rootNode.children[i] = this.updateNode(rootNode.children[i], node, content);
        return rootNode;
    }
    saveCode() {
        const { data, cursor, code } = this.state;
        this.setState({data: this.updateNode(data, cursor, code)});
        setTimeout(() => this.props.history.push({
            state: {...this.props.location.state, data: this.state.data}
        }), 1000)
    }
    
    render() {
        const { urlHtml, data } = this.state;
        return (
            <div className="ResultFrame" style = {{height : '100%'}}>
                <div className="url_navigation">
                    <span onClick={() => this.saveCode()} title="Save & Run" className="run_btn" style={{display: 'flex', alignItems: 'center', backgroundColor:'#0d9e5b', color: '#f0f0f0', padding: '3px 5px', marginRight: '5px', borderRadius: '5px', width: '90px', cursor: 'pointer'}}>
                        <span style={{fontFamily: 'Source Sans Pro,Open Sans,Segoe UI,sans-serif', fontWeight: '600', fontSize: '10pt', letterSpacing: '0.5px'}}>Save & Run</span>
                        <i className="fas fa-play"style={{width: '15px', height: '15px', paddingLeft: '5px'}}></i>
                    </span>
                    <span className="url_inp" style={{display: 'flex', alignItems: 'center', width: 'calc(100% - 115px)', border: '1px solid #80808080', borderRadius: '10px'}}>
                        <i className="fas fa-globe-asia" style={{color: 'gray', width: '15px', height: '15px', padding: '4px 5px'}}></i>
                        <input type="text" spellCheck="false" autoComplete="off" id="url_navigation" defaultValue={(localStorage.projectName || "New-Project") + urlHtml} onKeyDown={(ev) => this.urlNavigation(ev)} style={{width: 'calc(100% - 25px)', backgroundColor: 'transparent', color: '#0f0f0f', borderStyle: 'none', outline: 'none'}} />
                    </span>
                </div>
                <iframe srcDoc={this.getHtml(urlHtml, data)} className="iframe" title="Result" id="iframe"></iframe>
            </div>
        );
    }
}

export default withRouter(ResultFrame);