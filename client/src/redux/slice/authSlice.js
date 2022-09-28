import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: "",
  isLoading: false,
  error: "",
};

export const login = createAsyncThunk("authSlice/login", async (userDetails) => {
    return axios.post('http://localhost:5000/api/v1/auth/login', {email:userDetails.email,password:userDetails.password})
        .then(user=>console.log(user))
});

export const register = createAsyncThunk("authSlice/register", async (userDetails) => {
    return axios.post('http://localhost:5000/api/v1/auth/register', userDetails)
        .then(user=>console.log(user))
});

export const resetPassword = createAsyncThunk("authSlice/resetPassword", async (email) => {
    return axios.post('http://localhost:5000/api/v1/auth/forgotPassword', {email:email})
        .then(user=>console.log(user))
});


const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
      state.user = "";
    });
    builder.addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      });
    builder.addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.user = action.payload;
      });
    builder.addCase(register.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.payload;
        state.user = "";
      });
      builder.addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
      });
    builder.addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.payload;
      });  
  },
});

export default authSlice.reducer

