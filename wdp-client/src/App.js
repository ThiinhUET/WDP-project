import React, { Component } from 'react';
import {Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Home from './components/home/Home';
import Editor from './components/editor/Editor';
import SignIn from './components/signin/SignIn';
import SignUp from './components/signup/SignUp';
import Profile from './components/profile/Profile';
import Dashboard from './components/dashboard/Dashboard';
import NewTree from './components/editor/new_tree/Tree';

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
                        <NewTree />
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