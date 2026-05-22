import {RootState} from '..';

export const getBookingInfo = (state: RootState) => state.BOOKING.bookingInfo;
export const getBookingInfoRequestStatus = (state: RootState) => state.BOOKING.bookingInfoRequestStatus;
export const getBookingInfoError = (state: RootState) => state.BOOKING.bookingInfoError;
export const getSendBookingRequestStatus = (state: RootState) => state.BOOKING.sendBookingRequestStatus;
export const getSendBookingError = (state: RootState) => state.BOOKING.sendBookingError;
