import React, { Component } from 'react';
import { Link, Router, Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Home from './home/Home1';
import Editor from './editor/Editor1';
import SignIn from './signin/SignIn1';
import SignUp from './signup/SignUp1';
import FileExplore from './editor/FileExplore';

class App extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/home">
                        <Home />
                    </Route>
                    <Route exact path='/editor'>
                        <Editor />
                    </Route>
                    <Route exact path = '/signin'>
                        <SignIn />
                    </Route>
                    <Route exact path = '/signup'>
                        <SignUp />
                    </Route>
                    <Route exact path = '/test'>
                        <FileExplore />
                    </Route>
                    <Route exact path="/" render={() => <Redirect to='/home' />} />
                </Switch>
            </BrowserRouter>


        );
    }
}

export default App;