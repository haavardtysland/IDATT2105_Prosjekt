import { Button, TextField, Typography } from '@material-ui/core';
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import axios from '../axios';
import Popup from '../components/Popup';
import ChangeUserForm from '../components/user_components/ChangeUserForm';
import { Context } from '../Context';
import UserResponse from '../interfaces/UserResponse';
import config from '../Config';

const Container = styled.div`
  padding-top: 13%;
  padding-right: 3%;
  padding-left: 3%;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 1rem;
`;

function MyUser() {
  const [useren, setUser] = useState<UserResponse>();
  const { user } = useContext(Context.UserContext);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [password, setPassword] = useState<string>();
  const [method, setMethod] =
    useState<(value: string, passord: string) => void>();
  const [value, setValue] = useState<string>();

  const getUser = () => {
    axios
      .get(`/user/${user.id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => alert(err.response.data.error));
  };

  useEffect(() => {
    getUser();
  }, []);

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword((event.target as HTMLInputElement).value);
  };

  //The reason why the update methods are takong inn password and not just getting it from the state
  //is because when you setMethod in the change-mehtods (ie: changeFirstname) it stores the
  //state as it is when you are setting the method. The password state is undefined when you are setting the metod.
  const updateFirstname = (firstname: string, passord: string) => {
    if (useren && passord) {
      axios
        .put(`/user/edit/${useren?.userId}/user`, {
          firstName: firstname,
          surName: useren.surname,
          email: useren.email,
          isAdmin: useren.isAdmin,
          validDate: useren.validDate,
          password: passord,
          newpassword: passord,
          phoneNumber: useren.phoneNumber,
        }, config)
        .then(() => alert('Du endret fornavn'))
        .then(() => setOpenPopup(false))
        .catch((err) => alert(err.response.data.error));
    }
  };

  const changeFirstname = (firstname: string) => {
    if (firstname != '') {
      setOpenPopup(true);
      setValue(firstname);
      setMethod(() => updateFirstname);
    }
  };

  const changeSurname = (surname: string) => {
    if (surname != '') {
      setOpenPopup(true);
      setValue(surname);
      setMethod(() => updateSurname);
    }
  };

  const updateSurname = (surname: string, passord: string) => {
    if (useren && passord) {
      axios
        .put(`/user/edit/${useren?.userId}/user`, {
          firstName: useren.firstName,
          surName: surname,
          email: useren.email,
          isAdmin: useren.isAdmin,
          validDate: useren.validDate,
          password: passord,
          newpassword: passord,
          phoneNumber: useren.phoneNumber,
        }, config)
        .then(() => alert('Du endret etternavn'))
        .then(() => setOpenPopup(false))
        .catch((err) => alert(err.response.data.error));
    }
  };

  const changePassword = (newPassword: string) => {
    if (newPassword != '') {
      setOpenPopup(!openPopup);
      setValue(newPassword);
      setMethod(() => updatePassword);
    }
  };

  const updatePassword = (newPassword: string, passord: string) => {
    if (useren && passord) {
      axios
        .put(`/user/edit/${useren?.userId}/user`, {
          firstName: useren.firstName,
          surName: useren.surname,
          email: useren.email,
          isAdmin: useren.isAdmin,
          validDate: useren.validDate,
          password: passord,
          newpassword: newPassword,
          phoneNumber: useren.phoneNumber,
        }, config)
        .then(() => alert('Du endret passord'))
        .then(() => setOpenPopup(false))
        .catch((err) => alert(err.response.data.error));
    }
  };

  const onConfirm = () => {
    setOpenPopup(false);
    console.log(method);
    if (method && value && password) {
      method(value, password);
    }
  };

  const changePhoneNumber = (phoneNumber: string) => {
    if (phoneNumber != '') {
      setOpenPopup(!openPopup);
      setValue(phoneNumber);
      setMethod(() => updatePhoneNumber);
    }
  };

  const updatePhoneNumber = (phoneNumber: string, passord: string) => {
    if (useren && passord) {
      axios
        .put(`/user/edit/${useren.userId}/user`, {
          firstName: useren.firstName,
          surName: useren.surname,
          email: useren.email,
          isAdmin: useren.isAdmin,
          validDate: useren.validDate,
          password: passord,
          newpassword: passord,
          phoneNumber: phoneNumber,
        }, config)
        .then(() => alert('Du endret mobilnummer'))
        .then(() => setOpenPopup(false))
        .catch((err) => alert(err.response.data.error));
    }
  };

  return (
    <Container>
      <ChangeUserForm
        user={useren}
        changeFirstname={(name) => changeFirstname(name)}
        changeSurname={(name) => changeSurname(name)}
        changePhone={(num) => changePhoneNumber(num)}
        changePassword={(newPassword: string) => changePassword(newPassword)}
      ></ChangeUserForm>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <Flex>
          <Typography style={{ marginBottom: '1rem' }} variant="h6">
            Skriv inn nytt passord
          </Typography>
          <TextField
            variant="outlined"
            label="Passord"
            type="password"
            onChange={onChangePassword}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button onClick={onConfirm}>Bekreft</Button>
        </Flex>
      </Popup>
    </Container>
  );
}

export default MyUser;
