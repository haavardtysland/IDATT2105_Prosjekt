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
import AdminRoutes from './AdminRoutes';
import UserRoutes from './UserRoutes';

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <div>
      <Bar></Bar>
      <AdminRoutes
        exact
        path="/administrate/room"
        component={RoomAdministration}
      />
      <AdminRoutes
        exact
        path="/administrate/user"
        component={UserAdministration}
      />
      <AdminRoutes
        exact
        path="/administarte/reservation"
        component={ReservationAdministration}
      />
      <UserRoutes exact path="/mainPage" component={MainPage} />
      <UserRoutes exact path="/RoomPage/:roomID" component={RoomPage} />
      <AdminRoutes exact path="/addUser" component={CreateUser} />
      <AdminRoutes exact path="/addRoom" component={CreateRoom} />
      <UserRoutes exact path="/mineBestillinger" component={ReservationPage} />
      <UserRoutes exact path="/MyUser" component={MyUser} />
    </div>
  </Switch>
);
