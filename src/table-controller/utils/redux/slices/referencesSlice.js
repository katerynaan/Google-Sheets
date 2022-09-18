import { createSlice } from '@reduxjs/toolkit';

const referencesSlice = createSlice({
  name: 'references',
  initialState: {
    value: {},
  },
  reducers: {
    updateReferenceValue: (state, { payload }) => {
      state.value[payload.value.id] = state.value[payload.value.id]
        ? [...state.value[payload.value.id], payload.value.data]
        : [payload.value.data];
    },
    removeReferenceValue: (state, { payload }) => {
      const newState = state.value;
      delete newState[payload.value];
      state.value = newState;
    },
    refreshReferences: (state, action) => {
      state.value = state.value;
    },
  },
});

export const { updateReferenceValue, removeReferenceValue, refreshReferences } =
  referencesSlice.actions;
export default referencesSlice.reducer;
