import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from '../redux/people/peopleSlice';

export default configureStore({
  reducer: {
    people: peopleReducer,
  },
});
