enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

enum AppRoute {
  Root = '/',
  Quest = '/quest/:id',
  Contacts = '/contacts',
  Login = '/login',
  Booking = '/quest/:id/booking',
  MyQuests = '/my-quests',
  NotFound = '*'
}

enum RequestStatus {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

enum APIRoute {
  Quests = '/quest',
  Login = '/login',
  Logout = '/logout',
  Reservation = '/reservation',
}

enum QuestType {
  All = 'all',
  Adventures = 'adventures',
  Horror = 'horror',
  Mystic = 'mystic',
  Detective = 'detective',
  SciFi = 'sci-fi',
}

enum QuestLevel {
  Any = 'any',
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

const QUEST_TYPE_NAME: Record<QuestType, string> = {
  [QuestType.All]: 'Все квесты',
  [QuestType.Adventures]: 'Приключения',
  [QuestType.Horror]: 'Ужасы',
  [QuestType.Mystic]: 'Мистика',
  [QuestType.Detective]: 'Детектив',
  [QuestType.SciFi]: 'Sci-fi',
};

const QUEST_LEVEL_NAME: Record<QuestLevel, string> = {
  [QuestLevel.Any]: 'Любой',
  [QuestLevel.Easy]: 'Простой',
  [QuestLevel.Medium]: 'Средний',
  [QuestLevel.Hard]: 'Сложный',
};

const QUEST_TYPES = [
  QuestType.All,
  QuestType.Adventures,
  QuestType.Horror,
  QuestType.Mystic,
  QuestType.Detective,
  QuestType.SciFi,
];

const QUEST_LEVELS = [
  QuestLevel.Any,
  QuestLevel.Easy,
  QuestLevel.Medium,
  QuestLevel.Hard,
];

export {AuthorizationStatus, AppRoute, RequestStatus, APIRoute, QuestType, QuestLevel,
  QUEST_TYPE_NAME, QUEST_LEVEL_NAME, QUEST_TYPES, QUEST_LEVELS};
