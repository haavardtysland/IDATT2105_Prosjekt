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
import ReservationForm from '../reservation_components/ReservationForm';
import Section from '../../interfaces/Section';

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
  section: Section;
}

const Calendar: React.FC<CalendarProps> = ({
  date,
  section,
}: CalendarProps) => {
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
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const updateIsMarkedArr = (index: number) => {
    const items = [...isMarkedArr];
    let item = items[index];
    item = !item;
    items[index] = item;
    setIsMarkedArr(items);
  };

  const updateSelectedTimes = () => {
    for (const i in isMarkedArr) {
      if (isMarkedArr[i] === true && selectedTimes.indexOf(times[i]) === -1)
        selectedTimes.push(times[i]);
      else if (
        isMarkedArr[i] === false &&
        selectedTimes.indexOf(times[i]) !== -1
      ) {
        const index = selectedTimes.indexOf(times[i]);
        selectedTimes.splice(index, 1);
      }
    }
  };

  const renderTimeCards = times.map((time, key: number) => {
    return (
      <TimeCard
        key={key}
        time={time}
        reset={reset}
        isMarkedArr={isMarkedArr}
        setIsMarkedArr={setIsMarkedArr}
        index={key}
        updateIsMarkedArr={(index: number) => updateIsMarkedArr(index)}
        updateSelectedTimes={updateSelectedTimes}
      />
    );
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
          {getDayOfWeek(date.getDay())} {date.getDate()}.{date.getMonth() + 1}.
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
            title={`Reserver for ${section.section_name}`}
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <ReservationForm
              times={times}
              selectedTimes={selectedTimes}
              setSelectedTimes={setSelectedTimes}
              isMarkedArr={isMarkedArr}
              setIsMarkedArr={setIsMarkedArr}
              updateIsMarkedArr={(index: number) => updateIsMarkedArr(index)}
              updateSelectedTimes={updateSelectedTimes}
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
            />
          </Popup>
        </ButtonsDiv>
        <Button onClick={() => console.log(isMarkedArr)}>Log marked arr</Button>
        <Button onClick={() => console.log(selectedTimes)}>
          Log selected times
        </Button>
      </CardContent>
    </Card>
  );
};

export default Calendar;
