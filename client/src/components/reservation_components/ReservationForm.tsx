import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Button,
  Typography,
  withStyles,
  TextField,
  Tooltip,
} from '@material-ui/core';
import styled from 'styled-components';
import User from '../../interfaces/User';
import axios from '../../axios';
import Section from '../../interfaces/Section';
import config from '../../Config';
import { TimeFunctions } from '../calendar_components/TimeFunctions';
import InfoIcon from '@material-ui/icons/Info';

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
  updateIsMarkedArr: (index: number) => void;
  openPopup: boolean;
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
  section: Section;
  date: Date;
  getReservationsForSelectionDate: () => void;
  isMarkedArr: boolean[];
  setIsMarkedArr: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  times,
  selectedTimes,
  setSelectedTimes,
  updateIsMarkedArr,
  openPopup,
  setOpenPopup,
  section,
  date,
  getReservationsForSelectionDate,
  isMarkedArr,
  setIsMarkedArr,
}: ReservationFormProps) => {
  const userId = localStorage.getItem('id');
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

  const lastTime = '19:30';
  const getToDate = (): string => {
    if (
      times.indexOf(currentTimes[currentTimes.length - 1]) ===
      times.length - 1
    ) {
      return lastTime;
    } else if (currentTimes.length === 1) {
      return times[times.indexOf(currentTimes[0]) + 1];
    } else {
      return times[times.indexOf(currentTimes[currentTimes.length - 1]) + 1];
    }
  };

  const [fromDate, setFromDate] = useState<string>(currentTimes[0]);
  const [toDate, setToDate] = useState<string>(getToDate());

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
    } else if (val > section.capacity) {
      alert('Seksjonen har ikke plass til s?? mange');
      setCapacity('0');
    } else {
      setCapacity((event.target as HTMLInputElement).value);
    }
  };

  const getUser = async () => {
    try {
      console.log(userId);
      const request = await axios.get(`/user/${userId}`);
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
      const dateFormat = TimeFunctions.getDateFormat(date);
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
      setIsMarkedArr(() => {
        const arr: boolean[] = [];
        for (let i = 0; i < isMarkedArr.length; i++) {
          arr.push(false);
        }
        return arr;
      });
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
      setFromDate(currentTimes[0]);
      setToDate(getToDate());
    }
  }, [currentTimes]);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Typography>
          {currentUser.userId !== -1 &&
            currentUser.firstName + ' ' + currentUser.surname + ' '}
          ??nsker ?? reservere de f??lgende tidene:
        </Typography>
        <Tooltip title="Trykk p?? de tidene man ??nsker ?? fjerne.">
          <InfoIcon />
        </Tooltip>
      </div>
      <ul>
        {currentTimes?.map((time, key: number) => (
          <StyledLi onClick={deleteListItem.bind(this, key)} key={key}>
            {times.indexOf(time) !== times.length - 1
              ? `${time} til ${times[times.indexOf(time) + 1]}`
              : `${time} til ${lastTime}`}
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
      </ButtonsContainer>
    </div>
  );
};

export default ReservationForm;
