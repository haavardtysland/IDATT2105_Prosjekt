import { TextField, Typography, Button } from '@material-ui/core';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import styled from 'styled-components';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TimePicker from './Timepicker';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid black;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginBottom: theme.spacing(3),
    },
  })
);

interface Props {
  changeFromTime: (time: number) => void;
  changeToTime: (time: number) => void;
  changeMinCapacity: (min: number) => void;
}

function Form({ changeFromTime, changeToTime, changeMinCapacity }: Props) {
  const classes = useStyles();
  const [date, setDate] = useState<Date>(new Date());
  const [fromTime, setFromTime] = useState<number>(0);
  const [toTime, setToTime] = useState<number>(0);
  const [minCapacity, setMinCapacity] = useState<number>(0);

  const onChangeDate = (event: Date | null) => {
    if (event) {
      console.log(event);
      const dato: Date = new Date(
        event.getFullYear(),
        event.getMonth(),
        event.getDate()
      );
      setDate(dato);
    }
  };

  useEffect(() => {
    changeFromTime(date.getTime() + fromTime);
    changeToTime(date.getTime() + toTime);
    changeMinCapacity(minCapacity);
  }, [fromTime, toTime, date, minCapacity]);

  const onCapacityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMinCapacity(parseInt((event.target as HTMLInputElement).value));
  };

  return (
    <Container>
      <Typography style={{ textAlign: 'center' }} variant="h5">
        Velg dato
      </Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          inputVariant="outlined"
          minDate={new Date()}
          value={new Date(date)}
          placeholder=""
          onChange={(date) => onChangeDate(date)}
          format="dd/MM/yyyy"
        />
      </MuiPickersUtilsProvider>
      <Typography
        style={{ textAlign: 'center', paddingTop: '1rem' }}
        variant="h5"
      >
        Velg starttidspunkt
      </Typography>
      <TimePicker onTimeChange={(num) => setFromTime(num)}></TimePicker>
      <Typography
        style={{ textAlign: 'center', paddingTop: '1rem' }}
        variant="h5"
      >
        Velg sluttidspunkt
      </Typography>
      <TimePicker onTimeChange={(num) => setToTime(num)}></TimePicker>
      <Typography
        style={{ textAlign: 'center', paddingTop: '1rem' }}
        variant="h5"
      >
        Minimum antall plasser
      </Typography>
      <TextField
        variant="outlined"
        className={classes.textField}
        id="standard-number"
        label="Number"
        type="number"
        onChange={onCapacityChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Container>
  );
}

export default Form;
