import { Button, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Calendar } from '@material-ui/pickers';
import Form from '../components/Form';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import axios from '../axios';
import Room from '../interfaces/Room';
import RoomGrid from '../components/RoomGrid';

const Container = styled.div`
  padding-top: 8%;
  padding-right: 3%;
  padding-left: 3%;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: '10%',
      height: '10%',
      margin: '1rem',
      padding: '2rem',
    },
  })
);

const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

function MainPage() {
  const classes = useStyles();
  const [fromTime, setFromTime] = useState<number>();
  const [toTime, setToTime] = useState<number>();
  const [minCapacity, setMinCapacity] = useState<number>();
  const [rooms, setRooms] = useState<Room[]>();

  const getAvailible = () => {
    console.log(1);
  };

  const getAllRooms = () => {
    axios.get('/room').then((response) => {
      console.log(response.data);
      setRooms(response.data);
    });
  };

  return (
    <Container>
      <Form
        changeFromTime={(num) => setFromTime(num)}
        changeToTime={(num) => setToTime(num)}
        changeMinCapacity={(num) => setMinCapacity(num)}
      ></Form>
      <Flex>
        <Button className={classes.button}>Vis ledige rom</Button>
        <Button onClick={getAllRooms} className={classes.button}>
          Vis alle rom
        </Button>
      </Flex>
      {rooms && <RoomGrid rooms={rooms}></RoomGrid>}
    </Container>
  );
}

export default MainPage;
