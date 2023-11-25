import { useEffect, useState } from 'react';
import { getFriendList } from '@apis/user';
import { AuthorizationData } from '@slices/authorizationSlice';

const useFriendList = (id: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AuthorizationData[]>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const resp = await getFriendList(id);
      if (resp.data.data) {
        setData(resp.data.data.friends);
      }
      setLoading(false);
    })();
  }, [id]);

  return { data, loading };
};

export default useFriendList;
