import { TextField, Typography, Button } from '@material-ui/core';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import styled from 'styled-components';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import SectionAdder from './SectionAdder';
import Room from '../interfaces/Room';

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
  room?: Room;
  nameChange: (name: string) => void;
  capacityChange: (cap: number) => void;
  sectionsChange: (sections: any[]) => void;
}

function CreateRoomForm({
  nameChange,
  capacityChange,
  sectionsChange,
  room,
}: Props) {
  const classes = useStyles();

  const [roomname, setRoomname] = useState<string>('');
  const [capacity, setCapacity] = useState<number>(0);

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomname((event.target as HTMLInputElement).value);
  };

  const onCapacityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCapacity(parseInt((event.target as HTMLInputElement).value));
  };

  useEffect(() => {
    if (room) {
      setRoomname(room?.name);
      setCapacity(room?.capacity);
    }
  }, [room]);

  useEffect(() => {
    nameChange(roomname);
    capacityChange(capacity);
  }, [roomname, capacity]);

  return (
    <Container>
      <Typography style={{ textAlign: 'center' }} variant="h5">
        Skriv inn romnavn
      </Typography>
      <TextField
        value={roomname}
        variant="outlined"
        className={classes.textField}
        id="standard-number"
        label="Romnavn"
        onChange={onNameChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Typography
        style={{ textAlign: 'center', paddingTop: '1rem' }}
        variant="h5"
      >
        Skriv max kapasitet
      </Typography>
      <TextField
        value={capacity}
        variant="outlined"
        type="number"
        className={classes.textField}
        label="Etternavn"
        onChange={onCapacityChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Typography
        style={{ textAlign: 'center', paddingTop: '1rem' }}
        variant="h5"
      >
        Legg til seksjoner
      </Typography>
      <SectionAdder sectionsChange={sectionsChange}></SectionAdder>
    </Container>
  );
}

export default CreateRoomForm;
