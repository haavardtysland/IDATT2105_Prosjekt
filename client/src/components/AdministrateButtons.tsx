import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: '20%',
      height: '90%',
      marginLeft: '2rem',
      marginRight: '2rem',
      padding: '2rem',
    },
  })
);

function AdministrateButtons() {
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

export default AdministrateButtons;
