import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import * as Demo from "./demo";
import { Hook, Console } from "console-feed";

class ConsoleElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: Demo.Initial
    };
  }
  
  componentDidMount() {
    Hook(
      window.console,
      log => {
        this.props.history.listen((location) => {
          if (location.state.command) this.setState({ logs: [...this.state.logs,  { method: "command", data: [location.state.command] }] })
        });
        if (log.method !== "warn" && log.method !== "error") 
          this.setState({ logs: [...this.state.logs, log] });
        document.getElementById("console_result").scrollTop=document.getElementById("console_result").scrollHeight;
      },
      false
    );
    Hook(
      document.getElementById('iframe').contentWindow.console,
      log => {
        this.setState({ logs: [...this.state.logs, log] });
        document.getElementById("console_result").scrollTop=document.getElementById("console_result").scrollHeight;
      },
      false
    );
  }

  render() {
    return (
      <div style={{ backgroundColor: "#1e1e1e" }}>
        <Console logs={this.state.logs} variant="dark" />
      </div>
    );
  }
}

if (console.feed) {
  Object.keys(console.feed.pointers).forEach(key => {
    console[key] = console.feed.pointers[key];
  });
}

export default withRouter(ConsoleElement);
