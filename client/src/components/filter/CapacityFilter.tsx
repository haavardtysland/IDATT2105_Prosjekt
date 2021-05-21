import { Slider, Typography } from '@material-ui/core';
import React from 'react';

interface CapacityFilterProps {
  capFilter: number[];
  setCapFilter: React.Dispatch<React.SetStateAction<number[]>>;
}

const CapacityFilter: React.FC<CapacityFilterProps> = ({
  capFilter,
  setCapFilter,
}: CapacityFilterProps) => {
  const handleChange = (event: any, newValue: number | number[]) => {
    setCapFilter(newValue as number[]);
  };
  return (
    <div>
      <Typography>Antall plasser</Typography>
      <Slider
        value={capFilter}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        //getAriaValueText={valuetext}
        min={1}
      />
    </div>
  );
};

export default CapacityFilter;
