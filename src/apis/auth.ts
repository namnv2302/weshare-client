import apiInstance from '@apis/index';

enum AuthPath {
  LOGIN = '/auth/login',
  ME = '/auth/me',
}

export const login = async (username: string, password: string) => {
  return apiInstance.post(AuthPath.LOGIN, { username, password });
};

export const whoAmI = async () => {
  return apiInstance.get(AuthPath.ME);
};
