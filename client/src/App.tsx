/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useMemo, useState } from 'react';

import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import { Context } from './Context';
import User from './interfaces/User';

function App() {
  const [user, setUser] = useState<User>({
    userId: -1,
    firstName: '',
    surname: '',
    email: '',
    isAdmin: false,
    validDate: new Date(),
    phoneNumber: '',
  });
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Context.UserContext.Provider value={value}>
      <BrowserRouter>
        <div className="App">{Routes}</div>
      </BrowserRouter>
    </Context.UserContext.Provider>
  );
}

export default App;
