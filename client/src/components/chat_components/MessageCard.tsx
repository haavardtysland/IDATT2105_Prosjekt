import { Card, Tooltip, Typography } from '@material-ui/core';

import React, { Fragment } from 'react';
import styled from 'styled-components';
import Message from '../../interfaces/Message';

interface Props {
  message: Message;
}

function MessageCard({ message }: Props) {
  return (
    <Tooltip title={new Date(message.timecreated).toISOString()}>
      <Card style={{ width: '80%', margin: '0.5rem' }}>
        <p style={{ borderBottom: '0.5px solid black' }}>
          {message.user.email}
        </p>
        <p>{message.message}</p>
      </Card>
    </Tooltip>
  );
}

export default MessageCard;
