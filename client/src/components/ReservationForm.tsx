import React from 'react';
import TextField, { Button, withStyles } from '@material-ui/core';
import styled from 'styled-components';
import User from '../interfaces/User';
import axios from 'axios';

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
  user?: User;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  times,
}: ReservationFormProps) => {
  /*
  const getUser = async () => {
    const request = await axios.get(/)
  }
  */
  return (
    <div>
      <div>hei</div>

      <ButtonsContainer>
        <StyledButton variant="outlined">Bekreft</StyledButton>
        <StyledButton variant="outlined">Avbryt</StyledButton>
      </ButtonsContainer>
    </div>
  );
};

export default ReservationForm;
