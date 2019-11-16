import React, {Component} from "react";
import {FlapperSpinner} from "react-spinners-kit";

export default class Loading extends Component {
    render() {
        return (
            <div style={{position: 'absolute', left: '0', right: '0', bottom: '0', width: '100vw', height: 'calc(94vh - 10px)', backgroundColor: '#1e1e1e', zIndex: '1000'}}>
                <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)'}}>
                    <FlapperSpinner />
                </div>
            </div>
        );
    }
}
