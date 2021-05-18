import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdministrateButtons from '../../components/AdministrateButtons';
import Room from '../../interfaces/Room';
import axios from '../../axios';
import RoomGrid from '../../components/RoomGrid';
import ChangeRoom from '../../components/ChangeRoom';
import Section from '../../interfaces/Section';
const Container = styled.div`
  padding-top: 8%;
  padding-right: 3%;
  padding-left: 3%;
`;
function RoomAdministration() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [currentRoom, setCurrentRoom] = useState<Room>();

  const getAllRooms = () => {
    axios.get('/room').then((response) => {
      console.log(response.data);
      setRooms(response.data['rooms']);
    });
  };

  const changeRoom = (
    name: string,
    capacity: number,
    sections: any[],
    id: number
  ) => {
    axios
      .put(`/room/edit/${id}`, {
        name: name,
        capacity: capacity,
        sections: sections,
      })
      .then(() => alert('Du endret rommet'))
      .catch((err) => {
        alert(err.data.error);
      });
  };

  const deleteRoom = (id: number) => {
    axios
      .delete(`/room/${id}`)
      .then(() => {
        setRooms(rooms.filter((room) => room.room_id != id));
        setOpenPopup(!openPopup);
        alert('Du slettet rommet');
      })
      .catch((err) => alert(err.data.error));
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
        deleteRoom={deleteRoom}
        changeRoom={(name, capacity, sections, id) =>
          changeRoom(name, capacity, sections, id)
        }
      ></ChangeRoom>
    </Container>
  );
}

export default RoomAdministration;
