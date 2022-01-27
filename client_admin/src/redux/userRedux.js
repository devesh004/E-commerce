import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    users: [],
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.users = [];
    },
    getUsersStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    getUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUsersFailure: (state, action) => {
      state.error = true;
      state.isFetching = false;
    },
    addUserStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    addUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.push(action.payload);
    },
    addUserFailure: (state, action) => {
      state.error = true;
      state.isFetching = false;
    },
    registerUserStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    registerUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.users.push(action.payload);
    },
    registerUserFailure: (state, action) => {
      state.error = true;
      state.isFetching = false;
    },
    updateUserStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users[
        state.users.findIndex((user) => user._id === action.payload.id)
      ] = action.payload.Updateduser;
    },
    updateUserFailure: (state, action) => {
      state.error = true;
      state.isFetching = false;
    },
    deleteUserStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.users.splice(
        state.users.findIndex((user) => user._id === action.payload),
        1
      );
    },
    deleteUserFailure: (state, action) => {
      state.error = true;
      state.isFetching = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
