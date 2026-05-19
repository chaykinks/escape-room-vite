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

export {AuthorizationStatus, AppRoute, RequestStatus, APIRoute};
