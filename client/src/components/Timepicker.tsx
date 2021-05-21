import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { ChangeEvent, useEffect, useState } from 'react';

interface Props {
  onTimeChange: (number: number) => void;
}

function Timepicker({ onTimeChange }: Props) {
  const [time, setTime] = useState<number>(0);

  const onChangeTime = (event: ChangeEvent<any>, inputValue: string | null) => {
    if (inputValue) {
      const timeInMs: number = timeSlots.indexOf(inputValue) * 1800000;
      console.log(timeInMs);
      setTime(timeInMs);
    }
  };

  useEffect(() => {
    onTimeChange(time);
  }, [time]);

  return (
    <Autocomplete
      id="combo-box-demo"
      options={timeSlots}
      onChange={onChangeTime}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField {...params} label="Tidspunkt" variant="outlined" />
      )}
    />
  );
}

const timeSlots = Array.from(new Array(24 * 2)).map(
  (_, index) =>
    `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${
      index % 2 === 0 ? '00' : '30'
    }`
);

export default Timepicker;
