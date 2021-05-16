import React from 'react';
import styled from 'styled-components';
import AdministrateButtons from '../../components/AdministrateButtons';
const Container = styled.div`
  padding-top: 8%;
  padding-right: 3%;
  padding-left: 3%;
`;
function ReservationAdministration() {
  return (
    <Container>
      <AdministrateButtons />
    </Container>
  );
}

export default ReservationAdministration;
