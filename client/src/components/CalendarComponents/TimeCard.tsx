import { Card, CardContent, Typography, Tooltip } from '@material-ui/core';
import React, { useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import Circle from './Circle';

const TransformDiv = styled.div`
  transition: transform 450ms;
  :hover {
    transform: scale(1.08);
  }
`;
interface TimeCardProps {
  time: string;
  reset: boolean;
}

//TODO pass a list as a prop
const TimeCard: React.FC<TimeCardProps> = ({ time, reset }: TimeCardProps) => {
  const [backgroundcolor, setBackgroundcolor] = useState<string>('');
  const [isMarked, setIsMarked] = useState<boolean>(false);

  const handleIsMarked = () => {
    if (backgroundcolor === 'lightgrey') {
      setBackgroundcolor('white');
    } else {
      setBackgroundcolor('lightgrey');
    }
    setIsMarked(!isMarked);
  };

  /*
  const updateIsMarkedArr = () => {
    const items = [...isMarkedArr];
    let item = items[index];
    item = !item;
    items[index] = item;
    setIsMarkedArr(items);
  };
  */

  useEffect(() => {
    setBackgroundcolor('white');
    setIsMarked(!isMarked);
  }, [reset]);

  return (
    <Tooltip title="ledig">
      <TransformDiv onClick={handleIsMarked} style={{ padding: '3px' }}>
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

export default TimeCard;
