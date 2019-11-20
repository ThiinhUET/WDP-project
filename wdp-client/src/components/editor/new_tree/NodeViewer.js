import React from 'react';
import PropTypes from 'prop-types';

import {Div} from 'react-treebeard/dist/components/common';

import contentFlow from './../../../service/content.service';

const HELP_MSG = 'Select A Node To See Its Data Structure Here...';

const NodeViewer = ({node}) => {
    let json = JSON.stringify(node, null, 4);
    if(node === undefined){
        contentFlow.next("<!--Happy Coding-->");
    }else{
        contentFlow.next(node.content);
        console.log(node.path, node.type);
    }
    if (!json) {
        json = HELP_MSG;
    }

    return <Div></Div>;
};

NodeViewer.propTypes = {
    node: PropTypes.object
};

export default NodeViewer;
