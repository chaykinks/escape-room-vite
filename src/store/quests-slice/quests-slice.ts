import {AxiosInstance} from 'axios';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {APIRoute, RequestStatus, QuestType, QuestLevel} from '../../const';
import {Quest} from '../../types/quest';

type QuestsState = {
  quests: Quest[];
  questsRequestStatus: RequestStatus;
  questsError: string | null;
  activeType: QuestType;
  activeLevel: QuestLevel;
};

const initialState: QuestsState = {
  quests: [],
  questsRequestStatus: RequestStatus.Idle,
  questsError: null,
  activeType: QuestType.All,
  activeLevel: QuestLevel.Any,
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
  reducers: {
    changeType: (state, action: PayloadAction<QuestType>) => {
      state.activeType = action.payload;
    },
    changeLevel: (state, action: PayloadAction<QuestLevel>) => {
      state.activeLevel = action.payload;
    },
  },
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
        state.questsError = 'Не удалось загрузить квесты. Попробуйте позже.';
      });
  },
});

export const {changeType, changeLevel} = questsSlice.actions;
export default questsSlice.reducer;
