import React from 'react';
import PropTypes from 'prop-types';

import {Div} from 'react-treebeard/dist/components/common';
import defaultStyles from './defaultStyles';

const HELP_MSG = 'Select A Node To See Its Data Structure Here...';

const NodeViewer = ({node}) => {
    const style = defaultStyles.viewer;
    let json = JSON.stringify(node, null, 4);
    if(node === undefined){
        localStorage.removeItem('content');
        localStorage.setItem('content', '//Type your text');
    }else{
        localStorage.removeItem('content');
        localStorage.setItem('content', node.content);
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
