import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Button, Typography, withStyles, TextField } from '@material-ui/core';
import styled from 'styled-components';
import User from '../../interfaces/User';
import axios from '../../axios';
import { Context } from '../../Context';
import Section from '../../interfaces/Section';
import Reservation from '../../interfaces/Reservation';

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
  times: string[];
}

const ReservationFormEdit: React.FC<ReservationFormEditProps> = ({
  openPopup,
  setOpenPopup,
  reservation,
  times,
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
  const [desc, setDesc] = useState<string>('');
  const [capacity, setCapacity] = useState<string>('');

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

  const getDateFromString = (str: string) => {
    let index = -1;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === ' ') {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      const sub1: string = str.substring(0, index);
      const sub2: string = str.substring(index);
      const split: string[] = sub2.trim().split(':');
      return new Date(sub1 + ' ' + split[0] + ':' + split[1]);
    } else return new Date();
  };

  const getTimeFromString = (str: string) => {
    let index = -1;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === ' ') {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      const sub1: string = str.substring(0, index);
      const sub2: string = str.substring(index);
      const split: string[] = sub2.trim().split(':');
      return split[0] + ':' + split[1];
    } else return '';
  };

  const getCurrentTimes = () => {
    const fromTime = getTimeFromString(reservation.from_date);
    const toTime = getTimeFromString(reservation.to_date);
    console.log(fromTime);
    console.log(toTime);
    const fromIndex = times.indexOf(fromTime);
    const toIndex = times.indexOf(toTime);
    console.log(fromIndex);
    console.log(toIndex);
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

  /*
  const deleteListItem = (index: number) => {
    console.log(index);
    if (selectedTimes !== undefined) {
      if (currentTimes.length === 1) {
        setDeleteTime(currentTimes[0]);
        setCurrentTimes([]);
        setOpenPopup(!openPopup);
      } else {
        setDeleteTime(currentTimes[index]);
        setCurrentTimes(
          currentTimes.filter((time) => time !== selectedTimes[index])
        );
      }
    }
  };
  */

  /*
    "user_id":1819766832,
    "section_id": 1,
    "from_date":"2012-11-12 00:00:00.0",
    "to_date": "2018-11-12 12:30:11.0",
    "capacity": 3,
    "description": "Test description"
  */
  //'2021-11-12 08:00:00.0'
  //'2021-11-12 09:00:00.0'
  /*
  const postReservation = async () => {
    try {
      let dateFormat = '';
      if (String(date.getMonth() + 1).length === 1) {
        dateFormat = `${date.getFullYear()}-0${
          date.getMonth() + 1
        }-${date.getDate()}`;
      } else {
        dateFormat = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;
      }

      console.log(dateFormat);
      const object = {
        user_id: currentUser.userId,
        section_id: section.section_id,
        from_date: dateFormat + ` ${fromDate}:00.0`,
        to_date: dateFormat + ` ${toDate}:00.0`,
        capacity: capacity,
        description: desc,
      };
      console.log(object);
      const request = await axios.post('/reservation', object);
      console.log(request);
      getReservationForSectionDate();
      updateIsMarkedArrFromTo(times.indexOf(fromDate), times.indexOf(toDate));
      setOpenPopup(!openPopup);
      return request;
    } catch (err) {
      alert(err.response.data.error);
    }
  };
  */

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Typography>
        {currentUser.userId !== -1 &&
          currentUser.firstName + ' ' + currentUser.surname + ' '}
        har reservert de følgdende tidene:
      </Typography>
      <ul>
        {currentTimes?.map((time, key: number) => (
          <StyledLi /*onClick={deleteListItem.bind(this, key)}*/ key={key}>
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
        <StyledButton variant="outlined">Endre</StyledButton>
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
