import { Button, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Route, useHistory, Switch } from 'react-router';
import RoomAdministration from './RoomAdministration';
import UserAdministration from './UserAdministration';
import ReservationAdministration from './ReservationAdministration';

const Container = styled.div`
  display: flex;
  padding-top: 7%;
  padding-right: 3%;
  padding-left: 3%;
  justify-content: center;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: '25%',
      height: '90%',
      marginLeft: '2rem',
      marginRight: '2rem',
      padding: '2rem',
    },
  })
);

function Administrate() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Container>
      <Button
        onClick={() => history.push('/administrate/room')}
        className={classes.button}
      >
        <Typography variant="h5">
          Administrer <br></br> rom
        </Typography>
      </Button>
      <Button
        onClick={() => history.push('/administrate/user')}
        className={classes.button}
      >
        <Typography variant="h5">
          Administrer <br></br> brukere
        </Typography>
      </Button>
      <Button
        onClick={() => history.push('/administarte/reservation')}
        className={classes.button}
      >
        <Typography variant="h5">
          Administrer <br></br> reservasjoner
        </Typography>
      </Button>
    </Container>
  );
}

export default Administrate;
