import React, { Component } from 'react';
import { Link, Router, Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Home from './components/home/Home';
import Editor from './components/editor/Editor';
import SignIn from './components/signin/SignIn';
import SignUp from './components/signup/SignUp';

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
                    <Route exact path="/" render={() => <Redirect to='/home' />} />
                </Switch>
            </BrowserRouter>


        );
    }
}

export default App;