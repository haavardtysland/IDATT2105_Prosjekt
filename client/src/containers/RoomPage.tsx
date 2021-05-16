import React, { ChangeEvent, useContext, useState } from 'react';
import Room from '../interfaces/Room';
import {
  Divider,
  MenuItem,
  TextField,
  Tooltip,
  withStyles,
} from '@material-ui/core';
import Section from '../interfaces/Section';
import Calendar from '../components/CalendarComponents/Calendar';
import styled from 'styled-components';
import InfoIcon from '@material-ui/icons/Info';
import RoomCard from '../components/RoomCard';
import { Context } from '../Context';

const StyledHeader = styled.h1`
  margin-top: 6rem;
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

const RoomPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>({
    room_id: -1,
    section_id: -1,
    section_name: '',
  });
  const [selectedDate, setSelectedDate] = React.useState<Date>(
    new Date('2014-08-18T21:11:54')
  );
  const room: Room = {
    room_id: 1,
    name: 'Room 1',
    capacity: 10, //antall plasser
    sections: [
      {
        room_id: 1,
        section_id: 1,
        section_name: 'Seksjon 1',
      },
    ],
  };
  const { roomContext } = useContext(Context.RoomContext);

  const handleChangeCurrentSection = (event: ChangeEvent<HTMLInputElement>) => {
    const tmp = room.sections.find(
      (section) => section.section_id === +event.target.value
    );
    if (tmp !== undefined) setCurrentSection(tmp);
  };

  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSelectedDate(new Date(event.target.value));
  };

  return (
    <div>
      <StyledDivHeader>
        <StyledHeader>{room.name}</StyledHeader>
        <Tooltip
          title="Markere de ønskede tidene"
          style={{ marginTop: '6.8rem', marginLeft: '0.5rem' }}
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
          onChange={handleChangeCurrentSection}
          value={currentSection}
        >
          {room.sections.map((section, key: number) => (
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
      <Calendar date={selectedDate} />
      <RoomCard
        room={{
          room_id: 123,
          name: 'Room 1',
          capacity: 100,
          sections: [],
        }}
      />
      <button onClick={() => console.log(roomContext)}>log room context</button>
    </div>
  );
};

export default RoomPage;
