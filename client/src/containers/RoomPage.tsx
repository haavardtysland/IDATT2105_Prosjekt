import React, { ChangeEvent, useState } from 'react';
import Room from '../interfaces/Room';
import { Button, MenuItem, TextField } from '@material-ui/core';
import Section from '../interfaces/Section';
import Calendar from '../components/CalendarComponents/Calendar';

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
      <Button
        onClick={() => {
          console.log(currentSection);
          console.log(selectedDate);
        }}
      >
        clickme
      </Button>
      <TextField
        id="date"
        label="Dato"
        type="date"
        defaultValue="2021-05-12"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChangeDate}
      />
      <Calendar date={new Date('2021-05-12')} />
    </div>
  );
};

export default RoomPage;
