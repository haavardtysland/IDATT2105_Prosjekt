import { Button, MenuItem, Toolbar, Typography } from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import AppBar from '@material-ui/core/AppBar';
import { useHistory } from 'react-router';
import BarButtons from './BarButtons';
import BarDrawer from './BarDrawer';
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function Bar() {
  const history = useHistory();
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <AppBar>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <MenuItem onClick={() => history.push('/mainPage')}>
            <Typography variant="h4">Romreservasjon</Typography>
          </MenuItem>
          {windowDimensions.width > 951 && (
            <Fragment>
              <BarButtons style={{ display: 'flex' }}></BarButtons>
            </Fragment>
          )}
          {windowDimensions.width < 951 && (
            <Fragment>
              <MenuItem onClick={onClick}>
                <ListIcon style={{ width: '2.5rem', height: '100%' }} />
              </MenuItem>
              <BarDrawer open={open}></BarDrawer>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Bar;
