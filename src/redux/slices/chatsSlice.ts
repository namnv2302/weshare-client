import { IChat } from '@hooks/chats/useUserChats';
import { createSlice } from '@reduxjs/toolkit';

type ChatsState = {
  currentChat: IChat | null;
};

const initialState: ChatsState = {
  currentChat: null,
};

export const chatsSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },
});

export const { setCurrentChat } = chatsSlice.actions;
export default chatsSlice.reducer;
