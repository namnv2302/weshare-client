import apiInstance from '@apis/index';

enum UserPath {
  GET_BY_SLUG = 'users/:slug/profile',
  UPDATE_BY_ID = 'users/:id',
}

export const getUserBySlug = (slug: string) => {
  return apiInstance.get(UserPath.GET_BY_SLUG.replace(':slug', slug));
};

export const updateUser = (id: string, data: any) => {
  return apiInstance.patch(UserPath.UPDATE_BY_ID.replace(':id', id), {
    ...data,
  });
};
