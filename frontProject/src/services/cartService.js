
// src/services/cartService.js
import axios from "axios";

const port = import.meta.env.VITE_PORT;
const API_BASE = `http://localhost:${port}/api/carts`;

// helper: إعداد الهيدر
const authHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// Get all cart products for a specific user
export const getCartProducts = (userId, token) =>
  axios.get(`${API_BASE}/products`, {
    params: { user_id: userId },
    ...authHeaders(token),
  });

// Get cart summary (total items, total price)
export const getCartSummary = (userId, token) =>
  axios.get(`${API_BASE}/summary`, {
    params: { user_id: userId },
    ...authHeaders(token),
  });

// Increment quantity
export const incrementQuantity = (cart_id, user_id, token) =>
  axios.put(
    `${API_BASE}/increment`,
    { cart_id, user_id },
    authHeaders(token)
  );

// Decrement quantity
export const decrementQuantity = (cart_id, user_id, token) =>
  axios.put(
    `${API_BASE}/decrement`,
    { cart_id, user_id },
    authHeaders(token)
  );

// Remove item from cart
export const removeFromCart = (cart_id, user_id, token) =>
  axios.delete(`${API_BASE}/item`, {
    data: { cart_id, user_id },
    ...authHeaders(token),
  });

// Update custom requirement and move to orders
export const updateCustomReqAndToOrder = (payload, token) =>
  axios.put(
    `${API_BASE}/updateTheCustomReqAndToOrder`,
    payload,
    authHeaders(token)
  );


export const moveApprovedCartToOrders = (user_id, token) =>
  axios.post(
    `${API_BASE}/moveApprovedCartToOrders/${user_id}`,
    {},
    authHeaders(token)
  );

// Change status pay → Unapprove
export const changeStatusPay = (cart_id, user_id, token) =>
  axios.put(
    `${API_BASE}/changeStatusPay`,
    { cart_id, user_id },
    authHeaders(token)
  );

// Change status pay after approve
export const changeStatusPayOfProductAfterApprove = (cart_id, user_id, token) =>
  axios.put(
    `${API_BASE}/changeStatusPayOfProdactAfterApprove`,
    { cart_id, user_id },   //  بدون new_price
    authHeaders(token)
  );

// Change status pay after rejected
export const changeStatusPayOfProductAfterRejected = (cart_id, token) =>
  axios.put(
    `${API_BASE}/changeStatusPayOfProdactAfterRejected/${cart_id}`,
    {},
    authHeaders(token)
  );

// كان deleteCart، صححناها لـ deleteCard
export const deleteCart = (cart_id, token) =>
  axios.delete(`${API_BASE}/deleteCard/${cart_id}`, authHeaders(token));