import {
  Button,
  Card,
  CardContent,
  Divider,
  GridList,
  Typography,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TimeCard from './TimeCard';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: '90%',
    margin: '5%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
});

interface CalendarProps {
  date: Date;
}

const Calendar: React.FC<CalendarProps> = ({ date }: CalendarProps) => {
  const classes = useStyles();

  const getDayOfWeek = (id: number): string => {
    let str = '';
    switch (id) {
      case 1: {
        str = 'Mandag';
        break;
      }
      case 2: {
        str = 'Tirsdag';
        break;
      }
      case 3: {
        str = 'Onsdag';
        break;
      }
      case 4: {
        str = 'Torsdag';
        break;
      }
      case 5: {
        str = 'Fredag';
        break;
      }
      case 6: {
        str = 'Lørdag';
        break;
      }
      case 7: {
        str = 'Søndag';
        break;
      }
    }
    return str;
  };

  const setTimeArr = (): string[] => {
    let hour = 7;
    let minutes = 0;
    const times: string[] = [];
    for (let i = 0; i < 24; i++) {
      if (i % 2 === 0) {
        minutes = 30;
        String(hour).length === 1
          ? times.push(`0${String(hour)}:${String(minutes)}`)
          : times.push(`${String(hour)}:${String(minutes)}`);
      } else {
        minutes = 0;
        hour++;
        String(hour).length === 1
          ? times.push(`0${String(hour)}:${String(minutes)}0`)
          : times.push(`${String(hour)}:${String(minutes)}0`);
      }
    }
    return times;
  };

  const times = setTimeArr();
  const renderTimeCards = times.map((time, key: number) => {
    return <TimeCard key={key} time={time} />;
  });

  return (
    <Card>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {getDayOfWeek(date.getDay())} {date.getDay()}.{date.getMonth()}.
          {date.getFullYear()}
        </Typography>
        <Divider variant="fullWidth" />
        <GridList cellHeight={60} cols={7} style={{ padding: '10px' }}>
          {renderTimeCards}
        </GridList>
        <Button>Reserver de markerte tidene</Button>
      </CardContent>
    </Card>
  );
};

export default Calendar;
