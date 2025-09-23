// src/pages/SuccessPage.jsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { updatePaymentStatus } from "../services/paymentService";
import axios from "axios";

export default function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

 useEffect(() => {
  const confirmPayment = async () => {
    try {
      const sessionId = searchParams.get("session_id");
      if (!sessionId) return;

      // 🔹 جيب بيانات الجلسة من Stripe
      const { data: session } = await axios.get(
        `http://localhost:4000/api/payments/session/${sessionId}`
      );

      const cartId = session.metadata?.cart_id;
      if (cartId) {
        // هنا تستدعي API عندك لتربط الدفع بالـ cart وتعمل update
        await axios.post("http://localhost:4000/api/payments", {
          cart_id: cartId,
          method: "stripe",
        });

        // بعدين تحدّث الحالة
        // (إذا API عندك بيقبل update مباشرة، ممكن تستعمل updatePaymentStatus)
      }
    } catch (err) {
      console.error("Error confirming payment:", err);
    }
  };

  confirmPayment();

  const timer = setTimeout(() => {
    navigate("/payments");
  }, 4000);
  return () => clearTimeout(timer);
}, [navigate, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="p-10 bg-white shadow-md rounded text-center">
        <h1 className="text-2xl font-bold text-green-600">✅ Payment Successful</h1>
        <p className="mt-4">شكراً! تم إتمام عملية الدفع بنجاح.</p>
        <p className="mt-2 text-gray-600">سيتم توجيهك إلى سجل الدفعات...</p>
      </div>
    </div>
  );
}