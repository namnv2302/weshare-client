import apiInstance from '@apis/index';

enum MessagePath {
  DEFAULT = '/messages/:chatId',
}

export const getMessages = async (chatId: string) => {
  return await apiInstance.get(MessagePath.DEFAULT.replace(':chatId', chatId));
};
