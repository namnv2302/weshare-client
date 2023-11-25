import { useEffect, useState } from 'react';
import { getSuggestList } from '@apis/user';
import { AuthorizationData } from '@slices/authorizationSlice';

const useSuggestList = (current?: number, pageSize?: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AuthorizationData[]>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const resp = await getSuggestList(current, pageSize);
      if (resp.data.data) {
        setData(resp.data.data.users);
      }
      setLoading(false);
    })();
  }, [current, pageSize]);

  return { data, loading };
};

export default useSuggestList;
