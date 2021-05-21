import {
  Box,
  Button,
  Drawer,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Section from '../../interfaces/Section';
import axios from '../../axios';
import TimeFilter from '../filter/TimeFilter';

const useStyles = makeStyles({
  drawerPaper: {
    marginTop: '15%',
  },
});

interface Props {
  section: Section;
  open: boolean;
  closeStats: () => void;
}

function Stats({ section, open, closeStats }: Props) {
  const [currentSection, setCurrentSection] = useState<Section>();
  const [fromDateTime, setFromDateTime] = useState<string>('');
  const [toDateTime, setToDateTime] = useState<string>('');
  const [ms, setMs] = useState<number>(0);
  const [fullMs, setFullMs] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const classes = useStyles();

  useEffect(() => {
    console.log(currentSection);
  }, [currentSection]);

  useEffect(() => {
    console.log('snekker');
  }, []);

  const getStats = () => {
    const to = new Date(toDateTime).getTime();
    const from = new Date(fromDateTime).getTime();

    axios
      .get(`/section/${section.section_id}/${from}/${to}`)
      .then((response) => {
        setMs((response.data.time / (to - from)) * 100);
        setFullMs(response.data.time);
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
            onClick={closeStats}
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
            </Grid>
            <Button
              variant="outlined"
              style={{ width: '80%' }}
              disabled={fromDateTime == '' || toDateTime == ''}
              onClick={getStats}
            >
              Se statistikk
            </Button>
            <Grid item xs>
              <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                  <p>Hvor mange prosent av timer det gitte intervallet:</p>
                  <LinearProgress variant="determinate" value={ms} />
                </Box>
                <Box minWidth={35}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >{`${Math.round(ms)}%`}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item>
              <p>
                Seksjonen er brukt: {Math.floor(fullMs / 3600000)} time(r) og{' '}
                {(fullMs % 3600000) / 60000} minutt(er) i denne perioden.
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
}

export default Stats;
