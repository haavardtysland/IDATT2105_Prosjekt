import { Card, CardContent, Typography, Tooltip } from '@material-ui/core';
import React, { useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import Reservation from '../../interfaces/Reservation';
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
  //reservations: Reservation[];
  getTimeFromString: (str: string) => string;
  times: string[];
  date: Date;
  bookedTimes: boolean[];
  setBookedTimes: React.Dispatch<React.SetStateAction<boolean[]>>;
  updateBookedTimesFromTo: (fromIndex: number, toIndex: number) => void;
}

const TimeCard: React.FC<TimeCardProps> = ({
  time,
  reset,
  isMarkedArr,
  setIsMarkedArr,
  index,
  updateIsMarkedArr,
  updateSelectedTimes,
  //reservations,
  getTimeFromString,
  bookedTimes,
  setBookedTimes,
  updateBookedTimesFromTo,
}: TimeCardProps) => {
  const [backgroundcolor, setBackgroundcolor] = useState<string>('');
  const [circleColor, setCircleColor] = useState<string>('green');

  const handleIsMarked = () => {
    if (bookedTimes[index] === false) {
      updateIsMarkedArr(index);
      updateColors();
    }
  };

  const updateColors = () => {
    if (isMarkedArr[index] === false) {
      setBackgroundcolor('white');
    } else {
      setBackgroundcolor('lightgrey');
    }
  };

  const checkIfReserved = () => {
    if (bookedTimes[index] === true) {
      setCircleColor('red');
    } else {
      setCircleColor('green');
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

  useEffect(() => {
    checkIfReserved();
  }, [bookedTimes]);

  return (
    <TransformDiv onClick={handleIsMarked} style={{ padding: '3px' }}>
      <Card style={{ backgroundColor: backgroundcolor }}>
        <CardContent>
          <Typography>{time}</Typography>
          <Circle color={circleColor} />
        </CardContent>
      </Card>
    </TransformDiv>
  );
};

export default TimeCard;
