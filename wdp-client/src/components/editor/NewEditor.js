import React from "react";
import Editor, { monaco, ControlledEditor } from "@monaco-editor/react";
import { FillSpinner as Loader } from "react-spinners-kit";
import MyFrame from './RenderHTML';
import Console from './Console';
class NewEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "dark",
      language: "html",
      isEditorReady: true,
      code: null,
      content: localStorage.getItem('content'),
    }
  }


  componentDidMount(){
    this.interval = setInterval(() => this.setState({ content: localStorage.getItem('content') }), 100);
  }


  // onLocalStorageChange(){
  //   setInterval(() => {
  //     if(this.state.content !== localStorage.getItem('content')){
  //       this.setState({content : localStorage.getItem('content')});
  //       console.log("heelo");
  //     }
  //   }, 200)
  // }



  handleEditorDidMount() {
    this.setState.isEditorReady = true;
    window.addEventListener('storage', () => {
      this.setState({ content: localStorage.getItem('content') });
    })
  }

  handleEditorChange = (ev, value) => {
    this.setState({ code: value });
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
          <ControlledEditor
            height="100%"
            width="100%"
            theme={this.state.theme}
            language={this.state.language}
            loading={<Loader />}
            editorDidMount={this.handleEditorDidMount.bind(this)}
            onChange={this.handleEditorChange.bind(this)}
            value={this.state.content}
          />
        </div>
        <div className="resizer"></div>
        <div className="result">
          <div className="url_navigation">
            <input defaultValue="localhost:8080/index.html" style={{width: 'calc(100% - 25px)', backgroundColor: 'transparent', color: '#0f0f0f', borderStyle: 'none', outline: 'none'}} />
          </div>
          <iframe srcDoc={this.state.code} className="iframe" id="iframe"></iframe>
          <Console />
        </div>
      </div>
    );
  }

}

export default NewEditor;