import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ProviderPaymentsPage() {
  const { user } = useSelector((state) => state.UserInfo);
  const [payments, setPayments] = useState([]);
  const [balance, setBalance] = useState(0);
  const port = import.meta.env.VITE_PORT;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:${port}/provider/${user.provider.provider_id}`
        );
        setBalance(data.total_balance);
        setPayments(data.payments);

        console.log("data.total_balancedata.total_balancedata.total_balance");
        console.log(data.total_balance);
        console.log(data.payments);

        console.log("data.total_balancedata.total_balancedata.total_balance");
      } catch (error) {
        console.error("Error fetching provider payments:", error);
      }
    };
    fetchData();
  }, [user.user_id, port]);

  return (
    <div className="min-h-screen bg-[#FFF6E9] py-10 px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 border-t-4 border-[#F5C45E]">
        <h1 className="text-3xl font-extrabold text-[#102E50] mb-6 text-center">
          💰 Provider Dashboard
        </h1>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#E78B48]">
            Current Balance: ${balance}
          </h2>
        </div>

        {payments.length === 0 ? (
          <p className="text-center text-[#E78B48] font-semibold">
            No payments received yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-[#F5C45E]/20 text-[#102E50] text-sm md:text-base">
                  <th className="p-3 border-b-2 text-left">Customer Name</th>
                  <th className="p-3 border-b-2 text-left">Email</th>
                  <th className="p-3 border-b-2">Customer ID</th>
                  <th className="p-3 border-b-2">Amount</th>
                  <th className="p-3 border-b-2">Status</th>
                  <th className="p-3 border-b-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="text-center hover:bg-[#FFF6E9]">
                    <td className="p-3 text-[#102E50] font-semibold">
                      {p.firstname} {p.lastname}
                    </td>
                    <td className="p-3 text-[#102E50]/90">{p.email}</td>

                    <td className="p-3">{p.customer_id}</td>
                    <td className="p-3 text-[#E78B48] font-bold">
                      ${p.amount}
                    </td>
                    <td
                      className={`p-3 font-semibold ${
                        p.status === "succeeded"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {p.status}
                    </td>
                    <td className="p-3 text-[#102E50]/80">
                      {new Date(p.payment_date).toLocaleString()}
                    </td>
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
