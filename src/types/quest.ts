import {QuestLevel, QuestType} from '../const.ts';

type Quest = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: QuestLevel;
  type: QuestType;
  peopleMinMax: [number, number];
};

type FullQuest = Quest & {
  description: string;
  coverImg: string;
  coverImgWebp: string;
};

export type {Quest, FullQuest};
