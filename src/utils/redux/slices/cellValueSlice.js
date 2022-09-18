import { createSlice } from '@reduxjs/toolkit';

const tableValuesSlice = createSlice({
  name: 'cellValue',
  initialState: '',
  reducers: {
    updateValues(state, action) {
      state.value = action.payload.value;
    },
  },
});
export const { updateValues } = tableValuesSlice.actions;
export default tableValuesSlice.reducer;
