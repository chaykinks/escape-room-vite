import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '..';
import {QuestLevel, QuestType} from '../../const';
import {Quest} from '../../types/quest';

export const getQuests = (state: RootState): Quest[] => state.QUESTS.quests;

export const getQuestsRequestStatus = (state: RootState) => state.QUESTS.questsRequestStatus;

export const getQuestsError = (state: RootState) => state.QUESTS.questsError;

export const getActiveType = (state: RootState) => state.QUESTS.activeType;

export const getActiveLevel = (state: RootState) => state.QUESTS.activeLevel;

export const getFilteredQuests = createSelector(
  [getQuests, getActiveType, getActiveLevel],
  (quests, activeType, activeLevel) =>
    quests.filter((quest) => {
      const isTypeMatch =
        activeType === QuestType.All ||
        quest.type === activeType;

      const isLevelMatch =
        activeLevel === QuestLevel.Any ||
        quest.level === activeLevel;

      return isTypeMatch && isLevelMatch;
    })
);
