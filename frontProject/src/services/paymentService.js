// src/services/paymentService.js
import axios from "axios";

const API_BASE = "http://localhost:4000/api/payments";

// ✅ Stripe checkout
export const createCheckoutSession = (cart_id) =>
  axios.post(`${API_BASE}/create-checkout-session`, { cart_id });

// ✅ إضافة دفع (طرق غير Stripe مثلاً cash)
export const addPayment = (payload) =>
  axios.post(`${API_BASE}`, payload);

// ✅ تحديث حالة الدفع
export const updatePaymentStatus = (paymentId, status, updated_by) =>
  axios.put(`${API_BASE}/${paymentId}`, { status, updated_by });

// ✅ جلب دفعات المستخدم
export const getPaymentsByUser = (userId, status) =>
  axios.get(`${API_BASE}/${userId}`, { params: { status } });

// ✅ ملخص الدفعات
export const getPaymentsSummary = (userId) =>
  axios.get(`${API_BASE}/${userId}/summary`);