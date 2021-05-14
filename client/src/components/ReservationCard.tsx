import {
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import Reservation from '../interfaces/Reservation';
import roomPic from '../assets/room.jpg';
import styled from 'styled-components';

interface ReservationCardProps {
  reservation: Reservation;
}

const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1% 0 2% 2%;
  width: 7rem;
`;

const TransformDiv = styled.div`
  transition: transform 450ms;
  :hover {
    transform: scale(1.02);
  }
`;

const StyledHeader = withStyles({
  root: {
    marginLeft: '2%',
    marginBottom: '2%',
  },
})(Typography);

const StyledInfo = withStyles({
  root: {
    marginLeft: '2%',
  },
})(Typography);

const useStyles = makeStyles({
  timeText: {
    fontSize: '14px',
  },
});

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
}: ReservationCardProps) => {
  const classes = useStyles();
  return (
    <TransformDiv>
      <Card style={{ margin: '2%' }}>
        <CardContent>
          <div style={{ display: 'flex' }}>
            <CardMedia
              image={roomPic}
              style={{ height: '100px', width: '100px' }}
            />
            <div style={{ flex: '1' }}>
              <StyledHeader variant="h5">Leik romtittle shamener</StyledHeader>
              <StyledInfo>Seksjon: Tært seksjonsnavn</StyledInfo>
              <StyledInfo>{reservation.description}</StyledInfo>
              <StyledInfo>Kapasitet: {reservation.capacity}</StyledInfo>
            </div>
            <TimeContainer>
              <Typography className={classes.timeText}>
                Fra: {reservation.fromDate}
              </Typography>
              <Typography className={classes.timeText}>
                Til: {reservation.toDate}
              </Typography>
            </TimeContainer>
          </div>
        </CardContent>
      </Card>
    </TransformDiv>
  );
};

export default ReservationCard;
