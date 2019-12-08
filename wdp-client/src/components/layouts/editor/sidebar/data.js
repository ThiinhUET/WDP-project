import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../loading/Loading';
import { dataFlow } from '../../../../services';
import baseAPI from '../../../../utils/baseAPI';
import convertTree from '../../../../utils/convertString';

const converttree = new convertTree();

export const defaultdata = {
    "path": "/",
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
            "oldcontent": ``,
            "modified": undefined
        },
        {
            "path": "/script.js",
            "type": "javascript",
            "name": "script.js",
            "toggled": false,
            "content": ``,
            "oldcontent": ``,
            "modified": undefined
        },
        {
            "path": "/style.css",
            "type": "css",
            "name": "style.css",
            "toggled": false,
            "content": ``,
            "oldcontent": ``,
            "modified": undefined
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
        const { accessToken, username, projectName, repositories } = localStorage;
        let repos = [];
        try {
            repos = repositories.split(',');
        } catch {}
        let { data } = this.state;
        this.props.history.listen((location) => {
            data = (location.state && location.state.data)? location.state.data : this.state.data;
            this.setState({data: data});
        });
        if (projectName && !repos.includes(projectName)) window.open('/editor', '_self');
        if (projectName && data === defaultdata) {
            setTimeout(() => this.setState({isLoading: true}), 500);
            axios.post(baseAPI.baseURL + '/git/user-listfile', {
                accessToken: accessToken,
                login: username, 
                repo: projectName
            }).then((res) => converttree.convertString(res.data.filetree)
            ).then((rootNode) => this.getContent(rootNode)
            ).then((rootNode2) => setTimeout(() => {
                this.setState({ data: rootNode2 });
                this.props.history.push({
                    state: {...this.props.location.state, data: rootNode2},
                });
                dataFlow.next(rootNode2);
                this.setState({isLoading: false});
            }, 3000))
        }
    }

    getContent(node) {
        if (node.type !== 'folder') {
            axios.post(baseAPI.baseURL + '/git/get-file-content', {
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