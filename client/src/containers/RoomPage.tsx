import React, { ChangeEvent, useState } from 'react';
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

interface RoomPageProps {
  room?: Room;
}

const RoomPage: React.FC<RoomPageProps> = () => {
  const [currentSection, setCurrentSection] = useState<Section>({
    roomId: -1,
    sectionId: -1,
    sectionName: '',
  });
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  );
  const room: Room = {
    roomId: 1,
    name: 'Room 1',
    capacity: 10, //antall plasser
    sections: [
      {
        roomId: 1,
        sectionId: 1,
        sectionName: 'Seksjon 1',
      },
    ],
  };

  const handleChangeCurrentSection = (event: ChangeEvent<HTMLInputElement>) => {
    const tmp = room.sections.find(
      (section) => section.sectionId === +event.target.value
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
            <MenuItem value={section.sectionId} key={key}>
              {section.sectionName}
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
      <Calendar date={new Date('2021-05-12')} />
      <button onClick={() => console.log(selectedDate)}>
        log selected date
      </button>
    </div>
  );
};

export default RoomPage;
