
// src/pages/CancelPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CancelPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/cart"); //  يرجع المستخدم للسلة بعد 3 ثواني
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="p-10 bg-white shadow-md rounded text-center">
        <h1 className="text-2xl font-bold text-red-600">❌ Payment Cancelled</h1>
        <p className="mt-4">تم إلغاء عملية الدفع.</p>
        <p className="mt-2 text-gray-600">سيتم إعادتك إلى سلة المشتريات...</p>
      </div>
    </div>
  );
}