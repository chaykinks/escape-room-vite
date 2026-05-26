import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {configureStore} from '@reduxjs/toolkit';
import Layout from './layout';
import questsReducer from '../../store/quests-slice/quests-slice';
import questReducer from '../../store/quest-slice/quest-slice';
import bookingReducer from '../../store/booking-slice/booking-slice';
import reservationsReducer from '../../store/reservations-slice/reservations-slice';
import userReducer from '../../store/user-slice/user-slice';
import {AuthorizationStatus, RequestStatus} from '../../const';

describe('Component test: Layout', () => {
  const store = configureStore({
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
        activeType: 'all',
        activeLevel: 'any',
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
        authorizationStatus: AuthorizationStatus.NoAuth,
        authRequestStatus: RequestStatus.Idle,
        user: null,
        authError: null,
      },
    },
  });

  it('should render outlet content', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={<div>test content</div>}
              />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('test content')).toBeInTheDocument();
  });
});
