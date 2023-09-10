import { IPost } from '@hooks/posts/usePosts';
import { createSlice } from '@reduxjs/toolkit';

export interface AuthorizationData {
  id: string;
  name: string;
  email: string;
  slug: string;
  age: number;
  address: string;
  gender: string;
  avatar: string;
  role: string;
  posts: IPost[];
}

type AuthorizationState = AuthorizationData | null;

const initialState = null as AuthorizationState;

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    login: (state, action) => (state = action.payload),
    logout: () => null,
  },
});

export const { login, logout } = authorizationSlice.actions;
export default authorizationSlice.reducer;
