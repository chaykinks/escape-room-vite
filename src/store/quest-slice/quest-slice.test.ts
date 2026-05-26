import {configureStore} from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import {beforeEach, describe, expect, it} from 'vitest';
import questReducer, {fetchQuest} from './quest-slice';
import {createAPI} from '../../services/api';
import {QuestLevel, QuestType, RequestStatus} from '../../const';
import {FullQuest} from '../../types/quest';

const makeMockFullQuest = (overrides: Partial<FullQuest> = {}): FullQuest => ({
  id: 'quest-1',
  title: 'Маньяк',
  previewImg: 'preview.jpg',
  previewImgWebp: 'preview.webp',
  coverImg: 'cover.jpg',
  coverImgWebp: 'cover.webp',
  description: 'Описание квеста',
  level: QuestLevel.Medium,
  type: QuestType.Horror,
  peopleMinMax: [3, 6],
  ...overrides,
});

describe('quest-slice reducer tests', () => {
  const initialState = {
    quest: null,
    questRequestStatus: RequestStatus.Idle,
    questError: null,
  };

  it('should return initial state with empty action', () => {
    expect(questReducer(undefined, {type: ''})).toEqual(initialState);
  });

  it('should set questRequestStatus to Loading and reset quest on fetchQuest.pending', () => {
    const state = questReducer(
      {
        ...initialState,
        quest: makeMockFullQuest(),
        questError: 'Old error',
      },
      fetchQuest.pending('', 'quest-1')
    );

    expect(state.questRequestStatus).toBe(RequestStatus.Loading);
    expect(state.quest).toBeNull();
    expect(state.questError).toBeNull();
  });

  it('should fill quest on fetchQuest.fulfilled', () => {
    const quest = makeMockFullQuest();
    const state = questReducer(
      initialState,
      fetchQuest.fulfilled(quest, '', 'quest-1')
    );

    expect(state.quest).toEqual(quest);
    expect(state.questRequestStatus).toBe(RequestStatus.Success);
  });

  it('should set questRequestStatus to Failed on fetchQuest.rejected', () => {
    const state = questReducer(
      initialState,
      fetchQuest.rejected(new Error('error'), '', 'quest-1')
    );

    expect(state.questRequestStatus).toBe(RequestStatus.Failed);
    expect(state.questError).toBe('Не удалось загрузить квест.');
  });
});

describe('quest-slice async thunks tests', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);

  beforeEach(() => {
    mockAPI.reset();
  });

  it('should dispatch fetchQuest and store quest', async () => {
    const quest = makeMockFullQuest({id: 'quest-5'});
    mockAPI.onGet('/quest/quest-5').reply(200, quest);

    const store = configureStore({
      reducer: {QUEST: questReducer},
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {extraArgument: api},
        }),
    });

    await store.dispatch(fetchQuest('quest-5'));

    const state = store.getState().QUEST;
    expect(state.quest).toEqual(quest);
    expect(state.questRequestStatus).toBe(RequestStatus.Success);
  });

  it('should dispatch fetchQuest and set failed status on server error', async () => {
    mockAPI.onGet('/quest/quest-5').reply(404);

    const store = configureStore({
      reducer: {QUEST: questReducer},
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {extraArgument: api},
        }),
    });

    await store.dispatch(fetchQuest('quest-5'));

    const state = store.getState().QUEST;
    expect(state.questRequestStatus).toBe(RequestStatus.Failed);
    expect(state.questError).toBe('Не удалось загрузить квест.');
  });
});
