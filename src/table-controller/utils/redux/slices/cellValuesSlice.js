import { createSlice } from '@reduxjs/toolkit';

const cellValuesDataSlice = createSlice({
  name: 'cellData',
  initialState: {
    value: {
      numbers: {},
      formulas: {},
    },
  },
  reducers: {
    setNumbers: (state, action) => {
      state.value.numbers = action.payload.value;
    },
    setFormulas: (state, action) => {
      state.value.formulas = action.payload.value;
    },
    updateValue: (state, { payload }) => {
      state.value[payload.value.type][payload.value.Id] = payload.value.data;
    },
  },
});

export const { setNumbers, setFormulas, updateValue } =
  cellValuesDataSlice.actions;
export default cellValuesDataSlice.reducer;
