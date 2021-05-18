import React, { useContext, useEffect, useState } from 'react';
import TextField, { Button, Typography, withStyles } from '@material-ui/core';
import styled from 'styled-components';
import User from '../interfaces/User';
import axios from '../axios';
import { Context } from '../Context';

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
  //onClickTime: (index: number) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  times,
  selectedTimes,
  setSelectedTimes,
  isMarkedArr,
  setIsMarkedArr,
}: //onClickTime,
ReservationFormProps) => {
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
        setCurrentTimes([]);
      } else {
        setCurrentTimes(
          currentTimes.filter((time) => time !== selectedTimes[index])
        );
      }
    }
  };

  const updateIsMarkedArr = (index: number) => {
    const items = [...isMarkedArr];
    let item = items[index];
    item = !item;
    items[index] = item;
    setIsMarkedArr(items);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (selectedTimes !== undefined) {
      setSelectedTimes(currentTimes);
      //const prev = [...isMarkedArr];

      currentTimes.forEach((time) => {
        updateIsMarkedArr(times.indexOf(time));
      });
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
      </Typography>

      <ButtonsContainer>
        <StyledButton variant="outlined">Bekreft</StyledButton>
        <StyledButton variant="outlined">Avbryt</StyledButton>
        <button onClick={() => console.log(selectedTimes)}>
          log selected times
        </button>
        <button onClick={() => console.log(isMarkedArr)}>
          Log is marked arr
        </button>
      </ButtonsContainer>
    </div>
  );
};

export default ReservationForm;
