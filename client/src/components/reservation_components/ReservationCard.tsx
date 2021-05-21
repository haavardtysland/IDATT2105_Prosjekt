import {
  Button,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
  withStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import Reservation from '../../interfaces/Reservation';
import roomPic from '../../assets/room.jpg';
import styled from 'styled-components';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import axios from '../../axios';
import Popup from '../Popup';
import ReservationFormEdit from './ReservationFormEdit';
import config from '../../Config';

const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  position: relative;
  //border: 2px solid pink;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: block;
  //border: 2px solid green;
  margin-left: auto;
  margin-top: auto;
  position: relative;
`;

const TransformDiv = styled.div`
  transition: transform 450ms;
  :hover {
    transform: scale(1.02);
  }
`;

const StyledInfo = withStyles({
  root: {
    marginLeft: '2%',
  },
})(Typography);

const StyledButton = withStyles({
  root: {
    position: 'relative',
    float: 'right',
  },
})(Button);

const useStyles = makeStyles({
  timeText: {
    fontSize: '14px',
  },
});

interface ReservationCardProps {
  reservation: Reservation;
  getReservationsUser: () => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  getReservationsUser,
}: ReservationCardProps) => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [currentReservation, setCurrentReservation] =
    useState<Reservation>(reservation);

  const setTimeArr = (): string[] => {
    let hour = 7;
    let minutes = 0;
    const times: string[] = [];
    for (let i = 0; i < length; i++) {
      if (i % 2 === 0) {
        minutes = 30;
        String(hour).length === 1
          ? times.push(`0${String(hour)}:${String(minutes)}`)
          : times.push(`${String(hour)}:${String(minutes)}`);
      } else {
        minutes = 0;
        hour++;
        String(hour).length === 1
          ? times.push(`0${String(hour)}:${String(minutes)}0`)
          : times.push(`${String(hour)}:${String(minutes)}0`);
      }
    }
    return times;
  };
  const times = setTimeArr();

  const deleteReservation = async () => {
    try {
      const request = await axios.delete(
        `/reservation/${reservation.reservationId}`,
        config
      );
      console.log(request);
      getReservationsUser();
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <TransformDiv>
      <Card style={{ margin: '2%' }}>
        <CardContent>
          <div style={{ display: 'flex' }}>
            <CardMedia
              image={roomPic}
              style={{ height: '150px', width: '150px' }}
            />
            <div style={{ flex: '1' }}>
              <StyledInfo variant="h5">{reservation.room_name}</StyledInfo>
              <StyledInfo>
                Seksjon: {reservation.section.section_name}
              </StyledInfo>
              <StyledInfo>Beskrivelse: {reservation.description}</StyledInfo>
              <StyledInfo>Plasser: {reservation.capacity}</StyledInfo>
              <StyledInfo>{reservation.user.email}</StyledInfo>
              <StyledInfo>{reservation.user.phoneNumber}</StyledInfo>
            </div>
            <RightContainer>
              <TimeContainer>
                <Typography className={classes.timeText}>
                  Fra:{' '}
                  {reservation.from_date.substring(
                    0,
                    reservation.from_date.indexOf('.') - 3
                  )}
                </Typography>
                <Typography className={classes.timeText}>
                  Til:{' '}
                  {reservation.to_date.substring(
                    0,
                    reservation.to_date.indexOf('.') - 3
                  )}
                </Typography>
              </TimeContainer>
              <ButtonsContainer>
                <StyledButton onClick={deleteReservation}>
                  <DeleteForeverIcon />
                </StyledButton>
                <StyledButton onClick={() => setOpenPopup(!openPopup)}>
                  <EditIcon />
                </StyledButton>
              </ButtonsContainer>
            </RightContainer>
          </div>

          <Popup
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            title={`Endre på reservasjon i "${reservation.section.section_name}" `}
          >
            <ReservationFormEdit
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
              reservation={currentReservation}
              setReservation={setCurrentReservation}
              deleteReservation={deleteReservation}
            />
          </Popup>
        </CardContent>
      </Card>
    </TransformDiv>
  );
};

export default ReservationCard;
