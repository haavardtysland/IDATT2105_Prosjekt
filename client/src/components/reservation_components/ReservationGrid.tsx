import { GridList, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Reservation from '../../interfaces/Reservation';
import ReservationCard from './ReservationCard';
import Pageination from '@material-ui/lab/Pagination';
import axios, { AxiosResponse } from 'axios';

const Container = styled.div`
  padding: 1rem;
  padding-bottom: 3rem;
  width: 60%;
  margin-top: 2rem;
  width: 100%;
  height: 100%;
`;

interface Props {
  reservations: Reservation[];
  getReservations: () => void;
}

function UserGrid({ reservations,getReservations }: Props) {
  const [page, setPage] = useState<number>(1);
  const [currentReservations, setCurrentReservations] = useState<Reservation[]>(reservations);

  useEffect(() => {
    const startIndex = (page - 1) * 12;
    const endIndex = page * 12;
    setCurrentReservations(reservations.slice(startIndex, endIndex));
  }, [page, reservations]);

  const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  

  return (
    <Container>
      <GridList
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem',
        }}
        cols={3}
      >
        {currentReservations.map((reservation, index) => (
          <ReservationCard
            key={index}
            reservation={reservation}
            getReservationsUser = {getReservations}
          ></ReservationCard>
        ))}
      </GridList>
      <Pageination
        style={{
          justifyContent: 'center',
          display: 'flex',
          marginBottom: '3rem',
        }}
        onChange={onPageChange}
        count={Math.ceil(reservations.length / 12)}
        size="large"
      />
    </Container>
  );
}

export default UserGrid;
