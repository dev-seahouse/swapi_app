import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPeople, getPersonDetails } from "../../utils/swapi";

const findObjById = (arr, id) => arr.find((item) => item.id === id);

const initialState = {
  entities: [],
  status: "idle",
  error: null,
  // pages: 1, // to be used for infinite scroll
};

const setExtraAttribs = (obj, index) => {
  obj.id = index + 1 + "";
  obj.detailsStatus = "idle";
};
//side effects
export const fetchAllPeople = createAsyncThunk(
  "people/fetchAllPeople",
  async () => {
    const allPeople = await getAllPeople();
    allPeople.map(setExtraAttribs);
    return allPeople;
  }
);

export const fetchPersonById = createAsyncThunk(
  "people/fetchPerson",
  async (personId, thunkAPI) => {
    const personObj = thunkAPI
      .getState()
      .people.entities.find((p) => p.id === personId);
    return await getPersonDetails(personObj);
  }
);

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllPeople.pending]: (state, action) => {
      state.status = "loading";
    },

    [fetchAllPeople.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.entities = state.entities.concat(action.payload);
    },

    [fetchAllPeople.rejected]: (state, action) => {
      state.status = "failed";
      action.payload = action;
    },

    [fetchPersonById.pending]: (state, action) => {
      const personId = action.meta.arg;
      let personObj = findObjById(state.entities, personId);
      personObj.detailsStatus = "loading";
    },

    [fetchPersonById.fulfilled]: (state, action) => {
      state.status = "succeeded";
      let personObj = findObjById(state.entities, action.payload.id);
      Object.assign(personObj, action.payload);
      personObj.detailsStatus = "succeeded";
    },

    [fetchPersonById.rejected]: (state, action) => {
      const personId = action.meta.arg;
      let personObj = findObjById(state.entities, personId);
      personObj.detailsStatus = "failed";
      action.payload = action;
    },
  },
});
export const selectAllPeople = (state) => state.people.entities;

export const selectPerson = (state, personId) => {
  if (state.people.status === "succeeded") {
    return findObjById(state.people.entities, personId);
  }
  return null;
};

export const selectPersonDetailsStatus = (state, personId) => {
  if (state.people.status === "succeeded") {
    return findObjById(state.people.entities, personId).detailsStatus;
  }
  return "idle";
};

export default peopleSlice.reducer;
