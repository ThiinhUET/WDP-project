class node {
    constructor(path, type, name, toggled, content) {
        this.path = path;
        this.type = type;
        this.name = name;
        this.toggled = toggled;
        this.content = content;
        this.children = [];
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
    }
}
addNode = (node1, node2) => {
    if (node1.children.length === 0) node1.addChildren(node2);
    else {
        let node3 = node1.children[node1.children.length - 1];
        if (node2.path.includes(node3.path)) addNode(node3, node2);
        else node1.addChildren(node2);
    }
}
convertString = (input) => {
    // let arrayInput = input.split('[\n');
    // arrayInput[0] = arrayInput[0].split('"')[9].split('/')[5];
    let nameNode = input.url.split('/')[5];
    let rootNode = new node('', 'tree', nameNode, true, '');
    let nodes = [];
    for (let i = 0; i < input.tree.length; i ++) {
        let pathNode = input.tree[i].path.split('/');
        nodes[i] = new node(input.tree[i].path, input.tree[i].type, pathNode[pathNode.length - 1], false, (input.tree[i].type === 'blob')? input.tree[i].url : '');
        if (nodes[i].type === 'blob') nodes[i] = new leafNode(nodes[i]);
        if (nodes[i].type === 'tree' || (nodes[i].type === 'blob' && nodes[i].path.includes('/')))
            addNode(rootNode, nodes[i]);
    }
    // arrayInput[1] = arrayInput[1].split(']')[0].split('},');
    // for (let i = 0; i < arrayInput[1].length; i ++) {
    //     arrayInput[1][i] = arrayInput[1][i].split('"');
    //     nodes[i] = new node(arrayInput[1][i][3], arrayInput[1][i][11], pathNode[pathNode.length - 1], false, (arrayInput[1][i][11] === 'blob')? arrayInput[1][i][21] : '');
    // }
    for (let i = 0; i < input.tree.length; i ++) {
        if (nodes[i].type === 'blob' && !nodes[i].path.includes('/'))
            addNode(rootNode, nodes[i]);
    }
    return rootNode;
}


module.exports = convertString;