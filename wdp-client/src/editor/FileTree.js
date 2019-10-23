import React, {Component} from 'react';
import FileTree from 'react-filetree-electron';

class FileTest extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const directory = 'D:\nocorp'; 
        return (  
            <FileTree directory={directory} />
        );
    }
}
 
export default FileTest;

