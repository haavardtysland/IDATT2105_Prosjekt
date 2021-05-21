import Message from './Message';

export default interface Section {
  room_id: number;
  section_id: number;
  section_name: string;
  capacity: number;
  messages?: Message[];
}
