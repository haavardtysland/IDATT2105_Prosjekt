import React from 'react';
import { Route, Switch } from 'react-router';
import Bar from './components/BarComponents/Bar';
import CreateRoom from './containers/CreateRoom';
import CreateUser from './containers/CreateUser';
import Login from './containers/Login';
import MainPage from './containers/MainPage';
import RoomPage from './containers/RoomPage';
import ReservationPage from './containers/ReservationPage';

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <div>
      <Bar></Bar>
      <Route exact path="/mainPage" component={MainPage} />
      <Route exact path="/RoomPage" component={RoomPage} />
      <Route exact path="/addUser" component={CreateUser} />
      <Route exact path="/addRoom" component={CreateRoom} />
      <Route exact path="/mineBestillinger" component={ReservationPage} />
    </div>
  </Switch>
);
