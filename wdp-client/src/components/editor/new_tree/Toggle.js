import React from 'react';
import PropTypes from 'prop-types';

import {Div} from 'react-treebeard/dist/components/common';

const Toggle = ({style, onClick}) => {
    const {height, width} = style;

    return (
        <div style={style.base} onClick={onClick||(()=>0)}>
            <Div style={style.wrapper}>
                <svg {...{height, width}}>
                    <i className="fas fa-caret-right"></i>
                </svg>
            </Div>
        </div>
    );
};

Toggle.propTypes = {
    style: PropTypes.object
};

export default Toggle;
