import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './views/Login';
import Register from './views/Register';
import NotFound from './views/NotFound';
import PrivateRoute from './PrivateRoute';
import Dashboard from './views/user/Dashboard';
const Main = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
    </Switch>
);
export default Main;
