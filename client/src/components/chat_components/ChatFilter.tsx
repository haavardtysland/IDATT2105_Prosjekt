import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { ChangeEvent } from 'react';
interface Option {
  name: string;
  value: number;
}
interface Props {
  setFilterValue: (value: number | null) => void;
}
function ChatFilter({ setFilterValue }: Props) {
  const onValueChange = (
    event: ChangeEvent<any>,
    newInputValue: Option | null
  ) => {
    if (newInputValue) {
      setFilterValue(newInputValue.value);
    } else if (newInputValue == null) {
      setFilterValue(newInputValue);
    }
  };

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.name}
      style={{ width: '80%', marginTop: '4px' }}
      onChange={onValueChange}
      renderInput={(params) => (
        <TextField {...params} label="Filter" variant="outlined" />
      )}
    />
  );
}

const options: Option[] = [
  {
    name: 'Siste uke',
    value: 604800000,
  },
  {
    name: 'Siste måned',
    value: 2629800000,
  },
  {
    name: 'Siste år',
    value: 31557600000,
  },
];

export default ChatFilter;
