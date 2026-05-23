import {RootState} from '..';

export const getAuthorizationStatus = (state: RootState) => state.USER.authorizationStatus;
export const getAuthError = (state: RootState) => state.USER.authError;
