import {AxiosInstance} from 'axios';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {APIRoute, RequestStatus} from '../../const';
import {Quest} from '../../types/quest';

type QuestsState = {
  quests: Quest[];
  questsRequestStatus: RequestStatus;
  questsError: string | null;
};

const initialState: QuestsState = {
  quests: [],
  questsRequestStatus: RequestStatus.Idle,
  questsError: null,
};

export const fetchQuests = createAsyncThunk<
  Quest[],
  undefined,
  {extra: AxiosInstance}
>(
  'quests/fetchQuests',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Quest[]>(APIRoute.Quests);
    return data;
  }
);

const questsSlice = createSlice({
  name: 'quests',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuests.pending, (state) => {
        state.questsRequestStatus = RequestStatus.Loading;
        state.questsError = null;
      })
      .addCase(fetchQuests.fulfilled, (state, action) => {
        state.quests = action.payload;
        state.questsRequestStatus = RequestStatus.Success;
        state.questsError = null;
      })
      .addCase(fetchQuests.rejected, (state) => {
        state.questsRequestStatus = RequestStatus.Failed;
        state.questsError = 'Failed to load quests. Please try again later.';
      });
  },
});

export default questsSlice.reducer;
