import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  email: "",
  // token: "",
  role: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      // state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
