import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import CreateUserForm from '../../components/CreateUserForm';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography, Button } from '@material-ui/core';
import axios from '../../axios';

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
  const [firstname, setFirstname] = useState<string>();
  const [surname, setSurname] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [date, setDate] = useState<Date>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [phone, setPhone] = useState<number>();

  const createUser = () => {
    if (
      firstname != undefined &&
      surname != undefined &&
      email != undefined &&
      date != undefined &&
      isAdmin != undefined &&
      phone != undefined
    ) {
      axios
        .post('/user', {
          firstName: firstname,
          surName: surname,
          email: email,
          isAdmin: isAdmin,
          validDate: date.toISOString().slice(0, 10),
          phoneNumber: phone,
        })
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            alert('Du opprettet brukeren');
          }
        });
    } else {
      alert('Fyll inn alle felt');
      console.log(firstname);
      console.log(surname);
      console.log(date);
      console.log(email);
      console.log(isAdmin);
      console.log(phone);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(event.target.checked);
  };

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
        <Checkbox onChange={handleChange}></Checkbox>
        <Button
          onClick={createUser}
          style={{ marginLeft: '2rem', padding: '1.5rem' }}
        >
          Lag bruker
        </Button>
      </Flex>
    </Container>
  );
}

export default AddUser;
