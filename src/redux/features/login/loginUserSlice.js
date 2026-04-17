import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const savedState = localStorage.getItem("auth");
    return savedState ? JSON.parse(savedState) : { user: null, islogin: false };
  } catch (err) {
    return { user: null, islogin: false };
  }
};

const initialState = loadState();

export const loginUserSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = {
        ...action.payload,
        loginTime: new Date().toISOString(),
      };
      state.islogin = true;

      localStorage.setItem("auth", JSON.stringify(state));
    },
    logoutUser: (state) => {
      state.user = null;
      state.islogin = false;
      localStorage.removeItem("auth");
    },
  },
});

export const { loginUser, logoutUser } = loginUserSlice.actions;
export default loginUserSlice.reducer;
