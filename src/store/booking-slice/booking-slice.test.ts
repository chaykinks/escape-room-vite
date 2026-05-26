import {configureStore} from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import {beforeEach, describe, expect, it} from 'vitest';
import bookingReducer, {fetchBookingInfo, sendBooking} from './booking-slice';
import {createAPI} from '../../services/api';
import {QuestLevel, QuestType, RequestStatus} from '../../const';
import {BookingData, BookingPlace} from '../../types/booking';
import {Reservation} from '../../types/reservation';

const makeMockBookingPlace = (
  overrides: Partial<BookingPlace> = {}
): BookingPlace => ({
  id: 'place-1',
  location: {
    address: 'Санкт-Петербург, Набережная реки Карповка, д 5П',
    coords: [59.968322, 30.317359],
  },
  slots: {
    today: [
      {
        time: '10:00',
        isAvailable: true,
      },
    ],
    tomorrow: [
      {
        time: '11:00',
        isAvailable: false,
      },
    ],
  },
  ...overrides,
});

const makeMockBookingData = (
  overrides: Partial<BookingData> = {}
): BookingData => ({
  questId: 'quest-1',
  placeId: 'place-1',
  date: 'today',
  time: '10:00',
  contactPerson: 'Иван',
  phone: '+7 (999) 999-99-99',
  peopleCount: 3,
  withChildren: true,
  ...overrides,
});

const makeMockReservation = (
  overrides: Partial<Reservation> = {}
): Reservation => ({
  id: 'reservation-1',
  date: 'today',
  time: '10:00',
  contactPerson: 'Иван',
  phone: '+7 (999) 999-99-99',
  peopleCount: 3,
  location: {
    address: 'Санкт-Петербург, Набережная реки Карповка, д 5П',
    coords: [59.968322, 30.317359],
  },
  quest: {
    id: 'quest-1',
    title: 'Маньяк',
    previewImg: 'preview.jpg',
    previewImgWebp: 'preview.webp',
    level: QuestLevel.Medium,
    type: QuestType.Horror,
    peopleMinMax: [3, 6],
  },
  ...overrides,
});

describe('booking-slice reducer tests', () => {
  const initialState = {
    bookingInfo: [],
    bookingInfoRequestStatus: RequestStatus.Idle,
    bookingInfoError: null,
    sendBookingRequestStatus: RequestStatus.Idle,
    sendBookingError: null,
  };

  it('should return initial state with empty action', () => {
    expect(bookingReducer(undefined, {type: ''})).toEqual(initialState);
  });

  it('should set bookingInfoRequestStatus to Loading on fetchBookingInfo.pending', () => {
    const state = bookingReducer(
      initialState,
      fetchBookingInfo.pending('', 'quest-1')
    );

    expect(state.bookingInfoRequestStatus).toBe(RequestStatus.Loading);
    expect(state.bookingInfoError).toBeNull();
  });

  it('should fill bookingInfo on fetchBookingInfo.fulfilled', () => {
    const bookingInfo = [makeMockBookingPlace()];
    const state = bookingReducer(
      initialState,
      fetchBookingInfo.fulfilled(bookingInfo, '', 'quest-1')
    );

    expect(state.bookingInfo).toEqual(bookingInfo);
    expect(state.bookingInfoRequestStatus).toBe(RequestStatus.Success);
    expect(state.bookingInfoError).toBeNull();
  });

  it('should set bookingInfoRequestStatus to Failed on fetchBookingInfo.rejected', () => {
    const state = bookingReducer(
      initialState,
      fetchBookingInfo.rejected(new Error('error'), '', 'quest-1')
    );

    expect(state.bookingInfoRequestStatus).toBe(RequestStatus.Failed);
    expect(state.bookingInfoError).toBe('Не удалось загрузить информацию о бронировании. Попробуйте позже.');
  });

  it('should set sendBookingRequestStatus to Loading on sendBooking.pending', () => {
    const bookingData = makeMockBookingData();

    const state = bookingReducer(
      initialState,
      sendBooking.pending('', bookingData)
    );

    expect(state.sendBookingRequestStatus).toBe(RequestStatus.Loading);
    expect(state.sendBookingError).toBeNull();
  });

  it('should set sendBookingRequestStatus to Success on sendBooking.fulfilled', () => {
    const bookingData = makeMockBookingData();
    const reservation = makeMockReservation();

    const state = bookingReducer(
      initialState,
      sendBooking.fulfilled(reservation, '', bookingData)
    );

    expect(state.sendBookingRequestStatus).toBe(RequestStatus.Success);
    expect(state.sendBookingError).toBeNull();
  });

  it('should set sendBookingRequestStatus to Failed on sendBooking.rejected', () => {
    const bookingData = makeMockBookingData();

    const state = bookingReducer(
      initialState,
      sendBooking.rejected(new Error('error'), '', bookingData)
    );

    expect(state.sendBookingRequestStatus).toBe(RequestStatus.Failed);
    expect(state.sendBookingError).toBe('Не удалось забронировать квест. Попробуйте позже.');
  });
});

describe('booking-slice async thunks tests', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);

  beforeEach(() => {
    mockAPI.reset();
  });

  it('should dispatch fetchBookingInfo and store booking info', async () => {
    const bookingInfo = [makeMockBookingPlace()];
    mockAPI.onGet('/quest/quest-1/booking').reply(200, bookingInfo);

    const store = configureStore({
      reducer: {BOOKING: bookingReducer},
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {extraArgument: api},
        }),
    });

    await store.dispatch(fetchBookingInfo('quest-1'));

    const state = store.getState().BOOKING;
    expect(state.bookingInfo).toEqual(bookingInfo);
    expect(state.bookingInfoRequestStatus).toBe(RequestStatus.Success);
  });

  it('should dispatch sendBooking and set success status', async () => {
    const bookingData = makeMockBookingData();
    const reservation = makeMockReservation();

    mockAPI.onPost('/quest/quest-1/booking').reply(200, reservation);

    const store = configureStore({
      reducer: {BOOKING: bookingReducer},
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {extraArgument: api},
        }),
    });

    await store.dispatch(sendBooking(bookingData));

    const state = store.getState().BOOKING;
    expect(state.sendBookingRequestStatus).toBe(RequestStatus.Success);
    expect(state.sendBookingError).toBeNull();
  });
});
