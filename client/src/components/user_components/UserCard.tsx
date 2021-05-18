import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import User from '../../interfaces/User';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  root: {
    margin: '5% auto 5% auto',
  },
  media: {
    height: 140,
  },
});

const Flex = styled.div`
  display: flex;
`;

const TransformDiv = styled.div`
  transition: transform 450ms;
  margin: 1rem;
  width: 25%;
  min-width: 10rem;
  min-height: 12%;
  height: 12%;
  :hover {
    transform: scale(1.08);
  }
`;

interface Props {
  user: User;
  deleteUser: (userId: number) => void;
  resendPassword: (userId: number) => void;
}

const UserCard = ({ user, deleteUser, resendPassword }: Props) => {
  const classes = useStyles();

  return (
    <TransformDiv>
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {user.email}
          </Typography>
          <Flex>
            <Button onClick={() => deleteUser(user.userId)}>
              <DeleteIcon />
            </Button>
            <Button onClick={() => resendPassword(user.userId)}>
              Resend passord
            </Button>
          </Flex>
        </CardContent>
      </Card>
    </TransformDiv>
  );
};

export default UserCard;
