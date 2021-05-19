import { Card, CardContent, Typography, Tooltip } from '@material-ui/core';
import React, { useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import Circle from './Circle';

const TransformDiv = styled.div`
  transition: transform 450ms;
  :hover {
    transform: scale(1.04);
  }
`;
interface TimeCardProps {
  time: string;
  reset: boolean;
  isMarkedArr: boolean[];
  setIsMarkedArr: React.Dispatch<React.SetStateAction<boolean[]>>;
  index: number;
  updateIsMarkedArr: (index: number) => void;
  updateSelectedTimes: () => void;
}

const TimeCard: React.FC<TimeCardProps> = ({
  time,
  reset,
  isMarkedArr,
  setIsMarkedArr,
  index,
  updateIsMarkedArr,
  updateSelectedTimes,
}: TimeCardProps) => {
  const [backgroundcolor, setBackgroundcolor] = useState<string>('');
  const [circleColor, setCircleColor] = useState<string>('');

  const handleIsMarked = () => {
    updateIsMarkedArr(index);
    updateColors();
  };

  const updateColors = () => {
    if (isMarkedArr[index] === false) {
      setBackgroundcolor('white');
      setCircleColor('green');
    } else {
      setBackgroundcolor('lightgrey');
      setCircleColor('red');
    }
  };

  useEffect(() => {
    setBackgroundcolor('white');
    setIsMarkedArr(() => {
      const arr: boolean[] = [];
      for (let i = 0; i < isMarkedArr.length; i++) {
        arr.push(false);
      }
      return arr;
    });
  }, [reset]);

  useEffect(() => {
    updateSelectedTimes();
    updateColors();
  }, [isMarkedArr]);

  return (
    <Tooltip title="ledig">
      <TransformDiv onClick={handleIsMarked} style={{ padding: '3px' }}>
        <Card style={{ backgroundColor: backgroundcolor }}>
          <CardContent>
            <Typography>{time}</Typography>
            <Circle color={circleColor} />
          </CardContent>
        </Card>
      </TransformDiv>
    </Tooltip>
  );
};

export default TimeCard;
