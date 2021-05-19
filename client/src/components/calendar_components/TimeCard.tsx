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
  reservations: Reservation[];
  getTimeFromString: (str: string) => string;
}

const TimeCard: React.FC<TimeCardProps> = ({
  time,
  reset,
  isMarkedArr,
  setIsMarkedArr,
  index,
  updateIsMarkedArr,
  updateSelectedTimes,
  reservations,
  getTimeFromString,
}: TimeCardProps) => {
  const [backgroundcolor, setBackgroundcolor] = useState<string>('');
  const [circleColor, setCircleColor] = useState<string>('');

  const handleIsMarked = () => {
    updateIsMarkedArr(index);
    updateColors();
  };

  const updateColors = () => {
    checkIfReserverd();
    if (isMarkedArr[index] === false) {
      setBackgroundcolor('white');
    } else {
      setBackgroundcolor('lightgrey');
    }
  };

  const checkIfReserverd = () => {
    for (const i in reservations) {
      if (getTimeFromString(reservations[i].from_date) === time) {
        setCircleColor('red');
      } else {
        setCircleColor('green');
      }
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
