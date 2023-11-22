import { createSlice } from '@reduxjs/toolkit';

type SettingsState = {
  isOpenMessenger: boolean;
  isOpenChatBox: boolean;
};

const initialState: SettingsState = {
  isOpenMessenger: false,
  isOpenChatBox: false,
};

export const settingsSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    openMessenger: (state, action) => {
      state.isOpenMessenger = action.payload;
    },
    openChatBox: (state, action) => {
      state.isOpenChatBox = action.payload;
    },
  },
});

export const { openMessenger, openChatBox } = settingsSlice.actions;
export default settingsSlice.reducer;
