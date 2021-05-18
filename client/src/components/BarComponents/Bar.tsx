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
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import AppBar from '@material-ui/core/AppBar';
import SettingsIcon from '@material-ui/icons/Settings';
import styled from 'styled-components';
import DropDownList from './DropDownList';
import { useHistory } from 'react-router';
import { Context } from '../../Context';
import MyUser from '../MyUser';

function Bar() {
  const history = useHistory();
  const { user } = useContext(Context.UserContext);
  const admin = useRef(user.isAdmin);
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  return (
    <div>
      <AppBar>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography onClick={() => history.push('/mainPage')} variant="h4">
            Romreservasjon fra helvete
          </Typography>
          <Button onClick={() => history.push('/mineBestillinger')}>
            <Typography variant="h6">Se bestillinger</Typography>
          </Button>
          {admin && (
            <Fragment>
              <Button onClick={() => history.push('/addUser')}>
                <Typography variant="h6">Legg til brukere</Typography>
              </Button>
              <Button onClick={() => history.push('/addRoom')}>
                <Typography variant="h6">Legg til rom</Typography>
              </Button>
              <Button onClick={() => history.push('/administrate/room')}>
                <Typography variant="h6">Administrer</Typography>
              </Button>
            </Fragment>
          )}
          <DropDownList
            listItems={['Min Profil']}
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <MyUser openPopup={openPopup} setOpenPopup={setOpenPopup} />
          </DropDownList>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Bar;
