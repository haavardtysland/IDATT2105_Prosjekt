/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useMemo, useState } from 'react';

import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import { Context } from './Context';
import Room from './interfaces/Room';

function App() {
  const [user, setUser] = useState({
    userId: -1,
    isAdmin: false,
  });
  const [room, setRoom] = useState<Room>({
    room_id: -1,
    name: '',
    capacity: 0,
    sections: [],
  });
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const roomValue = useMemo(() => ({ room, setRoom }), [room, setRoom]);

  return (
    <Context.UserContext.Provider value={userValue}>
      <Context.RoomContext.Provider value={roomValue}>
        <BrowserRouter>
          <div className="App">{Routes}</div>
        </BrowserRouter>
      </Context.RoomContext.Provider>
    </Context.UserContext.Provider>
  );
}

export default App;
