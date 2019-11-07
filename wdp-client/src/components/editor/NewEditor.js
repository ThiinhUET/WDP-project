// @monaco-editor/react is Monaco editor wrapper for easy/one-line integration with React
// applications without need of webpack (or other module bundler)
// configuration files.

import React from "react";

import Editor from "@monaco-editor/react";


class NewEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      theme : "dark",
      language : "javascript",
      isEditorReady : false
    }
  }


  handleEditorDidMount() {
    this.setState.isEditorReady = true;
  }

  toggleTheme(state) {
    this.setState.theme = "dark" ;
  }

  toggleLanguage(state) {
    this.setState.language = "javascript";
  }
render(){
  return (
      <Editor
        height="100%"
        width = "50%"
        theme={this.state.theme}
        language={this.state.language}
        // loading={<Loader />}
        value="123"
        editorDidMount={this.handleEditorDidMount.bind(this)}
      />
  );
}

}

export default NewEditor;