import React from 'react';
import { Route, Switch } from 'react-router';
import Bar from './components/bar_components/Bar';
import CreateRoom from './containers/AdminContainers/CreateRoom';
import CreateUser from './containers/AdminContainers/CreateUser';
import Login from './containers/Login';
import MainPage from './containers/MainPage';
import RoomPage from './containers/RoomPage';
import ReservationPage from './containers/ReservationPage';
import RoomAdministration from './containers/AdminContainers/RoomAdministration';
import UserAdministration from './containers/AdminContainers/UserAdministration';
import ReservationAdministration from './containers/AdminContainers/ReservationAdministration';
import MyUser from './containers/MyUser';

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <div>
      <Bar></Bar>
      <Route exact path="/administrate/room" component={RoomAdministration} />
      <Route exact path="/administrate/user" component={UserAdministration} />
      <Route
        exact
        path="/administarte/reservation"
        component={ReservationAdministration}
      />
      <Route exact path="/mainPage" component={MainPage} />
      <Route exact path="/RoomPage" component={RoomPage} />
      <Route exact path="/addUser" component={CreateUser} />
      <Route exact path="/addRoom" component={CreateRoom} />
      <Route exact path="/mineBestillinger" component={ReservationPage} />
      <Route exact path="/MyUser" component={MyUser} />
    </div>
  </Switch>
);
