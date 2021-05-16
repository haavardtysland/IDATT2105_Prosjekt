import React, { useState } from 'react';
import Room from '../interfaces/Room';
import CreateUserForm from './CreateUserForm';
import Popup from './Popup';

interface Props {
  room: Room;
}

function ChangeRoom() {
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  return (
    <Popup
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}
      title="Endre rom"
    ></Popup>
  );
}

export default ChangeRoom;
