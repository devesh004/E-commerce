import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    notification: 0,
    isFetching: false,
    error: false,
    orders: [],
  },
  reducers: {
    getOrderStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    getOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.orders = action.payload;
    },
    getOrderFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteOrderStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.orders.splice(
        state.orders.findIndex((order) => order._id === action.payload),
        1
      );
    },
    deleteOrderFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    updateOrderStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    updateOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.orders[
        state.orders.findIndex((order) => order._id === action.payload.id)
      ] = action.payload.updatedOrder;
    },
    updateOrderFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    newNotification: (state, actio) => {
      state.notification += 1;
    },
    emptyNotification: (state, action) => {
      state.notification = 0;
    },
    emptyOrders: (state, action) => {
      state.orders = [];
    },
  },
});

export const {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure,
  newNotification,
  emptyNotification,
  emptyOrders,
} = orderSlice.actions;
export default orderSlice.reducer;
