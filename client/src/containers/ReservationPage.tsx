import React from 'react';
import ReservationCard from '../components/ReservationCard';
import { Divider, Typography, withStyles } from '@material-ui/core';
import styled from 'styled-components';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { cyan } from '@material-ui/core/colors';

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

const ReservationPage: React.FC = () => {
  //TODO make render reservations where map

  const [radioValue, setValue] = React.useState('female');

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  return (
    <div style={{ marginTop: '10rem', display: 'flex' }}>
      <LeftContainer>
        <Typography variant="h5">Mine Reservasjoner</Typography>
        {/*
        <Typography style={{ fontWeight: 'bold', marginTop: '5%' }}>
          Sorter
        </Typography>
        */}
        <div style={{ marginTop: '5%' }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Sorter</FormLabel>
            <RadioGroup
              //aria-label="gender"
              //name="gender1"
              value={radioValue}
              onChange={handleChangeRadio}
            >
              <FormControlLabel
                value="Name"
                control={<BlueRadio />}
                label="Navn"
              />
              <FormControlLabel
                value="DateHighLow"
                control={<BlueRadio />}
                label="Dato høy til lav"
              />
              <FormControlLabel
                value="DateLowHigh"
                control={<BlueRadio />}
                label="Dato lav til høy"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </LeftContainer>
      <Divider orientation="vertical" flexItem />
      <RightContainer>
        <ReservationCard
          reservation={{
            reservationId: 1,
            capacity: 10,
            description: 'Reserverer dette rommet shamener',
            fromDate: '05-14-2021',
            toDate: '05-15-2021',
          }}
        />
        <ReservationCard
          reservation={{
            reservationId: 2,
            capacity: 20,
            description: 'Reserverer dette rommet shamener',
            fromDate: '05-14-2021',
            toDate: '05-15-2021',
          }}
        />
      </RightContainer>
    </div>
  );
};

export default ReservationPage;
