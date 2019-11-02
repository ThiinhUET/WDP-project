import React, { Component } from 'react';
import './style.css';

class Background extends Component {
    render() {
        return (
            <div className="background" style={{width: this.props.width}}>
                <div className="shooting_star"></div>
                <div className="shooting_star"></div>
                <div className="shooting_star"></div>
                <div className="shooting_star"></div>
                <div className="shooting_star"></div>
                <div className="shooting_star"></div>
                <div className="shooting_star"></div>
                <div className="shooting_star"></div>
                <div className="shooting_star"></div>
                <div className="shooting_star"></div>
                <div className="shooting_star"></div>
            </div>
        );
    }
}

export default Background;