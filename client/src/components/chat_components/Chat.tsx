import {
  Button,
  Drawer,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
  withStyles,
} from '@material-ui/core';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { Context } from '../../Context';
import Section from '../../interfaces/Section';
import axios from '../../axios';
import Room from '../../interfaces/Room';
import User from '../../interfaces/User';

const useStyles = makeStyles({
  drawerPaper: {
    marginTop: '15%',
  },
});

const MessageBox = styled.div`
  height: 35vh;
  max-width: 80vh;
  overflow: hidden;
  overflow-y: scroll;
  margin-top: 15vh;
`;

const Send = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
`;

const StyledTextField = withStyles({
  root: {
    width: '80%',
    marginTop: '5rem',
  },
})(TextField);

interface Message {
  message: string;
  user: User;
  timecreated: number;
}

interface Props {
  room: Room;
}

function Chat({ room }: Props) {
  const [currentSection, setCurrentSection] = useState<Section>();
  const [currentFilter, setCurrentFilter] = useState<string>();
  const [message, setMessage] = useState<string>('');
  const [open, setOpen] = useState<boolean>(true);
  const classes = useStyles();

  const onChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage((event.target as HTMLInputElement).value);
  };

  const onChangeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentFilter((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    console.log(currentSection);
  }, [currentSection]);

  const handleChangeCurrentSection = (event: ChangeEvent<HTMLInputElement>) => {
    if (room !== undefined) {
      const tmp = room.sections.find(
        (section: Section) => section.section_id === +event.target.value
      );
      if (tmp !== undefined) setCurrentSection(tmp);
    }
  };

  const sendMessage = () => {
    console.log(currentSection);
    if (message != '' && currentSection) {
      axios.post(`/section/${currentSection.section_id}/message`, {
        user_id: localStorage.getItem('id'),
        message: message,
      });
    }
  };

  useEffect(() => {
    console.log('snekker');
  }, []);

  return (
    <Drawer
      classes={{ paper: classes.drawerPaper }}
      variant="persistent"
      anchor="right"
      open={open}
    >
      <Grid container spacing={2}>
        <Grid item>
          <h2
            style={{
              position: 'absolute',
              top: '5px',
              left: '20px',
            }}
          >
            Rom-Chat
          </h2>
          <Button
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
            }}
            onClick={() => setOpen(false)}
          >
            Lukk
          </Button>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column">
            <Grid item xs>
              <StyledTextField
                variant="outlined"
                select
                label="Seksjon"
                onChange={handleChangeCurrentSection}
                value={currentSection}
              >
                <MenuItem value={'Vis for hele rommet'}>
                  Vis for hele rommet
                </MenuItem>
                {room !== undefined &&
                  room['sections'].map((section: Section, key: number) => (
                    <MenuItem value={section.section_id} key={key}>
                      {section.section_name}
                    </MenuItem>
                  ))}
              </StyledTextField>
            </Grid>
            <Grid item xs>
              <TextField
                style={{ marginTop: '4px', width: '80%' }}
                variant="outlined"
                select
                label="Filter"
                onChange={onChangeFilter}
                value={currentFilter}
              >
                <MenuItem value="Vis siste uke">Vis siste uke</MenuItem>
                <MenuItem value="Vis siste måned">Vis siste måned</MenuItem>
                <MenuItem value="Vis siste år">Vis siste år</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs>
              <MessageBox id="chat">Shheeesh</MessageBox>
            </Grid>
            <Grid item>
              <Send>
                <TextField
                  onChange={onChangeMessage}
                  value={message}
                  variant="outlined"
                  style={{
                    width: '90%',
                    marginLeft: '1rem',
                    height: '5rem',
                  }}
                  label="Send Melding"
                ></TextField>
                <Button
                  style={{
                    marginLeft: '0.5rem',
                  }}
                  onClick={sendMessage}
                >
                  <SendRoundedIcon />
                </Button>
              </Send>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
}

export default Chat;
