import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdministrateButtons from '../../components/AdministrateButtons';
import axios from '../../axios';
import User from '../../interfaces/User';
import UserGrid from '../../components/user_components/UserGrid';
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

  const resendPassword = (userId: number) => {
    console.log('snekker');
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
