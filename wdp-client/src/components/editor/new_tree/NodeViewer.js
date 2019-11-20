import React from 'react';
import PropTypes from 'prop-types';

import {Div} from 'react-treebeard/dist/components/common';

import contentFlow from './../../../service/content.service';

const NodeViewer = ({node}) => {
    if(node === undefined){
        contentFlow.next("<!--Happy Coding-->");
    }else if (node.type !== 'folder') {
        contentFlow.next(node.content);
        console.log(node.path, node.type);
    }

    return <Div></Div>;
};

NodeViewer.propTypes = {
    node: PropTypes.object
};

export default NodeViewer;
