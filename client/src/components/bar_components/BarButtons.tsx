import { Button, makeStyles, MenuItem, Typography } from '@material-ui/core';
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Context } from '../../Context';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
`;

const useStyles = makeStyles({
  menuItem: {
    padding: '1rem',
    marginRight: '2rem',
  },
});

function BarButtons({ style }: any) {
  const history = useHistory();
  const classes = useStyles();

  return (
    <StyledDiv>
      <div style={style}>
        <MenuItem
          className={classes.menuItem}
          onClick={() => history.push('/mineBestillinger')}
        >
          <Typography variant="h6">Se bestillinger</Typography>
        </MenuItem>
        {localStorage.getItem('isAdmin') == 'true' && (
          <Fragment>
            <MenuItem
              className={classes.menuItem}
              onClick={() => history.push('/addUser')}
            >
              <Typography variant="h6">Legg til brukere</Typography>
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={() => history.push('/addRoom')}
            >
              <Typography variant="h6">Legg til rom</Typography>
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={() => history.push('/administrate/room')}
            >
              <Typography variant="h6">Administrer</Typography>
            </MenuItem>
          </Fragment>
        )}
      </div>
      <div style={{ marginLeft: '2rem' }}>
        <MenuItem onClick={() => history.push('/MyUser')}>
          <p>Din bruker</p>
        </MenuItem>
        <MenuItem onClick={() => history.push('/')}>
          <p>Logg ut</p>
        </MenuItem>
      </div>
    </StyledDiv>
  );
}

export default BarButtons;
