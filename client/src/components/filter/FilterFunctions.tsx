import Reservation from '../../interfaces/Reservation';
import Room from '../../interfaces/Room';

const descFilter = (reservations: Reservation[], desc: string) => {
  return reservations.filter((r: Reservation) => {
    if (desc === '') {
      return r;
    } else if (
      desc !== null &&
      r.description.toLowerCase().includes(desc.toLowerCase())
    ) {
      return r;
    }
  });
};

const timeFilter = (
  reservations: Reservation[],
  fromTime: string,
  toTime: string
) => {
  return reservations.filter((r: Reservation) => {
    if (fromTime === '' || toTime === '') {
      return r;
    } else if (fromTime !== null && toTime !== null) {
      const d1 = new Date(r.fromDate).getTime();
      const d2 = new Date(r.toDate).getTime();
      const t1 = new Date(fromTime).getTime();
      const t2 = new Date(toTime).getTime();
      if (d1 >= t1 && d2 <= t2) return r;
    }
  });
};

const capFilter = (reservations: Reservation[], capFilter: number[]) => {
  return reservations.filter(
    (r: Reservation) => r.capacity >= capFilter[0] && r.capacity <= capFilter[1]
  );
};

export const FilterFunctions = {
  descFilter,
  timeFilter,
  capFilter,
};
