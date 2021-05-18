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
import React, { Fragment, useContext, useEffect, useRef } from 'react';
import AppBar from '@material-ui/core/AppBar';
import SettingsIcon from '@material-ui/icons/Settings';
import styled from 'styled-components';
import DropDownList from './DropDownList';
import { useHistory } from 'react-router';
import { Context } from '../../Context';

function Bar() {
  const history = useHistory();
  const { user } = useContext(Context.UserContext);
  const admin = useRef(user.isAdmin);

  return (
    <div>
      <AppBar>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography onClick={() => history.push('/mainPage')} variant="h4">
            Romreservasjon fra helvete
          </Typography>
          <MenuItem>
            <Button onClick={() => history.push('/mineBestillinger')}>
              <Typography variant="h6">Se bestillinger</Typography>
            </Button>
          </MenuItem>
          {admin && (
            <Fragment>
              <MenuItem>
                <Button onClick={() => history.push('/addUser')}>
                  <Typography variant="h6">Legg til brukere</Typography>
                </Button>
              </MenuItem>
              <MenuItem>
                <Button onClick={() => history.push('/addRoom')}>
                  <Typography variant="h6">Legg til rom</Typography>
                </Button>
              </MenuItem>
              <MenuItem>
                <Button onClick={() => history.push('/administrate/room')}>
                  <Typography variant="h6">Administrer</Typography>
                </Button>
              </MenuItem>
            </Fragment>
          )}
          <DropDownList />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Bar;
