import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import * as Demo from "./demo";
import { Hook, Console } from "console-feed";

class Terminal extends Component {
  state = {
    logs: Demo.Initial
  };

  componentDidMount() {
    Hook(
      window.console,
      log => {
        this.setState({ logs: [...this.state.logs, log] });
      },
      false
    );
    Demo.Logs();
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

export default withRouter(Terminal);
