import {AxiosInstance} from 'axios';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {APIRoute, RequestStatus} from '../../const';
import {BookingData, BookingPlace} from '../../types/booking';
import {Reservation} from '../../types/reservation';

type BookingState = {
  bookingInfo: BookingPlace[];
  bookingInfoRequestStatus: RequestStatus;
  bookingInfoError: string | null;
  sendBookingRequestStatus: RequestStatus;
  sendBookingError: string | null;
};

const initialState: BookingState = {
  bookingInfo: [],
  bookingInfoRequestStatus: RequestStatus.Idle,
  bookingInfoError: null,
  sendBookingRequestStatus: RequestStatus.Idle,
  sendBookingError: null,
};

export const fetchBookingInfo = createAsyncThunk<
  BookingPlace[],
  string,
  {extra: AxiosInstance}
>(
  'booking/fetchBookingInfo',
  async (questId, {extra: api}) => {
    const {data} = await api.get<BookingPlace[]>(`${APIRoute.Quests}/${questId}/booking`);
    return data;
  }
);

export const sendBooking = createAsyncThunk<
  Reservation,
  BookingData,
  {extra: AxiosInstance}
>(
  'booking/sendBooking',
  async (bookingData, {extra: api}) => {
    const {questId, ...dataForServer} = bookingData;
    const {data} = await api.post<Reservation>(`${APIRoute.Quests}/${questId}/booking`, dataForServer);
    return data;
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBookingInfo.pending, (state) => {
        state.bookingInfoRequestStatus = RequestStatus.Loading;
        state.bookingInfoError = null;
      })
      .addCase(fetchBookingInfo.fulfilled, (state, action) => {
        state.bookingInfoRequestStatus = RequestStatus.Success;
        state.bookingInfoError = null;
        state.bookingInfo = action.payload;
      })
      .addCase(fetchBookingInfo.rejected, (state) => {
        state.bookingInfoRequestStatus = RequestStatus.Failed;
        state.bookingInfoError = 'Failed to load booking info. Please try again later.';
      })
      .addCase(sendBooking.pending, (state) => {
        state.sendBookingRequestStatus = RequestStatus.Loading;
        state.sendBookingError = null;
      })
      .addCase(sendBooking.fulfilled, (state) => {
        state.sendBookingRequestStatus = RequestStatus.Success;
        state.sendBookingError = null;
      })
      .addCase(sendBooking.rejected, (state) => {
        state.sendBookingRequestStatus = RequestStatus.Failed;
        state.sendBookingError = 'Failed to send booking. Please try again.';
      });
  },
});

export default bookingSlice.reducer;
