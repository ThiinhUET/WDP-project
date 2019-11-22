import React, {Component} from "react";
import {FillSpinner} from "react-spinners-kit";

export default class Loading extends Component {
    render() {
        return (
            <div style={{position: 'absolute', left: '0', top: '0', width: '100%', height: '100%', backgroundColor: '#1e1e1e', zIndex: '1000'}}>
                <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)'}}>
                    <FillSpinner
                        size = {Number(this.props.size)}
                        color = '#0d9e5b'
                    />
                </div>
            </div>
        );
    }
}
