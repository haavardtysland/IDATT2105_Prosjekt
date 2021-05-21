import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import Room from '../interfaces/Room';
import {
  Divider,
  TextField,
  Tooltip,
  withStyles,
  Button,
} from '@material-ui/core';
import Section from '../interfaces/Section';
import Calendar from '../components/calendar_components/Calendar';
import styled from 'styled-components';
import InfoIcon from '@material-ui/icons/Info';
import { Context } from '../Context';
import Chat from '../components/chat_components/Chat';
import axios from '../axios';
import { Autocomplete } from '@material-ui/lab';

const StyledHeader = styled.h1`
  margin-top: 5%;
`;

const StyledDivHeader = styled.div`
  margin-left: 50%;
  display: flex;
  margin-top: 6rem;
`;
const StyledTextField = withStyles({
  root: {
    width: '20%',
    margin: '5% 10rem 5% 20%',
  },
})(TextField);

const RoomPage: React.FC = () => {
  const { room } = useContext(Context.RoomContext);
  const [openChat, setOpenChat] = useState<boolean>(false);
  const [currentRoom, setCurrentRoom] = useState<Room>(room);
  const [currentSection, setCurrentSection] = useState<Section>({
    room_id: -1,
    section_id: -1,
    section_name: '',
    capacity: -1,
  });
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [value, setValue] = React.useState(null);

  const handleChangeCurrentSection = (event: ChangeEvent<HTMLInputElement>) => {
    if (room !== undefined) {
      const tmp = currentRoom.sections.find(
        (section: Section) => section.section_id === +event.target.value
      );
      if (tmp !== undefined) setCurrentSection(tmp);
    }
  };

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
          style={{ marginTop: '8%', marginLeft: '0.5rem' }}
        >
          <InfoIcon></InfoIcon>
        </Tooltip>
      </StyledDivHeader>
      <Button onClick={() => setOpenChat(!openChat)}>Open Chat</Button>
      <Divider variant="fullWidth" />
      <div style={{ display: 'flex' }}>
        <Autocomplete
          style={{ marginTop: '3rem', width: '20%', marginLeft: '20%' }}
          options={room.sections}
          getOptionLabel={(sec: any) => sec.section_name}
          onChange={onValueChange}
          renderInput={(params) => (
            <TextField {...params} label="Seksjon" variant="outlined" />
          )}
        />
        <TextField
          id="date"
          label="Dato"
          type="date"
          style={{ marginTop: '3rem', marginLeft: '20%' }}
          defaultValue={new Date()}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChangeDate}
        />
      </div>
      {currentRoom.room_id !== -1 && currentSection.section_id !== -1 && (
        <Calendar date={selectedDate} section={currentSection} />
      )}

      <Chat
        open={openChat}
        closeChat={() => setOpenChat(false)}
        room={currentRoom}
      ></Chat>
    </div>
  );
};

export default RoomPage;
