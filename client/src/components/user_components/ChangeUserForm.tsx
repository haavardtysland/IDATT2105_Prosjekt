import { TextField, Typography, Button } from '@material-ui/core';
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import User from '../../interfaces/User';
import UserResponse from '../../interfaces/UserResponse';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginBottom: theme.spacing(1),
    },
  })
);

interface Props {
  user: UserResponse | undefined;
  changeFirstname: (name: string) => void;
  changeSurname: (name: string) => void;
  changePhone: (num: string) => void;
  changePassword: (newPassword: string) => void;
}

function CreateUserForm({
  changeFirstname,
  changeSurname,
  changePhone,
  changePassword,
  user,
}: Props) {
  const classes = useStyles();

  const [firstname, setFirstname] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const onChangeFirstname = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstname((event.target as HTMLInputElement).value);
  };

  const onChangeSurname = (event: ChangeEvent<HTMLInputElement>) => {
    setSurname((event.target as HTMLInputElement).value);
  };

  const onChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone((event.target as HTMLInputElement).value);
  };

  const onChangeNewPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword((event.target as HTMLInputElement).value);
  };

  return (
    <Container>
      {user != undefined && (
        <Fragment>
          <Typography style={{ textAlign: 'center' }} variant="h5">
            Endre fornavn
          </Typography>
          <TextField
            defaultValue={user.firstName}
            variant="outlined"
            className={classes.textField}
            id="standard-number"
            label="Fornavn"
            onChange={onChangeFirstname}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button onClick={() => changeFirstname(firstname)}>
            Endre fornavn
          </Button>
          <Typography
            style={{ textAlign: 'center', paddingTop: '1rem' }}
            variant="h5"
          >
            Endre etternavn
          </Typography>
          <TextField
            defaultValue={user.surname}
            variant="outlined"
            className={classes.textField}
            label="Etternavn"
            onChange={onChangeSurname}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button onClick={() => changeSurname(surname)}>
            Endre etternavn
          </Button>
          <Typography
            style={{ textAlign: 'center', paddingTop: '1rem' }}
            variant="h5"
          >
            Epost (Du kan ikke endre denne)
          </Typography>
          <TextField
            defaultValue={user.email}
            variant="outlined"
            disabled
            className={classes.textField}
            label="Epost"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Typography
            style={{ textAlign: 'center', paddingTop: '1rem' }}
            variant="h5"
          >
            Endre telefonnummer
          </Typography>
          <TextField
            defaultValue={user.phoneNumber}
            variant="outlined"
            className={classes.textField}
            label="Telefon"
            type="number"
            onChange={onChangePhone}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button onClick={() => changePhone(phone)}>
            Endre telefonnummer
          </Button>
          <Typography
            style={{ textAlign: 'center', paddingTop: '1rem' }}
            variant="h5"
          >
            Utløpsdato (Du kan ikke endre denne)
          </Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              value={new Date(user.validDate)}
              onChange={() => console.log('snekker')}
              style={{ marginBottom: '1rem' }}
              inputVariant="outlined"
              placeholder={user.validDate}
              disabled
              format="MM/dd/yyyy"
            />
          </MuiPickersUtilsProvider>
          <Typography
            style={{ textAlign: 'center', paddingTop: '1rem' }}
            variant="h5"
          >
            Endre passord
          </Typography>
          <Typography
            style={{ textAlign: 'center', paddingTop: '1rem' }}
            variant="h6"
          >
            Skriv inn det nye passordet
          </Typography>
          <TextField
            value={newPassword}
            variant="outlined"
            className={classes.textField}
            label="Nytt passord"
            onChange={onChangeNewPassword}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button onClick={() => changePassword(newPassword)}>
            Endre passord
          </Button>{' '}
        </Fragment>
      )}
    </Container>
  );
}

export default CreateUserForm;
