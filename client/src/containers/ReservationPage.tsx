import React, { useContext, useEffect, useState } from 'react';
import ReservationCard from '../components/ReservationCard';
import { Divider, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { SortFunctions } from '../components/sorting/SortFunctions';
import Reservation from '../interfaces/Reservation';
import SortMenu from '../components/sorting/SortMenu';
import axios from '../axios';
import { UserContext } from '../App';
import FilterMenu from '../components/filter/FilterMenu';
import { FilterFunctions } from '../components/filter/FilterFunctions';

const LeftContainer = styled.div`
  margin-left: 2%;
  margin-right: 3%;
`;

const RightContainer = styled.div`
  margin-left: 3%;
  margin-right: 3%;
  flex: 1;
`;

enum SortOptions {
  CapacityHighLow = 1,
  CapacityLowHigh = 2,
  DateLateEarly = 3,
  DateEarlyLate = 4,
}

//TODO: filter multiple things at the same time
const ReservationPage: React.FC = () => {
  const { user } = useContext(UserContext);
  const [sortOption, setSortOption] = React.useState<number>(0);
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      reservationId: 1,
      capacity: 10,
      description: 'Reserverer dette rommet shamener',
      fromDate: '05-15-2021 13:50:00',
      toDate: '05-15-2021 16:00:00',
    },
    {
      reservationId: 2,
      capacity: 20,
      description: 'hva skjer babajan',
      fromDate: '05-10-2021 12:00:00',
      toDate: '05-21-2021 15:00:00',
    },
  ]);
  const [currentReservations, setCurrentReservations] =
    useState<Reservation[]>(reservations);
  const [descFilter, setDescFilter] = useState<string>('');
  const [timeFilterFrom, setTimeFilterFrom] = useState<string>('');
  const [timeFilterTo, setTimeFilterTo] = useState<string>('');
  const [capFilter, setCapFilter] = React.useState<number[]>([20, 37]);

  /*
  const getAllReservations = async () => {
    ///user/${userid}/reservation
    const request = await axios.get(`/user/${userId}`);
  };
  */

  useEffect(() => {
    if (sortOption === SortOptions.CapacityHighLow) {
      setCurrentReservations(SortFunctions.sortCapacityHighLow);
    } else if (sortOption == SortOptions.CapacityLowHigh) {
      setCurrentReservations(SortFunctions.sortCapacityLowHigh);
    } else if (sortOption === SortOptions.DateLateEarly) {
      setCurrentReservations(SortFunctions.sortDateLateEarly);
    } else if (sortOption === SortOptions.DateEarlyLate) {
      setCurrentReservations(SortFunctions.sortDateEarlyLate);
    }
  }, [sortOption]);

  useEffect(() => {
    if (reservations) {
      let filteredReservations = FilterFunctions.descFilter(
        reservations,
        descFilter
      );
      filteredReservations = FilterFunctions.timeFilter(
        reservations,
        timeFilterFrom,
        timeFilterTo
      );
      filteredReservations = FilterFunctions.capFilter(reservations, capFilter);
      setCurrentReservations(filteredReservations);
    }
  }, [descFilter, timeFilterFrom, timeFilterTo, capFilter]);

  const renderReservations = currentReservations.map(
    (reservation, key: number) => {
      return <ReservationCard key={key} reservation={reservation} />;
    }
  );

  return (
    <div>
      <Typography
        variant="h5"
        style={{ marginTop: '6rem', marginLeft: '1rem' }}
      >
        Mine Reservasjoner
      </Typography>
      <div style={{ marginTop: '1rem', display: 'flex' }}>
        <LeftContainer>
          <Divider variant="fullWidth" />
          <div style={{ marginTop: '5%', marginBottom: '5%' }}>
            <SortMenu sortOption={sortOption} setSortOption={setSortOption} />
          </div>
          <Divider variant="fullWidth" />
          <div style={{ marginTop: '5%', marginBottom: '5%' }}>
            <FilterMenu
              descFilter={descFilter}
              setDescFilter={setDescFilter}
              timeFilterFrom={timeFilterFrom}
              setTimeFilterFrom={setTimeFilterFrom}
              timeFilterTo={timeFilterTo}
              setTimeFilterTo={setTimeFilterTo}
              capFilter={capFilter}
              setCapFilter={setCapFilter}
            />
          </div>
          <Divider variant="fullWidth" />
        </LeftContainer>
        <Divider orientation="vertical" flexItem />
        <RightContainer>{renderReservations}</RightContainer>
      </div>
      <button onClick={() => console.log(reservations)}>
        log reservations
      </button>
      <button onClick={() => console.log(descFilter)}>log desc</button>
    </div>
  );
};

export default ReservationPage;
