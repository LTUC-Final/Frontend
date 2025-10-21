import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, token: null, cartItem: 0 };

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
    setCartItem: (state, action) => {
      state.cartItem = Number(action.payload.cartItem);
    },
    decrementCartItem: (state, action) => {
      state.cartItem -= action.payload.number;
    },
    incrementCartItem: (state) => {
      state.cartItem += 1;
    },
  },
});

export const {
  setUserInfo,
  clearUser,
  incrementCartItem,
  decrementCartItem,
  setCartItem,
} = UserInfoSlice.actions;

export default UserInfoSlice.reducer;
