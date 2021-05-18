import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import Room from '../interfaces/Room';
import CreateRoomForm from './CreateRoomForm';
import CreateUserForm from './CreateUserForm';
import Popup from './Popup';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';

interface Props {
  room: Room | undefined;
  openPopup: boolean;
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
  deleteRoom: (id: number) => void;
  changeRoom: (
    name: string,
    capacity: number,
    sections: Section[],
    id: number
  ) => void;
}

const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

interface Section {
  section_name: string;
  capacity: number;
}

function ChangeRoom({
  room,
  openPopup,
  setOpenPopup,
  deleteRoom,
  changeRoom,
}: Props) {
  const [roomname, setRoomname] = useState<string>('');
  const [capacity, setCapacity] = useState<number>(0);
  const [sections, setSections] = useState<Section[]>([]);

  return (
    <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Endre rom">
      <CreateRoomForm
        room={room}
        nameChange={(name) => setRoomname(name)}
        capacityChange={(num) => setCapacity(num)}
        sectionsChange={(sec) => setSections(sec)}
      ></CreateRoomForm>
      {room && (
        <Flex>
          <Button
            style={{ marginRight: '1rem' }}
            onClick={() =>
              changeRoom(roomname, capacity, sections, room.room_id)
            }
          >
            Oppdater rom
          </Button>
          <Button onClick={() => deleteRoom(room.room_id)}>
            Slett rom <DeleteIcon></DeleteIcon>
          </Button>
        </Flex>
      )}
    </Popup>
  );
}

export default ChangeRoom;
