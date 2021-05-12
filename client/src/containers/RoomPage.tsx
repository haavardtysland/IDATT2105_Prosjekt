import React, { ChangeEvent, useState } from 'react';
import Room from '../interfaces/Room';
import { Button, MenuItem, TextField } from '@material-ui/core';
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

  const onChangeCurrentSection = (event: ChangeEvent<HTMLInputElement>) => {
    const tmp = room.sections.find(
      (section) => section.sectionId === +event.target.value
    );
    if (tmp !== undefined) setCurrentSection(tmp);
  };

  return (
    <div>
      <h1 style={{ marginTop: '5rem' }}>{room.name}</h1>
      <TextField
        style={{ width: '20%', margin: '5%' }}
        variant="outlined"
        select
        label="Seksjon"
        onChange={onChangeCurrentSection}
        value={currentSection}
      >
        {room.sections.map((section, key: number) => (
          <MenuItem value={section.sectionId} key={key}>
            {section.sectionName}
          </MenuItem>
        ))}
      </TextField>
      <Button onClick={() => console.log(currentSection)}>clickme</Button>
    </div>
  );
};

export default RoomPage;
