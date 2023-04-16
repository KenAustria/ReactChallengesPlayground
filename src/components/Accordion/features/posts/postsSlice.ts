import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Post, PostsState } from '../../types';
import axios from 'axios';

const initialState: PostsState = {
  data: [],
  isLoading: false,
  error: null,
};

/*
createAsyncThunk takes 2 arguments
1-typePrefix, which a unique identifier for the action: {slice name}/{thunk name}
2-async function
*/
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get<Post[]>(
    'https://jsonplaceholder.typicode.com/posts'
  );
  return response.data.slice(0, 3);
});

// use `extraReducers` and `builder` handle the corresponding pending, fulfilled, and rejected actions in a more concise way.
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Error fetching posts.';
    });
  },
});

export default postsSlice.reducer;
