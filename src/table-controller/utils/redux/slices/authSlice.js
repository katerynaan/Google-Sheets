import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    value: {
      loggedIn: false,
      userName: null,
    },
  },
  reducers: {
    login: (state, { payload }) => {
      state.value.loggedIn = true;
      state.value.userName = payload.value;
      localStorage.setItem('username', payload.value);
    },
    logout: (state) => {
      state.value.loggedIn = false;
      state.value.userName = null;
      localStorage.removeItem('username');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
