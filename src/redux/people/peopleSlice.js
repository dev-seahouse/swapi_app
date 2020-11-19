import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getAllPeople} from '../../utils/swapi';

const initialState = {
  entities: [],
  status: 'idle',
  error: null,
  // pages: 1, // to be used for infinite scroll
};

export const fetchAllPeople = createAsyncThunk(
  'people/fetchAllPeople',
  async () => {
    return await getAllPeople();
  }
);

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllPeople.pending]: (state, action) => {
      state.status = 'loading';
    },

    [fetchAllPeople.fulfilled]: (state, action) => {
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
