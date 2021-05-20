import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Button, Typography, withStyles, TextField } from '@material-ui/core';
import styled from 'styled-components';
import User from '../../interfaces/User';
import axios from '../../axios';
import { Context } from '../../Context';
import Reservation from '../../interfaces/Reservation';
import { TimeFunctions } from '../calendar_components/TimeFunctions';
import config from '../../Config';

const ButtonsContainer = styled.div`
  display: flex;
`;

const StyledLi = styled.li`
  :hover {
    color: red;
    text-decoration: underline;
  }
`;

const StyledButton = withStyles({
  root: {
    margin: '1%',
    width: '50%',
  },
})(Button);

interface ReservationFormEditProps {
  openPopup: boolean;
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
  reservation: Reservation;
  setReservation: React.Dispatch<React.SetStateAction<Reservation>>;
  deleteReservation: () => void;
}

const ReservationFormEdit: React.FC<ReservationFormEditProps> = ({
  openPopup,
  setOpenPopup,
  reservation,
  setReservation,
  deleteReservation,
}: ReservationFormEditProps) => {
  const { user } = useContext(Context.UserContext);
  const [currentUser, setCurrentUser] = useState<User>({
    userId: -1,
    firstName: '',
    surname: '',
    email: '',
    isAdmin: false,
    validDate: '',
    phoneNumber: '',
  });

  const [deleteTime, setDeleteTime] = useState<string>('');
  const [desc, setDesc] = useState<string>(reservation.description);
  const [capacity, setCapacity] = useState<string>(
    String(reservation.capacity)
  );

  const times = TimeFunctions.times;
  const getDateFromString = TimeFunctions.getDateFromString;
  const getStringFromDate = TimeFunctions.getStringFromDate;
  const getTimeFromString = TimeFunctions.getTimeFromString;
  const sameDay = TimeFunctions.sameDay;
  const dateFormat = TimeFunctions.getDateFormat(
    TimeFunctions.getDateFromString(reservation.from_date)
  );

  const onChangeDesc = (event: ChangeEvent<HTMLInputElement>) => {
    setDesc((event.target as HTMLInputElement).value);
  };

  const onChangeCapacity = (event: ChangeEvent<HTMLInputElement>) => {
    const val: number = +(event.target as HTMLInputElement).value;
    if (val < 1) {
      setCapacity('1');
    } else if (val > reservation.section.capacity) {
      alert('Seksjonen har ikke plass til så mange');
      setCapacity('0');
    } else {
      setCapacity((event.target as HTMLInputElement).value);
    }
  };

  const getUser = async () => {
    try {
      console.log(user);
      const request = await axios.get(`/user/${user.id}`);
      console.log(request);
      setCurrentUser(request.data);
      return request;
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const getCurrentTimes = () => {
    const fromTime = getTimeFromString(reservation.from_date);
    const toTime = getTimeFromString(reservation.to_date);
    const fromIndex = times.indexOf(fromTime);
    const toIndex = times.indexOf(toTime);
    const arr: string[] = [];
    for (let i = fromIndex; i < toIndex; i++) {
      arr.push(times[i]);
    }
    return arr;
  };

  const [currentTimes, setCurrentTimes] = useState<string[]>(getCurrentTimes());
  const [fromDate, setFromDate] = useState<string>(currentTimes[0]);
  const [toDate, setToDate] = useState<string>(
    currentTimes.length === 1
      ? times[times.indexOf(currentTimes[0]) + 1]
      : currentTimes[currentTimes.length - 1]
  );

  const deleteListItem = (index: number) => {
    console.log(index);
    if (currentTimes.length === 1) {
      setDeleteTime(currentTimes[0]);
      setCurrentTimes([]);
      setOpenPopup(!openPopup);
    } else {
      setDeleteTime(currentTimes[index]);
      setCurrentTimes(
        currentTimes.filter((time) => time !== currentTimes[index])
      );
    }
  };

  const editReservation = async () => {
    try {
      const edit = {
        user_id: currentUser.userId,
        section_id: reservation.section.section_id,
        from_date: dateFormat + ` ${fromDate}:00.0`,
        to_date: dateFormat + ` ${toDate}:00.0`,
        capacity: capacity,
        description: desc,
      };
      console.log(edit);
      const request = await axios.put(
        `/reservation/${reservation.reservationId}`,
        edit,
        config
      );
      console.log(request);
      setReservation(request.data);
      return request;
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setFromDate(currentTimes[0]);
    setToDate(
      currentTimes.length === 1
        ? times[times.indexOf(currentTimes[0]) + 1]
        : currentTimes[currentTimes.length - 1]
    );
    if (currentTimes.length === 0) {
      deleteReservation();
    }
  }, [currentTimes]);

  return (
    <div>
      <Typography>
        {currentUser.userId !== -1 &&
          currentUser.firstName + ' ' + currentUser.surname + ' '}
        har reservert de følgdende tidene:
      </Typography>
      <ul>
        {currentTimes?.map((time, key: number) => (
          <StyledLi onClick={deleteListItem.bind(this, key)} key={key}>
            {times.indexOf(time) !== times.length - 1
              ? `${time} til ${times[times.indexOf(time) + 1]}`
              : `${time} til 19:30`}
          </StyledLi>
        ))}
      </ul>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          style={{ margin: '1%' }}
          variant="outlined"
          label="Beskrivelse"
          value={desc}
          onChange={onChangeDesc}
        />
        <TextField
          style={{ margin: '1%' }}
          variant="outlined"
          type="number"
          label="Plasser"
          value={capacity}
          onChange={onChangeCapacity}
        />
      </div>
      <ButtonsContainer>
        <StyledButton variant="outlined" onClick={editReservation}>
          Endre
        </StyledButton>
        <StyledButton
          variant="outlined"
          onClick={() => setOpenPopup(!openPopup)}
        >
          Avbryt
        </StyledButton>
      </ButtonsContainer>
      <button onClick={() => console.log(reservation)}>log reservation</button>
      <button onClick={() => console.log(currentTimes)}>
        log current times
      </button>
      <button onClick={() => console.log(times)}>log times</button>
    </div>
  );
};

export default ReservationFormEdit;
