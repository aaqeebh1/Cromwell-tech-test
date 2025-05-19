import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser as loginUserApi,
  registerUser as registerUserApi,
  getUser as fetchUserDataApi,
  setAuthToken,
  logoutUser,
} from "../services/api";
import {
  loginSuccess,
  loginFailure,
  logout as logoutAction,
  setLoading,
  setRegistrationStatus,
  clearRegistrationStatus,
} from "./authSlice";

export const performLogin = createAsyncThunk(
  "auth/performLogin",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const data = await loginUserApi(credentials);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      return data;
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(loginFailure({ error: error.message || "Login failed" }));
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const performRegistration = createAsyncThunk(
  "auth/performRegistration",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearRegistrationStatus());
      const data = await registerUserApi(userData);
      dispatch(
        setRegistrationStatus({
          status: "success",
          message: "Registration successful! Logging you in...",
        })
      );
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const loginCredentials = {
        email: userData.email,
        password: userData.password,
      };
      const loginData = await loginUserApi(loginCredentials);
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("user", JSON.stringify(loginData.user));
      dispatch(loginSuccess({ user: loginData.user, token: loginData.token }));
      dispatch(setLoading(false));
      return { registrationData: data, loginData: loginData };
    } catch (error) {
      dispatch(setLoading(false));
      
      let errorMessage = "Registration failed. Please try again.";
      
      if (error.status === 409 || error.response?.status === 409) {
        errorMessage = "A user with this email already exists. Please use a different email.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      dispatch(setRegistrationStatus({
        status: 'failed',
        message: errorMessage,
      }));
      
      return rejectWithValue(errorMessage);
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { dispatch, getState, rejectWithValue }) => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (token && storedUser?.id) {
      setAuthToken(token);
      try {
        const userData = await fetchUserDataApi(token);
        dispatch(loginSuccess({ user: userData, token: token }));
        return userData;
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(logoutAction());
        return rejectWithValue("Failed to load user session.");
      }
    } else {
      dispatch(logoutAction());
      return rejectWithValue("No token found.");
    }
  }
);

export const performLogout = createAsyncThunk(
  "auth/performLogout",
  async (_, { dispatch }) => {
    logoutUser();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logoutAction());
  }
);
