import apiInstance from '@apis/index';

enum ChatPath {
  DEFAULT = '/chats',
  USER_CHATS = '/chats/:id/users',
}

export const createChat = async (firstId: string, secondId: string) => {
  return await apiInstance.post(ChatPath.DEFAULT, { firstId, secondId });
};

export const getUserChats = async (id: string) => {
  return await apiInstance.get(ChatPath.USER_CHATS.replace(':id', id));
};
