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
    let arrayInput = input.split('[\n');
    arrayInput[0] = arrayInput[0].split('"')[9].split('/')[5];
    let rootNode = new node('', 'tree', arrayInput[0], true, '');
    let nodes = [];
    arrayInput[1] = arrayInput[1].split(']')[0].split('},');
    for (let i = 0; i < arrayInput[1].length; i ++) {
        arrayInput[1][i] = arrayInput[1][i].split('"');
        let pathNode = arrayInput[1][i][3].split('/');
        nodes[i] = new node(arrayInput[1][i][3], arrayInput[1][i][11], pathNode[pathNode.length - 1], false, (arrayInput[1][i][11] === 'blob')? arrayInput[1][i][21] : '');
        if (nodes[i].type === 'blob') nodes[i] = new leafNode(nodes[i]);
        addNode(rootNode, nodes[i]);
    }
    return JSON.stringify(rootNode);
}

let input = `{
    "filetree": {
    "sha": "6bd6b779d7b35873222c4187f1156b03be7fb6fc",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/6bd6b779d7b35873222c4187f1156b03be7fb6fc",
    "tree": [
    {
    "path": ".idea",
    "mode": "040000",
    "type": "tree",
    "sha": "a39ff547e86d99e71ec8764f921d47950df46197",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/a39ff547e86d99e71ec8764f921d47950df46197"
    },
    {
    "path": ".idea/.gitignore",
    "mode": "100644",
    "type": "blob",
    "sha": "0e40fe8f57160b43f9ea8e200b1a5d9f91f4aed9",
    "size": 39,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/0e40fe8f57160b43f9ea8e200b1a5d9f91f4aed9"
    },
    {
    "path": ".idea/WDP-project.iml",
    "mode": "100644",
    "type": "blob",
    "sha": "d6ebd4805981b8400db3e3291c74a743fef9a824",
    "size": 336,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/d6ebd4805981b8400db3e3291c74a743fef9a824"
    },
    {
    "path": ".idea/misc.xml",
    "mode": "100644",
    "type": "blob",
    "sha": "28a804d8932aba40f168fd757a74cb718a955a1a",
    "size": 174,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/28a804d8932aba40f168fd757a74cb718a955a1a"
    },
    {
    "path": ".idea/modules.xml",
    "mode": "100644",
    "type": "blob",
    "sha": "8ee9f59ff111a230942605111abb938851d625eb",
    "size": 274,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/8ee9f59ff111a230942605111abb938851d625eb"
    },
    {
    "path": ".idea/vcs.xml",
    "mode": "100644",
    "type": "blob",
    "sha": "94a25f7f4cb416c083d265558da75d457237d671",
    "size": 180,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/94a25f7f4cb416c083d265558da75d457237d671"
    },
    {
    "path": "README.md",
    "mode": "100644",
    "type": "blob",
    "sha": "f678066e1bf0a3e1a3f150a4289944ea9e92cd29",
    "size": 586,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/f678066e1bf0a3e1a3f150a4289944ea9e92cd29"
    },
    {
    "path": "_config.yml",
    "mode": "100644",
    "type": "blob",
    "sha": "ddeb671b60b62a185d59d29ba6f6253e0f7f7a6e",
    "size": 32,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/ddeb671b60b62a185d59d29ba6f6253e0f7f7a6e"
    },
    {
    "path": "docs",
    "mode": "040000",
    "type": "tree",
    "sha": "2f7fc620364c9cddfdc5c435876ca31de2ecb16b",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/2f7fc620364c9cddfdc5c435876ca31de2ecb16b"
    },
    {
    "path": "docs/SRS_WDP_ver3.0.pdf",
    "mode": "100644",
    "type": "blob",
    "sha": "79a923745d3c7f19e49e2b549f5194739a60c131",
    "size": 868151,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/79a923745d3c7f19e49e2b549f5194739a60c131"
    },
    {
    "path": "package-lock.json",
    "mode": "100644",
    "type": "blob",
    "sha": "f1fd9c10ba92e46906559956a53c444916f42c42",
    "size": 599,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/f1fd9c10ba92e46906559956a53c444916f42c42"
    },
    {
    "path": "wdp-client",
    "mode": "040000",
    "type": "tree",
    "sha": "aaec2c0306003c05e4a6872f7537574b0d4384c6",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/aaec2c0306003c05e4a6872f7537574b0d4384c6"
    },
    {
    "path": "wdp-client/.gitignore",
    "mode": "100644",
    "type": "blob",
    "sha": "b823958e82c6662c4d26667d141710a757e5607c",
    "size": 356,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/b823958e82c6662c4d26667d141710a757e5607c"
    },
    {
    "path": "wdp-client/package-lock.json",
    "mode": "100644",
    "type": "blob",
    "sha": "1e0da382cf4b124ce6368ec0930969acd6e2fe86",
    "size": 654509,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/1e0da382cf4b124ce6368ec0930969acd6e2fe86"
    },
    {
    "path": "wdp-client/package.json",
    "mode": "100644",
    "type": "blob",
    "sha": "5854f9762a5188fc85c789d9c77ea684c3ccf1d2",
    "size": 2025,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/5854f9762a5188fc85c789d9c77ea684c3ccf1d2"
    },
    {
    "path": "wdp-client/public",
    "mode": "040000",
    "type": "tree",
    "sha": "b2fb75dcba3adda83b608959dc75cac606b40240",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/b2fb75dcba3adda83b608959dc75cac606b40240"
    },
    {
    "path": "wdp-client/public/favicon.ico",
    "mode": "100644",
    "type": "blob",
    "sha": "a3db8ae6dff32ed404460026175384056e5308ee",
    "size": 15086,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/a3db8ae6dff32ed404460026175384056e5308ee"
    },
    {
    "path": "wdp-client/public/favicons",
    "mode": "040000",
    "type": "tree",
    "sha": "5060fbefa35ccbb18954f9530714567826bf9193",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/5060fbefa35ccbb18954f9530714567826bf9193"
    },
    {
    "path": "wdp-client/public/favicons/android-chrome-192x192.png",
    "mode": "100644",
    "type": "blob",
    "sha": "e1bf49e86c2e7a58bee1b9c2be920b6455740262",
    "size": 4601,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/e1bf49e86c2e7a58bee1b9c2be920b6455740262"
    },
    {
    "path": "wdp-client/public/favicons/android-chrome-512x512.png",
    "mode": "100644",
    "type": "blob",
    "sha": "d7ca24fb488ac38ff22c8615b563d6992420e132",
    "size": 12688,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/d7ca24fb488ac38ff22c8615b563d6992420e132"
    },
    {
    "path": "wdp-client/public/favicons/apple-touch-icon.png",
    "mode": "100644",
    "type": "blob",
    "sha": "d171c722f193e65adbce0fc6018105b72bd0f443",
    "size": 4386,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/d171c722f193e65adbce0fc6018105b72bd0f443"
    },
    {
    "path": "wdp-client/public/favicons/browserconfig.xml",
    "mode": "100644",
    "type": "blob",
    "sha": "b3930d0f047184047cb81d620436d91653438b8b",
    "size": 246,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/b3930d0f047184047cb81d620436d91653438b8b"
    },
    {
    "path": "wdp-client/public/favicons/favicon-16x16.png",
    "mode": "100644",
    "type": "blob",
    "sha": "dedbdeab1899fe2555ea4b07e87f9b36309d791c",
    "size": 776,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/dedbdeab1899fe2555ea4b07e87f9b36309d791c"
    },
    {
    "path": "wdp-client/public/favicons/favicon-32x32.png",
    "mode": "100644",
    "type": "blob",
    "sha": "649210d64442533eee3066d24b113c348e2d32a6",
    "size": 1170,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/649210d64442533eee3066d24b113c348e2d32a6"
    },
    {
    "path": "wdp-client/public/favicons/mstile-150x150.png",
    "mode": "100644",
    "type": "blob",
    "sha": "89c4a55c51733504fa1729d527501409ded0d78d",
    "size": 3754,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/89c4a55c51733504fa1729d527501409ded0d78d"
    },
    {
    "path": "wdp-client/public/favicons/safari-pinned-tab.svg",
    "mode": "100644",
    "type": "blob",
    "sha": "783d67a7b18281cc2dcb74c48c3bbeba8a32a85a",
    "size": 1444,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/783d67a7b18281cc2dcb74c48c3bbeba8a32a85a"
    },
    {
    "path": "wdp-client/public/favicons/site.webmanifest",
    "mode": "100644",
    "type": "blob",
    "sha": "b20abb7cbb2903c45280ba3540710669aeb63163",
    "size": 426,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/b20abb7cbb2903c45280ba3540710669aeb63163"
    },
    {
    "path": "wdp-client/public/index.html",
    "mode": "100644",
    "type": "blob",
    "sha": "1cfd33d8ea49d140f822ab589580f24ff8350d7b",
    "size": 1611,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/1cfd33d8ea49d140f822ab589580f24ff8350d7b"
    },
    {
    "path": "wdp-client/public/logo.png",
    "mode": "100644",
    "type": "blob",
    "sha": "d7b234655860ed9ee8270d4633dfddab4566da17",
    "size": 38359,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/d7b234655860ed9ee8270d4633dfddab4566da17"
    },
    {
    "path": "wdp-client/public/manifest.json",
    "mode": "100644",
    "type": "blob",
    "sha": "6ccfdf880ae51b29f7457215b36ddb9e3a65ea26",
    "size": 312,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/6ccfdf880ae51b29f7457215b36ddb9e3a65ea26"
    },
    {
    "path": "wdp-client/src",
    "mode": "040000",
    "type": "tree",
    "sha": "a741cc5fb73460a290cff2cfbec252b8641205c2",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/a741cc5fb73460a290cff2cfbec252b8641205c2"
    },
    {
    "path": "wdp-client/src/App.js",
    "mode": "100644",
    "type": "blob",
    "sha": "18b506cac80783c2135591cef0169fe009ba46cc",
    "size": 1804,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/18b506cac80783c2135591cef0169fe009ba46cc"
    },
    {
    "path": "wdp-client/src/assets",
    "mode": "040000",
    "type": "tree",
    "sha": "c238405bcd700a95669058a13bf7f097d7cb34d0",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/c238405bcd700a95669058a13bf7f097d7cb34d0"
    },
    {
    "path": "wdp-client/src/assets/logo.png",
    "mode": "100644",
    "type": "blob",
    "sha": "d7b234655860ed9ee8270d4633dfddab4566da17",
    "size": 38359,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/d7b234655860ed9ee8270d4633dfddab4566da17"
    },
    {
    "path": "wdp-client/src/assets/logo2.png",
    "mode": "100644",
    "type": "blob",
    "sha": "94fa464eaca3ff76a88ad040f25d599c91a1868f",
    "size": 87925,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/94fa464eaca3ff76a88ad040f25d599c91a1868f"
    },
    {
    "path": "wdp-client/src/assets/logo3D.gif",
    "mode": "100644",
    "type": "blob",
    "sha": "a8990dc10def301bc84852026b4c2f19e80fa370",
    "size": 2841365,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/a8990dc10def301bc84852026b4c2f19e80fa370"
    },
    {
    "path": "wdp-client/src/assets/spinner.gif",
    "mode": "100644",
    "type": "blob",
    "sha": "12d67cf135bd035f8ebeac79c1204a73b8b260ea",
    "size": 798904,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/12d67cf135bd035f8ebeac79c1204a73b8b260ea"
    },
    {
    "path": "wdp-client/src/components",
    "mode": "040000",
    "type": "tree",
    "sha": "57a008b885368aaa994bf6258eb5bd0471d060da",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/57a008b885368aaa994bf6258eb5bd0471d060da"
    },
    {
    "path": "wdp-client/src/components/authprovider",
    "mode": "040000",
    "type": "tree",
    "sha": "128c56589088d9506edc49e8b14ef320e1e6c10d",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/128c56589088d9506edc49e8b14ef320e1e6c10d"
    },
    {
    "path": "wdp-client/src/components/authprovider/Authenticate.js",
    "mode": "100644",
    "type": "blob",
    "sha": "01e80703760c64409a6c44f19e4ab309f19e9423",
    "size": 4036,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/01e80703760c64409a6c44f19e4ab309f19e9423"
    },
    {
    "path": "wdp-client/src/components/authprovider/base.js",
    "mode": "100644",
    "type": "blob",
    "sha": "1188f15018407e4cca63c0aadb554a01187b059c",
    "size": 375,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/1188f15018407e4cca63c0aadb554a01187b059c"
    },
    {
    "path": "wdp-client/src/components/background",
    "mode": "040000",
    "type": "tree",
    "sha": "1b7aff66a3b5f438bfbb78169f591d9e0920b9dc",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/1b7aff66a3b5f438bfbb78169f591d9e0920b9dc"
    },
    {
    "path": "wdp-client/src/components/background/Background.js",
    "mode": "100644",
    "type": "blob",
    "sha": "94e78a07060a1f5918569053d8e574ee2e61f80f",
    "size": 868,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/94e78a07060a1f5918569053d8e574ee2e61f80f"
    },
    {
    "path": "wdp-client/src/components/background/style.css",
    "mode": "100644",
    "type": "blob",
    "sha": "5cc919d9a6d1486dccb84add5ce45a839f7e355f",
    "size": 5517,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/5cc919d9a6d1486dccb84add5ce45a839f7e355f"
    },
    {
    "path": "wdp-client/src/components/dashboard",
    "mode": "040000",
    "type": "tree",
    "sha": "126f3ce39368032ec2bd29c54b9853a713e4ad78",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/126f3ce39368032ec2bd29c54b9853a713e4ad78"
    },
    {
    "path": "wdp-client/src/components/dashboard/Dashboard.js",
    "mode": "100644",
    "type": "blob",
    "sha": "955d858a069c160d00992cc3a46302cc7bfefbcb",
    "size": 4409,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/955d858a069c160d00992cc3a46302cc7bfefbcb"
    },
    {
    "path": "wdp-client/src/components/dashboard/style.css",
    "mode": "100644",
    "type": "blob",
    "sha": "c8229172bcb17c543d0a78a30340bf65aec7f66e",
    "size": 1430,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/c8229172bcb17c543d0a78a30340bf65aec7f66e"
    },
    {
    "path": "wdp-client/src/components/editor",
    "mode": "040000",
    "type": "tree",
    "sha": "246c746d9255fd9aaf995798b6aadc1de51adf62",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/246c746d9255fd9aaf995798b6aadc1de51adf62"
    },
    {
    "path": "wdp-client/src/components/editor/CodeSandBoxCS.js",
    "mode": "100644",
    "type": "blob",
    "sha": "3f411814fbc8313cdd3dcd11b8d53744407455cf",
    "size": 758,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/3f411814fbc8313cdd3dcd11b8d53744407455cf"
    },
    {
    "path": "wdp-client/src/components/editor/Console.js",
    "mode": "100644",
    "type": "blob",
    "sha": "eba92f6732c21b041480a02473940982f04da9c1",
    "size": 3510,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/eba92f6732c21b041480a02473940982f04da9c1"
    },
    {
    "path": "wdp-client/src/components/editor/Editor.js",
    "mode": "100644",
    "type": "blob",
    "sha": "18ec112907fa5ca83262da8aaaaa778af33c8bd6",
    "size": 9148,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/18ec112907fa5ca83262da8aaaaa778af33c8bd6"
    },
    {
    "path": "wdp-client/src/components/editor/MenuBar.js",
    "mode": "100644",
    "type": "blob",
    "sha": "999f0bd6795afdd54d57da8c0207b0bb3caa4599",
    "size": 4061,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/999f0bd6795afdd54d57da8c0207b0bb3caa4599"
    },
    {
    "path": "wdp-client/src/components/editor/NewEditor.js",
    "mode": "100644",
    "type": "blob",
    "sha": "16fc3ddd58c22a484cbc339a377164fd41ae9777",
    "size": 2314,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/16fc3ddd58c22a484cbc339a377164fd41ae9777"
    },
    {
    "path": "wdp-client/src/components/editor/RenderHTML.js",
    "mode": "100644",
    "type": "blob",
    "sha": "bc435adce2634e6f4e5e3ab1c0cc9bfd7bf78e02",
    "size": 420,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/bc435adce2634e6f4e5e3ab1c0cc9bfd7bf78e02"
    },
    {
    "path": "wdp-client/src/components/editor/SideBar.js",
    "mode": "100644",
    "type": "blob",
    "sha": "856b20b425dd2a9eefe023e239212893285e7ab2",
    "size": 2407,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/856b20b425dd2a9eefe023e239212893285e7ab2"
    },
    {
    "path": "wdp-client/src/components/editor/css",
    "mode": "040000",
    "type": "tree",
    "sha": "4a718ddbdca0b8828516ba50a54e7ea868bcb050",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/4a718ddbdca0b8828516ba50a54e7ea868bcb050"
    },
    {
    "path": "wdp-client/src/components/editor/css/codemirror.css",
    "mode": "100644",
    "type": "blob",
    "sha": "924f00c4ee499666363bb9dd3384a4c4b0d67319",
    "size": 8704,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/924f00c4ee499666363bb9dd3384a4c4b0d67319"
    },
    {
    "path": "wdp-client/src/components/editor/css/console.css",
    "mode": "100644",
    "type": "blob",
    "sha": "430bb0191955f6dd191e200b2e9eeabedb0e19dc",
    "size": 921,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/430bb0191955f6dd191e200b2e9eeabedb0e19dc"
    },
    {
    "path": "wdp-client/src/components/editor/css/editor.css",
    "mode": "100644",
    "type": "blob",
    "sha": "6922caa1cb03d7ac3b5909ebd0cca0124eb244d3",
    "size": 1062,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/6922caa1cb03d7ac3b5909ebd0cca0124eb244d3"
    },
    {
    "path": "wdp-client/src/components/editor/css/menubar.css",
    "mode": "100644",
    "type": "blob",
    "sha": "339680a4c9c4d3ddaf1f0fb98e7a6cb8b7e4e693",
    "size": 1747,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/339680a4c9c4d3ddaf1f0fb98e7a6cb8b7e4e693"
    },
    {
    "path": "wdp-client/src/components/editor/css/sidebar.css",
    "mode": "100644",
    "type": "blob",
    "sha": "e0052fdfa037a5ba3fa4afb71b2a2e579b057f79",
    "size": 949,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/e0052fdfa037a5ba3fa4afb71b2a2e579b057f79"
    },
    {
    "path": "wdp-client/src/components/editor/demo.js",
    "mode": "100644",
    "type": "blob",
    "sha": "b59cf8166bd99da0949082854e5b7440e76c99ad",
    "size": 169,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/b59cf8166bd99da0949082854e5b7440e76c99ad"
    },
    {
    "path": "wdp-client/src/components/editor/myTree.js",
    "mode": "100644",
    "type": "blob",
    "sha": "ff23841854a51110ff8dd972b1a39c2fd75a0b18",
    "size": 24759,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/ff23841854a51110ff8dd972b1a39c2fd75a0b18"
    },
    {
    "path": "wdp-client/src/components/editor/new_tree",
    "mode": "040000",
    "type": "tree",
    "sha": "992ba4b4255c3606a9e2e7297b06e50e8e516ba6",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/992ba4b4255c3606a9e2e7297b06e50e8e516ba6"
    },
    {
    "path": "wdp-client/src/components/editor/new_tree/Header.js",
    "mode": "100644",
    "type": "blob",
    "sha": "4c7855ebae833324a23527fec8397aea194d29c6",
    "size": 917,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/4c7855ebae833324a23527fec8397aea194d29c6"
    },
    {
    "path": "wdp-client/src/components/editor/new_tree/NodeViewer.js",
    "mode": "100644",
    "type": "blob",
    "sha": "dcad90faefd311d8f2dc175d1881e04502d3a420",
    "size": 852,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/dcad90faefd311d8f2dc175d1881e04502d3a420"
    },
    {
    "path": "wdp-client/src/components/editor/new_tree/Toggle.js",
    "mode": "100644",
    "type": "blob",
    "sha": "39212fbcb7dff5eec60f801b3d70168360cf3a1c",
    "size": 559,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/39212fbcb7dff5eec60f801b3d70168360cf3a1c"
    },
    {
    "path": "wdp-client/src/components/editor/new_tree/Tree.js",
    "mode": "100644",
    "type": "blob",
    "sha": "f8ed4069e87a2aa213478d3de3919b73973b1437",
    "size": 3399,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/f8ed4069e87a2aa213478d3de3919b73973b1437"
    },
    {
    "path": "wdp-client/src/components/editor/new_tree/data.js",
    "mode": "100644",
    "type": "blob",
    "sha": "789e1bb5c154a295ccb024c66b7311c92b1de593",
    "size": 1132,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/789e1bb5c154a295ccb024c66b7311c92b1de593"
    },
    {
    "path": "wdp-client/src/components/editor/new_tree/defaultStyles.js",
    "mode": "100644",
    "type": "blob",
    "sha": "44770aadc41b07e35b3ae4c7f309f7902f79c3c3",
    "size": 2506,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/44770aadc41b07e35b3ae4c7f309f7902f79c3c3"
    },
    {
    "path": "wdp-client/src/components/editor/new_tree/filter.js",
    "mode": "100644",
    "type": "blob",
    "sha": "f87af44451ab816714792a151249e5947551c24c",
    "size": 1706,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/f87af44451ab816714792a151249e5947551c24c"
    },
    {
    "path": "wdp-client/src/components/editor/sidebar",
    "mode": "040000",
    "type": "tree",
    "sha": "1a81e6e404d3f124f257ba08c41c5ab502e6428c",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/1a81e6e404d3f124f257ba08c41c5ab502e6428c"
    },
    {
    "path": "wdp-client/src/components/editor/sidebar/Explorer.js",
    "mode": "100644",
    "type": "blob",
    "sha": "726bb4c6fa2b8c3e0adfa5ef914bc658829d20eb",
    "size": 722,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/726bb4c6fa2b8c3e0adfa5ef914bc658829d20eb"
    },
    {
    "path": "wdp-client/src/components/editor/sidebar/ExplorerView.js",
    "mode": "100644",
    "type": "blob",
    "sha": "eb03710819694cd604b67cd9060a0b6bbcd818ef",
    "size": 1112,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/eb03710819694cd604b67cd9060a0b6bbcd818ef"
    },
    {
    "path": "wdp-client/src/components/editor/sidebar/Github.js",
    "mode": "100644",
    "type": "blob",
    "sha": "eb359be15a0a5b606f431477b4185f9d7a5ecb78",
    "size": 389,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/eb359be15a0a5b606f431477b4185f9d7a5ecb78"
    },
    {
    "path": "wdp-client/src/components/editor/sidebar/data.js",
    "mode": "100644",
    "type": "blob",
    "sha": "febcce3a973f25c9fbcd40ae7a2a8bf838fa76f4",
    "size": 37053,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/febcce3a973f25c9fbcd40ae7a2a8bf838fa76f4"
    },
    {
    "path": "wdp-client/src/components/github",
    "mode": "040000",
    "type": "tree",
    "sha": "bb12f03ac419aa9b5afd02b86ce40237c2804586",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/bb12f03ac419aa9b5afd02b86ce40237c2804586"
    },
    {
    "path": "wdp-client/src/components/github/GithubRepoList.js",
    "mode": "100644",
    "type": "blob",
    "sha": "176c71c171ecac88c2690cc6f901a1b175c99756",
    "size": 184,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/176c71c171ecac88c2690cc6f901a1b175c99756"
    },
    {
    "path": "wdp-client/src/components/home",
    "mode": "040000",
    "type": "tree",
    "sha": "5634551f0f3beb7b771ce9377bee4acf8dadc628",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/5634551f0f3beb7b771ce9377bee4acf8dadc628"
    },
    {
    "path": "wdp-client/src/components/home/Home.js",
    "mode": "100644",
    "type": "blob",
    "sha": "5fef95a2d647c405fd812423243fea030bdb5827",
    "size": 2982,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/5fef95a2d647c405fd812423243fea030bdb5827"
    },
    {
    "path": "wdp-client/src/components/profile",
    "mode": "040000",
    "type": "tree",
    "sha": "d76095edb67f49bd9f5e8c1c2e5dc907662a1ca4",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/d76095edb67f49bd9f5e8c1c2e5dc907662a1ca4"
    },
    {
    "path": "wdp-client/src/components/profile/Profile.js",
    "mode": "100644",
    "type": "blob",
    "sha": "590950b84b10a64177455b12c4ef15b1f14106f0",
    "size": 5553,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/590950b84b10a64177455b12c4ef15b1f14106f0"
    },
    {
    "path": "wdp-client/src/components/profile/style.css",
    "mode": "100644",
    "type": "blob",
    "sha": "8d664819d72b84b22d191168bae8f2d62b6a8a67",
    "size": 1593,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/8d664819d72b84b22d191168bae8f2d62b6a8a67"
    },
    {
    "path": "wdp-client/src/components/signin",
    "mode": "040000",
    "type": "tree",
    "sha": "0fc19c841ad806fd8d56583e3f0b6a4049583c97",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/0fc19c841ad806fd8d56583e3f0b6a4049583c97"
    },
    {
    "path": "wdp-client/src/components/signin/SignIn.js",
    "mode": "100644",
    "type": "blob",
    "sha": "657680732af497317687a14cf38d1331230f349d",
    "size": 2531,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/657680732af497317687a14cf38d1331230f349d"
    },
    {
    "path": "wdp-client/src/components/signin/style.css",
    "mode": "100644",
    "type": "blob",
    "sha": "4e4108c6bae52063be877061db8cd98c62ec8859",
    "size": 3043,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/4e4108c6bae52063be877061db8cd98c62ec8859"
    },
    {
    "path": "wdp-client/src/components/signup",
    "mode": "040000",
    "type": "tree",
    "sha": "0bbb7b61ca0ce543d96146209fe3c91a04e0d1c3",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/0bbb7b61ca0ce543d96146209fe3c91a04e0d1c3"
    },
    {
    "path": "wdp-client/src/components/signup/SignUp.js",
    "mode": "100644",
    "type": "blob",
    "sha": "3adbe01f1bef809fcb0f8afdcaa961ae14247db3",
    "size": 3994,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/3adbe01f1bef809fcb0f8afdcaa961ae14247db3"
    },
    {
    "path": "wdp-client/src/components/signup/style.css",
    "mode": "100644",
    "type": "blob",
    "sha": "3629251cf98fdaccfefaa48432742791c2db9795",
    "size": 1780,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/3629251cf98fdaccfefaa48432742791c2db9795"
    },
    {
    "path": "wdp-client/src/components/user-info",
    "mode": "040000",
    "type": "tree",
    "sha": "72a66e14a1c6d3e09078f2be58a542673e155c34",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/72a66e14a1c6d3e09078f2be58a542673e155c34"
    },
    {
    "path": "wdp-client/src/components/user-info/UserInfo.js",
    "mode": "100644",
    "type": "blob",
    "sha": "db3a82f8f3b66dfcbe57fcd4744de1fe1b9d7d00",
    "size": 3355,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/db3a82f8f3b66dfcbe57fcd4744de1fe1b9d7d00"
    },
    {
    "path": "wdp-client/src/components/user-info/style.css",
    "mode": "100644",
    "type": "blob",
    "sha": "487df16dab1bbacfa0a40a85654e1123fc8b4130",
    "size": 531,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/487df16dab1bbacfa0a40a85654e1123fc8b4130"
    },
    {
    "path": "wdp-client/src/fonts",
    "mode": "040000",
    "type": "tree",
    "sha": "10c4909c7dd8ac22c442916aca0250dda9b16c27",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/10c4909c7dd8ac22c442916aca0250dda9b16c27"
    },
    {
    "path": "wdp-client/src/fonts/Squares Bold.otf",
    "mode": "100644",
    "type": "blob",
    "sha": "17408e61432630b732359b67ab28f8fc12047fe9",
    "size": 28076,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/17408e61432630b732359b67ab28f8fc12047fe9"
    },
    {
    "path": "wdp-client/src/index.css",
    "mode": "100644",
    "type": "blob",
    "sha": "49872d6555039e5369bd5fde714dce1ca23114e3",
    "size": 3842,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/49872d6555039e5369bd5fde714dce1ca23114e3"
    },
    {
    "path": "wdp-client/src/index.js",
    "mode": "100644",
    "type": "blob",
    "sha": "f0f80ebbb63a12553690639906ad81f8611de0b1",
    "size": 453,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/f0f80ebbb63a12553690639906ad81f8611de0b1"
    },
    {
    "path": "wdp-client/src/service",
    "mode": "040000",
    "type": "tree",
    "sha": "0dd5209bfe53041b9d23537910c8aeded6872693",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/0dd5209bfe53041b9d23537910c8aeded6872693"
    },
    {
    "path": "wdp-client/src/service/content.service.js",
    "mode": "100644",
    "type": "blob",
    "sha": "ff124336a4f0b0daa46161dba1d64609fd8f68c9",
    "size": 130,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/ff124336a4f0b0daa46161dba1d64609fd8f68c9"
    },
    {
    "path": "wdp-client/src/serviceWorker.js",
    "mode": "100644",
    "type": "blob",
    "sha": "f8c7e50c201765c456ddbf21e9ea5b3e6a936920",
    "size": 4951,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/f8c7e50c201765c456ddbf21e9ea5b3e6a936920"
    },
    {
    "path": "wdp-server",
    "mode": "040000",
    "type": "tree",
    "sha": "05562dd03ec57fee7967f7f945e2982f69a8681d",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/05562dd03ec57fee7967f7f945e2982f69a8681d"
    },
    {
    "path": "wdp-server/.env",
    "mode": "100644",
    "type": "blob",
    "sha": "5d596bc2bd0084249bd7279dfbe5c1c60d653d83",
    "size": 128,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/5d596bc2bd0084249bd7279dfbe5c1c60d653d83"
    },
    {
    "path": "wdp-server/.gitignore",
    "mode": "100644",
    "type": "blob",
    "sha": "b512c09d476623ff4bf8d0d63c29b784925dbdf8",
    "size": 12,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/b512c09d476623ff4bf8d0d63c29b784925dbdf8"
    },
    {
    "path": "wdp-server/README.md",
    "mode": "100644",
    "type": "blob",
    "sha": "fa1f36f894d548cad8f6015d65783431e350e6e4",
    "size": 32,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/fa1f36f894d548cad8f6015d65783431e350e6e4"
    },
    {
    "path": "wdp-server/app",
    "mode": "040000",
    "type": "tree",
    "sha": "311d76c3575fd16fbcec8d7a4cc6d88f70a1bcb6",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/311d76c3575fd16fbcec8d7a4cc6d88f70a1bcb6"
    },
    {
    "path": "wdp-server/app/controllers",
    "mode": "040000",
    "type": "tree",
    "sha": "b24ec5b06f2cad1820de79bf7f69a9b6db73b88b",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/b24ec5b06f2cad1820de79bf7f69a9b6db73b88b"
    },
    {
    "path": "wdp-server/app/controllers/github-proxy.js",
    "mode": "100644",
    "type": "blob",
    "sha": "3b463a6f1a28457a6843f0b8754e61e9f762f8e3",
    "size": 2309,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/3b463a6f1a28457a6843f0b8754e61e9f762f8e3"
    },
    {
    "path": "wdp-server/app/controllers/users.js",
    "mode": "100644",
    "type": "blob",
    "sha": "966f7d89ba3dbdee7b64a06052bce44980fbee8a",
    "size": 1405,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/966f7d89ba3dbdee7b64a06052bce44980fbee8a"
    },
    {
    "path": "wdp-server/app/models",
    "mode": "040000",
    "type": "tree",
    "sha": "9ab07221355844daab3fb3b62027627f3a77bb39",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/9ab07221355844daab3fb3b62027627f3a77bb39"
    },
    {
    "path": "wdp-server/app/models/users.js",
    "mode": "100644",
    "type": "blob",
    "sha": "f0c4425da2e5b84d77fd8117e239a1fed77e003e",
    "size": 602,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/f0c4425da2e5b84d77fd8117e239a1fed77e003e"
    },
    {
    "path": "wdp-server/app/routes",
    "mode": "040000",
    "type": "tree",
    "sha": "29e22e22614fac46ef5edbc5f2e5a227d39d09d9",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/29e22e22614fac46ef5edbc5f2e5a227d39d09d9"
    },
    {
    "path": "wdp-server/app/routes/github-proxy.js",
    "mode": "100644",
    "type": "blob",
    "sha": "431839495dc55aca037ce38a66ef37c28a5b9bb3",
    "size": 388,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/431839495dc55aca037ce38a66ef37c28a5b9bb3"
    },
    {
    "path": "wdp-server/app/routes/users.js",
    "mode": "100644",
    "type": "blob",
    "sha": "13cd08fcfeab251bf59b29a033a66c2f25ccfed7",
    "size": 366,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/13cd08fcfeab251bf59b29a033a66c2f25ccfed7"
    },
    {
    "path": "wdp-server/app/server.js",
    "mode": "100644",
    "type": "blob",
    "sha": "29d69370593367ed066b65f26ae3774b81140609",
    "size": 1345,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/29d69370593367ed066b65f26ae3774b81140609"
    },
    {
    "path": "wdp-server/app/test.js",
    "mode": "100644",
    "type": "blob",
    "sha": "178add3863aa1488813b5467d5d54b66161c89f1",
    "size": 5224,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/178add3863aa1488813b5467d5d54b66161c89f1"
    },
    {
    "path": "wdp-server/config",
    "mode": "040000",
    "type": "tree",
    "sha": "4ea390743da9978063d9dc0f1892de55b54a4771",
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/trees/4ea390743da9978063d9dc0f1892de55b54a4771"
    },
    {
    "path": "wdp-server/config/database.js",
    "mode": "100644",
    "type": "blob",
    "sha": "d30279f9760e4bedf683e5f25b1fe6c6d98fe03f",
    "size": 182,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/d30279f9760e4bedf683e5f25b1fe6c6d98fe03f"
    },
    {
    "path": "wdp-server/package-lock.json",
    "mode": "100644",
    "type": "blob",
    "sha": "23851528276b8f73fd7a18c6236cf4de320b0ba2",
    "size": 141221,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/23851528276b8f73fd7a18c6236cf4de320b0ba2"
    },
    {
    "path": "wdp-server/package.json",
    "mode": "100644",
    "type": "blob",
    "sha": "97f47907fb920e50c293d1e5c53c860c529cbc50",
    "size": 542,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/97f47907fb920e50c293d1e5c53c860c529cbc50"
    },
    {
    "path": "wdp-server/test_api.js",
    "mode": "100644",
    "type": "blob",
    "sha": "a803ab1f0ee667f2b2ceb82b5b485c32de9c8727",
    "size": 897,
    "url": "https://api.github.com/repos/ThiinhUET/WDP-project/git/blobs/a803ab1f0ee667f2b2ceb82b5b485c32de9c8727"
    }
    ],
    "truncated": false
    }
    }`

console.log(convertString(input));

