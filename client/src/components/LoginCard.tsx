import React, { ChangeEvent, KeyboardEventHandler } from 'react';
import { TextField, Button } from '@material-ui/core';
import styled from 'styled-components';

const LoginCardContainer = styled.div`
  width: 30rem;
  height: 28rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 3rem;
  border-radius: 8px;
`;

interface Props {
  onLogin: () => void;
  onChangeUsername: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: any) => void;
}

const LoginCard = ({
  onLogin,
  onChangeUsername,
  onChangePassword,
  onKeyDown,
}: Props) => {
  return (
    <LoginCardContainer>
      <h2>LOG IN</h2>
      <form>
        <TextField
          style={{ width: '100%', marginBottom: 24 }}
          label="Email"
          onChange={onChangeUsername}
          variant="outlined"
          onKeyDown={onKeyDown}
        />
        <TextField
          style={{ width: '100%', marginBottom: 24 }}
          label="Password"
          variant="outlined"
          type="password"
          onChange={onChangePassword}
          onKeyDown={onKeyDown}
        />
      </form>
      <Button
        style={{ width: '100%', height: '50px' }}
        variant="contained"
        color="primary"
        onClick={onLogin}
      >
        LOG IN
      </Button>
    </LoginCardContainer>
  );
};

export default LoginCard;
