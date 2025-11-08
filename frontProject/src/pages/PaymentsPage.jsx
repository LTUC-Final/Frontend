// src/pages/PaymentsPage.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const port = import.meta.env.VITE_PORT;
   const CusData = useSelector((state) => state.UserInfo);

  const token = CusData.token;

  const { user } = useSelector((state) => state.UserInfo);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await axios.get(
          `https://backend-a2qq.onrender.com/history/${user.user_id}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.replace(/^"|"$/g, "")}`,
              },
            }

        );
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchPayments();
  }, [port, user.user_id]);

  return (
    <div className="min-h-screen bg-[#FFF6E9] py-10 px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 border-t-4 border-[#F5C45E]">
        <h1 className="text-3xl font-extrabold text-[#102E50] mb-6 text-center">
          💳 Payment History
        </h1>

        {payments.length === 0 ? (
          <p className="text-center text-[#E78B48] font-semibold">
            No payments found yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-[#F5C45E]/20 text-[#102E50] text-sm md:text-base">
                  <th className="p-3 border-b-2">Transaction ID</th>
                  <th className="p-3 border-b-2">Amount</th>
                  <th className="p-3 border-b-2">Status</th>
                  <th className="p-3 border-b-2">Date</th>
                  <th className="p-3 border-b-2">Email</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.stripe_payment_id}
                    className="text-center hover:bg-[#FFF6E9]"
                  >
                    <td className="p-3 font-mono text-xs sm:text-sm text-[#102E50]">
                      {payment.stripe_payment_id}
                    </td>
                    <td className="p-3 font-semibold text-[#E78B48]">
                      ${payment.amount}
                    </td>
                    <td
                      className={`p-3 font-semibold ${
                        payment.status === "succeeded"
                          ? "text-green-600"
                          : payment.status === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {payment.status}
                    </td>
                    <td className="p-3 text-[#102E50]/80">
                      {new Date(payment.payment_date).toLocaleString()}
                    </td>
                    <td className="p-3 text-[#102E50]/70">{payment.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
