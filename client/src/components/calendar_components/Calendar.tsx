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
import React, { useState, useEffect } from 'react';
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
    for (let i = fromIndex; i <= toIndex; i++) {
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

  const getReservationForSectionDate = () => {
    const dateFormat = TimeFunctions.getDateFormat(date);
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
      const items = getFalseArr();
      for (const index in reservations) {
        const fromDate = getDateFromString(reservations[index].from_date);
        const toDate = getDateFromString(reservations[index].to_date);
        if (sameDay(fromDate, toDate) && sameDay(toDate, date)) {
          const fromTime: string = fromDate.toTimeString().substring(0, 5);
          const toTime: string = toDate.toTimeString().substring(0, 5);
          const fromIndex: number = times.indexOf(fromTime);
          const toIndex: number = times.indexOf(toTime);
          if (fromIndex >= 0 && toIndex <= isMarkedArr.length - 1) {
            for (let i = fromIndex; i < toIndex; i++) {
              let item = items[i];
              item = true;
              items[i] = item;
            }
          }
        }
      }
      setBookedTimes(items);
    } else {
      updateBookedTimesFromToFalse(0, length - 1);
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
        times={times}
        date={date}
        bookedTimes={bookedTimes}
        noMarked={noMarked}
        setNoMarked={setNoMarked}
        updateIsMarkedArrFromTo={(fromIndex: number, toIndex: number) =>
          updateIsMarkedArrFromTo(fromIndex, toIndex)
        }
      />
    );
  });

  return (
    <Card
      style={{
        maxWidth: '45rem',
        margin: '1%',
        marginRight: 'auto',
        marginLeft: 'auto',
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
              updateIsMarkedArr={(index: number) => updateIsMarkedArr(index)}
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
      </CardContent>
    </Card>
  );
};

export default Calendar;
