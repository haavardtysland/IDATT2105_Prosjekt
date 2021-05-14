import Section from './Section';
export default interface Room {
  room_id: number;
  name: string;
  capacity: number; //antall plasser
  sections: Section[];
}
