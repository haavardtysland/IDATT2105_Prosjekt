import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Button, Typography, withStyles, TextField } from '@material-ui/core';
import styled from 'styled-components';
import User from '../../interfaces/User';
import axios from '../../axios';
import { Context } from '../../Context';
import Section from '../../interfaces/Section';
import Reservation from '../../interfaces/Reservation';
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

interface ReservationFormProps {
  times: string[];
  selectedTimes: string[];
  setSelectedTimes: React.Dispatch<React.SetStateAction<string[]>>;
  isMarkedArr: boolean[];
  setIsMarkedArr: React.Dispatch<React.SetStateAction<boolean[]>>;
  updateIsMarkedArr: (index: number) => void;
  updateSelectedTimes: () => void;
  openPopup: boolean;
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
  section: Section;
  date: Date;
  getReservationsForSelectionDate: () => void;
  updateIsMarkedArrFromTo: (fromIndex: number, toIndex: number) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  times,
  selectedTimes,
  setSelectedTimes,
  isMarkedArr,
  setIsMarkedArr,
  updateIsMarkedArr,
  updateSelectedTimes,
  openPopup,
  setOpenPopup,
  section,
  date,
  getReservationsForSelectionDate,
  updateIsMarkedArrFromTo,
}: ReservationFormProps) => {
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
  const [currentTimes, setCurrentTimes] = useState<string[]>(
    selectedTimes !== undefined ? selectedTimes : []
  );
  const [fromDate, setFromDate] = useState<string>(currentTimes[0]);
  const [toDate, setToDate] = useState<string>(
    currentTimes.length === 1
      ? times[times.indexOf(currentTimes[0]) + 1]
      : currentTimes[currentTimes.length - 1]
  );
  const [deleteTime, setDeleteTime] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [capacity, setCapacity] = useState<string>('');

  const onChangeDesc = (event: ChangeEvent<HTMLInputElement>) => {
    setDesc((event.target as HTMLInputElement).value);
  };

  const onChangeCapacity = (event: ChangeEvent<HTMLInputElement>) => {
    const val: number = +(event.target as HTMLInputElement).value;
    if (val < 0) {
      setCapacity('0');
    } else if (val > section.capacity) {
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
      console.log(error);
    }
  };

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
      const request = await axios.post('/reservation', object, config);
      console.log(request);
      getReservationsForSelectionDate();
      updateIsMarkedArrFromTo(times.indexOf(fromDate), times.indexOf(toDate));
      setOpenPopup(!openPopup);
      return request;
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (selectedTimes !== undefined && deleteTime !== '') {
      setSelectedTimes(currentTimes);
      updateIsMarkedArr(times.indexOf(deleteTime));
    }
  }, [currentTimes]);

  return (
    <div>
      <Typography>
        {currentUser.userId !== -1 &&
          currentUser.firstName + ' ' + currentUser.surname + ' '}
        ønsker å reservere de følgende tidene:
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
        <StyledButton variant="outlined" onClick={postReservation}>
          Bekreft
        </StyledButton>
        <StyledButton
          variant="outlined"
          onClick={() => setOpenPopup(!openPopup)}
        >
          Avbryt
        </StyledButton>
        {/*
        <button onClick={() => console.log(selectedTimes)}>
          log selected times
        </button>
        <button onClick={() => console.log(isMarkedArr)}>
          Log is marked arr
        </button>
        <button onClick={() => console.log(deleteTime)}>log delete time</button>
        <button onClick={() => console.log(currentUser)}>log user</button>
        <button onClick={() => console.log(date)}>log date</button>
        <button onClick={() => console.log(currentTimes)}>
          log current times
        </button>
        */}
      </ButtonsContainer>
    </div>
  );
};

export default ReservationForm;
