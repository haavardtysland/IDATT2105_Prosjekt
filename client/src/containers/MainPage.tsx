import { Button, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Calendar } from '@material-ui/pickers';
import Form from '../components/Form';

const Container = styled.div`
  padding-top: 10%;
  padding-right: 3%;
  padding-left: 3%;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

function MainPage() {
  return (
    <Container>
      <Form></Form>
      <Flex>
        <Button>Vis ledige rom</Button>
        <Button>Vis alle rom</Button>
      </Flex>
    </Container>
  );
}

export default MainPage;
