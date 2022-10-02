import { configureStore } from '@reduxjs/toolkit';
import cellValuesSlice from './slices/cellValuesSlice';
import referencesSlice from './slices/referencesSlice';
import authSlice from './slices/authSlice';

const globalReducer = configureStore({
  reducer: {
    cellData: cellValuesSlice,
    references: referencesSlice,
    auth: authSlice,
  },
});

export default globalReducer;
