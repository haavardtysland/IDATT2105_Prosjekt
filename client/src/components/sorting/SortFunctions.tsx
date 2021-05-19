import Reservation from '../../interfaces/Reservation';

const sortCapacityHighLow = (reservations: Reservation[]) => {
  return [
    ...reservations.sort((r1, r2) => (r1.capacity > r2.capacity ? -1 : 1)),
  ];
};

const sortCapacityLowHigh = (reservations: Reservation[]) => {
  return [
    ...reservations.sort((r1, r2) => (r1.capacity > r2.capacity ? 1 : -1)),
  ];
};

const sortDateLateEarly = (reservations: Reservation[]) => {
  return [
    ...reservations.sort((r1, r2) => {
      const time1 = new Date(r1.to_date).getTime();
      const time2 = new Date(r2.to_date).getTime();
      return time1 > time2 ? -1 : 1;
    }),
  ];
};

const sortDateEarlyLate = (reservations: Reservation[]) => {
  console.log([
    ...reservations.sort((r1, r2) => {
      const time1 = new Date(r1.to_date).getTime();
      const time2 = new Date(r2.to_date).getTime();
      return time1 > time2 ? 1 : -1;
    }),
  ]);
  return [
    ...reservations.sort((r1, r2) => {
      const time1 = new Date(r1.to_date).getTime();
      const time2 = new Date(r2.to_date).getTime();
      return time1 > time2 ? 1 : -1;
    }),
  ];
};

export const SortFunctions = {
  sortCapacityHighLow,
  sortCapacityLowHigh,
  sortDateLateEarly,
  sortDateEarlyLate,
};
