import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    token: null,
    error: null,
    isLoading: false,
    registrationStatus: null,
    registrationMessage: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      state.isLoading = false;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload.error;
      state.isLoading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setRegistrationStatus: (state, action) => {
      state.registrationStatus = action.payload.status;
      state.registrationMessage = action.payload.message;
    },
    clearRegistrationStatus: (state) => {
      state.registrationStatus = null;
      state.registrationMessage = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});
export const {
  loginSuccess,
  loginFailure,
  logout,
  setLoading,
  setRegistrationStatus,
  clearRegistrationStatus,
  clearAuthError,
} = authSlice.actions;
export default authSlice.reducer;
