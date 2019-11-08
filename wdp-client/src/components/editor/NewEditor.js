import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import { FillSpinner as Loader } from "react-spinners-kit";
import MyFrame from './RenderHTML';
class NewEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "dark",
      language: "javascript",
      isEditorReady: true
    }
  }

  handleEditorDidMount(_valueGetter) {
    this.setState.isEditorReady = true;
    // this.state.valueGetter.current = _valueGetter;
  }

  // handleShowValue(){
  //   alert(valueGetter.current());
  // }

  toggleLanguage() {
    this.setState.language = "javascript";
  }
  render() {
    return (
      <div style={{display:'flex', flex :'1', height :'100%'}}>
        <div style={{ flex: '1', height :'100%'}}>
          <Editor
            height="100%"
            width="100%"
            theme={this.state.theme}
            language={this.state.language}
            loading={<Loader />}
            value={this.props.value}
            editorDidMount={this.handleEditorDidMount.bind(this)}
          />
        </div>
        <div style={{ flex: '1', height :'100%'}}>
          <MyFrame></MyFrame>
        </div>
      </div>
    );
  }

}

export default NewEditor;