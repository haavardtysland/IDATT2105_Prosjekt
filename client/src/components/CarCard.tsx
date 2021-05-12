import React from 'react';
import Car from '../interfaces/Car';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Beetle from '../assets/Beetle.jpeg';
import styled from 'styled-components';
interface Props {
  car: Car;
}

const useStyles = makeStyles({
  root: {
    padding:'0.5rem',
    maxWidth: 300,
    maxHeight: 400,
    minWidth: '30%',
    minHeight: '30%',
  },
  media: {
    height: 140,
  },
});

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CarCard = ({ car }: Props) => {
  const classes = useStyles();

  const picture = (): any => {
    return Beetle;
  };

  return (
    <Card className={classes.root}>
      <CardActionArea
        style={{ width: '100%', height: '100%' }}
        onClick={() => console.log()}
      >
        <CardMedia
          component="img"
          className={classes.media}
          image={picture()}
        />
        <CardContent>
          <Typography
            style={{ textAlign: 'center', paddingBottom: '0.5rem' }}
            noWrap={true}
            gutterBottom
            variant="h6"
            component="h5"
          >
            {car.model_name}
          </Typography>
          <Typography
            style={{ textAlign: 'center', paddingBottom: '0.2rem' }}
            variant="body2"
            color="textSecondary"
            component="h4"
          >
            PRIS: {car.prices[car.prices.length - 1].sum}kr
          </Typography>
          <Typography
            style={{ textAlign: 'center', paddingBottom: '0.2rem' }}
            variant="body2"
            color="textSecondary"
            component="h4"
          >
            Kilometerstand: {car.mileage}km
          </Typography>
          <Typography
            style={{ textAlign: 'center' }}
            variant="body2"
            color="textSecondary"
            component="h4"
          >
            Årsmodell: {car.year_model}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CarCard;
