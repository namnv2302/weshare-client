import apiInstance from '@apis/index';

enum UserPath {
  GET_BY_SLUG = 'users/:slug/profile',
}

export const getUserBySlug = (slug: string) => {
  return apiInstance.get(UserPath.GET_BY_SLUG.replace(':slug', slug));
};
