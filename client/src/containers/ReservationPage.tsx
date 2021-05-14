import React, { useEffect, useState } from 'react';
import ReservationCard from '../components/ReservationCard';
import { Divider, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { SortFunctions } from '../components/sorting/SortFunctions';
import Reservation from '../interfaces/Reservation';
import SortMenu from '../components/sorting/SortMenu';

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

//TODO: make filter menu and filter functions
const ReservationPage: React.FC = () => {
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

  //Method for testing
  /*
  const calcDateDiff = () => {
    const timeDiff1 =
      new Date(reservations[0].toDate).getTime() -
      new Date(reservations[0].fromDate).getTime();
    const timeDiff2 =
      new Date(reservations[1].toDate).getTime() -
      new Date(reservations[1].fromDate).getTime();
    const differenceInDays1 = timeDiff1 / (1000 * 3600);
    const differenceInDays2 = timeDiff2 / (1000 * 3600 * 24);
    console.log(differenceInDays1);
    console.log(differenceInDays2);
  };
  */

  useEffect(() => {
    if (sortOption === SortOptions.CapacityHighLow) {
      setReservations(SortFunctions.sortCapacityHighLow);
    } else if (sortOption == SortOptions.CapacityLowHigh) {
      setReservations(SortFunctions.sortCapacityLowHigh);
    } else if (sortOption === SortOptions.DateLateEarly) {
      setReservations(SortFunctions.sortDateLateEarly);
    } else if (sortOption === SortOptions.DateEarlyLate) {
      setReservations(SortFunctions.sortDateEarlyLate);
    }
  }, [sortOption]);

  const renderReservations = reservations.map((reservation, key: number) => {
    return <ReservationCard key={key} reservation={reservation} />;
  });

  return (
    <div>
      <div style={{ marginTop: '10rem', display: 'flex' }}>
        <LeftContainer>
          <Typography variant="h5">Mine Reservasjoner</Typography>
          <div style={{ marginTop: '5%' }}>
            <SortMenu sortOption={sortOption} setSortOption={setSortOption} />
          </div>
        </LeftContainer>
        <Divider orientation="vertical" flexItem />
        <RightContainer>{renderReservations}</RightContainer>
      </div>
      <button onClick={() => console.log(reservations)}>
        log reservations
      </button>
    </div>
  );
};

export default ReservationPage;
