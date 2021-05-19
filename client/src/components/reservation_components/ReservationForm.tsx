import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import {
  Button,
  Typography,
  withStyles,
  TextField,
  AccordionSummary,
} from '@material-ui/core';
import styled from 'styled-components';
import User from '../../interfaces/User';
import axios from '../../axios';
import { Context } from '../../Context';
import Section from '../../interfaces/Section';
import { Description } from '@material-ui/icons';

const ButtonsContainer = styled.div`
  display: flex;
`;

const StyledButton = withStyles({
  root: {
    margin: '2%',
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
}: ReservationFormProps) => {
  const { user } = useContext(Context.UserContext);
  const [currentUser, setCurrentUser] = useState<User>({
    userId: -1,
    firstName: '',
    surname: '',
    email: '',
    isAdmin: false,
    validDate: new Date(),
    phoneNumber: '',
  });
  const [currentTimes, setCurrentTimes] = useState<string[]>(
    selectedTimes !== undefined ? selectedTimes : []
  );
  const [fromDate, setFromDate] = useState<string>(currentTimes[0]);
  const [toDate, setToDate] = useState<string>(currentTimes[0]);
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
      const request = await axios.get(`/user/${user.id}`);
      console.log(request);
      setCurrentUser(request.data['user']);
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
      const dateFormat = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDay()}`;
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
      //TODO: mark the reserved times.
      return request;
    } catch (err) {
      console.log(err);
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
        <ul>
          {currentTimes?.map((time, key: number) => (
            <li onClick={deleteListItem.bind(this, key)} key={key}>
              {time}
            </li>
          ))}
        </ul>
        <TextField
          variant="outlined"
          label="Beskrivelse"
          value={desc}
          onChange={onChangeDesc}
        />
        <TextField
          variant="outlined"
          type="number"
          label="Plasser"
          value={capacity}
          onChange={onChangeCapacity}
        />
      </Typography>

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
        <button onClick={() => console.log(selectedTimes)}>
          log selected times
        </button>
        <button onClick={() => console.log(isMarkedArr)}>
          Log is marked arr
        </button>
        <button onClick={() => console.log(deleteTime)}>log delete time</button>
      </ButtonsContainer>
    </div>
  );
};

export default ReservationForm;
