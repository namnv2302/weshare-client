import { useCallback, useEffect, useState } from 'react';
import { getPostDetail } from '@apis/post';
import { IPost } from '@hooks/posts/usePosts';

const usePostDetail = (id: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IPost>();

  const fetchPostDetail = useCallback(async () => {
    setLoading(true);
    const resp = await getPostDetail(id);
    if (resp.data.data) {
      setData(resp.data.data);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPostDetail();
  }, [fetchPostDetail]);

  return { data, loading };
};

export default usePostDetail;
