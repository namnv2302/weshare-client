import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import authorizationReducer from '@slices/authorizationSlice';
import postReducer from '@slices/postSlice';
import storiesReducer from '@slices/storiesSlice';

export const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    post: postReducer,
    stories: storiesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
