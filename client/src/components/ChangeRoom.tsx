import React, { useState } from 'react';
import Room from '../interfaces/Room';
import CreateRoomForm from './CreateRoomForm';
import CreateUserForm from './CreateUserForm';
import Popup from './Popup';

interface Props {
  room: Room | undefined;
  openPopup: boolean;
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Section {
  section_name: string;
  capacity: number;
}

function ChangeRoom({ room, openPopup, setOpenPopup }: Props) {
  const [roomname, setRoomname] = useState<string>();
  const [capacity, setCapacity] = useState<number>();
  const [sections, setSections] = useState<Section[]>();

  return (
    <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Endre rom">
      <CreateRoomForm
        room={room}
        nameChange={(name) => setRoomname(name)}
        capacityChange={(num) => setCapacity(num)}
        sectionsChange={(sec) => setSections(sec)}
      ></CreateRoomForm>
    </Popup>
  );
}

export default ChangeRoom;
