import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationData } from '@slices/authorizationSlice';

export enum StoriesOption {
  TEXT = 'text',
  IMAGE = 'image',
}

export interface IStory {
  id?: string;
  type?: StoriesOption;
  text?: string;
  bgColor?: string;
  storyUrl?: string;
  owner?: AuthorizationData;
}

type StoriesState = {
  currentStoriesOption: null | StoriesOption;
  currentBgColor: string;
  currentText: string;
  previewStory: any;
};

const initialState: StoriesState = {
  currentStoriesOption: null,
  currentBgColor: '#1b79e5',
  currentText: '',
  previewStory: null,
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
    setPreviewStory: (state, action) => {
      state.previewStory = action.payload;
    },
  },
});

export const { setStoriesOption, setBgColor, changeText, setPreviewStory } = storiesSlice.actions;
export default storiesSlice.reducer;
