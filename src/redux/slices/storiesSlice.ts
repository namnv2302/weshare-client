import { createSlice } from '@reduxjs/toolkit';

export enum StoriesOption {
  TEXT = 'text',
  IMAGE = 'image',
}

type StoriesState = {
  currentStoriesOption: null | StoriesOption;
  currentBgColor: string;
  currentText: string;
};

const initialState: StoriesState = {
  currentStoriesOption: null,
  currentBgColor: '#1b79e5',
  currentText: '',
};

export const storiesSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setStoriesOption: (state, action) => {
      state.currentStoriesOption = action.payload;
    },
    setBgColor: (state, action) => {
      state.currentBgColor = action.payload;
    },
    changeText: (state, action) => {
      state.currentText = action.payload;
    },
  },
});

export const { setStoriesOption, setBgColor, changeText } = storiesSlice.actions;
export default storiesSlice.reducer;
