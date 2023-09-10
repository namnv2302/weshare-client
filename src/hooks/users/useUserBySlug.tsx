import { useCallback, useEffect, useState } from 'react';
import { getUserBySlug } from '@apis/user';
import { AuthorizationData } from '@slices/authorizationSlice';

const useUserBySlug = (slug: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AuthorizationData>();

  const fetchUserBySlug = useCallback(async () => {
    setLoading(true);
    const resp = await getUserBySlug(slug);
    if (resp.data.data) {
      setData(resp.data.data);
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchUserBySlug();
  }, [fetchUserBySlug]);

  return { data, loading };
};

export default useUserBySlug;
