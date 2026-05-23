import {RootState} from '..';

export const getReservations = (state: RootState) => state.RESERVATIONS.reservations;
export const getReservationsRequestStatus = (state: RootState) => state.RESERVATIONS.reservationsRequestStatus;
export const getReservationsError = (state: RootState) => state.RESERVATIONS.reservationsError;
export const getDeleteReservationError = (state: RootState) => state.RESERVATIONS.deleteReservationError;
