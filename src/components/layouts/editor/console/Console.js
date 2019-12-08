import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './style.css';
import ConsoleElement from './ConsoleElement';
class Console extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openConsole: true,
            inputCommand: '',
            outputMsg: '//type your command//'
        }
    }

    openConsole() {
        if (!this.state.openConsole) {
            document.getElementById("console").style.height = "30vh";
            document.getElementById("console_container").style.display = "block";
            document.getElementById("iframe").style.height = 'calc(70% - 50px)';
        }
        else {
            document.getElementById("console").style.height = "26px";
            document.getElementById("console_container").style.display = "none";
            document.getElementById("iframe").style.height = 'calc(100% - 66px)';
        }
        this.setState({ openConsole: (!this.state.openConsole) });
    }

    closeConsole() {
        this.setState({ openConsole: false });
        document.getElementById("console").style.height = "26px";
        document.getElementById("console_container").style.display = "none";
        document.getElementById("iframe").style.height = 'calc(100% - 66px)';
    }

    updateCommand(evt) {
        this.setState({ inputCommand: evt.target.value });
    }

    LogMessage(evt) {
        if (evt.key === 'Enter') {
            try{
                eval(this.state.inputCommand);
            }
            catch (e){
                console.log("Invalid Syntax");
            }
            this.setState({ inputCommand: ''});
        }
    }

    clearConsole(){
        let node = document.getElementById("console_result").firstChild.firstChild;
        while (node.firstChild) node.removeChild(node.firstChild);
        eval(`console.log('Console was cleared')`);
    } 

    render() {
        return (
            <div className="Console" id="console">
                <div className="console_contaniner" id="console_container">
                    <div className="console_tab" id="console_tab">
                        <button style={{ float: 'left' }} onClick = {() => this.clearConsole()}>
                            <i className="fas fa-ban"></i>
                        </button>
                        <button style={{ float: 'right' }} onClick={() => this.closeConsole()}>
                            <i className="fas fa-chevron-down"></i>
                        </button>
                    </div>
                     <div ref={this.scrollContainer} className="console_result" id="console_result" style={{ height: 'calc(100% - 52px)' , overflow : 'auto'}} >
                        <ConsoleElement />
                     </div>
                    <div className="console_input" style={{ display: 'flex', alignItems: 'center', width: '100%', backgroundColor: '#f0f0f005', color: '#f0f0f0' }}>
                        <i className="fas fa-chevron-right" style={{ width: '10px', height: '10px', paddingLeft: '5px' }}></i>
                        <input spellCheck="false" style={{ width: 'calc(100% - 25px)', backgroundColor: 'transparent', color: '#f0f0f0', borderStyle: 'none', outline: 'none', padding: '5px' }}
                            value={this.state.inputCommand} onChange={evt => this.updateCommand(evt)} onKeyPress={evt => this.LogMessage(evt)} />
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

export default withRouter(Console);