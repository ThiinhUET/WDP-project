const file = require('./data');
const axios = require('axios');
const tree = file.filetree.tree;
var data = {
}

tree.map((value, index) => {
    let path = value.path;
    let type = value.type === 'blob' ? 'file' : 'folder';
    let content = value.url;
    let children = [];
    axios.get(content).then((res) => {
        let child = res.data.tree;
        child.map((val, indx) => {
            children.push(val.path);
        });
        if (type === 'folder') {
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
    });

});



console.log(data);

