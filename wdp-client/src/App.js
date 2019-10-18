import React, { Component } from 'react';
import { Link, Router, Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Home from './home/home';
import Editor from './editor/editor';
import SignIn from './signin/signin';
import SignUp from './signup/signup';

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
                    <Route exact path='/code'>
                        <Editor />
                    </Route>
                    <Route exact path = '/signin'>
                        <SignIn />
                    </Route>
                    <Route exact path = '/signup'>
                        <SignUp />
                    </Route>
                    <Route exact path="/" render={() => <Redirect to='/home' />} />
                </Switch>
            </BrowserRouter>


        );
    }
}

export default App;