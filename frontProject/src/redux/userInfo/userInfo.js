import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, token: null };

const UserInfoSlice = createSlice({
  name: "UserInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUserInfo, clearUser } = UserInfoSlice.actions;

export default UserInfoSlice.reducer;
