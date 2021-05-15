import React, { ChangeEvent, useState } from 'react';
import { FilterFunctions } from './FilterFunctions';
import { Button, FormLabel, TextField, Typography } from '@material-ui/core';
import DescFilter from './DescFilter';
import TimeFilter from './TimeFilter';

interface FilterMenuProps {
  descFilter: string;
  setDescFilter: React.Dispatch<React.SetStateAction<string>>;
  timeFilterFrom: string;
  setTimeFilterFrom: React.Dispatch<React.SetStateAction<string>>;
  timeFilterTo: string;
  setTimeFilterTo: React.Dispatch<React.SetStateAction<string>>;
}

const FilterMenu: React.FC<FilterMenuProps> = ({
  descFilter,
  setDescFilter,
  timeFilterFrom,
  setTimeFilterFrom,
  timeFilterTo,
  setTimeFilterTo,
}: FilterMenuProps) => {
  const handleReset = () => {
    setDescFilter('');
    setTimeFilterFrom('');
    setTimeFilterTo('');
  };
  return (
    <div>
      <Typography style={{ margin: '5% 0', fontWeight: 'bold' }}>
        Filtrer
      </Typography>
      <DescFilter descFilter={descFilter} setDescFilter={setDescFilter} />
      <TimeFilter
        timeFilterFrom={timeFilterFrom}
        setTimeFilterFrom={setTimeFilterFrom}
        timeFilterTo={timeFilterTo}
        setTimeFilterTo={setTimeFilterTo}
      />
      <Button onClick={handleReset} variant="outlined">
        Reset
      </Button>
    </div>
  );
};

export default FilterMenu;
