import {
  Button,
  Card,
  CardContent,
  Divider,
  GridList,
  Typography,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, useRef } from 'react';
import TimeCard from './TimeCard';
import getDayOfWeek from './GetDayOfWeek';
import styled from 'styled-components';
import Popup from '../Popup';
import ReservationForm from '../ReservationForm';

const ButtonsDiv = styled.div`
  display: flex;
`;

const StyledButton = withStyles({
  root: {
    margin: '1%',
    width: '44%',
  },
})(Button);

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
  const length = 24;
  const classes = useStyles();
  const [reset, setReset] = useState<boolean>(false);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [isMarkedArr, setIsMarkedArr] = useState<boolean[]>(() => {
    const arr: boolean[] = [];
    for (let i = 0; i < length; i++) {
      arr.push(false);
    }
    return arr;
  });

  const setTimeArr = (): string[] => {
    let hour = 7;
    let minutes = 0;
    const times: string[] = [];
    for (let i = 0; i < length; i++) {
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
    return <TimeCard key={key} time={time} reset={reset} />;
  });

  return (
    <Card
      style={{
        margin: '1%',
        width: '45rem',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {' '}
      {/* Set the width to 37% for responsive design, 45rem for static*/}
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
        <GridList cellHeight={60} cols={8} style={{ padding: '10px' }}>
          {renderTimeCards}
        </GridList>
        <ButtonsDiv>
          <StyledButton
            variant="outlined"
            onClick={() => setOpenPopup(!openPopup)}
          >
            Reserver tidene
          </StyledButton>
          <StyledButton variant="outlined" onClick={() => setReset(!reset)}>
            Fjern valgte tider
          </StyledButton>
          <Popup
            title="Reserver"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <ReservationForm timeFrom="" timeTo="" />
          </Popup>
        </ButtonsDiv>
        <Button onClick={() => console.log(isMarkedArr)}>Log marked arr</Button>
      </CardContent>
    </Card>
  );
};

export default Calendar;
