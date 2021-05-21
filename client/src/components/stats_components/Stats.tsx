import {
  Box,
  Button,
  Drawer,
  Grid,
  LinearProgress,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { Context } from '../../Context';
import Section from '../../interfaces/Section';
import axios from '../../axios';
import Room from '../../interfaces/Room';
import User from '../../interfaces/User';
import TimeFilter from '../filter/TimeFilter';

const useStyles = makeStyles({
  drawerPaper: {
    marginTop: '15%',
  },
});

const MessageBox = styled.div`
  height: 35vh;
  max-width: 80vh;
  overflow: hidden;
  overflow-y: scroll;
  margin-top: 15vh;
`;

const Send = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
`;

const StyledTextField = withStyles({
  root: {
    width: '80%',
    marginTop: '5rem',
  },
})(TextField);

interface Props {
  section: Section;
}

function Stats({ section }: Props) {
  const [currentSection, setCurrentSection] = useState<Section>();
  const [fromDateTime, setFromDateTime] = useState<string>('');
  const [toDateTime, setToDateTime] = useState<string>('');
  const [ms, setMs] = useState<number>(0);
  const [fullMs, setFullMs] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(true);
  const classes = useStyles();
  /*
  const onChangeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentFilter((event.target as HTMLInputElement).value);
  };*/

  useEffect(() => {
    console.log(currentSection);
  }, [currentSection]);
  /*
  const handleChangeCurrentSection = (event: ChangeEvent<HTMLInputElement>) => {
    if (room !== undefined) {
      const tmp = room.sections.find(
        (section: Section) => section.section_id === +event.target.value
      );
      if (tmp !== undefined) setCurrentSection(tmp);
    }
  };*/

  useEffect(() => {
    console.log('snekker');
  }, []);

  const getStats = () => {
    const to = new Date(toDateTime).getTime();
    const from = new Date(fromDateTime).getTime();
    console.log(to - from);
    setFullMs(100);
    axios
      .get(`/section/${section.section_id}/${from}/${to}`)
      .then((response) => {
        //setMs(response.data);
        console.log(response.data);
        //setFullMs((to - from) / response.data.time);
      });
  };

  return (
    <Drawer
      classes={{ paper: classes.drawerPaper }}
      variant="persistent"
      anchor="right"
      open={open}
    >
      <Grid container spacing={2}>
        <Grid item>
          <h2
            style={{
              position: 'absolute',
              top: '5px',
              left: '20px',
            }}
          >
            Statistikk
          </h2>
          <Button
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
            }}
            onClick={() => setOpen(false)}
          >
            Lukk
          </Button>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column">
            <Grid item xs>
              <div style={{ marginTop: '5rem' }}>
                <TimeFilter
                  timeFilterFrom={fromDateTime}
                  setTimeFilterFrom={setFromDateTime}
                  timeFilterTo={toDateTime}
                  setTimeFilterTo={setToDateTime}
                ></TimeFilter>
              </div>
              <button onClick={getStats}>heiheihei</button>
            </Grid>

            <Grid item xs>
              <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                  <LinearProgress variant="determinate" value={fullMs} />
                </Box>
                <Box minWidth={35}>
                  <Typography variant="body2" color="textSecondary">{`${
                    Math.round(ms / ms) * 100
                  }%`}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
}

export default Stats;
