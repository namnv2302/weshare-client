import { useCallback, useEffect, useState } from 'react';
import { getFollowedList } from '@apis/user';
import { AuthorizationData } from '@slices/authorizationSlice';

const useFollowedList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AuthorizationData[]>();

  const fetchFollowedList = useCallback(async () => {
    setLoading(true);
    const resp = await getFollowedList();
    if (resp.data.data) {
      setData(resp.data.data.followed);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFollowedList();
  }, [fetchFollowedList]);

  return { data, loading };
};

export default useFollowedList;
