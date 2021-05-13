import { Card, CardContent, Typography, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import Circle from './Circle';

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
    <Tooltip title="ledig">
      <TransformDiv
        onClick={handleUpdateBackgroundColor}
        style={{ padding: '3px' }}
      >
        <Card style={{ backgroundColor: backgroundcolor }}>
          <CardContent>
            <Typography>{time}</Typography>
            <Circle />
          </CardContent>
        </Card>
      </TransformDiv>
    </Tooltip>
  );
};

export default CalendarCard;
