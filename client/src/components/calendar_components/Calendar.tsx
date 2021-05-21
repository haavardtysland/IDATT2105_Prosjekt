import {
  Button,
  Card,
  CardContent,
  Divider,
  GridList,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, useRef } from 'react';
import TimeCard from './TimeCard';
import styled from 'styled-components';
import Popup from '../Popup';
import ReservationForm from '../reservation_components/ReservationForm';
import Section from '../../interfaces/Section';
import axios from '../../axios';
import Reservation from '../../interfaces/Reservation';
import { SortFunctions } from '../sorting/SortFunctions';
import { TimeFunctions } from './TimeFunctions';
import InfoIcon from '@material-ui/icons/Info';
import config from '../../Config';

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
  const getFalseArr = () => {
    const arr: boolean[] = [];
    for (let i = 0; i < length; i++) {
      arr.push(false);
    }
    return arr;
  };
  const [isMarkedArr, setIsMarkedArr] = useState<boolean[]>(getFalseArr());
  const [noMarked, setNoMarked] = useState<number>(0);

  const times: string[] = TimeFunctions.times;
  const getDateFromString = TimeFunctions.getDateFromString;
  const getStringFromDate = TimeFunctions.getStringFromDate;
  const getTimeFromString = TimeFunctions.getTimeFromString;
  const sameDay = TimeFunctions.sameDay;

  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [bookedTimes, setBookedTimes] = useState<boolean[]>(getFalseArr());

  const updateIsMarkedArr = (index: number) => {
    const items = [...isMarkedArr];
    let item = items[index];
    item = !item;
    items[index] = item;
    setIsMarkedArr(items);
  };

  const updateToTrue = (
    index: number,
    item: boolean,
    items: boolean[],
    count: number
  ) => {
    if (item === false) {
      item = !item;
      items[index] = item;
      count++;
    }
  };
  const updateToFalse = (
    index: number,
    item: boolean,
    items: boolean[],
    count: number
  ) => {
    if (item === true) {
      item = !item;
      items[index] = item;
      count--;
    }
  };
  const updateMarked = (index: number, items: boolean[], count: number) => {
    const item = items[index];
    if (count === 0) {
      updateToTrue(index, item, items, count);
    } else if (index === 0 && isMarkedArr[index + 1] === true) {
      updateToTrue(index, item, items, count);
    } else if (
      index === isMarkedArr.length - 1 &&
      isMarkedArr[index - 1] === true
    ) {
      updateToTrue(index, item, items, count);
    } else if (
      isMarkedArr[index - 1] === true ||
      isMarkedArr[index + 1] === true
    ) {
      updateToTrue(index, item, items, count);
    } else {
      updateToFalse(index, item, items, count);
    }
  };

  const updateIsMarkedArrFromTo = (fromIndex: number, toIndex: number) => {
    const items = [...isMarkedArr];
    for (let i = fromIndex; i <= toIndex; i++) {
      let item = items[i];
      item = !item;
      items[i] = item;
    }
    setIsMarkedArr(items);
  };

  const updateBookedTimesFromToFalse = (fromIndex: number, toIndex: number) => {
    const items = [...bookedTimes];
    for (let i = fromIndex; i < toIndex; i++) {
      let item = items[i];
      item = false;
      items[i] = item;
    }
    setBookedTimes(items);
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

  //"/{sectionId}/section/{from}/{to}"
  const getReservationForSectionDate = () => {
    const dateFormat = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    const from: string = dateFormat + ` 07:30:00.0`;
    const to: string = dateFormat + ` 19:00:00.0`;
    const fromDate = new Date(from);
    const toDate = new Date(to);
    axios
      .get(
        `/reservation/${
          section.section_id
        }/section/${fromDate.getTime()}/${toDate.getTime()}`
      )
      .then((response) => {
        console.log(response);
        setReservations(response.data['reservations']);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getReservationForSectionDate();
  }, [section, date]);

  // to update the booked times
  useEffect(() => {
    if (reservations.length !== 0) {
      const items = [...bookedTimes];
      for (const i in reservations) {
        const fromDate = getDateFromString(reservations[i].from_date);
        const toDate = getDateFromString(reservations[i].to_date);
        if (sameDay(fromDate, toDate) && sameDay(toDate, date)) {
          const fromTime: string = fromDate.toTimeString().substring(0, 5);
          const toTime: string = toDate.toTimeString().substring(0, 5);
          const fromIndex: number = times.indexOf(fromTime);
          const toIndex: number = times.indexOf(toTime);
          if (fromIndex >= 0 && toIndex <= isMarkedArr.length - 1) {
            for (let i = fromIndex; i <= toIndex; i++) {
              let item = items[i];
              item = true;
              items[i] = item;
            }
          }
        }
      }
      setBookedTimes(items);
    } else {
      updateBookedTimesFromToFalse(0, length);
    }
  }, [reservations, date, section]);

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
        getTimeFromString={(str: string) => getTimeFromString(str)}
        times={times}
        date={date}
        bookedTimes={bookedTimes}
        setBookedTimes={setBookedTimes}
        updateBookedTimesFromTo={(fromIndex: number, toIndex: number) =>
          updateBookedTimesFromToFalse(fromIndex, toIndex)
        }
        noMarked={noMarked}
        setNoMarked={setNoMarked}
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
        <div style={{ display: 'flex' }}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {section.section_name + ' '}
            {getStringFromDate(date)}
          </Typography>
          <Tooltip
            title="Marker de ønskede tidene. Maks er 3 og må være sammenhengende. De røde tidene er de som allerede er booket, mens de grønne tidene er ledige og kan markeres."
            style={{ marginLeft: '1%' }}
            placement="right"
          >
            <InfoIcon />
          </Tooltip>
        </div>
        <Divider variant="fullWidth" />
        <GridList cellHeight={60} cols={8} style={{ padding: '10px' }}>
          {renderTimeCards}
        </GridList>
        <ButtonsDiv>
          <StyledButton
            variant="outlined"
            onClick={() => setOpenPopup(!openPopup)}
            disabled={noMarked === 0 ? true : false}
          >
            Reserver tidene
          </StyledButton>
          <StyledButton variant="outlined" onClick={() => setReset(!reset)}>
            Fjern valgte tider
          </StyledButton>
          <Popup
            title={`Reserver for "${section.section_name}" ${getStringFromDate(
              date
            )}`}
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <ReservationForm
              times={times}
              selectedTimes={SortFunctions.sortSelectedTimes(selectedTimes)}
              setSelectedTimes={setSelectedTimes}
              isMarkedArr={isMarkedArr}
              setIsMarkedArr={setIsMarkedArr}
              updateIsMarkedArr={(index: number) => updateIsMarkedArr(index)}
              updateSelectedTimes={updateSelectedTimes}
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
              section={section}
              date={date}
              getReservationsForSelectionDate={getReservationForSectionDate}
              updateIsMarkedArrFromTo={(fromIndex: number, toIndex: number) =>
                updateIsMarkedArrFromTo(fromIndex, toIndex)
              }
            />
          </Popup>
        </ButtonsDiv>
        <Button onClick={() => console.log(isMarkedArr)}>Log marked arr</Button>
        <Button onClick={() => console.log(bookedTimes)}>
          log booked times
        </Button>
        <Button onClick={() => console.log(selectedTimes)}>
          Log selected times
        </Button>
        <button onClick={() => console.log(noMarked)}>log no marked</button>
        <button onClick={() => console.log(reservations)}>
          log reservations
        </button>
        <button onClick={() => console.log(section)}>log section</button>
        <button onClick={() => console.log(reservations.length)}>
          log reservations length
        </button>
        <button onClick={() => console.log(date)}>log date</button>
      </CardContent>
    </Card>
  );
};

export default Calendar;
