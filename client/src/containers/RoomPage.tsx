import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import Room from '../interfaces/Room';
import {
  Button,
  Divider,
  TextField,
  Tooltip,
  withStyles,
} from '@material-ui/core';
import Section from '../interfaces/Section';
import Calendar from '../components/calendar_components/Calendar';
import styled from 'styled-components';
import InfoIcon from '@material-ui/icons/Info';
import { Context } from '../Context';
import Chat from '../components/chat_components/Chat';
import Stats from '../components/stats_components/Stats';
import axios from '../axios';
import { Autocomplete } from '@material-ui/lab';
import ChatIcon from '@material-ui/icons/Chat';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import EqualizerIcon from '@material-ui/icons/Equalizer';

const StyledHeader = styled.h1`
  margin-top: 5%;
`;

const StyledDivHeader = styled.div`
  margin-left: 50%;
  display: flex;
  margin-top: 10%;
`;

const RoomPage: React.FC = () => {
  const { room } = useContext(Context.RoomContext);
  const [openChat, setOpenChat] = useState<boolean>(false);
  const [openStats, setOpenStats] = useState<boolean>(false);
  const [currentRoom, setCurrentRoom] = useState<Room>(room);
  const [currentSection, setCurrentSection] = useState<Section>({
    room_id: -1,
    section_id: -1,
    section_name: '',
    capacity: -1,
  });

  const { date } = useContext(Context.DateContext);
  const [selectedDate, setSelectedDate] = React.useState<Date>(date);

  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(event.target.value));
  };

  const onValueChange = (
    event: ChangeEvent<any>,
    newInputValue: Section | null
  ) => {
    if (newInputValue) {
      setCurrentSection(newInputValue);
    }
  };

  const onChangeDate = (event: Date | null) => {
    if (event) {
      const dato: Date = new Date(
        event.getFullYear(),
        event.getMonth(),
        event.getDate()
      );
      setSelectedDate(dato);
    }
  };

  useEffect(() => {
    if (room['room_id'] === -1) {
      const pathName: string[] = window.location.pathname.split('/');
      axios.get(`/room/${pathName[pathName.length - 1]}`).then((response) => {
        console.log(response.data.sections[0]);
        setCurrentRoom(response.data);
        setCurrentSection(response.data.sections[0]);
      });
    }
  }, []);

  return (
    <div>
      <StyledDivHeader>
        <StyledHeader>{currentRoom.name}</StyledHeader>
        <Tooltip
          title="Velg dato og seksjon"
          style={{ marginTop: '6%', marginLeft: '0.5rem' }}
        >
          <InfoIcon></InfoIcon>
        </Tooltip>
      </StyledDivHeader>
      <Divider variant="fullWidth" />

      <div style={{ display: 'flex' }}>
        <Autocomplete
          style={{ marginTop: '5%', width: '15%', marginLeft: '31%' }}
          options={room.sections}
          getOptionLabel={(sec: any) => sec.section_name}
          onChange={onValueChange}
          renderInput={(params) => (
            <TextField {...params} label="Seksjon" variant="outlined" />
          )}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            style={{ margin: '5% 0 0 7%', width: '15%' }}
            inputVariant="outlined"
            minDate={new Date()}
            value={selectedDate}
            placeholder=""
            onChange={(date) => onChangeDate(date)}
            format="MM/dd/yyyy"
          />
        </MuiPickersUtilsProvider>
        <Button
          style={{ marginTop: '3rem', marginLeft: '4%', padding: '2rem' }}
          onClick={() => setOpenChat(!openChat)}
        >
          <ChatIcon />
        </Button>
        <Button
          style={{ marginTop: '3rem', padding: '2rem' }}
          onClick={() => setOpenStats(!openChat)}
        >
          <EqualizerIcon fontSize="large" />
        </Button>
        <Chat
          open={openChat}
          closeChat={() => setOpenChat(false)}
          room={currentRoom}
        ></Chat>
      </div>
      {currentRoom.room_id !== -1 && currentSection.section_id !== -1 && (
        <Calendar date={selectedDate} section={currentSection} />
      )}
      <Chat
        open={openChat}
        closeChat={() => setOpenChat(false)}
        room={currentRoom}
      ></Chat>
      <Stats
        open={openStats}
        closeStats={() => setOpenStats(false)}
        section={currentSection}
      ></Stats>
    </div>
  );
};

export default RoomPage;
