const AUTH_TOKEN_KEY = 'escape-room-token';

const getToken = (): string => localStorage.getItem(AUTH_TOKEN_KEY) ?? '';
const saveToken = (token: string): void => localStorage.setItem(AUTH_TOKEN_KEY, token);
const dropToken = (): void => localStorage.removeItem(AUTH_TOKEN_KEY);

export {getToken, saveToken, dropToken};
