import {AxiosInstance} from 'axios';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {APIRoute, RequestStatus} from '../../const';
import {FullQuest} from '../../types/quest';

type QuestState = {
  quest: FullQuest | null;
  questRequestStatus: RequestStatus;
  questError: string | null;
};

const initialState: QuestState = {
  quest: null,
  questRequestStatus: RequestStatus.Idle,
  questError: null,
};

export const fetchQuest = createAsyncThunk<
  FullQuest,
  string,
  {extra: AxiosInstance}
>(
  'quest/fetchQuest',
  async (questId, {extra: api}) => {
    const {data} = await api.get<FullQuest>(`${APIRoute.Quests}/${questId}`);
    return data;
  }
);

const questSlice = createSlice({
  name: 'quest',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuest.pending, (state) => {
        state.questRequestStatus = RequestStatus.Loading;
        state.quest = null;
        state.questError = null;
      })
      .addCase(fetchQuest.fulfilled, (state, action) => {
        state.quest = action.payload;
        state.questRequestStatus = RequestStatus.Success;
      })
      .addCase(fetchQuest.rejected, (state) => {
        state.questRequestStatus = RequestStatus.Failed;
        state.questError = 'Failed to load quest.';
      });
  },
});

export default questSlice.reducer;
