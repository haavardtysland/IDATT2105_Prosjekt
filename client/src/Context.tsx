import React, { createContext } from 'react';
import User from './interfaces/User';
import Room from './interfaces/Room';

/*
const UserContext = createContext<User>({
  userId: -1,
  firstName: '',
  surname: '',
  email: '',
  isAdmin: false,
  validDate: new Date(),
  phoneNumber: '',
});
*/
const UserContext = createContext<any>(null);
const RoomContext = createContext<any>(null);
/*
const RoomContext = createContext<Room>({
  room_id: -1,
  name: '',
  capacity: 0,
  sections: [],
});
*/

export const Context = {
  UserContext,
  RoomContext,
};
