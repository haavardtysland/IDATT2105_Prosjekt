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
  times?: string[];
  user?: User;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  times,
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

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <Typography>
        {currentUser.userId !== -1 &&
          currentUser.firstName + ' ' + currentUser.surname + ' '}
        ønsker å reservere de følgende tidene:
      </Typography>

      <ButtonsContainer>
        <StyledButton variant="outlined">Bekreft</StyledButton>
        <StyledButton variant="outlined">Avbryt</StyledButton>
      </ButtonsContainer>
    </div>
  );
};

export default ReservationForm;
