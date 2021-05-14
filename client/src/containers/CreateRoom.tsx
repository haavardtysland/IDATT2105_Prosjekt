import React, { useState } from 'react';
import styled from 'styled-components';
import CreateRoomForm from '../components/CreateRoomForm';

const Container = styled.div`
  padding-top: 7%;
  padding-right: 3%;
  padding-left: 3%;
`;

function CreateRoom() {
  const [roomname, setRoomname] = useState<string>();
  const [capacity, setCapacity] = useState<number>();
  const [sections, setSections] = useState<any[]>();
  return (
    <Container>
      <CreateRoomForm
        nameChange={(name) => setRoomname(name)}
        capacityChange={(num) => setCapacity(num)}
        sectionsChange={(sec) => setSections(sec)}
      ></CreateRoomForm>
    </Container>
  );
}

export default CreateRoom;
