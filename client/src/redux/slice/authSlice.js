import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: "",
  isLoading: false,
  errorMessage: "",
  successMessage: "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    loginUser: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload;
    },
    loginRejected: (state) => {
      state.isLoading = false;
      state.error = "";
    },
    registerUser: (state) => {
      state.isLoading = true;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload;
    },
    registerRejected: (state) => {
      state.isLoading = false;
      state.error = "";
    },
    resetPassword: (state) => {
      state.isLoading = true;
    },
    resetPasswordSuccess: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.successMessage = action.payload;
    },
    resetPasswordRejected: (state) => {
      state.isLoading = false;
      state.error = "";
    },
  },
});

export const {
  loginSuccess,
  loginUser,
  loginRejected,
  registerUser,
  registerSuccess,
  registerRejected,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordRejected
} = authSlice.actions;

export default authSlice.reducer;
