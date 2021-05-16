import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import { cyan } from '@material-ui/core/colors';
import { Typography, withStyles } from '@material-ui/core';

const BlueRadio = withStyles({
  root: {
    color: cyan[400],
    '&$checked': {
      color: cyan[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

interface SortMenuProps {
  sortOption: number;
  setSortOption: React.Dispatch<React.SetStateAction<number>>;
}

const SortMenu: React.FC<SortMenuProps> = ({
  sortOption,
  setSortOption,
}: SortMenuProps) => {
  const handleChangeSortOption = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSortOption(+event.target.value);
  };
  return (
    <FormControl component="fieldset">
      <Typography style={{ margin: '5% 0', fontWeight: 'bold' }}>
        Sorter
      </Typography>
      <RadioGroup value={sortOption} onChange={handleChangeSortOption}>
        <FormControlLabel
          value={1}
          control={<BlueRadio />}
          label="Personer høy til lav"
        />
        <FormControlLabel
          value={2}
          control={<BlueRadio />}
          label="Personer lav til høy"
        />
        <FormControlLabel
          value={3}
          control={<BlueRadio />}
          label="Dato sen til tidlig"
        />
        <FormControlLabel
          value={4}
          control={<BlueRadio />}
          label="Dato tidlig til sen"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default SortMenu;
