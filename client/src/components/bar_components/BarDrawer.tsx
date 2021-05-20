import { Drawer, makeStyles, MenuItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import BarButtons from './BarButtons';

interface Props {
  open: boolean;
}

const useStyles = makeStyles({
  drawerPaper: {
    marginTop: '15%',
  },
});

function BarDrawer({ open }: Props) {
  const classes = useStyles();

  return (
    <Drawer
      variant="persistent"
      classes={{ paper: classes.drawerPaper }}
      open={open}
    >
      <BarButtons
        style={{ display: 'flex', flexDirection: 'column' }}
      ></BarButtons>
    </Drawer>
  );
}

export default BarDrawer;
