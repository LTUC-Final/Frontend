// src/pages/PaymentsPage.jsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPaymentsByUser, getPaymentsSummary } from "./services/paymentService";

export default function PaymentsPage() {
  const { user, token } = useSelector((state) => state.UserInfo); 
  const userId = user?.user_id;

  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId || !token) return;
    fetchPayments();
    fetchSummary();
  }, [userId, token]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const { data } = await getPaymentsByUser(userId, token);
      setPayments(data);
    } catch (err) {
      console.error("Error fetching payments:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const { data } = await getPaymentsSummary(userId, token);
      setSummary(data);
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  };

  // 🎨 ألوان حالات الدفع
  const statusColors = {
    paid: "text-green-600 font-bold",
    pending: "text-yellow-600 font-semibold",
    failed: "text-red-600 font-semibold",
    unapproved: "text-gray-500",
    refunded: "text-blue-600",
    ready_to_pay: "text-indigo-600 font-bold",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">سجل المدفوعات</h1>

      {/* 🔹 ملخص الدفعات */}
      <div className="bg-yellow-500 shadow rounded p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">ملخص الدفعات</h2>
        <p>المجموع المدفوع: {summary.total_paid || 0} $</p>
        <p>بانتظار الدفع: {summary.total_pending || 0} $</p>
        <p>فشل الدفع: {summary.total_failed || 0} $</p>
        <p>عدد الدفعات: {summary.total_payments || 0}</p>
      </div>

      {/* 🔹 جدول الدفعات */}
      {loading ? (
        <p>جاري التحميل...</p>
      ) : payments.length === 0 ? (
        <p className="text-gray-500">لا يوجد دفعات بعد</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border text-sm">
            <thead>
              <tr className="bg-emerald-500 text-left">
                <th className="border p-2">#</th>
                <th className="border p-2">المبلغ</th>
                <th className="border p-2">الحالة</th>
                <th className="border p-2">المنتج</th>
                <th className="border p-2">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, i) => {
                const productName = p.product_name || "—";
                const amount = p.amount
                  ? parseFloat(p.amount).toFixed(2)
                  : "0.00";
                const statusClass = statusColors[p.status] || "";

                return (
                  <tr key={p.payment_id} className="hover:bg-amber-100">
                    <td className="border p-2">{i + 1}</td>
                    <td className="border p-2">{amount} $</td>
                    <td className={`border p-2 ${statusClass}`}>{p.status}</td>
                    <td className="border p-2">{productName}</td>
                    <td className="border p-2">
                      {p.transaction_date
                        ? new Date(p.transaction_date).toLocaleString()
                        : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}