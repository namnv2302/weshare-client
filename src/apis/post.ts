import apiInstance from '@apis/index';

enum PostPath {
  CREATE = '/posts',
  DEFAULT = '/posts',
}

export const createPost = async ({ status, postUrl }: { status?: string; postUrl?: string }) => {
  return apiInstance.post(PostPath.CREATE, { status, postUrl });
};

export const getPostList = async () => {
  return apiInstance.get(PostPath.DEFAULT);
};
