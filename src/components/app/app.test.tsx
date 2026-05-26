import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {configureStore} from '@reduxjs/toolkit';
import {vi} from 'vitest';
import App from './app';
import questsReducer from '../../store/quests-slice/quests-slice';
import questReducer from '../../store/quest-slice/quest-slice';
import bookingReducer from '../../store/booking-slice/booking-slice';
import reservationsReducer from '../../store/reservations-slice/reservations-slice';
import userReducer from '../../store/user-slice/user-slice';
import {AuthorizationStatus, QuestLevel, QuestType, RequestStatus} from '../../const';

vi.mock('../../services/token', () => ({
  getToken: vi.fn(() => 'test-token'),
  saveToken: vi.fn(),
  dropToken: vi.fn(),
}));

vi.mock('../../store/user-slice/user-slice', async () => {
  const actual = await vi.importActual<typeof import('../../store/user-slice/user-slice')
    >('../../store/user-slice/user-slice');

  return {
    ...actual,
    checkAuth: vi.fn(() => ({type: 'user/checkAuth'}))
  };
});

vi.mock('../../store/quests-slice/quests-slice', async () => {
  const actual = await vi.importActual<typeof import('../../store/quests-slice/quests-slice')
    >('../../store/quests-slice/quests-slice');

  return {
    ...actual,
    fetchQuests: vi.fn(() => ({type: 'quests/fetchQuests'}))
  };
});

describe('Application routing tests', () => {
  const makeStore = (
    authorizationStatus = AuthorizationStatus.NoAuth
  ) =>
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
          questsRequestStatus: RequestStatus.Success,
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
          authRequestStatus: RequestStatus.Success,
          user: null,
          authError: null,
        },
      },
    });

  it('should render MainPage for "/" path', () => {
    window.history.pushState({}, '', '/');

    render(
      <Provider store={makeStore()}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/квесты в санкт-петербурге/i)).toBeInTheDocument();
  });

  it('should render LoginPage for "/login" path', () => {
    window.history.pushState({}, '', '/login');

    render(
      <Provider
        store={makeStore(AuthorizationStatus.NoAuth)}
      >
        <App />
      </Provider>
    );

    expect(screen.getByRole('heading', {name: /вход/i})).toBeInTheDocument();
  });

  it('should render NotFoundPage for unknown route', () => {
    window.history.pushState({}, '', '/random');

    render(
      <Provider store={makeStore()}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
