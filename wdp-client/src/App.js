import React, { Component } from 'react';
import {Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Home from './components/pages/home/Home';
import Editor from './components/pages/editor/Editor';
import SignIn from './components/pages/signin/SignIn';
import SignUp from './components/pages/signup/SignUp';
import Help from './components/pages/help/Help';
import Profile from './components/pages/profile/Profile';
import Dashboard from './components/pages/dashboard/Dashboard';

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
                    <Route exact path = '/help'>
                        <Help />
                    </Route>
                    <PrivateRoute exact path ='/profile'>
                        <Profile />
                    </PrivateRoute>
                    <PrivateRoute exact path = '/dashboard'>
                        <Dashboard />
                    </PrivateRoute>
                    <Route path="/" render={() => <Redirect to='/home' />} />
                </Switch>
            </BrowserRouter>


        );
    }
}

export default App;