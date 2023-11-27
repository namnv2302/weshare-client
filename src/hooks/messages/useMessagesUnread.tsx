import { useCallback, useEffect, useState } from 'react';
import { getMessagesUnread } from '@apis/message';
import { IMessage } from '@hooks/messages/useMessages';

const useMessagesUnread = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IMessage[]>();

  const _get = useCallback(async () => {
    setLoading(true);
    const resp = await getMessagesUnread();
    if (resp.data.data) {
      setData(resp.data.data);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    _get();
  }, [_get]);

  return { data, loading, setData };
};

export default useMessagesUnread;
