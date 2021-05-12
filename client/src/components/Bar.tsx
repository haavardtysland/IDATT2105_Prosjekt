import { Button, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import SettingsIcon from '@material-ui/icons/Settings';
import styled from 'styled-components';

function Bar() {
  return (
    <div>
      <AppBar>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant="h4">Scroll to Elevate App Bar</Typography>
          <Button>
            <Typography variant="h6">Legg til brukere</Typography>
          </Button>
          <Button>
            <Typography variant="h6">Legg til rom</Typography>
          </Button>
          <Button>
            <Typography variant="h6">Se bestillinger</Typography>
          </Button>
          <SettingsIcon></SettingsIcon>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Bar;
