import React from "react";
import Editor, {monaco, ControlledEditor} from "@monaco-editor/react";
import { FillSpinner as Loader } from "react-spinners-kit";
import MyFrame from './RenderHTML';
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
  };
  render() {
    return (
      <div style={{ display: 'flex', flex: '1', height: '100%' }}>
        <div style={{ flex: '1', height: '100%' }}>
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
        <div style={{ flex: '1', height: '100%' }}>
          <MyFrame code={this.state.code}></MyFrame>
        </div>
      </div>
    );
  }

}

export default NewEditor;