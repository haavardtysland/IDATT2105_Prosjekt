import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Room from '../interfaces/Room';
import styled from 'styled-components';
import roomPic from '../assets/room.jpg';
import roomPic2 from '../assets/room1.jpg';
import roomPic3 from '../assets/room3.jpg';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles({
  root: {
    margin: '5% auto 5% auto',
  },
  media: {
    height: 140,
  },
});

const TransformDiv = styled.div`
  transition: transform 450ms;
  margin: 1rem;
  width: 25%;
  min-width: 10rem;
  height: 20%;
  :hover {
    transform: scale(1.08);
  }
`;

interface RoomCardProps {
  room: Room;
  onReservationClick?: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onReservationClick,
}: RoomCardProps) => {
  const classes = useStyles();

  //TODO: delete room when clicked on button

  return (
    <TransformDiv onClick={onReservationClick}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={roomPic}
          title={room.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {room.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Kapasitet: {room.capacity}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            <DeleteOutlineIcon />
          </Button>
        </CardActions>
      </Card>
    </TransformDiv>
  );
};

export default RoomCard;
