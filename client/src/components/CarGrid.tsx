import React, { useEffect, useState } from 'react';
import { GridList } from '@material-ui/core';
import Car from '../interfaces/Car';
import styled from 'styled-components';
import CarCard from './CarCard';
import Pageination from '@material-ui/lab/Pagination';

const Container = styled.div`
  padding: 1rem;
  padding-bottom: 3rem;
  width: 60%;
`;

interface Props {
  cars: Car[];
}

const CarGrid = ({ cars }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [currentCars, setCurrentCars] = useState<Car[]>(cars);

  useEffect(() => {
    const startIndex = (page - 1) * 12;
    const endIndex = page * 12;
    setCurrentCars(cars.slice(startIndex, endIndex));
  }, [page, cars]);

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
        cols={4}
      >
        {currentCars.map((car, index) => (
          <CarCard key={index} car={car}></CarCard>
        ))}
      </GridList>
      <Pageination
        style={{
          justifyContent: 'center',
          display: 'flex',
          marginBottom: '3rem',
        }}
        onChange={onPageChange}
        count={Math.ceil(cars.length / 12)}
        size="large"
      />
    </Container>
  );
};
export default CarGrid;
