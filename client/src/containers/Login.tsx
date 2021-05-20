import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import LoginCard from '../components/LoginCard';
import { useHistory } from 'react-router-dom';
import { Context } from '../Context';
import axios from '../axios';

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #334d50; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #cbcaa5,
    #334d50
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #cbcaa5,
    #334d50
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setUser } = useContext(Context.UserContext);

  const onLogin = () => {
    axios
      .post('/login', {
        email: username,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isAdmin", response.data.isAdmin);
        localStorage.setItem("id", response.data.id);
        setUser(response.data);
        history.push('/mainPage');
      })
      .catch((err) => alert(err.response.data.error));
  };

  const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername((event.target as HTMLInputElement).value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword((event.target as HTMLInputElement).value);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      onLogin();
    }
  };

  return (
    <LoginContainer>
      <LoginCard
        onLogin={onLogin}
        onChangeUsername={onChangeUsername}
        onChangePassword={onChangePassword}
        onKeyDown={onKeyDown}
      ></LoginCard>
    </LoginContainer>
  );
};

export default Login;
