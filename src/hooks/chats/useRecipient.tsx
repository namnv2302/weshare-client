import { useCallback, useEffect, useMemo, useState } from 'react';
import { getUserById } from '@apis/user';
import { AuthorizationData } from '@slices/authorizationSlice';
import { IChat } from '@hooks/chats/useUserChats';

const useRecipient = (chat: IChat, id: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AuthorizationData>();
  const userId = useMemo(() => {
    if (chat.firstId === id) return chat.secondId;
    return chat.firstId;
  }, [chat, id]);

  const getUser = useCallback(async () => {
    setLoading(true);
    if (userId) {
      const resp = await getUserById(userId);
      if (resp.data.data) {
        setData(resp.data.data);
        setLoading(false);
      }
    }
  }, [userId]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return { data, loading };
};

export default useRecipient;
