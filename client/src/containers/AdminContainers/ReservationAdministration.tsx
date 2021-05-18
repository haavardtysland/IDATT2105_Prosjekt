import axios from '../../axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdministrateButtons from '../../components/AdministrateButtons';
import Reservation from '../../interfaces/Reservation';
const Container = styled.div`
  padding-top: 8%;
  padding-right: 3%;
  padding-left: 3%;
`;
function ReservationAdministration() {
  const [resevations, setReservations] = useState<Reservation>();

  const loadResevations = () => {
    axios
      .get('/reservation')
      .then((response) => setReservations(response.data['reservations']));
  };

  useEffect(loadResevations, []);

  return (
    <Container>
      <AdministrateButtons />
    </Container>
  );
}

export default ReservationAdministration;
