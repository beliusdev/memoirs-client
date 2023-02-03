import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  memories: [],
  message: '',
  searchTerm: '',
};

export const reducer = createSlice({
  name: 'init',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setMessage: (state, action) => {
      state.message = action.payload;
    },

    setMemories: (state, action) => {
      const sortedMemories = [...action.payload].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      state.memories = sortedMemories;
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setUser, setMessage, setMemories, setSearchTerm } =
  reducer.actions;
export default reducer.reducer;
