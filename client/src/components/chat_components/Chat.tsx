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
import Section from '../../interfaces/Section';
import axios from '../../axios';
import Room from '../../interfaces/Room';
import MessageCard from './MessageCard';
import Message from '../../interfaces/Message';
import ChatFilter from './ChatFilter';
import { Autocomplete } from '@material-ui/lab';

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
  const [currentSection, setCurrentSection] = useState<Section | undefined>(
    room.sections[0]
  );
  const [filterValue, setFilterValue] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [sendtMessages, setSendtMessages] = useState<Message[]>([]);
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
    const now: number = new Date().getTime();
    if (filterValue != null) {
      setMessages(
        messages.filter((mes) => mes.timecreated > now - filterValue)
      );
    } else if (filterValue == null) {
      if (currentSection?.messages) {
        setMessages(currentSection.messages);
      }
    }
  }, [filterValue]);

  useEffect(() => {
    if (currentSection?.messages) {
      const getSendt: Message[] = sendtMessages.filter(
        (msg) => msg.sectionId == currentSection.section_id
      );
      setMessages(SortTimeSendt([...currentSection.messages, ...getSendt]));
    } else if (currentSection == null) {
      let all: Message[] = [];
      room.sections.forEach((sec) => {
        if (sec.messages) {
          all = all.concat(sec.messages);
        }
      });
      setMessages(SortTimeSendt([...all, ...sendtMessages]));
    }
  }, [currentSection, sendtMessages]);

  const onValueChange = (
    event: ChangeEvent<any>,
    newInputValue: Section | null
  ) => {
    if (newInputValue) {
      setCurrentSection(newInputValue);
    } else if (newInputValue == null) {
      setCurrentSection(undefined);
    }
  };

  const sendMessage = () => {
    if (message != '' && currentSection) {
      axios
        .post(`/section/${currentSection.section_id}/message`, {
          user_id: localStorage.getItem('id'),
          message: message,
        })
        .then((response) => {
          console.log(response.data);
          setSendtMessages([...sendtMessages, response.data]);
        })
        .then(() => {
          setMessage('');
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
              <Autocomplete
                options={room.sections}
                getOptionLabel={(sec) => sec.section_name}
                style={{ width: '80%', marginTop: '4rem' }}
                onChange={onValueChange}
                renderInput={(params) => (
                  <TextField {...params} label="Seksjon" variant="outlined" />
                )}
              />
              <ChatFilter
                setFilterValue={(val) => setFilterValue(val)}
              ></ChatFilter>
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
