import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import authorizationReducer from '@slices/authorizationSlice';

export const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;