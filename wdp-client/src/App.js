import React, { Component } from 'react';
import { Link, Router, Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import HomePage from './components/HomePage';
import CodePage from './components/CodePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

class App extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/home">
                        <HomePage />
                    </Route>
                    <Route exact path='/code'>
                        <CodePage />
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