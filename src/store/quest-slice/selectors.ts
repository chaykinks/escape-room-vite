import {RootState} from '..';

export const getQuest = (state: RootState) => state.QUEST.quest;
export const getQuestRequestStatus = (state: RootState) => state.QUEST.questRequestStatus;
