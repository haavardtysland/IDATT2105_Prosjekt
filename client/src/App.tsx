/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useMemo, useState } from 'react';

import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import { Context } from './Context';
import Room from './interfaces/Room';

function App() {
  const [user, setUser] = useState({
    id: -1,
    isAdmin: false,
  });
  const [room, setRoom] = useState<Room>({
    room_id: -1,
    name: '',
    capacity: 0,
    sections: [],
  });
  const [date, setDate] = useState<Date>(new Date());
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const roomValue = useMemo(() => ({ room, setRoom }), [room, setRoom]);
  const dateValue = useMemo(() => ({ date, setDate }), [date, setDate]);

  return (
    <Context.UserContext.Provider value={userValue}>
      <Context.RoomContext.Provider value={roomValue}>
        <Context.DateContext.Provider value={dateValue}>
          <BrowserRouter>
            <div className="App">{Routes}</div>
          </BrowserRouter>
        </Context.DateContext.Provider>
      </Context.RoomContext.Provider>
    </Context.UserContext.Provider>
  );
}

export default App;
