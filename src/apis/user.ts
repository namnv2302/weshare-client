import apiInstance from '@apis/index';

enum UserPath {
  GET_BY_SLUG = 'users/:slug/profile',
  UPDATE_BY_ID = 'users/:id',
  FOLLOW = 'users/:id/follow',
  UNFOLLOW = 'users/:id/unfollow',
  ADDFR = 'users/:id/addfr',
  FOLLOWED = 'users/:id/followed',
  FRIENDS = 'users/:id/friends',
  AVATAR = 'users/:id/avatar',
  COVER = 'users/:id/cover',
  DEFAULT = 'users',
  DETAIL = 'users/:id',
  SUGGESTS = 'users/suggests',
}

export const getUserById = async (id: string) => {
  return apiInstance.get(UserPath.DETAIL.replace(':id', id));
};

export const getUserByName = (name: string) => {
  return apiInstance.get(UserPath.DEFAULT, {
    params: { name },
  });
};

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

export const getFollowedList = (id: string) => {
  return apiInstance.get(UserPath.FOLLOWED.replace(':id', id));
};

export const updateAvatar = async (id: string, avatar: string) => {
  return apiInstance.patch(UserPath.AVATAR.replace(':id', id), { avatar });
};

export const updateCoverPhoto = async (id: string, cover: string) => {
  return apiInstance.patch(UserPath.COVER.replace(':id', id), { cover });
};

export const getFriendList = async (id: string) => {
  return apiInstance.get(UserPath.FRIENDS.replace(':id', id));
};

export const getSuggestList = async (current: number = 1, pageSize: number = 10) => {
  return apiInstance.get(UserPath.SUGGESTS, {
    params: {
      current,
      pageSize,
    },
  });
};
