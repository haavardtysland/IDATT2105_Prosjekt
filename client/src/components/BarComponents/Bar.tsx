import {
  Button,
  ClickAwayListener,
  createStyles,
  Grow,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { useRef } from 'react';
import AppBar from '@material-ui/core/AppBar';
import SettingsIcon from '@material-ui/icons/Settings';
import styled from 'styled-components';
import DropDownList from './DropDownList';
import { useHistory } from 'react-router';

function Bar() {
  const history = useHistory();

  return (
    <div>
      <AppBar>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography onClick={() => history.push('/mainPage')} variant="h4">
            Romreservasjon fra helvete
          </Typography>
          <Button onClick={() => history.push('/addUser')}>
            <Typography variant="h6">Legg til brukere</Typography>
          </Button>
          <Button onClick={() => history.push('/addRoom')}>
            <Typography variant="h6">Legg til rom</Typography>
          </Button>
          <Button onClick={() => history.push('/mineBestillinger')}>
            <Typography variant="h6">Se bestillinger</Typography>
          </Button>
          <Button onClick={() => history.push('/administrate/room')}>
            <Typography variant="h6">Administrer</Typography>
          </Button>
          <DropDownList />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Bar;
