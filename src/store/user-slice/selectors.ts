import {RootState} from '..';

export const getAuthorizationStatus = (state: RootState) => state.USER.authorizationStatus;
export const getAuthRequestStatus = (state: RootState) => state.USER.authRequestStatus;
export const getAuthError = (state: RootState) => state.USER.authError;
export const getUser = (state: RootState) => state.USER.user;
