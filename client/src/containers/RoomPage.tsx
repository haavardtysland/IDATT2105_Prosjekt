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
import Calendar from '../components/calendar_components/Calendar';
import styled from 'styled-components';
import InfoIcon from '@material-ui/icons/Info';
import { Context } from '../Context';

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
      const tmp = room['sections'].find(
        (section: Section) => section.section_id === +event.target.value
      );
      if (tmp !== undefined) setCurrentSection(tmp);
    }
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
          {room !== undefined &&
            room['sections'].map((section: Section, key: number) => (
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
      {currentSection.room_id !== -1 && (
        <Calendar date={selectedDate} section={currentSection} />
      )}
      <button onClick={() => console.log(room['sections:'])}>
        log context sections
      </button>
      <button onClick={() => console.log(currentSection)}>
        log current sectionms
      </button>
    </div>
  );
};

export default RoomPage;
