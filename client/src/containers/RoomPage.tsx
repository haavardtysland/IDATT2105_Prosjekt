import React, { ChangeEvent, useState } from 'react';
import Room from '../interfaces/Room';
import { Button, MenuItem, TextField } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Section from '../interfaces/Section';

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

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h1 style={{ marginTop: '5rem' }}>{room.name}</h1>
      <TextField
        style={{ width: '20%', margin: '5%' }}
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
      </TextField>
      <Button onClick={() => console.log(currentSection)}>clickme</Button>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default RoomPage;
