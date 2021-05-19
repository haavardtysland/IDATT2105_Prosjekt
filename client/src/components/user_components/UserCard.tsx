import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import User from '../../interfaces/User';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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
  justify-content: center;
`;

const TransformDiv = styled.div`
  transition: transform 450ms;
  margin: 1rem;
  width: 28%;
  min-width: 10rem;
  min-height: 12%;
  height: 12%;
  :hover {
    transform: scale(1.08);
  }
`;

interface Props {
  user: User;
  deleteUser: (userId: User) => void;
  resendPassword: (userId: number) => void;
  renewAccess: (user: User, time: Date) => void;
}

const UserCard = ({ user, deleteUser, resendPassword, renewAccess }: Props) => {
  const classes = useStyles();
  const [date, setDate] = useState<Date>(user.validDate);

  const onChangeDate = (event: Date | null) => {
    if (event) {
      setDate(event);
    }
  };

  const onDateClick = () => {
    renewAccess(user, date);
  };

  return (
    <TransformDiv>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            style={{ textAlign: 'center' }}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {user.email}
          </Typography>
          <Flex>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                style={{ marginTop: '1rem' }}
                inputVariant="outlined"
                value={new Date(date)}
                placeholder=""
                onChange={(date) => onChangeDate(date)}
                format="MM/dd/yyyy"
              />
            </MuiPickersUtilsProvider>
            <Button style={{ marginTop: '1rem' }} onClick={onDateClick}>
              Endre utløpsdato
            </Button>
          </Flex>
          <Flex>
            <Button onClick={() => resendPassword(user.userId)}>
              Resend passord
            </Button>
            <Button onClick={() => deleteUser(user)}>
              <DeleteIcon />
            </Button>
          </Flex>
        </CardContent>
      </Card>
    </TransformDiv>
  );
};

export default UserCard;
