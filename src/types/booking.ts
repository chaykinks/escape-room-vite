type Slot = {
  time: string;
  isAvailable: boolean;
};

type BookingPlace = {
  id: string;
  location: {
    address: string;
    coords: [number, number];
  };
  slots: {
    today: Slot[];
    tomorrow: Slot[];
  };
};

type BookingData = {
  questId: string;
  date: string;
  time: string;
  contactPerson: string;
  phone: string;
  peopleCount: number;
  placeId: string;
  withChildren: boolean;
};

export type {Slot, BookingPlace, BookingData};
