
//src/services/cartService.js
import axios from "axios";

const API_BASE = "http://localhost:4000/api/carts"; // عدّل إذا السيرفر على دومين آخر

//  Get all cart products for a specific user
export const getCartProducts = (userId) =>
  axios.get(`${API_BASE}/products`, { params: { user_id: userId } });

//  Get cart summary (total items, total price)
export const getCartSummary = (userId) =>
  axios.get(`${API_BASE}/summary`, { params: { user_id: userId } });

//  Increment quantity
export const incrementQuantity = (cart_id, user_id) =>
  axios.put(`${API_BASE}/increment`, { cart_id, user_id });

//  Decrement quantity
export const decrementQuantity = (cart_id, user_id) =>
  axios.put(`${API_BASE}/decrement`, { cart_id, user_id });

//  Remove item from cart
export const removeFromCart = (cart_id) =>
  axios.delete(`${API_BASE}/item/${cart_id}`);

//  Update custom requirement and move to orders
export const updateCustomReqAndToOrder = (payload) =>
  axios.put(`${API_BASE}/updateTheCustomReqAndToOrder`, payload);

//  Move approved cart items to orders
export const moveApprovedCartToOrders = (user_id) =>
  axios.post(`${API_BASE}/moveApprovedCartToOrders/${user_id}`);

//  Change status pay → Unapprove
export const changeStatusPay = (cart_id, user_id) =>
  axios.put(`${API_BASE}/changeStatusPay`, { cart_id, user_id });

//  Change status pay after approve
export const changeStatusPayOfProductAfterApprove = (cart_id, user_id) =>
  axios.put(`${API_BASE}/changeStatusPayOfProdactAfterApprove`, { cart_id, user_id });

//  Change status pay after rejected
export const changeStatusPayOfProductAfterRejected = (cart_id) =>
  axios.put(`${API_BASE}/changeStatusPayOfProdactAfterRejected/${cart_id}`);

//  Delete entire cart (if موجود  بالباكند)
export const deleteCart = (cart_id) =>
  axios.delete(`${API_BASE}/deleteCart/${cart_id}`);
