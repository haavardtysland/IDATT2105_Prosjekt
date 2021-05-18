import React, { useContext, useEffect } from 'react';
import TextField, { Button, withStyles } from '@material-ui/core';
import styled from 'styled-components';
import User from '../interfaces/User';
import axios from 'axios';
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
  const getUser = async () => {
    try {
      const request = await axios.get(`/user/${user.id}`);
      console.log(request);
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
      <div>hei</div>

      <ButtonsContainer>
        <StyledButton variant="outlined">Bekreft</StyledButton>
        <StyledButton variant="outlined">Avbryt</StyledButton>
        <button onClick={() => console.log(user)}>log user</button>
      </ButtonsContainer>
    </div>
  );
};

export default ReservationForm;
