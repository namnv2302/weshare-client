import apiInstance from '@apis/index';

enum AuthPath {
  LOGIN = '/auth/login',
  REGISTER = '/auth/register',
  ME = '/auth/me',
  LOGOUT = '/auth/logout',
  LOGIN_SUCCESS = '/auth/login/success',
}

export const login = async (username: string, password: string) => {
  return apiInstance.post(AuthPath.LOGIN, { username, password });
};

export const register = async (name: string, email: string, password: string) => {
  return apiInstance.post(AuthPath.REGISTER, { name, email, password });
};

export const loginSuccess = async () => {
  return apiInstance.get(AuthPath.LOGIN_SUCCESS);
};

export const whoAmI = async () => {
  return apiInstance.get(AuthPath.ME);
};

export const logout = async () => {
  return apiInstance.get(AuthPath.LOGOUT);
};
