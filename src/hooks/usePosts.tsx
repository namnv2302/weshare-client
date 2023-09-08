import { useCallback, useEffect, useState } from 'react';
import { getPostList } from '@apis/post';
import { AuthorizationData } from '@slices/authorizationSlice';

export interface IPost {
  status?: string;
  postUrl?: string;
  createdAt?: Date;
  user?: AuthorizationData;
}

const usePosts = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IPost[]>();

  const fetchPostList = useCallback(async () => {
    setLoading(true);
    const resp = await getPostList();
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

export default usePosts;
