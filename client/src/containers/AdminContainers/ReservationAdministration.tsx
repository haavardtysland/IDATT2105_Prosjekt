import axios from '../../axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdministrateButtons from '../../components/AdministrateButtons';
import Reservation from '../../interfaces/Reservation';
import ReservationGrid from '../../components/reservation_components/ReservationGrid';
import FilterMenu from '../../components/filter/FilterMenu';
import { SortFunctions } from '../../components/sorting/SortFunctions';
import { FilterFunctions } from '../../components/filter/FilterFunctions';
import { Divider, Typography } from '@material-ui/core';
import SortMenu from '../../components/sorting/SortMenu';
const Container = styled.div`
  padding-top: 13%;
  padding-right: 3%;
  padding-left: 3%;
`;

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
function ReservationAdministration() {
  const [sortOption, setSortOption] = React.useState<number>(0);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [currentReservations, setCurrentReservations] =
    useState<Reservation[]>(reservations);
  const [descFilter, setDescFilter] = useState<string>('');
  const [timeFilterFrom, setTimeFilterFrom] = useState<string>('');
  const [timeFilterTo, setTimeFilterTo] = useState<string>('');
  const [capFilter, setCapFilter] = React.useState<number[]>([1, 100]);


  const loadReservations = () => {
    axios
      .get('/reservation')
      .then((response) => setReservations(
        response.data['reservations']
      ))
  };
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
      const filter1 = FilterFunctions.descFilter(reservations, descFilter);
      const filter2 = FilterFunctions.timeFilter(
        reservations,
        timeFilterFrom,
        timeFilterTo
      );
      const filter3 = FilterFunctions.capFilter(reservations, capFilter);
      const filteredReservations: Reservation[] = [];
      for (const r1 of filter1) {
        for (const r2 of filter2) {
          for (const r3 of filter3) {
            if (r1 === r2 && r2 === r3) {
              filteredReservations.push(r1);
            }
          }
        }
      }
      setCurrentReservations(filteredReservations);
    }
  }, [descFilter, timeFilterFrom, timeFilterTo, capFilter]);

  useEffect(loadReservations, []);

  useEffect(() => {
    setCurrentReservations(reservations);
  }, [reservations]);

  return (
    <div>
      <Container>
        <AdministrateButtons />
      </Container>
      <div style ={{marginTop: '-10%'}}>
        <Typography variant="h5" style={{ marginTop: '11%', marginLeft: '1rem' }}>
          Alle Reservasjoner
      </Typography>
        <div style={{ marginTop: '1rem', display: 'flex' }}>
          <LeftContainer>
            <Divider variant="fullWidth" />
            <div style={{ marginBottom: '5%' }}>
              <SortMenu sortOption={sortOption} setSortOption={setSortOption} />
            </div>
            <Divider variant="fullWidth" />
            <div style={{ marginBottom: '5%' }}>
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
          <RightContainer>
            <ReservationGrid
              getReservations={loadReservations}
              reservations={currentReservations}
            ></ReservationGrid>
          </RightContainer>
        </div>
      </div>
    </div>
  );
}

export default ReservationAdministration;
