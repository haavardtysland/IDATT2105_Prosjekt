import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import CreateRoomForm from '../../components/room_components/CreateRoomForm';
import axios from '../../axios';

const Container = styled.div`
  padding-top: 13%;
  padding-right: 3%;
  padding-left: 3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

interface Section {
  section_name: string;
  capacity: number;
}

function CreateRoom() {
  const [roomname, setRoomname] = useState<string>();
  const [capacity, setCapacity] = useState<number>();
  const [sections, setSections] = useState<Section[]>();

  const addRoom = () => {
    if (roomname != undefined && capacity != undefined) {
      console.log(roomname);
      console.log(capacity);
      console.log(sections);
      axios
        .post('/room', {
          name: roomname,
          capacity: capacity,
          sections: sections,
        })
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            alert('Du opprettet rommet');
          }
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    } else {
      alert('Fyll inn alle felt');
    }
  };
  return (
    <Container>
      <CreateRoomForm
        nameChange={(name) => setRoomname(name)}
        capacityChange={(num) => setCapacity(num)}
        sectionsChange={(sec) => setSections(sec)}
      ></CreateRoomForm>
      <Button onClick={addRoom} style={{ padding: '1rem', margin: '1rem' }}>
        Legg til rom
      </Button>
    </Container>
  );
}

export default CreateRoom;
