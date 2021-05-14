import React, { useEffect, useState } from 'react';
import ReservationCard from '../components/ReservationCard';
import { Divider, Typography, withStyles } from '@material-ui/core';
import styled from 'styled-components';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { cyan } from '@material-ui/core/colors';
import { SortFunctions } from '../components/SortFunctions';
import Reservation from '../interfaces/Reservation';

const LeftContainer = styled.div`
  margin-left: 2%;
  margin-right: 3%;
`;

const RightContainer = styled.div`
  margin-left: 3%;
  margin-right: 3%;
  flex: 1;
`;

const BlueRadio = withStyles({
  root: {
    color: cyan[400],
    '&$checked': {
      color: cyan[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

enum SortStrings {
  CapacityHighLow = 1,
  CapacityLowHigh = 2,
  DateHighLow = 3,
  DateLowHigh = 4,
}

const ReservationPage: React.FC = () => {
  const [sortString, setSortString] = React.useState<number>(0);
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      reservationId: 1,
      capacity: 10,
      description: 'Reserverer dette rommet shamener',
      fromDate: '05-14-2021',
      toDate: '05-15-2021',
    },
    {
      reservationId: 2,
      capacity: 20,
      description: 'hva skjer babajan',
      fromDate: '05-10-2021',
      toDate: '05-11-2021',
    },
  ]);

  const calcDateDiff = () => {
    const timeDiff1 =
      new Date(reservations[0].toDate).getTime() -
      new Date(reservations[0].fromDate).getTime();
    const timeDiff2 =
      new Date(reservations[1].toDate).getTime() -
      new Date(reservations[1].fromDate).getTime();
    const differenceInDays1 = timeDiff1 / (1000 * 3600 * 24);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortString(+event.target.value);
  };

  useEffect(() => {
    if (sortString === SortStrings.CapacityHighLow) {
      setReservations(SortFunctions.sortCapacityHighLow);
    } else if (sortString == SortStrings.CapacityLowHigh) {
      setReservations(SortFunctions.sortCapacityLowHigh);
    } else if (sortString === SortStrings.DateHighLow) {
      setReservations(SortFunctions.sortDateHighLow);
    } else if (sortString === SortStrings.DateLowHigh) {
      setReservations(SortFunctions.sortDateLowHigh);
    }
  }, [sortString]);

  const renderReservations = reservations.map((reservation, key: number) => {
    return <ReservationCard key={key} reservation={reservation} />;
  });

  return (
    <div>
      <div style={{ marginTop: '10rem', display: 'flex' }}>
        <LeftContainer>
          <Typography variant="h5">Mine Reservasjoner</Typography>
          <div style={{ marginTop: '5%' }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Sorter</FormLabel>
              <RadioGroup value={sortString} onChange={handleSortChange}>
                <FormControlLabel
                  value={1}
                  control={<BlueRadio />}
                  label="Personer høy til lav"
                />
                <FormControlLabel
                  value={2}
                  control={<BlueRadio />}
                  label="Personer lav til høy"
                />
                <FormControlLabel
                  value={3}
                  control={<BlueRadio />}
                  label="Dato høy til lav"
                />
                <FormControlLabel
                  value={4}
                  control={<BlueRadio />}
                  label="Dato lav til høy"
                />
              </RadioGroup>
            </FormControl>
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
