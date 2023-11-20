import apiInstance from '@apis/index';

enum ChatPath {
  USER_CHATS = '/chats/:id/users',
}

export const getUserChats = async (id: string) => {
  return await apiInstance.get(ChatPath.USER_CHATS.replace(':id', id));
};
