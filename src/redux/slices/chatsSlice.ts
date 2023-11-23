import { IChat } from '@hooks/chats/useUserChats';
import { createSlice } from '@reduxjs/toolkit';

type ChatsState = {
  currentChat: IChat | null;
  onlineUsers: { userId: string; socketId: string }[];
};

const initialState: ChatsState = {
  currentChat: null,
  onlineUsers: [],
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
  },
});

export const { setCurrentChat, setOnlineUsers } = chatsSlice.actions;
export default chatsSlice.reducer;
