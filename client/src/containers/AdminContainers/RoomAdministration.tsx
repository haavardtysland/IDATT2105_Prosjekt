import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdministrateButtons from '../../components/AdministrateButtons';
import Room from '../../interfaces/Room';
import axios from '../../axios';
import RoomGrid from '../../components/RoomGrid';
import ChangeRoom from '../../components/ChangeRoom';
const Container = styled.div`
  padding-top: 8%;
  padding-right: 3%;
  padding-left: 3%;
`;
function RoomAdministration() {
  const [rooms, setRooms] = useState<Room[]>();
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [currentRoom, setCurrentRoom] = useState<Room>();

  const getAllRooms = () => {
    axios.get('/room').then((response) => {
      console.log(response.data);
      setRooms(response.data['rooms']);
    });
  };

  const changeRoom = (shesh: string) => {
    console.log('endrer rommet ' + shesh);
  };

  const onRoomClick = (room: Room) => {
    setCurrentRoom(room);
    setOpenPopup(!openPopup);
  };

  useEffect(getAllRooms, []);

  return (
    <Container>
      <AdministrateButtons />
      {rooms && <RoomGrid onRoomClick={onRoomClick} rooms={rooms}></RoomGrid>}
      <ChangeRoom 
        room={currentRoom}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      ></ChangeRoom>
    </Container>
  );
}

export default RoomAdministration;
