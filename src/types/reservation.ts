import {Quest} from './quest';

type Reservation = {
  id: string;
  date: string;
  time: string;
  contactPerson: string;
  phone: string;
  peopleCount: number;
  location: {
    address: string;
    coords: [number, number];
  };
  quest: Quest;
};

export type { Reservation };
