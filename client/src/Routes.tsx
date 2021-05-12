import React from 'react';
import { Route, Switch } from 'react-router';
import Bar from './components/Bar';
import Login from './containers/Login';
import MainPage from './containers/MainPage';

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <div>
      <Bar></Bar>
      <Route exact path="/mainPage" component={MainPage} />
    </div>
  </Switch>
);
