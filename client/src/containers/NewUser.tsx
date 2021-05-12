import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import NewUserCard from '../components/NewUserCard';
import { useQuery, gql, useMutation } from '@apollo/client';
import { GET_USER_NAMES } from '../graphQL/Queries';
import { CREATE_USER } from '../graphQL/Mutations';

const NewUsernContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #334d50; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #cbcaa5,
    #334d50
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #cbcaa5,
    #334d50
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

interface User {
  username: string;
  __typename: string;
}

const isUsernameInUse = (username: string, usernames: User[]): boolean => {
  const user = usernames.filter(
    (name) => name.username.toUpperCase() == username.toUpperCase()
  );
  if (user.length >= 1) return true;
  return false;
};

const NewUser = () => {
  const history = useHistory();
  const { loading, data } = useQuery(GET_USER_NAMES);
  const [createUser] = useMutation(CREATE_USER);

  const create = async (username: string, password: string) => {
    const usernames: User[] = await data.getUsers;
    if (!isUsernameInUse(username, usernames)) {
      createUser({
        variables: {
          username: username,
          password: password,
        },
      }).then((data) => {
        if (data.data.createUser) history.push('/');
      });
    } else {
      alert('Brukernavnet er allerede i bruk');
    }
  };

  const goBack = () => {
    history.push('/');
  };

  return (
    <NewUsernContainer>
      <NewUserCard goBack={goBack} createUser={create}></NewUserCard>
    </NewUsernContainer>
  );
};

export default NewUser;
