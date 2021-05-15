import { TextField, Typography } from '@material-ui/core';
import React, { ChangeEvent } from 'react';

interface DescFilterProps {
  descFilter: string;
  setDescFilter: React.Dispatch<React.SetStateAction<string>>;
}

const DescFilter: React.FC<DescFilterProps> = ({
  descFilter,
  setDescFilter,
}: DescFilterProps) => {
  const handleDescFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescFilter((event.target as HTMLInputElement).value);
  };
  return (
    <div>
      <TextField
        label="Beskrivelse"
        value={descFilter}
        onChange={handleDescFilterChange}
        variant="outlined"
      ></TextField>
    </div>
  );
};

export default DescFilter;
