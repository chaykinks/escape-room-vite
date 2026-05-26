import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter, Routes, Route} from 'react-router-dom';
import {configureStore} from '@reduxjs/toolkit';
import PrivateRoute from './private-route';
import questsReducer from '../../store/quests-slice/quests-slice';
import questReducer from '../../store/quest-slice/quest-slice';
import bookingReducer from '../../store/booking-slice/booking-slice';
import reservationsReducer from '../../store/reservations-slice/reservations-slice';
import userReducer from '../../store/user-slice/user-slice';
import {AuthorizationStatus, QuestLevel, QuestType, RequestStatus} from '../../const';

const makeStore = (authorizationStatus: AuthorizationStatus) =>
  configureStore({
    reducer: {
      QUESTS: questsReducer,
      QUEST: questReducer,
      BOOKING: bookingReducer,
      RESERVATIONS: reservationsReducer,
      USER: userReducer,
    },

    preloadedState: {
      QUESTS: {
        quests: [],
        questsRequestStatus: RequestStatus.Idle,
        questsError: null,
        activeType: QuestType.All,
        activeLevel: QuestLevel.Any,
      },

      QUEST: {
        quest: null,
        questRequestStatus: RequestStatus.Idle,
        questError: null,
      },

      BOOKING: {
        bookingInfo: [],
        bookingInfoRequestStatus: RequestStatus.Idle,
        bookingInfoError: null,
        sendBookingRequestStatus: RequestStatus.Idle,
        sendBookingError: null,
      },

      RESERVATIONS: {
        reservations: [],
        reservationsRequestStatus: RequestStatus.Idle,
        reservationsError: null,
        deleteReservationRequestStatus: RequestStatus.Idle,
        deleteReservationError: null,
      },

      USER: {
        authorizationStatus,
        authRequestStatus: RequestStatus.Idle,
        user: null,
        authError: null,
      },
    },
  });

describe('Component test: PrivateRoute', () => {
  it('should render children for authorized user', () => {
    const store = makeStore(AuthorizationStatus.Auth);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PrivateRoute>
            <div>private content</div>
          </PrivateRoute>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('private content')).toBeInTheDocument();
  });

  it('should redirect unauthorized user', () => {
    const store = makeStore(AuthorizationStatus.NoAuth);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/my-quests']}>
          <Routes>
            <Route
              path="/my-quests"
              element={
                <PrivateRoute>
                  <div>private content</div>
                </PrivateRoute>
              }
            />

            <Route
              path="/login"
              element={<div>login page</div>}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('login page')).toBeInTheDocument();
  });

  it('should render loading text for unknown auth status', () => {
    const store = makeStore(AuthorizationStatus.Unknown);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PrivateRoute>
            <div>private content</div>
          </PrivateRoute>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/провереям авторизацию/i)).toBeInTheDocument();
  });
});
