// src/pages/SuccessPage.jsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  addPayment,
  updatePaymentStatus,
  getStripeSession,
} from "../services/paymentService";
import { useSelector } from "react-redux";

export default function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { token, user } = useSelector((state) => state.UserInfo);

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const sessionId = searchParams.get("session_id");
        if (!sessionId) {
          console.warn("⚠️ No session_id found in URL");
          return;
        }

        console.log("🔍 SessionId from URL:", sessionId);

        // 1️⃣ جيب بيانات الجلسة من Stripe
        const { data: session } = await getStripeSession(sessionId, token);
        console.log("✅ Full Stripe Session:", session);

        const cartId = session.metadata?.cart_id;
        const transactionId = session.id;

        console.log("🛒 CartId from metadata:", cartId);
        console.log("💳 TransactionId (Stripe session.id):", transactionId);

        if (!cartId) {
          console.error("❌ No cart_id found in session.metadata");
          return;
        }

        // 2️⃣ أضف الدفع في قاعدة البيانات
        const { data: paymentResp } = await addPayment(
          {
            cart_id: cartId,
            method: "card",
            transaction_id: transactionId,
          },
          token
        );

        console.log("✅ Payment Insert Response:", paymentResp);

        // إذا السيرفر رجّع خطأ "موجود مسبقًا"
        if (paymentResp?.error) {
          console.warn("⚠️ Payment already exists, skipping insert:", paymentResp);
        }

        // 3️⃣ حدّث الحالة لـ "paid"
        const paymentId = paymentResp?.payment?.payment_id;
        if (paymentId) {
          const { data: updated } = await updatePaymentStatus(paymentId, "paid", token);
          console.log("🎉 Payment updated to PAID:", updated);
        } else {
          console.warn("⚠️ No payment_id returned, can't update status");
        }

      } catch (err) {
        console.error("❌ Error confirming payment:", err.response?.data || err.message);
      }
    };

    confirmPayment();

    // 4️⃣ تأخير الانتقال لـ PaymentsPage
    const timer = setTimeout(() => {
      console.log("➡️ Redirecting to /payments...");
      navigate("/payments");
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigate, searchParams, token, user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="p-10 bg-white shadow-md rounded text-center">
        <h1 className="text-2xl font-bold text-green-600">
          ✅ Payment Successful
        </h1>
        <p className="mt-4">شكراً! تم إتمام عملية الدفع بنجاح.</p>
        <p className="mt-2 text-gray-600">
          سيتم توجيهك إلى سجل الدفعات خلال لحظات...
        </p>
        <p className="mt-2 text-gray-400 text-sm">(تفاصيل الدفع تطبع في Console)</p>
      </div>
    </div>
  );
}