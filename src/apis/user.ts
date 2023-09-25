import apiInstance from '@apis/index';

enum UserPath {
  GET_BY_SLUG = 'users/:slug/profile',
  UPDATE_BY_ID = 'users/:id',
  FOLLOW = 'users/:id/follow',
  UNFOLLOW = 'users/:id/unfollow',
  ADDFR = 'users/:id/addfr',
  FOLLOWED = 'users/followed',
  AVATAR = 'users/:id/avatar',
}

export const getUserBySlug = (slug: string) => {
  return apiInstance.get(UserPath.GET_BY_SLUG.replace(':slug', slug));
};

export const updateUser = (id: string, data: any) => {
  return apiInstance.patch(UserPath.UPDATE_BY_ID.replace(':id', id), {
    ...data,
  });
};

export const follow = (id: string) => {
  return apiInstance.get(UserPath.FOLLOW.replace(':id', id));
};

export const unfollow = (id: string) => {
  return apiInstance.get(UserPath.UNFOLLOW.replace(':id', id));
};

export const addfr = (id: string) => {
  return apiInstance.get(UserPath.ADDFR.replace(':id', id));
};

export const getFollowedList = () => {
  return apiInstance.get(UserPath.FOLLOWED);
};

export const updateAvatar = async (id: string, avatar: string) => {
  return apiInstance.patch(UserPath.AVATAR.replace(':id', id), { avatar });
};
