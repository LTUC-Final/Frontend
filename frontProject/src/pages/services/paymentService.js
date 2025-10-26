// src/services/paymentService.js
import axios from "axios";

const port = import.meta.env.VITE_PORT;
const API_BASE = `http://localhost:${port}/api/payments`;

// const authHeaders = (token) => ({
//   headers: { Authorization: `Bearer ${token}` },
// });

//  Get all payments by user
export const getPaymentsByUser = (userId, token) =>
  axios.get(`${API_BASE}/user/${userId}`, 
    // authHeaders(token)
);

//  Get payments summary
export const getPaymentsSummary = (userId, token) =>
  axios.get(`${API_BASE}/summary/${userId}`,
    //  authHeaders(token)
    );

//  Add new payment
export const addPayment = (payload, token) =>
  axios.post(`${API_BASE}`, payload,
    //  authHeaders(token)
    );

//  Update payment status
export const updatePaymentStatus = (paymentId, status, token) =>
  axios.put(`${API_BASE}/${paymentId}`, { status },
    //  authHeaders(token)
    );

//  Create Stripe checkout session
export const createCheckoutSession = (cartIds, token) =>
  
  axios.post(
    `${API_BASE}/create-checkout-session`,
    { cart_ids: cartIds }, // 👈 مصفوفة cart_ids
    // authHeaders(token)
  );
//  Get Stripe session info
export const getStripeSession = (sessionId, token) =>
  axios.get(`${API_BASE}/session/${sessionId}`, 
    // authHeaders(token)
  );