import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdministrateButtons from '../../components/AdministrateButtons';
import axios from '../../axios';
import User from '../../interfaces/User';
import UserGrid from '../../components/user_components/UserGrid';
import ChangeRoom from '../../components/room_components/ChangeRoom';
import Room from '../../interfaces/Room';
import config from '../../Config'
const Container = styled.div`
  padding-top: 13%;
  padding-right: 3%;
  padding-left: 3%;
`;
function UserAdministration() {
  const [users, setUsers] = useState<User[]>([]);

  const loadUsers = () => {
    axios.get('/user').then((response) => {
      setUsers(response.data['users']);
    });
  };

  const deleteUser = (userId: number) => {
    axios
      .delete(`/user/${userId}`, config)
      .then(() => setUsers(users.filter((user) => user.userId != userId)));
  };

  const renewAccess = (user: User, time: Date) => {
    if (!(time instanceof Date)) {
      alert('Du må endre datoen');
      return;
    }
    const date: string = time.toISOString().slice(0, 10);
    axios
      .put(`user/edit/${user.userId}`, {
        firstName: user.firstName,
        surName: user.surname,
        email: user.email,
        isAdmin: user.isAdmin,
        validDate: date,
        password: false,
        phoneNumber: user.phoneNumber,
      }, config)
      .then(() => alert(`${user.email} er nå gyldig til ${date}`))
      .catch((err) => alert(err.data.error));
  };

  const resendPassword = (user: User) => {
    axios
      .put(`user/edit/${user.userId}`, {
        firstName: user.firstName,
        surName: user.surname,
        email: user.email,
        isAdmin: user.isAdmin,
        validDate: user.validDate,
        password: true, //if true send new password. if false use the oldone.
        phoneNumber: user.phoneNumber,
      }, config)
      .then(() => alert(`${user.email} har fått tilsendt et nytt passord`))
      .catch((err) => alert(err.data.error));
  };

  useEffect(loadUsers, []);
  return (
    <Container>
      <AdministrateButtons />
      <UserGrid
        renewAccess={(user, time) => renewAccess(user, time)}
        deleteUser={deleteUser}
        resendPassword={resendPassword}
        users={users}
      ></UserGrid>
    </Container>
  );
}

export default UserAdministration;
