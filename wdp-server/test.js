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
        if (type === 'folder') {
            // for(let i = 0 ; i < tree.length; i++){
            //     let 
            // }
            children.push("a");
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



console.log(tree);

