const file = require('./data');
const axios = require('axios');
const tree = file.filetree.tree;
var data = {
}

const getChildren = (url) => {
    return new Promise((resolve, reject)=> {
        axios.get(url).then((res) => {
            return resolve(res.data.tree);
        }).catch(err => {
            return reject(err.message);
        })
    });
}
const tranform = async() => {
    for(let i = 0; i < tree.length; i++){
        let path = tree[i].path;
        let type = tree[i].type === 'blob' ? 'file' : 'folder';
        let content = tree[i].url;
        let children = [];
        if (type === 'folder') {
            await getChildren(content)
            children = getChildren(content);
            data[path] = {
                path: path,
                type: type,
                content: content,
                children: children
            };
        } else {
            data[path] = {
                path: path,
                type: type,
                content: content,
                children: children
            }
        }
    }
}

console.log(data);



