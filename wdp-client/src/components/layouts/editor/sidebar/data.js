import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../loading/Loading';
import { dataFlow } from '../../../../services';

export const defaultdata = {
    "path": "",
    "type": "folder",
    "name": "New-Project",
    "toggled": true,
    "content": "",
    "children": [
        {
            "path": "/index.html",
            "type": "html",
            "name": "index.html",
            "toggled": false,
            "content": `<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<meta http-equiv="X-UA-Compatible" content="ie=edge">\n\t<title>Document</title>\n\t<script src="/script.js"></script>\n\t<link rel="stylesheet" type="text/css" href="/style.css">\n</head>\n<body>\n\t<span>Write your code into index.html to display the web review</span>\n\t<!-- write your code here -->\n</body>\n</html>`,
            "oldcontent": `<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<meta http-equiv="X-UA-Compatible" content="ie=edge">\n\t<title>Document</title>\n\t<script src="/script.js"></script>\n\t<link rel="stylesheet" type="text/css" href="/style.css">\n</head>\n<body>\n\t<span>Write your code into index.html to display the web review</span>\n\t<!-- write your code here -->\n</body>\n</html>`
        },
        {
            "path": "/script.js",
            "type": "javascript",
            "name": "script.js",
            "toggled": false,
            "content": "",
            "oldcontent": ""
        },
        {
            "path": "/style.css",
            "type": "css",
            "name": "style.css",
            "toggled": false,
            "content": "",
            "oldcontent": ""
        }
    ]
}

class DataLoading extends Component {
    constructor(props) {
        super(props);
        const location = this.props.location;
        this.state = {
            data: (location.state && location.state.data)? location.state.data : defaultdata,
            isLoading: false,
        };
        dataFlow.next(this.state.data);
    }
    
    componentDidMount() {
        const { accessToken, username, projectName } = localStorage;
        const { data } = this.state;
        if (data === defaultdata && projectName) {
            setTimeout(() => this.setState({isLoading: true}), 500);
            axios.post('http://localhost:8080/git/user-listfile', {
                accessToken: accessToken,
                login: username, 
                repo: projectName
            }).then((res) => res.data.filetree
            ).then((rootNode) => this.getContent(rootNode)
            ).then((rootNode2) => setTimeout(() => {
                this.setState({ data: rootNode2 });
                this.props.history.push({
                    state: {...this.props.location.state, data: rootNode2},
                });
                dataFlow.next(rootNode2);
                this.setState({isLoading: false});
            }, 5000))
        }
    }

    getContent(node) {
        if (node.type !== 'folder') {
            axios.post('http://localhost:8080/git/get-file-content', {
                accessToken : localStorage.accessToken, 
                content : node.content
            }).then(res => {
                node.content = res.data.content;
                node.oldcontent = res.data.content;
            }).catch(err => {
                console.log(err);
            })
        }
        else for (let i = 0; i < node.children.length; i ++) node.children[i] = this.getContent(node.children[i]);
        return node;
    }

    render() {
        const { isLoading } = this.state;
        return (
            isLoading && <Loading size='20'/>
        );
    }
}
export default withRouter(DataLoading);