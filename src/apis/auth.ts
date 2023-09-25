import apiInstance from '@apis/index';

enum AuthPath {
  LOGIN = '/auth/login',
  ME = '/auth/me',
  LOGOUT = '/auth/logout',
  GOOGLE_SUCCESS = '/auth/google/success',
}

export const login = async (username: string, password: string) => {
  return apiInstance.post(AuthPath.LOGIN, { username, password });
};

export const loginWithGoogle = async () => {
  return apiInstance.get(AuthPath.GOOGLE_SUCCESS);
};

export const whoAmI = async () => {
  return apiInstance.get(AuthPath.ME);
};

export const logout = async () => {
  return apiInstance.get(AuthPath.LOGOUT);
};
