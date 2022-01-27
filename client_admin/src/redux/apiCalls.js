import {
  loginFailure,
  loginStart,
  loginSuccess,
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  logout,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "./userRedux";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";

import {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure,
} from "./orderRedux";
import { publicRequest, userRequest } from "../requestMethods";

export const logoutUser = async (dispatch) => {
  try {
    const res = await publicRequest.get("/auth/logout");
    dispatch(logout());
  } catch (err) {
    console.log(err);
  }
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    setTimeout(() => {
      logoutUser();
    }, 259200000);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products/allProducts");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (product, id, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, product);
    const updatedPro = res.data;
    dispatch(updateProductSuccess(id, updatedPro));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post("/products", product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await userRequest.get("/users/allUsers");
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await userRequest.post("/users", user);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailure());
  }
};

export const registerUser = async (user, dispatch) => {
  dispatch(registerUserStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    setTimeout(() => {
      logoutUser();
    }, 259200000);
    dispatch(registerUserSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(registerUserFailure());
  }
};

export const updateUser = async (user, id, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    const Updateduser = res.data;
    dispatch(updateUserSuccess(Updateduser, id));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

export const getOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await userRequest.get("orders/allOrders");
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};

export const deleteOrder = async (dispatch, id) => {
  dispatch(deleteOrderStart());
  try {
    const res = await userRequest.delete(`/orders/${id}`);
    dispatch(deleteOrderSuccess(id));
  } catch (err) {
    dispatch(deleteOrderFailure());
  }
};

export const changeOrderStatus = async (dispatch, id, status) => {
  dispatch(updateOrderStart());
  try {
    const res = await userRequest.put(`/orders/${id}?status=${status}`);
    const updatedOrder = res.data;
    // console.log("Updated Order", updatedOrder);
    dispatch(updateOrderSuccess(updatedOrder, id));
  } catch (err) {
    console.log(err);
    dispatch(updateOrderFailure());
  }
};
