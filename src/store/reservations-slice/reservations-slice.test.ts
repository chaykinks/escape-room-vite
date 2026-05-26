import {configureStore} from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import {beforeEach, describe, expect, it} from 'vitest';
import reservationsReducer, {deleteReservation, fetchReservations} from './reservations-slice';
import {createAPI} from '../../services/api';
import {QuestLevel, QuestType, RequestStatus} from '../../const';
import {Reservation} from '../../types/reservation';

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

describe('reservations-slice reducer tests', () => {
  const initialState = {
    reservations: [],
    reservationsRequestStatus: RequestStatus.Idle,
    reservationsError: null,
    deleteReservationRequestStatus: RequestStatus.Idle,
    deleteReservationError: null,
  };

  it('should return initial state with empty action', () => {
    expect(reservationsReducer(undefined, {type: ''})).toEqual(initialState);
  });

  it('should set reservationsRequestStatus to Loading on fetchReservations.pending', () => {
    const state = reservationsReducer(
      initialState,
      fetchReservations.pending('', undefined)
    );

    expect(state.reservationsRequestStatus).toBe(RequestStatus.Loading);
    expect(state.reservationsError).toBeNull();
  });

  it('should fill reservations on fetchReservations.fulfilled', () => {
    const reservations = [
      makeMockReservation(),
      makeMockReservation({id: 'reservation-2'}),
    ];

    const state = reservationsReducer(
      initialState,
      fetchReservations.fulfilled(reservations, '', undefined)
    );

    expect(state.reservations).toEqual(reservations);
    expect(state.reservationsRequestStatus).toBe(RequestStatus.Success);
    expect(state.reservationsError).toBeNull();
  });

  it('should set reservationsRequestStatus to Failed on fetchReservations.rejected', () => {
    const state = reservationsReducer(
      initialState,
      fetchReservations.rejected(new Error('error'), '', undefined)
    );

    expect(state.reservationsRequestStatus).toBe(RequestStatus.Failed);
    expect(state.reservationsError).toBe('Не удалось загрузить бронирования. Попробуйте позже.');
  });

  it('should set deleteReservationRequestStatus to Loading on deleteReservation.pending', () => {
    const state = reservationsReducer(
      initialState,
      deleteReservation.pending('', 'reservation-1')
    );

    expect(state.deleteReservationRequestStatus).toBe(RequestStatus.Loading);
    expect(state.deleteReservationError).toBeNull();
  });

  it('should remove reservation on deleteReservation.fulfilled', () => {
    const reservation = makeMockReservation({id: 'reservation-1'});
    const anotherReservation = makeMockReservation({id: 'reservation-2'});

    const state = reservationsReducer(
      {
        ...initialState,
        reservations: [reservation, anotherReservation],
      },
      deleteReservation.fulfilled('reservation-1', '', 'reservation-1')
    );

    expect(state.deleteReservationRequestStatus).toBe(RequestStatus.Success);
    expect(state.deleteReservationError).toBeNull();
    expect(state.reservations).toEqual([anotherReservation]);
  });

  it('should set deleteReservationRequestStatus to Failed on deleteReservation.rejected', () => {
    const state = reservationsReducer(
      initialState,
      deleteReservation.rejected(new Error('error'), '', 'reservation-1')
    );

    expect(state.deleteReservationRequestStatus).toBe(RequestStatus.Failed);
    expect(state.deleteReservationError).toBe('Не удалось отменить бронирование. Попробуйте позже.');
  });
});

describe('reservations-slice async thunks tests', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);

  beforeEach(() => {
    mockAPI.reset();
  });

  it('should dispatch fetchReservations and store reservations', async () => {
    const reservations = [
      makeMockReservation(),
      makeMockReservation({id: 'reservation-2'}),
    ];

    mockAPI.onGet('/reservation').reply(200, reservations);

    const store = configureStore({
      reducer: {RESERVATIONS: reservationsReducer},
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {extraArgument: api},
        }),
    });

    await store.dispatch(fetchReservations());

    const state = store.getState().RESERVATIONS;
    expect(state.reservations).toEqual(reservations);
    expect(state.reservationsRequestStatus).toBe(RequestStatus.Success);
  });

  it('should dispatch deleteReservation and remove reservation from store', async () => {
    const reservation = makeMockReservation({id: 'reservation-1'});
    const anotherReservation = makeMockReservation({id: 'reservation-2'});

    mockAPI.onDelete('/reservation/reservation-1').reply(204);

    const store = configureStore({
      reducer: {RESERVATIONS: reservationsReducer},
      preloadedState: {
        RESERVATIONS: {
          reservations: [reservation, anotherReservation],
          reservationsRequestStatus: RequestStatus.Idle,
          reservationsError: null,
          deleteReservationRequestStatus: RequestStatus.Idle,
          deleteReservationError: null,
        },
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {extraArgument: api},
        }),
    });

    await store.dispatch(deleteReservation('reservation-1'));

    const state = store.getState().RESERVATIONS;
    expect(state.reservations).toEqual([anotherReservation]);
    expect(state.deleteReservationRequestStatus).toBe(RequestStatus.Success);
  });
});
