import React from 'react';
import PropTypes from 'prop-types';

import {Div} from 'react-treebeard/dist/components/common';

const Header = ({onSelect, style, customStyles, node}) => {
    const typeFile = ['css', 'javascript', 'html', 'jpg', 'json', 'pdf', 'png', 'txt', 'xml']
    const iconClass = node.children ? (node.toggled? 'folder-open' : 'folder') : ((typeFile.includes(node.type.toLowerCase())? node.type.toLowerCase() : 'file'));
    const iconStyle = node.children ? {marginRight: '5px'} : {marginRight: '5px', marginLeft: '10px'};

    return (
        <div style={style.base} onClick={onSelect}>
            <Div style={node.selected ? {...style.title, ...customStyles.header.title} : style.title}>
                <img src={require(`../../../../assets/file_icon/${iconClass}.svg`)} alt="" style={{...iconStyle, width: '14px', height: '14px'}}/>
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
