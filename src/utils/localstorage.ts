export const ACCESS_TOKEN = 'access_token';

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);
export const saveAccessToken = (value: string) => localStorage.setItem(ACCESS_TOKEN, value);
export const clearLocalstorageToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};
