import { Drawer, makeStyles } from '@material-ui/core';
import React from 'react';

interface Props {
  favourites: any[];
}

const useStyles = makeStyles({
  drawerPaper: {
    marginTop: '4.5%',
    width: '21%',
  },
});

const Favourites = ({ favourites }: Props) => {
  const classes = useStyles();
  return (
    <Drawer
      classes={{
        paper: classes.drawerPaper,
      }}
      open
      variant="permanent"
      anchor="right"
    >
      <h1> Dine favoritter </h1>
    </Drawer>
  );
};

export default Favourites;
