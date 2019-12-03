class node {
    constructor(path, type, name, toggled, content) {
        this.path = path;
        this.type = type;
        this.name = name;
        this.toggled = toggled;
        this.content = content;
        this.children = [];
        this.modified = false;
    }

    addChildren(childrenNode) {
        this.children.push(childrenNode);
    }
}
class leafNode {
    constructor(node) {
        this.path = node.path;
        this.type = node.type;
        this.name = node.name;
        this.toggled = node.toggled;
        this.content = node.content;
        this.oldcontent = node.content;
        this.modified = node.modified;
    }
}
addNode = (node1, node2) => {
    if (node1.type !== 'folder') return;
    let isExist = false;
    for (let i = 0; i < node1.children.length; i ++) {
        let node3 = node1.children[i];
        if (node2.path.includes(node3.path)) {
            isExist = true;
            addNode(node3, node2);
        }
    }
    if (!isExist) node1.addChildren(node2);
}
convertString = (input) => {
    let nameNode = input.url.split('/')[5];
    let rootNode = new node('/', 'folder', nameNode, true, '');
    let nodes = [];
    for (let i = 0; i < input.tree.length; i ++) {
        input.tree[i].path = '/' + input.tree[i].path;
        let path = input.tree[i].path.split('/');
        let name = path[path.length - 1];
        let type;
        if (input.tree[i].type === 'tree') type = 'folder';
        else {
            if (!name.includes('.')) type = 'file';
            else {
                let nameEx = name.split('.');
                type = nameEx[nameEx.length - 1];
                if (type === 'js') type = 'javascript';
            }
        }
        nodes[i] = new node(input.tree[i].path, type, name, false, (type !== 'folder')? input.tree[i].url : '');
        if (nodes[i].type !== 'folder') nodes[i] = new leafNode(nodes[i]);
        else nodes[i].path = nodes[i].path + '/';
    }
    for (let i = 0; i < input.tree.length; i ++) {
        if (nodes[i].name === 'README.md') {
            nodes.push(nodes[i]);
            nodes.splice(i, 1);
        }
    }
    for (let i = 0; i < input.tree.length; i ++) {
        if (nodes[i].type === 'folder') addNode(rootNode, nodes[i]);
    }
    for (let i = 0; i < input.tree.length; i ++) {
        if (nodes[i].type !== 'folder') addNode(rootNode, nodes[i]);
    }
    return rootNode;
}


module.exports = convertString;