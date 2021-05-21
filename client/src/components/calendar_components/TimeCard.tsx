import { Card, CardContent, Typography, Tooltip } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
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
  times: string[];
  date: Date;
  bookedTimes: boolean[];
  noMarked: number;
  setNoMarked: React.Dispatch<React.SetStateAction<number>>;
  updateIsMarkedArrFromTo: (fromIndex: number, toIndex: number) => void;
}

const TimeCard: React.FC<TimeCardProps> = ({
  time,
  reset,
  isMarkedArr,
  setIsMarkedArr,
  index,
  updateIsMarkedArr,
  updateSelectedTimes,
  bookedTimes,
  noMarked,
  updateIsMarkedArrFromTo,
}: TimeCardProps) => {
  const [backgroundcolor, setBackgroundcolor] = useState<string>('');
  const [circleColor, setCircleColor] = useState<string>('green');

  const updateBackgroundColor = () => {
    if (isMarkedArr[index] === false) {
      setBackgroundcolor('white');
    } else {
      setBackgroundcolor('lightgrey');
    }
  };

  const handleIsMarked = () => {
    if (bookedTimes[index] === false) {
      if (noMarked === 0) {
        updateIsMarkedArr(index);
      } else if (
        index === 0 &&
        isMarkedArr[index + 1] === true &&
        noMarked < 3
      ) {
        updateIsMarkedArr(index);
      } else if (
        index === isMarkedArr.length - 1 &&
        isMarkedArr[index - 1] === true &&
        noMarked < 3
      ) {
        updateIsMarkedArr(index);
      } else if (
        (isMarkedArr[index - 1] === true || isMarkedArr[index + 1] === true) &&
        noMarked < 3
      ) {
        updateIsMarkedArr(index);
      } else if (noMarked > 0 && isMarkedArr[index] === true) {
        if (
          isMarkedArr[index - 1] === true &&
          isMarkedArr[index + 1] === true
        ) {
          if (index !== 0 && index !== isMarkedArr.length - 1)
            updateIsMarkedArrFromTo(index - 1, index + 1);
        } else {
          updateIsMarkedArr(index);
        }
      }
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
    updateBackgroundColor();
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
