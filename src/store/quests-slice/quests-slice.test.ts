import {configureStore} from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import {beforeEach, describe, expect, it} from 'vitest';
import questsReducer, {changeLevel, changeType, fetchQuests} from './quests-slice';
import {createAPI} from '../../services/api';
import {QuestLevel, QuestType, RequestStatus} from '../../const';
import {Quest} from '../../types/quest';

const makeMockQuest = (overrides: Partial<Quest> = {}): Quest => ({
  id: 'quest-1',
  title: 'Маньяк',
  previewImg: 'preview.jpg',
  previewImgWebp: 'preview.webp',
  level: QuestLevel.Medium,
  type: QuestType.Horror,
  peopleMinMax: [3, 6],
  ...overrides,
});

describe('quests-slice reducer tests', () => {
  const initialState = {
    quests: [],
    questsRequestStatus: RequestStatus.Idle,
    questsError: null,
    activeType: QuestType.All,
    activeLevel: QuestLevel.Any,
  };

  it('should return initial state with empty action', () => {
    expect(questsReducer(undefined, {type: ''})).toEqual(initialState);
  });

  it('should change active type', () => {
    const state = questsReducer(initialState, changeType(QuestType.Horror));
    expect(state.activeType).toBe(QuestType.Horror);
  });

  it('should change active level', () => {
    const state = questsReducer(initialState, changeLevel(QuestLevel.Hard));
    expect(state.activeLevel).toBe(QuestLevel.Hard);
  });

  it('should set questsRequestStatus to Loading on fetchQuests.pending', () => {
    const state = questsReducer(initialState, fetchQuests.pending('', undefined));
    expect(state.questsRequestStatus).toBe(RequestStatus.Loading);
    expect(state.questsError).toBeNull();
  });

  it('should fill quests on fetchQuests.fulfilled', () => {
    const quests = [makeMockQuest(), makeMockQuest({id: 'quest-2'})];
    const state = questsReducer(
      initialState,
      fetchQuests.fulfilled(quests, '', undefined)
    );

    expect(state.quests).toEqual(quests);
    expect(state.questsRequestStatus).toBe(RequestStatus.Success);
    expect(state.questsError).toBeNull();
  });

  it('should set questsRequestStatus to Failed on fetchQuests.rejected', () => {
    const state = questsReducer(
      initialState,
      fetchQuests.rejected(new Error('error'), '', undefined)
    );

    expect(state.questsRequestStatus).toBe(RequestStatus.Failed);
    expect(state.questsError).toBe('Не удалось загрузить квесты. Попробуйте позже.');
  });
});

describe('quests-slice async thunks tests', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);

  beforeEach(() => {
    mockAPI.reset();
  });

  it('should dispatch fetchQuests and store quests', async () => {
    const quests = [makeMockQuest(), makeMockQuest({id: 'quest-2'})];
    mockAPI.onGet('/quest').reply(200, quests);

    const store = configureStore({
      reducer: {QUESTS: questsReducer},
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {extraArgument: api},
        }),
    });

    await store.dispatch(fetchQuests());

    const state = store.getState().QUESTS;
    expect(state.quests).toEqual(quests);
    expect(state.questsRequestStatus).toBe(RequestStatus.Success);
    expect(state.questsError).toBeNull();
  });

  it('should dispatch fetchQuests and set failed status on server error', async () => {
    mockAPI.onGet('/quest').reply(500);

    const store = configureStore({
      reducer: {QUESTS: questsReducer},
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {extraArgument: api},
        }),
    });

    await store.dispatch(fetchQuests());

    const state = store.getState().QUESTS;
    expect(state.questsRequestStatus).toBe(RequestStatus.Failed);
    expect(state.questsError).toBe('Не удалось загрузить квесты. Попробуйте позже.');
  });
});
