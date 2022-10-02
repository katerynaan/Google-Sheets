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
    setCellValue: (state, { payload }) => {
      const cell_data = {
        numbers: { ...state.value.numbers },
        formulas: { ...state.value.formulas },
      };
      const { cellId, data } = payload.value;
      if (data[0] === '=') {
        cell_data.formulas[cellId] = data;
        delete cell_data['numbers'][cellId];
      } else {
        if (data) {
          cell_data.numbers[cellId] = data;
        } else {
          delete cell_data.numbers[cellId];
        }
        delete cell_data.formulas[cellId];
      }
      state.value = cell_data;
    },
    setValues: (state, { payload }) => {
      state.value = payload.value;
    },
    updateValue: (state, { payload }) => {
      state.value[payload.value.type][payload.value.Id] = payload.value.data;
    },
  },
});

export const { setValues, setCellValue, updateValue } =
  cellValuesDataSlice.actions;
export default cellValuesDataSlice.reducer;
