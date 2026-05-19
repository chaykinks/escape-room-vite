type Quest = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: string;
  type: string;
  peopleMinMax: [number, number];
};

type FullQuest = Quest & {
  description: string;
  coverImg: string;
  coverImgWebp: string;
};

export type {Quest, FullQuest};
