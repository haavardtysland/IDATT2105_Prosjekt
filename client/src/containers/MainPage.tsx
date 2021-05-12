import { TextField } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding-top: 10%;
  padding-right: 3%;
  padding-left: 3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function MainPage() {
  return (
    <Container>
      <TextField></TextField>
    </Container>
  );
}

export default MainPage;
