import { createSlice } from "@reduxjs/toolkit";

const inittialState = {
  firstName:"",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "user",
};

const formSlice = createSlice({
  name: "formSlice",
  initialState: inittialState,
  reducers: {
    resetFormState:(state)=>{
        return state
    },
    updateFormState: {
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
  },
});

export default formSlice.reducer
export const {updateFormState, resetFormState} = formSlice.actions