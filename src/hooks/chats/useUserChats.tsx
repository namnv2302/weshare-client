import { useCallback, useEffect, useState } from 'react';
import { getUserChats } from '@apis/chat';

export interface IChat {
  id?: string;
  firstId?: string;
  secondId?: string;
  createdAt?: Date;
}

const useUserChats = (id: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IChat[]>();

  const getListUserChats = useCallback(async () => {
    setLoading(true);
    const resp = await getUserChats(id);
    if (resp.data.data) {
      setData(resp.data.data);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getListUserChats();
  }, [getListUserChats]);

  return { data, loading };
};

export default useUserChats;
