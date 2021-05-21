import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import Room from '../interfaces/Room';
import {
  Button,
  Divider,
  MenuItem,
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
import axios from '../axios';
import ChatIcon from '@material-ui/icons/Chat';

const StyledHeader = styled.h1`
  margin-top: 5%;
`;

const StyledDivHeader = styled.div`
  margin-left: 50%;
  display: flex;
  margin-top: 10%;
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
  const { date } = useContext(Context.DateContext);
  const [selectedDate, setSelectedDate] = React.useState<Date>(date);

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
      <div>
        <StyledTextField
          variant="outlined"
          select
          label="Seksjon"
          defaultValue={currentSection}
          onChange={handleChangeCurrentSection}
          value={currentSection}
        >
          {currentRoom !== undefined &&
            currentRoom.sections !== undefined &&
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
          defaultValue={date}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChangeDate}
        />
        <Button
          style={{ marginTop: '5%', marginLeft: '4%' }}
          onClick={() => setOpenChat(!openChat)}
        >
          <ChatIcon />
        </Button>
        {openChat && (
          <Chat
            open={openChat}
            closeChat={() => setOpenChat(false)}
            room={currentRoom}
          ></Chat>
        )}
      </div>
      {currentRoom.room_id !== -1 && currentSection.section_id !== -1 && (
        <Calendar date={selectedDate} section={currentSection} />
      )}
    </div>
  );
};

export default RoomPage;
