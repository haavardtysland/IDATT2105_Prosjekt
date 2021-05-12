import { TextField, Typography } from '@material-ui/core';
import React, { useState, Fragment } from 'react';
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
`;

function Form() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <Container>
      <Typography style={{ textAlign: 'center' }} variant="h5">
        Velg dato
      </Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          clearable
          value={date}
          placeholder=""
          onChange={(date) => setDate(date)}
          minDate={new Date()}
          format="MM/dd/yyyy"
        />{' '}
      </MuiPickersUtilsProvider>
      <Typography
        style={{ textAlign: 'center', paddingTop: '1rem' }}
        variant="h5"
      >
        Velg starttidspunkt
      </Typography>
      <Typography
        style={{ textAlign: 'center', paddingTop: '1rem' }}
        variant="h5"
      >
        Velg sluttidspunkt
      </Typography>
      <Typography
        style={{ textAlign: 'center', paddingTop: '1rem' }}
        variant="h5"
      >
        Minimum antall plasser
      </Typography>
    </Container>
  );
}

export default Form;
