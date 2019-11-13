import React from 'react';
import PropTypes from 'prop-types';

import {Div} from 'react-treebeard/dist/components/common';
import defaultStyles from './defaultStyles';

import contentFlow from './../../../service/content.service';

const HELP_MSG = 'Select A Node To See Its Data Structure Here...';

const NodeViewer = ({node}) => {
    const style = defaultStyles.viewer;
    let json = JSON.stringify(node, null, 4);
    if(node === undefined){
        contentFlow.next("//type your code here");
    }else{
        contentFlow.next(node.content);
    }
    if (!json) {
        json = HELP_MSG;
    }

    return <Div style={style.base}></Div>;
};

NodeViewer.propTypes = {
    node: PropTypes.object
};

export default NodeViewer;
