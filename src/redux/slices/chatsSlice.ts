import { IChat } from '@hooks/chats/useUserChats';
import { createSlice } from '@reduxjs/toolkit';

type ChatsState = {
  currentChat: IChat | null;
  onlineUsers: { userId: string; socketId: string }[];
  notificationNewMessage: { senderId: string; recipientId: string; text: string; isRead: boolean; createdAt: Date }[];
};

const initialState: ChatsState = {
  currentChat: null,
  onlineUsers: [],
  notificationNewMessage: [],
};

export const chatsSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    updateNotificationNewMessage: (state, action) => {
      state.notificationNewMessage.unshift(action.payload);
    },
  },
});

export const { setCurrentChat, setOnlineUsers, updateNotificationNewMessage } = chatsSlice.actions;
export default chatsSlice.reducer;
