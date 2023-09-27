import { useCallback, useEffect, useState } from 'react';
import { getPostListOfMe } from '@apis/post';
import { IPost } from '@hooks/posts/usePosts';

const usePostsOfMe = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IPost[]>();

  const fetchPostList = useCallback(async () => {
    setLoading(true);
    const resp = await getPostListOfMe();
    if (resp.data.data) {
      setData(resp.data.data);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPostList();
  }, [fetchPostList]);

  return { data, loading };
};

export default usePostsOfMe;
