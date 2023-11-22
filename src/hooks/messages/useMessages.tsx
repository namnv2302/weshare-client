import { useCallback, useEffect, useState } from 'react';
import { getMessages } from '@apis/message';

export interface IMessage {
  id?: string;
  chatId?: string;
  senderId?: string;
  text?: string;
  createdAt?: string;
}

const useMessages = (chatId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IMessage[]>();

  const getMessagesList = useCallback(async () => {
    setLoading(true);
    const resp = await getMessages(chatId);
    if (resp.data.data) {
      setData(resp.data.data);
      setLoading(false);
    }
  }, [chatId]);

  useEffect(() => {
    getMessagesList();
  }, [getMessagesList]);

  return { data, loading };
};

export default useMessages;
