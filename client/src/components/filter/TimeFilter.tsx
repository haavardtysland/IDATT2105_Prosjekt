import { createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import React, { ChangeEvent } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginBottom: '5%',
      width: 220,
    },
  })
);

interface TimeFilterProps {
  timeFilterFrom: string;
  setTimeFilterFrom: React.Dispatch<React.SetStateAction<string>>;
  timeFilterTo: string;
  setTimeFilterTo: React.Dispatch<React.SetStateAction<string>>;
}

const TimeFilter: React.FC<TimeFilterProps> = ({
  timeFilterFrom,
  setTimeFilterFrom,
  timeFilterTo,
  setTimeFilterTo,
}: TimeFilterProps) => {
  const classes = useStyles();

  const handleChangeFromTime = (event: ChangeEvent<HTMLInputElement>) => {
    setTimeFilterFrom((event.target as HTMLInputElement).value);
  };

  const handleChangeToTime = (event: ChangeEvent<HTMLInputElement>) => {
    setTimeFilterTo((event.target as HTMLInputElement).value);
  };
  return (
    <div style={{ margin: '10% 0', display: 'flex', flexDirection: 'column' }}>
      <TextField
        label="Fra tid"
        type="datetime-local"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={timeFilterFrom}
        onChange={handleChangeFromTime}
        variant="outlined"
      />
      <TextField
        label="Til tid"
        type="datetime-local"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={timeFilterTo}
        onChange={handleChangeToTime}
        variant="outlined"
      />
    </div>
  );
};

export default TimeFilter;
