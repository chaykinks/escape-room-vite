import {AxiosInstance} from 'axios';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {APIRoute, RequestStatus} from '../../const';
import {Reservation} from '../../types/reservation';

type ReservationsState = {
  reservations: Reservation[];
  reservationsRequestStatus: RequestStatus;
  reservationsError: string | null;
  deleteReservationRequestStatus: RequestStatus;
  deleteReservationError: string | null;
};

const initialState: ReservationsState = {
  reservations: [],
  reservationsRequestStatus: RequestStatus.Idle,
  reservationsError: null,
  deleteReservationRequestStatus: RequestStatus.Idle,
  deleteReservationError: null,
};

export const fetchReservations = createAsyncThunk<
  Reservation[],
  undefined,
  {extra: AxiosInstance}
>(
  'reservations/fetchReservations',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Reservation[]>(APIRoute.Reservation);
    return data;
  }
);

export const deleteReservation = createAsyncThunk<
  string,
  string,
  {extra: AxiosInstance}
>(
  'reservations/deleteReservation',
  async (reservationId, {extra: api}) => {
    await api.delete(`${APIRoute.Reservation}/${reservationId}`);
    return reservationId;
  }
);

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.reservationsRequestStatus = RequestStatus.Loading;
        state.reservationsError = null;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.reservationsRequestStatus = RequestStatus.Success;
        state.reservations = action.payload;
        state.reservationsError = null;
      })
      .addCase(fetchReservations.rejected, (state) => {
        state.reservationsRequestStatus = RequestStatus.Failed;
        state.reservationsError = 'Failed to load reservations. Please try again later.';
      })

      .addCase(deleteReservation.pending, (state) => {
        state.deleteReservationRequestStatus = RequestStatus.Loading;
        state.deleteReservationError = null;
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.deleteReservationRequestStatus = RequestStatus.Success;
        state.deleteReservationError = null;
        state.reservations = state.reservations.filter(
          (reservation) => reservation.id !== action.payload
        );
      })
      .addCase(deleteReservation.rejected, (state) => {
        state.deleteReservationRequestStatus = RequestStatus.Failed;
        state.deleteReservationError = 'Failed to delete reservation.';
      });
  },
});

export default reservationsSlice.reducer;
