import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IPost } from '@hooks/posts/usePosts';
import { getPostList } from '@apis/post';

export const fetchPostList = createAsyncThunk('post/fetchList', async () => {
  const resp = await getPostList();
  return resp.data.data;
});

type IPostState = {
  posts: IPost[];
  loading: boolean;
};

const initialState: IPostState = {
  posts: [],
  loading: false,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    createPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPostList.fulfilled, (state, action) => {
      // Add user to the state array
      state.loading = true;
      state.posts = action.payload;
      state.loading = false;
    });
  },
});

export const { createPost } = postSlice.actions;
export default postSlice.reducer;
