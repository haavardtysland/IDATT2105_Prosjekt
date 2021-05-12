import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './containers/Login';

export default (
  <Switch>
    <Route exact path="/" component={Login} />
  </Switch>
);
