import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllPeople } from './../../utils/swapi';

const initialState = {
  entities: [],
  status: 'idle',
  error: null,
  // pages: 1, // to be used for infinite scroll
};

export const fetchAllPeople = createAsyncThunk(
  'people/fetachAllPeople',
  async () => {
    const res = await getAllPeople();
    return res;
  }
);

export const fetchPepole = createAsyncThunk('');

const peopleSlice = createSlice({
  name: 'poeple',
  initialState,
  reducers: {},
  otherReducers: {
    [fetchAllPeople.pending]: (state, action) => {
      state.status = 'loading';
    },

    [fetchAllPeople.fufilled]: (state, action) => {
      state.status = 'succeeded';
      state.entities = state.entities.concat(action.payload);
    },

    [fetchAllPeople.rejected]: (state, action) => {
      state.status = 'failed';
      action.payload = action;
    },
  },
});

export const selectAllPeople = (state) => state.people.entities;

export default peopleSlice.reducer;
