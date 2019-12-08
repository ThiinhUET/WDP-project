import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import logo2 from '../../../assets/logo2.png';

import Authenticate from '../../common/firebase/Authenticate';
import Background from '../../layouts/background/Background';
import Loading from '../../layouts/loading/Loading'; 
import Header from '../../layouts/header/Header';

import '@fortawesome/fontawesome-free/js/all';
import './style.css';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserDrop: false,
            isLoading : true,
        }
        setTimeout(() => this.setState({isLoading: false}), 500);
    }
    
    componentDidMount() {
        if (localStorage.uid) this.props.history.push('/home');
    }

    signIn() {
        const authenticate = new Authenticate();
        this.setState({isLoading : true});
        authenticate.signin(() => {
            this.props.history.push('/dashboard')
            this.setState({isLoading: false});
        });
    }
    
    render() {
        const { isLoading } = this.state;
        return (
            <div className="Signin">
                { isLoading && <Loading size='30' /> }
                <Background width = '100%' />
                <Header title="Sign In" page="signin" />
                <div className="maincontent signin">
                    <div className="signin_title">Sign in to WDP</div>
                    <div className="signin_box">
                        <img src={logo2} alt="" style={{ position: 'relative', width: '70%', margin: '0 auto' }} />
                        <div style={{height: '20%'}}></div>
                        <button className="signin_git_button" onClick={() => this.signIn()}>
                            <i className="fab fa-github" style={{width: '20px', height: '20px', paddingRight: '10px'}}></i>
                            <span>Sign in with GitHub</span>
                        </button>
                    </div>
                </div>
                <div className="footer">
                    <span>v1.0</span>
                    <span>© 2019 Web Development Platform | Develop by HoiThanhDucChuaTroi</span>
                </div>
            </div>
        );
    }
}

export default withRouter(SignIn);