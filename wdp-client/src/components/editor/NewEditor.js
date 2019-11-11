import React from "react";
import Editor, {monaco, ControlledEditor} from "@monaco-editor/react";
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
            value={this.props.valueCode}
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
          <Console />
        </div>
      </div>
    );
  }

}

export default NewEditor;