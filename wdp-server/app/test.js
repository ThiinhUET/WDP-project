// const file = require('./data');
// const tree = file.filetree.tree;
function getTree(tree){
    var data = {
    }
    
    tree.map((value, index) => {
        value.path = '/' + value.path;
    })
    
    tree.map((value, index) => {
        let path = value.path;
        let type = value.type === 'blob' ? 'file' : 'folder';
        let content = value.url;
        let check = path.split('/')
        if (type === 'file' && check.length != 2) {
            data[path] = {
                path: path,
                type: type,
                content: content,
                children: []
        }
        } else {
            let tmp = path.split('/');
            if (tmp.length == 2 && type === 'file') {
                data[path] = {
                    path: path,
                    type: type,
                    children: [],
                    isRoot: true
                }
            }else if(tmp.length == 2 && type === 'folder'){
                let child = [];
                for(let i = 0 ; i < tree.length; i++){
                    let tmp1 = tree[i].path.split('/');
                    if(tmp1.length === 3 && tmp1[1] === tmp[1]){
                        child.push(tree[i].path);
                    }
                }
                data[path] = {
                    path: path,
                    type: type,
                    children: child,
                    isRoot: true
                }
            }
        else if(tmp.length == 3 && type === 'folder'){
            let child = [];
            for(let i = 0 ; i < tree.length; i++){
                let tmp1 = tree[i].path.split('/');
                if(tmp1.length === 4 && tmp1[2] === tmp[2]){
                    child.push(tree[i].path);
                }
            }
            data[path] = {
                path: path,
                type: type,
                children: child,
            }
        }
        else if(tmp.length == 4 && type === 'folder'){
            let child = [];
            for(let i = 0 ; i < tree.length; i++){
                let tmp1 = tree[i].path.split('/');
                if(tmp1.length === 5 && tmp1[3] === tmp[3]){
                    child.push(tree[i].path);
                }
            }
            data[path] = {
                path: path,
                type: type,
                children: child,
            }
        }
        else if(tmp.length == 5 && type === 'folder'){
            let child = [];
            for(let i = 0 ; i < tree.length; i++){
                let tmp1 = tree[i].path.split('/');
                if(tmp1.length === 6 && tmp1[4] === tmp[4]){
                    child.push(tree[i].path);
                }
            }
            data[path] = {
                path: path,
                type: type,
                children: child,
            }
        }
        else if(tmp.length == 6 && type === 'folder'){
            let child = [];
            for(let i = 0 ; i < tree.length; i++){
                let tmp1 = tree[i].path.split('/');
                if(tmp1.length === 7 && tmp1[5] === tmp[5]){
                    child.push(tree[i].path);
                }
            }
            data[path] = {
                path: path,
                type: type,
                children: child,
            }
        }
        else if(tmp.length == 7 && type === 'folder'){
            let child = [];
            for(let i = 0 ; i < tree.length; i++){
                let tmp1 = tree[i].path.split('/');
                if(tmp1.length === 8 && tmp1[6] === tmp[6]){
                    child.push(tree[i].path);
                }
            }
            data[path] = {
                path: path,
                type: type,
                children: child,
            }
        }
        else if(tmp.length == 8 && type === 'folder'){
            let child = [];
            for(let i = 0 ; i < tree.length; i++){
                let tmp1 = tree[i].path.split('/');
                if(tmp1.length === 9 && tmp1[7] === tmp[7]){
                    child.push(tree[i].path);
                }
            }
            data[path] = {
                path: path,
                type: type,
                children: child,
            }
        }
        else if(tmp.length == 9 && type === 'folder'){
            let child = [];
            for(let i = 0 ; i < tree.length; i++){
                let tmp1 = tree[i].path.split('/');
                if(tmp1.length === 10 && tmp1[8] === tmp[8]){
                    child.push(tree[i].path);
                }
            }
            data[path] = {
                path: path,
                type: type,
                children: child,
            }
        }
        else if(tmp.length == 10 && type === 'folder'){
            let child = [];
            for(let i = 0 ; i < tree.length; i++){
                let tmp1 = tree[i].path.split('/');
                if(tmp1.length === 11 && tmp1[9] === tmp[9]){
                    child.push(tree[i].path);
                }
            }
            data[path] = {
                path: path,
                type: type,
                children: child,
            }
        }
    }});
    
    
    return data;
    
}



