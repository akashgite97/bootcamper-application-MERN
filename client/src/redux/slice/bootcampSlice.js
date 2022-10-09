import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bootcampsList:[],
  isLoading: false,
  errorMessage: "",
  milesFrom:'',
  zipCode:'',
  ratingL:'',
  budget:''
};

const bootcampSlice = createSlice({
  name: "bootcampSlice",
  initialState: initialState,
  reducers: {
    updateBootcampState: {
        reducer: (state, action) => {
          return {
            ...state,
            [action.payload.fieldName]: action.payload.fieldValue,
          };
        },
        prepare: (fieldName, fieldValue) => {
          return {
            payload: { fieldName, fieldValue },
          };
        },
    },
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
 getBootcamps,getBootcampSuccess,getBootcampsRejected, updateBootcampState
} = bootcampSlice.actions;

export default bootcampSlice.reducer;
