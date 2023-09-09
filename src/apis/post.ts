import apiInstance from '@apis/index';

enum PostPath {
  CREATE = '/posts',
  DEFAULT = '/posts',
  LIKE = '/posts/:id/like',
  UNLIKE = '/posts/:id/unlike',
}

export const createPost = async ({ status, postUrl }: { status?: string; postUrl?: string }) => {
  return apiInstance.post(PostPath.CREATE, { status, postUrl });
};

export const getPostList = async () => {
  return apiInstance.get(PostPath.DEFAULT);
};

export const like = async (id: string) => {
  return apiInstance.get(PostPath.LIKE.replace(':id', id));
};

export const unlike = async (id: string) => {
  return apiInstance.get(PostPath.UNLIKE.replace(':id', id));
};
