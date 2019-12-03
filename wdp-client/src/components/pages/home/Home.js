import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import logo3D from '../../../assets/logo3D.gif';
import HTML_ICON from '../../../assets/html_icon.svg';
import CSS_ICON from '../../../assets/css_icon.svg';
import JS_ICON from '../../../assets/js_icon.svg';

import Header from '../../layouts/header/Header';
import Background from '../../layouts/background/Background';
import Loading from '../../layouts/loading/Loading';

import './style.css'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoading: true}
        setTimeout(() => this.setState({ isLoading: false }), 500);
    }

    openEditor() {
        this.props.history.push('/editor');
    }

    render() {
        const { isLoading } = this.state;
        return (
            <div className="Home">
                {isLoading && <Loading size='30' />}
                <Header title="WDP" />
                <div className="maincontent home">
                    <Background width='70%' />
                    <div className="top_maincontent">
                        <div className="code_editor" style={{ position: 'relative', flex: 3 }}>
                            <div className="title_code">
                                <div className="name">WEB DEVELOPMENT PLATFORM</div>
                                <div className="other_name">
                                    <div>The online code editor</div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <button className="button_code" onClick={() => this.openEditor()}>
                                            <span>Start Coding</span>
                                        </button>
                                        <span style={{ fontSize: '48pt' }}>for Web</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="logo" style={{ position: 'relative', flex: 1 }}>
                            <img src={logo3D} alt="loading..." style={{ width: '300px', height: '300px' }} />
                        </div>
                    </div>
                    <div className="center_maincontent">
                        <div style={{width: '60%', fontStyle: 'italic', textAlign: 'center', fontSize: '28pt'}}>WDP is an online editor that helps you create web applications, sync project with GitHub.</div>
                        <div>
                            <img src={JS_ICON} alt="" style={{width: '80px', padding: '50px 20px'}} />
                            <img src={HTML_ICON} alt="" style={{width: '80px', padding: '50px 20px'}} />
                            <img src={CSS_ICON} alt="" style={{width: '80px', padding: '50px 20px'}} />
                        </div>
                        
                    </div>
                    <div className="bottom_maincontent">
                        <div style={{fontSize: '32pt', fontWeight: '700', padding: '10px'}}>Development Team</div>
                        <div className="aboutUs">
                            <div className="people_profile">
                                <img className="people_avt" src="https://avatars1.githubusercontent.com/u/38932674?v=4" alt="" />
                                <div className="people_info">
                                    <div>Nguyễn Tuấn Quốc</div>
                                    <a className="info_url" href="https://www.facebook.com/quocnt.99" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-facebook" style={{width: '30px', height: '30px', padding: '10px'}}></i>
                                    </a>
                                    <a className="info_url" href="https://github.com/NTQ99" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-github" style={{width: '30px', height: '30px', padding: '10px'}}></i>
                                    </a>
                                </div>
                            </div>
                            <div className="people_profile">
                                <img className="people_avt" src="https://scontent.fhan4-1.fna.fbcdn.net/v/t1.0-9/32079351_1155221184615512_6597696561298276352_n.jpg?_nc_cat=104&_nc_ohc=8G6-wNVNyfMAQlL2eLholatGZM-w50LQF91JieGEVGWA8z__sKG1l4u-g&_nc_ht=scontent.fhan4-1.fna&oh=e5d6da5536707b00747919b513a61044&oe=5E7D1235" alt="" />
                                <div className="people_info">
                                    <div>Nguyễn Minh Quân</div>
                                    <a className="info_url" href="https://www.facebook.com/minhquan.nguyen.54772" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-facebook" style={{width: '30px', height: '30px', padding: '10px'}}></i>
                                    </a>
                                    <a className="info_url" href="https://github.com/minhquan54772" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-github" style={{width: '30px', height: '30px', padding: '10px'}}></i>
                                    </a>
                                </div>
                            </div>
                            <div className="people_profile">
                                <img className="people_avt" src="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-9/75418160_2579122262311323_3660766622571823104_n.jpg?_nc_cat=101&_nc_ohc=3AEfFGDhNy4AQkyVh85pdELFCTRLlRZitjf1yYEWbNRQZuNZ_hWoy4eYQ&_nc_ht=scontent.fhan3-3.fna&oh=175c4da2770a73c7245e3e590b6ba0a4&oe=5E86F301" alt="" />
                                <div className="people_info">
                                    <div>Lê Văn Thịnh</div>
                                    <a className="info_url" href="https://www.facebook.com/thinhlv0812" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-facebook" style={{width: '30px', height: '30px', padding: '10px'}}></i>
                                    </a>
                                    <a className="info_url" href="https://github.com/ThiinhUET" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-github" style={{width: '30px', height: '30px', padding: '10px'}}></i>
                                    </a>
                                </div>
                            </div>
                            <div className="people_profile">
                                <img className="people_avt" src="https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-9/s960x960/75553092_922291924822978_1066440830568366080_o.jpg?_nc_cat=110&_nc_ohc=zPKqLCroeroAQk5Jbrd5j1HSOzBCbZ7hiOBkcGdypjDiNycUw9QmWJd-Q&_nc_ht=scontent.fhan3-3.fna&oh=c590073f0aeda0694b65e4a576cc05ff&oe=5E44F887" alt="" />
                                <div className="people_info">
                                    <div>Trần Thu Phương</div>
                                    <a className="info_url" href="https://www.facebook.com/profile.php?id=100011265369020" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-facebook" style={{width: '30px', height: '30px', padding: '10px'}}></i>
                                    </a>
                                    <a className="info_url" href="https://github.com/tranphuongtb99" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-github" style={{width: '30px', height: '30px', padding: '10px'}}></i>
                                    </a>
                                </div>
                            </div>
                            <div className="people_profile">
                                <img className="people_avt" src="https://avatars2.githubusercontent.com/u/32807741?s=460&v=4" alt="" />
                                <div className="people_info">
                                    <div>Lê Thanh Tùng</div>
                                    <a className="info_url" href="https://www.facebook.com/lethanh.tung.547" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-facebook" style={{width: '30px', height: '30px', padding: '10px'}}></i>
                                    </a>
                                    <a className="info_url" href="https://github.com/Tungthanhlee" target="_blank" rel="noopener noreferrer">
                                        <i className="fab fa-github" style={{width: '30px', height: '30px', padding: '10px'}}></i>
                                    </a>
                                </div>
                            </div>
                        </div>
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

export default withRouter(Home);