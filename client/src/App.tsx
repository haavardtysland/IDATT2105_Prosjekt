/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useEffect, useMemo, useState } from 'react';

import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

export const UserContext = createContext<any>(null);

function App() {
  const [user, setUser] = useState<string>('');
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={value}>
      <BrowserRouter>
        <div className="App">{Routes}</div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
