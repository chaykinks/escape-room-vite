import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../services/api';
import {questsReducer} from './quests-slice/quests-slice';
import {questReducer} from './quest-slice/quest-slice';
import {userReducer} from './user-slice/user-slice';
import {bookingReducer} from './booking-slice/booking-slice';
import {reservationsReducer} from './reservations-slice/reservations-slice';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    QUESTS: questsReducer,
    QUEST: questReducer,
    USER: userReducer,
    BOOKING: bookingReducer,
    RESERVATIONS: reservationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
