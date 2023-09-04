import { createSlice } from '@reduxjs/toolkit';

interface AuthorizationData {
  id: string;
  name: string;
  email: string;
  age: number;
  address: string;
  gender: string;
  avatar: string;
  role: string;
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
