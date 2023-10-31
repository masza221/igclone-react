import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../interfaces/interfaces";


interface IInitialState {
  user: IUser | null;
}


const initialState: IInitialState = {
  user: null,
};

 const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<IUser>) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    loginFailure: (state) => {
      state.user = initialState.user;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = initialState.user;
    },
    userUpdated: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    }
  },
});



export default authSlice.reducer;
export const { loginSuccess, loginFailure, logout, userUpdated } = authSlice.actions;

