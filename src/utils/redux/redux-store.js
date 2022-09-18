import { configureStore } from '@reduxjs/toolkit';

import cellValueSlice from './slices/cellValueSlice';

const store = configureStore({
  reducer: {
    tableValues: cellValueSlice,
  },
});

export default store;
