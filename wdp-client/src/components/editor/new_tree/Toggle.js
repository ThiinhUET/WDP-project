import React from 'react';
import PropTypes from 'prop-types';

import {Div} from 'react-treebeard/dist/components/common';

const Toggle = ({style, onClick}) => {
    const {height, width} = style;

    return (
        <div style={style.base} onClick={onClick}>
            <Div style={style.wrapper}>
                <svg {...{height, width}}>
                    <i className="fas fa-caret-right"></i>
                </svg>
            </Div>
        </div>
    );
};

Toggle.propTypes = {
    onClick: PropTypes.func.isRequired,
    style: PropTypes.object
};

export default Toggle;
