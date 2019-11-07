import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import spinnerImage from '../../assets/spinner.gif'

class Dashboard extends Component {
    render() {
        return (
            <div className="Dashboard">
                 <img src={spinnerImage} alt="waiting" height={42} width={42}></img>
            </div>
        );
    }
}

export default withRouter(Dashboard);