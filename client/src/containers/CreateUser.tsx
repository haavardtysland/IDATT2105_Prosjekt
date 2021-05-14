import React, { useState } from 'react';
import styled from 'styled-components';
import CreateUserForm from '../components/CreateUserForm';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography, Button } from '@material-ui/core';

const Container = styled.div`
  padding-top: 7%;
  padding-right: 3%;
  padding-left: 3%;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;
function AddUser() {
  const [firstname, setFirstname] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [phone, setPhone] = useState<number>(0);

  return (
    <Container>
      <CreateUserForm
        changeFirstname={(name) => setFirstname(name)}
        changeSurname={(name) => setSurname(name)}
        changeEmail={(name) => setEmail(name)}
        changeDate={(date) => setDate(date)}
        changePhone={(num) => setPhone(num)}
      ></CreateUserForm>
      <Flex>
        <Typography
          style={{ textAlign: 'center', marginTop: '1.2rem' }}
          variant="h5"
        >
          Er brukeren administrator?
        </Typography>
        <Checkbox style={{}}></Checkbox>
        <Button style={{ marginLeft: '2rem', padding: '1.5rem' }}>
          Lag bruker
        </Button>
      </Flex>
    </Container>
  );
}

export default AddUser;
