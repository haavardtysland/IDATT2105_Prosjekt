import getDayOfWeek from './GetDayOfWeek';

const setTimeArr = (): string[] => {
  const length = 24;
  let hour = 7;
  let minutes = 0;
  const times: string[] = [];
  for (let i = 0; i < length; i++) {
    if (i % 2 === 0) {
      minutes = 30;
      String(hour).length === 1
        ? times.push(`0${String(hour)}:${String(minutes)}`)
        : times.push(`${String(hour)}:${String(minutes)}`);
    } else {
      minutes = 0;
      hour++;
      String(hour).length === 1
        ? times.push(`0${String(hour)}:${String(minutes)}0`)
        : times.push(`${String(hour)}:${String(minutes)}0`);
    }
  }
  return times;
};
const times = setTimeArr();

const getDateFromString = (str: string) => {
  let index = -1;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    const sub1: string = str.substring(0, index);
    const sub2: string = str.substring(index);
    const split: string[] = sub2.trim().split(':');
    return new Date(sub1 + ' ' + split[0] + ':' + split[1]);
  } else return new Date();
};

const getStringFromDate = (date: Date) => {
  return (
    getDayOfWeek(date.getDay()) +
    ' ' +
    date.getDate() +
    '.' +
    (date.getMonth() + 1) +
    '.' +
    date.getFullYear()
  );
};

const getTimeFromString = (str: string) => {
  let index = -1;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    const sub1: string = str.substring(0, index);
    const sub2: string = str.substring(index);
    const split: string[] = sub2.trim().split(':');
    return split[0] + ':' + split[1];
  } else return '';
};

const sameDay = (date1: Date, date2: Date) => {
  if (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getDay() === date2.getDay()
  ) {
    return true;
  } else {
    return false;
  }
};

export const TimeFunctions = {
  times,
  setTimeArr,
  getDateFromString,
  getStringFromDate,
  getTimeFromString,
  sameDay,
};

/*
const times = TimeFunctions.times;
const getDateFromString = TimeFunctions.getDateFromString;
const getStringFromDate = TimeFunctions.getStringFromDate;
const getTimeFromString = TimeFunctions.getTimeFromString;
const sameDay = TimeFunctions.sameDay;
*/
