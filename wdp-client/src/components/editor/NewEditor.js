import React from "react";
import Editor, {monaco, ControlledEditor} from "@monaco-editor/react";
import { FillSpinner as Loader } from "react-spinners-kit";
import MyFrame from './RenderHTML';
class NewEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openConsole: false,
      theme: "dark",
      language: "html",
      isEditorReady: true,
      code: null
    }
  }

  handleEditorDidMount(_valueGetter) {
    this.setState.isEditorReady = true;
  }

  toggleLanguage() {
    this.setState.language = "javascript";
  }

  handleEditorChange = (ev, value) => {
    this.setState({code : value});
  }

  openConsole() {
    if (!this.state.openConsole) {
      document.getElementById("console_container").style.display = "block";
      var textInput = document.createElement("TextInput");
      document.getElementById("console_container").appendChild(textInput);
      document.getElementById("iframe").style.height = 'calc(65% + 5px)';    
    }
    else {
      document.getElementById("console_container").style.display = "none";
      document.getElementById("iframe").style.height = 'calc(95% + 5px)';
    }
    this.setState({openConsole: !this.state.openConsole});
  }

  closeConsole() {
      this.setState({openConsole: "false"});
      document.getElementById("console_container").style.display = "none";
      document.getElementById("iframe").style.height = 'calc(95% + 5px)';
  }

  render() {
    return (
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        height: '100%', width: '100%'}}>
        <div className="playground">
          <ControlledEditor
            height="100%"
            width="100%"
            theme={this.state.theme}
            language={this.state.language}
            loading={<Loader />}
            editorDidMount={this.handleEditorDidMount.bind(this)}
            onChange={this.handleEditorChange.bind(this)}
          />
        </div>
        <div className="resizer"></div>
        <div className="result">
          <iframe srcDoc={this.state.code} className="iframe" id="iframe"></iframe>
          <div className="console_contaniner" id="console_container">
              <div className="console_tab" id="console_tab">
                  <button style={{float: 'left'}}>
                      <i className="fas fa-ban"></i>
                  </button>
                  <button style={{float: 'right'}} onClick={() => this.closeConsole()}>
                      <i className="fas fa-chevron-down"></i>
                  </button>
              </div>
              <div style={{height: 'calc(100% - 54px)'}}>
                {/* console result */}
              </div>
              <div style={{display: 'flex',alignItems: 'center', width: '100%', backgroundColor: '#f0f0f00d', color: '#f0f0f0'}}>
                <i className="fas fa-chevron-right" style={{width: '10px', height: '10px', paddingLeft: '5px'}}></i>
                <input style={{width: 'calc(100% - 25px)', backgroundColor: 'transparent', color: '#f0f0f0', borderStyle: 'none', outline: 'none', padding: '5px'}} />
              </div>


            </div>
            <div className="footer_bar" id="footer_bar">
              <button className="header_item" title="Save">
                  <span>
                      <i className="fas fa-cloud" style={{width: '20px', height: '20px'}}></i>
                  </span>
              </button>
              <button className="header_item" title="Settings">
                  <span>
                      <i className="fas fa-cogs" style={{width: '20px', height: '20px'}}></i>
                  </span>
              </button>
              <button className="header_item" title="GitHub">
                  <span>
                      <i className="fab fa-github" style={{width: '20px', height: '20px'}}></i>
                  </span>
              </button>
              <button className="header_item" title="Export to zip">
                  <span>
                      <i className="fas fa-download" style={{width: '20px', height: '20px'}}></i>
                  </span>
              </button>
              <button onClick={() => this.openConsole()}>
                  Console
              </button>
          </div>
        </div>
      </div>
    );
  }

}

export default NewEditor;