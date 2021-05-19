import { GridList } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import User from '../../interfaces/User';
import UserCard from './UserCard';
import Pageination from '@material-ui/lab/Pagination';
import axios from 'axios';

const Container = styled.div`
  padding: 1rem;
  padding-bottom: 3rem;
  width: 60%;
  margin-top: 2rem;
  width: 100%;
  height: 100%;
`;

interface Props {
  users: User[];
  deleteUser: (userId: number) => void;
  resendPassword: (user: User) => void;
}

function UserGrid({ users, deleteUser, resendPassword }: Props) {
  const [page, setPage] = useState<number>(1);
  const [currentUsers, setCurrentUsers] = useState<User[]>(users);

  useEffect(() => {
    const startIndex = (page - 1) * 12;
    const endIndex = page * 12;
    setCurrentUsers(users.slice(startIndex, endIndex));
  }, [page, users]);

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container>
      <GridList
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem',
        }}
        cols={3}
      >
        {users.map((user, index) => (
          <UserCard
            deleteUser={() => deleteUser(user.userId)}
            resendPassword={() => resendPassword(user)}
            key={index}
            user={user}
          ></UserCard>
        ))}
      </GridList>
      <Pageination
        style={{
          justifyContent: 'center',
          display: 'flex',
          marginBottom: '3rem',
        }}
        onChange={onPageChange}
        count={Math.ceil(users.length / 12)}
        size="large"
      />
    </Container>
  );
}

export default UserGrid;
