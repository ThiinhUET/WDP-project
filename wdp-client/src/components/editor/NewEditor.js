import React from "react";
import { withRouter } from 'react-router-dom';
import { ControlledEditor } from "@monaco-editor/react";
import { FillSpinner as Loader } from "react-spinners-kit";
import Console from './Console';
import contentFlow from './../../service/content.service';
import axios from 'axios';
import Loading from '../loading/Loading';
import data from './new_tree/data';

class NewEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: (this.props.location.state && this.props.location.state.data)? this.props.location.state.data : data,
      cursor: (this.props.location.state && this.props.location.state.cursor)? this.props.location.state.cursor : {"content": "<!-- Select a file to code -->"},
      urlHtml: (this.props.location.state && this.props.location.state.urlHtml)? this.props.location.state.urlHtml : '/index.html',
      theme: "dark",
      language: "html",
      isEditorReady: true,
    }
  }


  componentDidMount(){
    this.contentFlowSub = contentFlow.subscribe((content)=>{
        this.setState({ content: content });  
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


  handleEditorDidMount() {
    this.setState.isEditorReady = true;
  }

  handleEditorChange = (ev, value) => {
    this.setState({code: value});
    this.props.history.push({
      pathname: this.props.location.pathname,
      state: {...this.props.location.state, code: value},
    })
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
    let content = '';
    if (node.path === path) content = node.content;
    if (node.children && path.includes(node.path))
      for (let i = 0; i < node.children.length; i ++) {
        content = this.getContent(path, node.children[i]);
        if (content !== '') break;
      }
    return content;
  }

  render() {
    return (
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        height: '100%', width: '100%'
      }}>
        <div className="playground">
        {/* {this.state.loading && <Loading />} */}
          <ControlledEditor
            height="100%"
            width="100%"
            theme={this.state.theme}
            language={this.state.language}
            loading={<Loading size='20'/>}
            editorDidMount={this.handleEditorDidMount.bind(this)}
            onChange={this.handleEditorChange.bind(this)}
            value={this.state.cursor.content || ''}
          />
        </div>
        <div className="resizer"></div>
        <div className="result">
          <div className="url_navigation">
            <i className="fas fa-globe-asia" style={{color: 'gray', width: '15px', height: '15px', paddingRight: '5px'}}></i>
            <input id="url_navigation" defaultValue={(localStorage.projectName || "New-Project") + this.state.urlHtml} onKeyDown={(ev) => this.urlNavigation(ev)} style={{width: 'calc(100% - 25px)', backgroundColor: 'transparent', color: '#0f0f0f', borderStyle: 'none', outline: 'none'}} />
          </div>
          <iframe srcDoc={this.getContent(this.state.urlHtml, this.state.data)} className="iframe" title="Result" id="iframe"></iframe>
          <Console />
        </div>
      </div>
    );
  }

}

export default withRouter(NewEditor);