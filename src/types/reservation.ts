import {Quest} from './quest';

type BookingDate = 'today' | 'tomorrow';

type Reservation = {
  id: string;
  date: BookingDate;
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
