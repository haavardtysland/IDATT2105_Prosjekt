import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import Room from '../interfaces/Room';
import {
  Divider,
  MenuItem,
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

const StyledHeader = styled.h1`
  margin-top: 13%;
`;

const StyledDivHeader = styled.div`
  margin-left: 50%;
  display: flex;
`;
const StyledTextField = withStyles({
  root: {
    width: '20%',
    margin: '5% 10rem 5% 20%',
  },
})(TextField);

//TODO: show available times for the current section and the current selected date
//TODO: fix popup to reserve marked times.
//TODO: make sure the user can only book 3 coherent times.
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
  const [selectedDate, setSelectedDate] = React.useState<Date>(
    new Date('2014-08-18T21:11:54')
  );

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

  useEffect(() => {
    if (room['room_id'] == -1) {
      const pathName: string[] = window.location.pathname.split('/');
      axios.get(`/room/${pathName[pathName.length - 1]}`).then((response) => {
        setCurrentRoom(response.data);
      });
    }
  }, []);

  return (
    <div>
      <StyledDivHeader>
        <StyledHeader>{currentRoom.name}</StyledHeader>
        <Tooltip
          title="Markere de ønskede tidene"
          style={{ marginTop: '6.8rem', marginLeft: '0.5rem' }}
        >
          <InfoIcon></InfoIcon>
        </Tooltip>
      </StyledDivHeader>
      <Button onClick={() => setOpenChat(!openChat)}>Open Chat</Button>
      <Divider variant="fullWidth" />
      <div>
        <StyledTextField
          variant="outlined"
          select
          label="Seksjon"
          onChange={handleChangeCurrentSection}
          value={currentSection}
        >
          {currentRoom !== undefined &&
            currentRoom.sections.map((section: Section, key: number) => (
              <MenuItem value={section.section_id} key={key}>
                {section.section_name}
              </MenuItem>
            ))}
        </StyledTextField>
        <TextField
          style={{ marginTop: '5%', marginLeft: '15%' }}
          id="date"
          label="Dato"
          type="date"
          defaultValue="2021-05-12"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChangeDate}
        />
      </div>
      {currentRoom.room_id !== -1 && (
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
