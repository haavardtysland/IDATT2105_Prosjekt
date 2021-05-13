import { Card, CardContent, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';

const TransformDiv = styled.div`
  transition: transform 450ms;
  :hover {
    transform: scale(1.08);
  }
`;
interface CalendarCardProps {
  time: string;
}

const CalendarCard: React.FC<CalendarCardProps> = ({
  time,
}: CalendarCardProps) => {
  const [backgroundcolor, setBackgroundcolor] = useState<string>('');
  const handleUpdateBackgroundColor = () => {
    console.log('hvas skjer');
    if (backgroundcolor === 'lightgrey') {
      setBackgroundcolor('white');
    } else {
      setBackgroundcolor('lightgrey');
    }
  };
  return (
    <TransformDiv
      onClick={handleUpdateBackgroundColor}
      style={{ padding: '3px' }}
    >
      <Card style={{ backgroundColor: backgroundcolor }}>
        <CardContent>
          <Typography>{time}</Typography>
        </CardContent>
      </Card>
    </TransformDiv>
  );
};

export default CalendarCard;
