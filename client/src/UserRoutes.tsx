import React, { useState, useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import axios from './axios';

interface PublicRouteProps extends RouteProps {
  component: any;
}

const UserRoutes: React.FC<PublicRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const isLogin = async () => {
      const id = localStorage.getItem('id');
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          token: token,
        },
      };
      await axios
        .post(
          `security/token/validate`,
          {
            userId: id,
          },
          config
        )
        .then((response) => {
          if (response.data.result == 'true') {
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
          }
        })
        .catch((error) => {
          console.log('Feil ved request av validering ' + error.message);
        });
      setLoadingComplete(true);
    };
    isLogin();
  }, []);

  if (loadingComplete) {
    return (
      <Route
        {...rest}
        render={(props) =>
          authenticated ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  } else {
    return <div>Loading</div>;
  }
};

export default UserRoutes;
