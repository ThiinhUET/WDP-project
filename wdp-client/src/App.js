import React, { Component } from 'react';
import {Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Home from './page/home/Home';
import Editor from './page/editor/Editor';
import SignIn from './page/signin/SignIn';
import SignUp from './page/signup/SignUp';
import Profile from './page/profile/Profile';
import Dashboard from './page/dashboard/Dashboard';
import Terminal from './components/editor/console/CodeSandBoxCS'

function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={() => localStorage.uid ? (children) : (<Redirect to='/signin' />)}
        />
    );
}

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path = "/home">
                        <Home />
                    </Route>
                    <Route path = '/editor'>
                        <Editor />
                    </Route>
                    <Route exact path = '/signin'>
                        <SignIn />
                    </Route>
                    <Route exact path = '/signup'>
                        <SignUp />
                    </Route>
                    <Route exact path = '/tree'>
                        <Terminal />
                    </Route>
                    <PrivateRoute exact path ='/profile'>
                        <Profile />
                    </PrivateRoute>
                    <PrivateRoute exact path = '/dashboard'>
                        <Dashboard />
                    </PrivateRoute>
                    <Route exact path="/" render={() => <Redirect to='/home' />} />
                </Switch>
            </BrowserRouter>


        );
    }
}

export default App;