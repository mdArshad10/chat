import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.userInfo = action.payload;
    },
    userSignup: (state) => {
      state.userInfo -= 1;
    },
    userLogout: (state, action) => {
      state.userInfo += action.payload;
    },
  },
});

export const { userLogin, userSignup, userLogout } = userSlice.actions;

export default userSlice.reducer;
