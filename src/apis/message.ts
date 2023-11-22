import apiInstance from '@apis/index';
import { IMessage } from '@hooks/messages/useMessages';

enum MessagePath {
  DEFAULT = '/messages/:chatId',
  CREATE = '/messages',
}

export const getMessages = async (chatId: string) => {
  return await apiInstance.get(MessagePath.DEFAULT.replace(':chatId', chatId));
};

export const createMessage = async (payload: IMessage) => {
  return await apiInstance.post(MessagePath.CREATE, { ...payload });
};
