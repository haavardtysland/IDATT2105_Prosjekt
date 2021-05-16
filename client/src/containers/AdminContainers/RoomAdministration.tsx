import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdministrateButtons from '../../components/AdministrateButtons';
import Room from '../../interfaces/Room';
import axios from '../../axios';
import RoomGrid from '../../components/RoomGrid';
const Container = styled.div`
  padding-top: 8%;
  padding-right: 3%;
  padding-left: 3%;
`;
function RoomAdministration() {
  const [rooms, setRooms] = useState<Room[]>();

  const getAllRooms = () => {
    axios.get('/room').then((response) => {
      console.log(response.data);
      setRooms(response.data['rooms']);
    });
  };

  useEffect(getAllRooms, []);

  return (
    <Container>
      <AdministrateButtons />
      {rooms && <RoomGrid rooms={rooms}></RoomGrid>}
    </Container>
  );
}

export default RoomAdministration;
