import React, { Component } from 'react';
import styled from 'styled-components';
import Tree from './TreeView';
import { withRouter } from 'react-router-dom';
const StyledFileExplorer = styled.div`
  width: 800px;
  max-width: 100%;
  margin: 0 auto;
  display: flex;  
`;

const TreeWrapper = styled.div`
  width: 100%;
`;
class FileExplorer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFile: null,
    };
  }

  onSelect = (file) => this.setState({ selectedFile: file });

  render() {
    const { selectedFile } = this.state;

    return (
      < StyledFileExplorer >
      <TreeWrapper>
        <Tree onSelect={this.onSelect} />
      </TreeWrapper>
          { selectedFile && selectedFile.type === 'file' && selectedFile.content }
          {console.log(this.props.test)}
      </StyledFileExplorer >
    )
  }
}

export default withRouter(FileExplorer);