import React from 'react';
import PropTypes from 'prop-types';

import {Div} from 'react-treebeard/dist/components/common';

// Example: Customising The Header Decorator To Include Icons
const Header = ({onSelect, style, customStyles, node}) => {
    const iconType = node.children ? 'folder' : 'file-alt';
    const iconClass = `fas fa-${iconType}`;
    const iconStyle = node.children ? {marginRight: '5px'} : {marginRight: '5px', marginLeft: '10px'};

    return (
        <div style={style.base} onClick={onSelect}>
            <Div style={node.selected ? {...style.title, ...customStyles.header.title} : style.title}>
                <i className={iconClass} style={iconStyle}/>
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
