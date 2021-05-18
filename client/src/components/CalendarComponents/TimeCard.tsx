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
  //selectedTimes: string[];
  //setSelectedTimes: React.Dispatch<React.SetStateAction<string[]>>;
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

  const handleIsMarked = () => {
    if (isMarkedArr[index] === false) {
      setBackgroundcolor('lightgrey');
    } else {
      setBackgroundcolor('white');
    }
    updateIsMarkedArr(index);
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
  }, [isMarkedArr]);

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
