import React, { Component } from 'react';
import './css/console.css';

class Console extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openConsole: false,
        }
    }

    openConsole() {
        if (!this.state.openConsole) {
            document.getElementById("console").style.height = "30%";
            document.getElementById("console_container").style.display = "block";
            document.getElementById("iframe").style.height = 'calc(70% - 40px)';    
        }
        else {
            document.getElementById("console").style.height = "26px";
            document.getElementById("console_container").style.display = "none";
            document.getElementById("iframe").style.height = 'calc(100% - 66px)';
        }
        this.setState({openConsole: (!this.state.openConsole)});
    }
    
    closeConsole() {
        this.setState({openConsole: false});
        document.getElementById("console").style.height = "26px";
        document.getElementById("console_container").style.display = "none";
        document.getElementById("iframe").style.height = 'calc(100% - 66px)';
    }

    render() {
        return (
            <div className="Console" id="console">

                <div className="console_contaniner" id="console_container">
                    <div className="console_tab" id="console_tab">
                        <button style={{float: 'left'}}>
                            <i className="fas fa-ban"></i>
                        </button>
                        <button style={{float: 'right'}} onClick={() => this.closeConsole()}>
                            <i className="fas fa-chevron-down"></i>
                        </button>
                    </div>
                    <div className="console_result" style={{height: 'calc(100% - 52px)'}}>
                        {/* console result */}
                    </div>
                    <div className="console_input" style={{display: 'flex',alignItems: 'center', width: '100%', backgroundColor: '#f0f0f00d', color: '#f0f0f0'}}>
                        <i className="fas fa-chevron-right" style={{width: '10px', height: '10px', paddingLeft: '5px'}}></i>
                        <input style={{width: 'calc(100% - 25px)', backgroundColor: 'transparent', color: '#f0f0f0', borderStyle: 'none', outline: 'none', padding: '5px'}} />
                    </div>
                </div>

                <div className="footer_bar" id="footer_bar">
                    <button onClick={() => this.openConsole()}>
                        Console
                    </button>
                </div>
                    
            </div>
        );
    }
}

export default Console;