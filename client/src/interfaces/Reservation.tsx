import Section from './Section';
import User from './User';

export default interface Reservation {
  reservationId: number;
  capacity: number;
  description: string;
  from_date: string;
  to_date: string;
  section: Section;
  user: User;
}
