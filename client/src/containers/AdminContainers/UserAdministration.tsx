import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdministrateButtons from '../../components/AdministrateButtons';
import axios from '../../axios';
import User from '../../interfaces/User';
import UserGrid from '../../components/user_components/UserGrid';
import ChangeRoom from '../../components/ChangeRoom';
import Room from '../../interfaces/Room';
const Container = styled.div`
  padding-top: 8%;
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
      .delete(`/user/${userId}`)
      .then(() => setUsers(users.filter((user) => user.userId != userId)));
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
      })
      .then(() => alert(`${user.email} har fått tilsendt et nytt passord`))
      .catch((err) => alert(err.data.error));
  };

  useEffect(loadUsers, []);
  return (
    <Container>
      <AdministrateButtons />
      <UserGrid
        deleteUser={deleteUser}
        resendPassword={resendPassword}
        users={users}
      ></UserGrid>
    </Container>
  );
}

export default UserAdministration;
