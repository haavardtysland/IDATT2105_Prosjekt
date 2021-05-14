import { TextField, Typography, Button } from '@material-ui/core';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import styled from 'styled-components';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid black;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginBottom: theme.spacing(1),
    },
  })
);

interface Props {
  changeFirstname: (name: string) => void;
  changeSurname: (name: string) => void;
  changeEmail: (mail: string) => void;
  changeDate: (dato: Date) => void;
  changePhone: (num: number) => void;
}

function AddUserForm({
  changeFirstname,
  changeSurname,
  changeEmail,
  changeDate,
  changePhone,
}: Props) {
  const classes = useStyles();

  const [firstname, setFirstname] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [phone, setPhone] = useState<number>(0);

  const onChangeDate = (event: Date | null) => {
    if (event) {
      setDate(event);
    }
  };

  const onChangeFirstname = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstname((event.target as HTMLInputElement).value);
  };

  const onChangeSurname = (event: ChangeEvent<HTMLInputElement>) => {
    setSurname((event.target as HTMLInputElement).value);
  };

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail((event.target as HTMLInputElement).value);
  };

  const onChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(parseInt((event.target as HTMLInputElement).value));
  };

  useEffect(() => {
    changeFirstname(firstname);
    changeSurname(surname);
    changeEmail(email);
    changeDate(date);
    changePhone(phone);
  }, [date, firstname, surname, email, phone]);

  return (
    <Container>
      <Typography style={{ textAlign: 'center' }} variant="h5">
        Skriv inn fornavn
      </Typography>
      <TextField
        variant="outlined"
        className={classes.textField}
        id="standard-number"
        label="Fornavn"
        onChange={onChangeFirstname}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Typography
        style={{ textAlign: 'center', paddingTop: '1rem' }}
        variant="h5"
      >
        Skriv inn etternavn
      </Typography>
      <TextField
        variant="outlined"
        className={classes.textField}
        label="Etternavn"
        onChange={onChangeSurname}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Typography
        style={{ textAlign: 'center', paddingTop: '1rem' }}
        variant="h5"
      >
        Skriv inn epost
      </Typography>
      <TextField
        variant="outlined"
        className={classes.textField}
        label="Epost"
        onChange={onChangeEmail}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Typography
        style={{ textAlign: 'center', paddingTop: '1rem' }}
        variant="h5"
      >
        Skriv inn telefonnummer
      </Typography>
      <TextField
        variant="outlined"
        className={classes.textField}
        label="Telefon"
        type="number"
        onChange={onChangePhone}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Typography
        style={{ textAlign: 'center', paddingTop: '1rem' }}
        variant="h5"
      >
        Skriv inn utløpsdato
      </Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          style={{ marginBottom: '1rem' }}
          inputVariant="outlined"
          value={new Date(date)}
          placeholder=""
          onChange={(date) => onChangeDate(date)}
          format="MM/dd/yyyy"
        />
      </MuiPickersUtilsProvider>
    </Container>
  );
}

export default AddUserForm;
