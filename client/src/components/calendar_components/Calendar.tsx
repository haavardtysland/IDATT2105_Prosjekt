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
import axios from '../../axios';
import Reservation from '../../interfaces/Reservation';

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
  const [noMarked, setNoMarked] = useState<number>(0);

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
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const updateIsMarkedArr = (index: number) => {
    const items = [...isMarkedArr];
    let item = items[index];
    item = !item;
    items[index] = item;
    setIsMarkedArr(items);
    /*
    if (index === 0 && noMarked === 0) {
      if (item === false) {
        item = !item;
        setNoMarked(noMarked + 1);
      }
    } else if (
      (noMarked === 0 && index !== 0) ||
      index !== isMarkedArr.length - 1
    ) {
      if (item === false) {
        item = !item;
        setNoMarked(noMarked + 1);
      }
    } else if (index === 0 && isMarkedArr[index + 1] === true) {
      if (item === false) {
        item = !item;
        setNoMarked(noMarked + 1);
      }
    } else if (
      isMarkedArr[index - 1] === true &&
      isMarkedArr[index + 1] === true
    ) {
      if (item === false) {
        item = !item;
        setNoMarked(noMarked + 1);
      }
    } else if (index === isMarkedArr.length - 1 && noMarked === 0) {
      if (item === false) {
        item = !item;
        setNoMarked(noMarked + 1);
      }
    } else if (
      index === isMarkedArr.length - 1 &&
      isMarkedArr[index - 1] === true
    ) {
      if (item === false) {
        item = !item;
        setNoMarked(noMarked + 1);
      }
    } else if (isMarkedArr[index - 1] === true) {
      if (item === false) {
        item = !item;
        setNoMarked(noMarked + 1);
      }
    } else if (isMarkedArr[index + 1] === true) {
      if (item === false) {
        item = !item;
        setNoMarked(noMarked + 1);
      }
    } else {
      if (item === true) {
        item = !item;
        setNoMarked(noMarked - 1);
      }
    }
    */
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

  const getReservationsForSection = () => {
    axios
      .get(`/reservation/${section.section_id}/section`)
      .then((response) => {
        console.log(response);
        setReservations(response.data['reservations']);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    //get the available reservations for that section
    //"/{sectionId}/section"
    getReservationsForSection();
  }, []);

  useEffect(() => {
    let count = 0;
    for (const marked of isMarkedArr) {
      if (marked === true) {
        count++;
      }
    }
    setNoMarked(count);
  }, [isMarkedArr]);

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
              section={section}
              date={date}
            />
          </Popup>
        </ButtonsDiv>
        <Button onClick={() => console.log(isMarkedArr)}>Log marked arr</Button>
        <Button onClick={() => console.log(selectedTimes)}>
          Log selected times
        </Button>
        <button onClick={() => console.log(noMarked)}>log no marked</button>
        <button onClick={() => console.log(reservations)}>
          log reservations
        </button>
      </CardContent>
    </Card>
  );
};

export default Calendar;
