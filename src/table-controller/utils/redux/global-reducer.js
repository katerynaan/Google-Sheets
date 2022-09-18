import { configureStore } from '@reduxjs/toolkit';
import cellValuesSlice from './slices/cellValuesSlice';
import referencesSlice from './slices/referencesSlice';

const globalReducer = configureStore({
  reducer: {
    cellData: cellValuesSlice,
    references: referencesSlice,
  },
});

export default globalReducer;
