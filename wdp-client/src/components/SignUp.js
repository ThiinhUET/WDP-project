import React , {Component} from 'react';

class SignUp extends Component {
    render() { 
        return (
            <div className="SignUp">
                <div className="header">
                <button className="home" style={{height: '42px'}}>
                    <a style={{textDecoration: 'none'}} href="../index.html"><img src="../assets/logo.png" width={40} height={40} /></a>
                </button>
                <span className="title">WDP</span>
                <button className="signin">
                    <a href="../signin/signin.html" style={{textDecoration: 'none', color: '#ffffff'}}><span>Sign In</span></a>
                </button>
                </div>
                <div className="maincontent">
                <div className="signup_title">Sign up to WDP</div>
                <div className="signup_box">
                    <img src="../assets/logo2.png" style={{position: 'relative', width: '250px', margin: '0 auto', marginTop: '20px'}} />
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
                <span style={{float: 'left'}}>v1.0</span>
                <span style={{float: 'right'}}>© 2019 Web Development Platform | Develop by HoiThanhDucChuaTroi</span>
                </div>
            </div>
        );
    }
}
 
export default SignUp;