import { Card } from '@material-ui/core';
import React from 'react';
import Message from '../../interfaces/Message';

interface Props {
  message: Message;
}

function MessageCard({ message }: Props) {
  return <Card></Card>;
}

export default MessageCard;
