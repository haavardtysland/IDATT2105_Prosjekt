import React from 'react';
import { Route, Switch } from 'react-router';
import Bar from './components/BarComponents/Bar';
import AddUser from './containers/AddUser';
import Login from './containers/Login';
import MainPage from './containers/MainPage';
import RoomPage from './containers/RoomPage';

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <div>
      <Bar></Bar>
      <Route exact path="/mainPage" component={MainPage} />
      <Route exact path="/RoomPage" component={RoomPage} />
      <Route exact path="/addUser" component={AddUser} />
    </div>
  </Switch>
);
