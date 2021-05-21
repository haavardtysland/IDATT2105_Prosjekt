import React, { createContext } from 'react';

const UserContext = createContext<any>(null);
const RoomContext = createContext<any>(null);
const DateContext = createContext<any>(null);

export const Context = {
  UserContext,
  RoomContext,
  DateContext,
};
