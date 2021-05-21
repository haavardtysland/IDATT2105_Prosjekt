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
import MessageCard from './MessageCard';
import Message from '../../interfaces/Message';

const useStyles = makeStyles({
  drawerPaper: {
    marginTop: '13%',
  },
});

const Flex = styled.div`
  display: flex;
`;
const MessageBox = styled.div`
  height: 40vh;
  max-width: 80vh;
  overflow: hidden;
  overflow-y: scroll;
  margin-top: 4vh;
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

interface Props {
  room: Room;
  open: boolean;
  closeChat: () => void;
}

function Chat({ room, open, closeChat }: Props) {
  const [currentSection, setCurrentSection] = useState<Section>();
  const [currentFilter, setCurrentFilter] = useState<string>();
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const classes = useStyles();

  const onChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage((event.target as HTMLInputElement).value);
  };

  const SortTimeSendt = (messages: Message[]): Message[] => {
    return [...messages].sort((mes1, mes2) => {
      return mes1.timecreated - mes2.timecreated;
    });
  };

  useEffect(() => {
    if (currentSection?.messages) {
      setMessages(currentSection.messages);
    } else if (currentSection == null) {
      let all: Message[] = [];
      room.sections.forEach((sec) => {
        if (sec.messages) {
          all = all.concat(sec.messages);
        }
      });
      setMessages(SortTimeSendt(all));
    }
  }, [currentSection]);

  const handleChangeCurrentSection = (event: ChangeEvent<HTMLInputElement>) => {
    if (room !== undefined) {
      const tmp = room.sections.find(
        (section: Section) => section.section_id === +event.target.value
      );
      if (tmp !== undefined) setCurrentSection(tmp);
      else setCurrentSection(undefined);
    }
  };

  const sendMessage = () => {
    if (message != '' && currentSection) {
      axios.post(`/section/${currentSection.section_id}/message`, {
        user_id: localStorage.getItem('id'),
        message: message,
      });
    }
  };

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
            onClick={closeChat}
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
                  Vis meldinger fra alle seksjoner
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
              <MessageBox id="chat">
                {messages.map((msg, index) => (
                  <MessageCard key={index} message={msg}></MessageCard>
                ))}
              </MessageBox>
            </Grid>
            <Grid item>
              <Send>
                <TextField
                  disabled={currentSection == undefined}
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
