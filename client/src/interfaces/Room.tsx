import Section from './Section';
export default interface Room {
  roomId: number;
  name: string;
  capacity: number; //antall plasser
  sections: Section[];
}
