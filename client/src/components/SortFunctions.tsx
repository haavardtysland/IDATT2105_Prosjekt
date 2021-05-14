import Reservation from '../interfaces/Reservation';

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

const sortDateHighLow = (reservations: Reservation[]) => {
  return [
    ...reservations.sort((r1, r2) => {
      const timeDiff1 =
        new Date(r1.toDate).getTime() - new Date(r1.fromDate).getTime();
      const timeDiff2 =
        new Date(r2.toDate).getTime() - new Date(r2.fromDate).getTime();
      return timeDiff1 > timeDiff2 ? 1 : -1;
    }),
  ];
};

const sortDateLowHigh = (reservations: Reservation[]) => {
  console.log([
    ...reservations.sort((r1, r2) => {
      const timeDiff1 =
        new Date(r1.toDate).getTime() - new Date(r1.fromDate).getTime();
      const timeDiff2 =
        new Date(r2.toDate).getTime() - new Date(r2.fromDate).getTime();
      return timeDiff1 > timeDiff2 ? -1 : 1;
    }),
  ]);
  return [
    ...reservations.sort((r1, r2) => {
      const timeDiff1 =
        new Date(r1.toDate).getTime() - new Date(r1.fromDate).getTime();
      const timeDiff2 =
        new Date(r2.toDate).getTime() - new Date(r2.fromDate).getTime();
      return timeDiff1 > timeDiff2 ? -1 : 1;
    }),
  ];
};

export const SortFunctions = {
  sortCapacityHighLow,
  sortCapacityLowHigh,
  sortDateHighLow,
  sortDateLowHigh,
};
