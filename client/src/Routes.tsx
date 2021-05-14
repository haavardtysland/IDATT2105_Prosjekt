import React from 'react';
import { Route, Switch } from 'react-router';
import Bar from './components/Bar';
import AddUser from './containers/AddUser';
import Login from './containers/Login';
import MainPage from './containers/MainPage';

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <div>
      <Bar></Bar>
      <Route exact path="/mainPage" component={MainPage} />
      <Route exact path="/addUser" component={AddUser} />
    </div>
  </Switch>
);
