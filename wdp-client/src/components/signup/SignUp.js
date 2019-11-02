import React , {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Background from '../background/Background';
import logo from '../../assets/logo.png';
import logo2 from '../../assets/logo2.png';
import './style.css';
class SignUp extends Component {
    constructor(props){
        super(props)
    }
    returnHome(){   
        this.props.history.push('/home');
    }
    openSignIn(){
        this.props.history.push('/signin');
    }
    render() { 
        return (
            <div className="signup">
                <Background width = '100%' />
                <div className="header">
                    <button className="homebtn" title="Home" onClick = {() => this.returnHome()}>
                        <img src={logo} width={40} height={40} />
                    </button>
                    <span className="title">WDP</span>
                    <button className="signin" onClick = {() => this.openSignIn()}>Sign In</button>
                </div>
                <div className="maincontent">
                    <div className="signup_title">Sign up to WDP</div>
                    <div className="signup_box">
                        <img src={logo2} style={{position: 'relative', width: '250px', margin: '0 auto', marginTop: '20px'}} />
                        <form className="signup_input" style={{position: 'relative', marginTop: '30px'}} action="#" method="post">
                            <div className="item">
                                <label>Your Full Name:</label>
                                <div style={{width: '70%'}}>
                                    <div className="box_input">
                                        <input type="text" placeholder="Enter full name" required />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <label>Your Username:</label>
                                <div style={{width: '70%'}}>
                                    <div className="box_input">
                                        <input type="text" placeholder="Enter username" required />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <label>Your Email:</label>
                                <div style={{width: '70%'}}>
                                    <div className="box_input">
                                        <input type="email" placeholder="Enter email" required />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <label>Your Password:</label>
                                <div style={{display: 'flex', justifyContent: 'space-between', width: '70%'}}>
                                    <div className="box_input" style={{width: '38%'}}>
                                        <input type="password" placeholder="Enter password" required />
                                    </div>
                                    <div className="box_input" style={{width: '38%'}}>
                                        <input type="password" placeholder="Confirm password" required />
                                    </div>
                                </div>
                            </div>
                            <button className="signup_button">Create Account</button>
                        </form>	
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
 
export default withRouter(SignUp);