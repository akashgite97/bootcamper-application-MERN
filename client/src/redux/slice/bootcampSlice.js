import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bootcampsList:[],
  isLoading: false,
  errorMessage: "",
};

const bootcampSlice = createSlice({
  name: "bootcampSlice",
  initialState: initialState,
  reducers: {
    getBootcamps: (state) => {
      state.isLoading = true;
    },
    getBootcampSuccess: (state, action) => {
      state.isLoading = false;
      state.errorMessage = "";
      state.bootcampsList = action.payload;
    },
    getBootcampsRejected: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
}
});

export const {
 getBootcamps,getBootcampSuccess,getBootcampsRejected
} = bootcampSlice.actions;

export default bootcampSlice.reducer;
