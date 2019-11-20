import React from 'react';
import PropTypes from 'prop-types';

import {Div} from 'react-treebeard/dist/components/common';

// Example: Customising The Header Decorator To Include Icons
const Header = ({onSelect, style, customStyles, node}) => {
    const iconClass = node.children ? (node.toggled? 'fas fa-folder-open' : 'fas fa-folder') : (
        (node.type === 'html')? 'fas fa-code' : ((node.type === 'js')? 'fab fa-js-square' : (
            (node.type === 'css')? 'fab fa-css3' : 'fas fa-file-alt')));
    const iconStyle = node.children ? {marginRight: '5px'} : {marginRight: '5px', marginLeft: '10px'};

    return (
        <div style={style.base} onClick={onSelect}>
            <Div style={node.selected ? {...style.title, ...customStyles.header.title} : style.title}>
                <i className={iconClass} style={{...iconStyle, width: '14px', height: '14px'}}/>
                {node.name}
            </Div>
        </div>
    );
};

Header.propTypes = {
    onSelect: PropTypes.func,
    node: PropTypes.object,
    style: PropTypes.object,
    customStyles: PropTypes.object
};

Header.defaultProps = {
    customStyles: {}
};

export default Header;
