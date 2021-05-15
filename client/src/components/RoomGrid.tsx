import React, { useEffect, useState } from 'react';
import { GridList } from '@material-ui/core';
import styled from 'styled-components';
import Pageination from '@material-ui/lab/Pagination';
import Room from '../interfaces/Room';
import RoomCard from './RoomCard';

const Container = styled.div`
  padding: 1rem;
  padding-bottom: 3rem;
  width: 60%;
  margin-top: 2rem;
  width: 100%;
  height: 100%;
`;

interface Props {
  rooms: Room[];
}

const RoomGrid = ({ rooms }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [currentRooms, setCurrentRooms] = useState<Room[]>(rooms);

  useEffect(() => {
    const startIndex = (page - 1) * 12;
    const endIndex = page * 12;
    setCurrentRooms(rooms.slice(startIndex, endIndex));
  }, [page, rooms]);

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
        {rooms.map((room, index) => (
          <RoomCard key={index} room={room}></RoomCard>
        ))}
      </GridList>
      <Pageination
        style={{
          justifyContent: 'center',
          display: 'flex',
          marginBottom: '3rem',
        }}
        onChange={onPageChange}
        count={Math.ceil(rooms.length / 12)}
        size="large"
      />
    </Container>
  );
};
export default RoomGrid;
