// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// export default function ProviderPaymentsPage() {
//   const { user } = useSelector((state) => state.UserInfo);
//   const [payments, setPayments] = useState([]);
//   const [balance, setBalance] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [re, setRe] = useState(false);
//   const port = import.meta.env.VITE_PORT;
//   const [message, setMessage] = useState();
//   const [status, setstatus] = useState("restricted");

//   const waitForEnable = async () => {
//     for (let i = 0; i < 10; i++) {
//       const res = await axios.get(
//         `http://localhost:${port}/check-account-status/${user.provider.provider_id}`
//       );
//       if (res.data.status === "enabled") {
//         setstatus("enabled");
//         setMessage("✅ Your account is now enabled!");
//         return true;
//       }
//       await new Promise((r) => setTimeout(r, 60 * 1000));
//     }
//     setMessage("⚠️ Still under review. Please try again later.");
//     setstatus("restricted");

//     return false;
//   };

//   useEffect(() => {
//     const fetchProviderData = async () => {
//       try {
//         const { data } = await axios.get(
//           `http://localhost:${port}/provider/${user.provider.provider_id}`
//         );
//         setBalance(data.total_balance);
//         setPayments(data.payments);
//       } catch (error) {
//         console.error("Error fetching provider data:", error);
//       }
//     };
//     fetchProviderData();
//   }, [user.provider.provider_id, port, re]);

//   const handleStripeAction = async () => {
//     try {
//       setLoading(true);
//       const statusRes11 = await axios.get(
//         `http://localhost:${port}/check-account-status/${user.provider.provider_id}`
//       );

//       if (
//         !user.provider.stripe_account_id &&
//         statusRes11.data.status !== "enabled"
//       ) {
//         const res = await axios.post(
//           `http://localhost:${port}/create-stripe-account/${user.provider.provider_id}`
//         );
//         alert("created strip account ");

//         const onboard = await axios.get(
//           `http://localhost:${port}/create-account-link/${user.provider.provider_id}`
//         );
//         alert("created link ");

//         window.location.href = onboard.data.url;
//         alert("awating for 2 minite link ");
//         setstatus("restricted");
//         await new Promise((r) => setTimeout(r, 60 * 1000 * 2));
//         setstatus("enabled");
//       }

//       // await waitForEnable();
//       const statusRes = await axios.get(
//         `http://localhost:${port}/check-account-status/${user.provider.provider_id}`
//       );

//       // if (statusRes.data.status !== "enabled") {
//       //   alert("not enable");
//       //   const onboard = await axios.get(
//       //     `http://localhost:${port}/create-account-link/${user.provider.provider_id}`
//       //   );
//       //   window.location.href = onboard.data.url;
//       //   return;
//       // }

//       if (balance > 0 && statusRes.data.status === "enabled") {
//         await axios.post(
//           `http://localhost:${port}/transfer-to-provider/${user.provider.provider_id}`,
//           { amount: balance }
//         );
//         alert("Funds transferred successfully");
//         setRe(!re);
//       } else {
//         alert("No available balance for transfer.");
//       }
//     } catch (error) {
//       console.error("Stripe process failed:", error);
//       alert("An error occurred. Please check the console for details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] py-10 px-4 sm:px-6 md:px-12">
//       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 border-t-4 border-[#F5C45E]">
//         <h1 className="text-3xl font-extrabold text-[#102E50] mb-6 text-center">
//           💰 Provider Dashboard
//         </h1>

//         {/* <div className="text-center mb-8">
//           <h2 className="text-2xl font-bold text-[#E78B48] mb-4">
//             Current Balance: ${balance}
//           </h2>

//           {status === "restricted" && (
//             <p className="text-red-600 font-semibold">
//               ⚠️ Your account is under review. Please complete your Stripe
//               setup.
//             </p>
//           )}
//           {status === "enabled" && (
//             <button onClick={handleStripeAction} className="...">
//               Withdraw
//             </button>
//           )}

//           {balance > 0 ? (
//             <button
//               onClick={handleStripeAction}
//               disabled={loading}
//               className={`px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300
//     ${
//       loading
//         ? "bg-gray-400 text-white cursor-not-allowed"
//         : "bg-gradient-to-r from-[#102E50] via-[#E78B48] to-[#BE3D2A] hover:from-[#BE3D2A] hover:via-[#F5C45E] hover:to-[#102E50] text-white"
//     }`}
//             >
//               {loading ? "Processing..." : "Withdraw"}
//             </button>
//           ) : (
//             <>
//               <p>{message}</p>
//             </>
//           )}

//         </div> */}

//         <div className="text-center mb-8">
//           <h2 className="text-2xl font-bold text-[#E78B48] mb-4">
//             Current Balance: ${balance}
//           </h2>

//           {status === "restricted" && (
//             <p className="text-red-600 font-semibold mb-4">
//               ⚠️ Your account is under review. Please complete your Stripe
//               setup.
//             </p>
//           )}
//           {status === "enabled" && (
//             <p className="text-green-600 font-semibold mb-4">
//               ✅ Account Enabled and ready for payouts.
//             </p>
//           )}

//           <button
//             onClick={handleStripeAction}
//             disabled={loading}
//             className={`px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300
//               ${
//                 loading
//                   ? "bg-gray-400 text-white cursor-not-allowed"
//                   : "bg-gradient-to-r from-[#102E50] via-[#E78B48] to-[#BE3D2A] hover:from-[#BE3D2A] hover:via-[#F5C45E] hover:to-[#102E50] text-white"
//               }`}
//           >
//             {loading ? "Processing..."  :status === "restricted"?"awating ": "Withdraw"}
//           </button>

//           {message && <p className="mt-4 text-[#102E50]">{message}</p>}
//         </div>
//         {payments.length === 0 ? (
//           <p className="text-center text-[#E78B48] font-semibold">
//             No payments received yet.
//           </p>
//         ) : (
//           <div className="overflow-x-auto mt-6">
//             <table className="min-w-full border-collapse">
//               <thead>
//                 <tr className="bg-[#F5C45E]/20 text-[#102E50] text-sm md:text-base">
//                   <th className="p-3 border-b-2 text-left">Customer Name</th>
//                   <th className="p-3 border-b-2 text-left">Email</th>
//                   <th className="p-3 border-b-2">Customer ID</th>
//                   <th className="p-3 border-b-2">Amount</th>
//                   <th className="p-3 border-b-2">Status</th>
//                   <th className="p-3 border-b-2">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {payments.map((p) => (
//                   <tr key={p.id} className="text-center hover:bg-[#FFF6E9]">
//                     <td className="p-3 text-[#102E50] font-semibold">
//                       {p.firstname} {p.lastname}
//                     </td>
//                     <td className="p-3 text-[#102E50]/90">{p.email}</td>
//                     <td className="p-3">{p.customer_id}</td>
//                     <td className="p-3 text-[#E78B48] font-bold">
//                       ${p.amount}
//                     </td>
//                     <td
//                       className={`p-3 font-semibold ${
//                         p.status === "succeeded"
//                           ? "text-green-600"
//                           : "text-yellow-600"
//                       }`}
//                     >
//                       {p.status}
//                     </td>
//                     <td className="p-3 text-[#102E50]/80">
//                       {new Date(p.payment_date).toLocaleString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ProviderPaymentsPage() {
  const { user } = useSelector((state) => state.UserInfo);
  const [payments, setPayments] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("restricted");
  const [refresh, setRefresh] = useState(false);
  const port = import.meta.env.VITE_PORT;

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const { data } = await axios.get(
          `https://backend-a2qq.onrender.com/provider/${user.provider.provider_id}`
        );
        setBalance(data.total_balance);
        setPayments(data.payments);
      } catch (error) {
        console.error("Error fetching provider data:", error);
      }
    };
    fetchProviderData();
  }, [port, user.provider.provider_id, refresh]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // const handleStripeAction = async () => {
  //   setLoading(true);
  //   setMessage("⏳ Checking your Stripe account status...");

  //   try {
  //     let accountStatus;

  //     // 1️⃣ تحقق من وجود stripe_account_id
  //     accountStatus = await axios.get(
  //       `http://localhost:${port}/check-account-status/${user.provider.provider_id}`
  //     );

  //     // إذا لا يوجد حساب، أنشئ واحد
  //     if (accountStatus.data.error || !user.provider.stripe_account_id) {
  //       setMessage("⚙️ Creating your Stripe account...");
  //       await axios.post(
  //         `http://localhost:${port}/create-stripe-account/${user.provider.provider_id}`
  //       );

  //       setMessage("🔗 Creating onboarding link...");
  //       const onboard = await axios.get(
  //         `http://localhost:${port}/create-account-link/${user.provider.provider_id}`
  //       );

  //       setMessage("➡️ Redirecting to Stripe setup...");
  //       window.location.href = onboard.data.url;

  //       setMessage("⏳ Waiting for Stripe verification (about 2 minutes)...");
  //       await delay(2 * 60 * 1000);
  //       return; // المستخدم سيعود بعد إكمال الإعداد
  //     }

  //     // 2️⃣ تحقق من الحالة الحالية للحساب
  //     const statusRes = await axios.get(
  //       `http://localhost:${port}/check-account-status/${user.provider.provider_id}`
  //     );

  //     if (statusRes.data.status !== "enabled") {
  //       setStatus("restricted");
  //       setMessage(
  //         "⚠️ Your account is not yet enabled. Redirecting to Stripe setup..."
  //       );

  //       // إنشاء لينك إعداد الحساب
  //       const onboard = await axios.get(
  //         `http://localhost:${port}/create-account-link/${user.provider.provider_id}`
  //       );
  //       window.location.href = onboard.data.url;

  //       // انتظار تفعيل الحساب
  //       setMessage("⏳ Waiting for Stripe verification (about 2 minutes)...");
  //       await delay(2 * 60 * 1000);

  //       const checkAgain = await axios.get(
  //         `http://localhost:${port}/check-account-status/${user.provider.provider_id}`
  //       );

  //       if (checkAgain.data.status !== "enabled") {
  //         setMessage("⚠️ Still pending. Please try again later.");
  //         setLoading(false);
  //         return;
  //       }
  //     }

  //     // 3️⃣ إذا الحساب مفعل → تنفيذ التحويل
  //     if (balance > 0) {
  //       setMessage("💸 Transferring funds to your Stripe account...");
  //       await axios.post(
  //         `http://localhost:${port}/transfer-to-provider/${user.provider.provider_id}`,
  //         { amount: balance }
  //       );
  //       setMessage("✅ Funds transferred successfully!");
  //       setRefresh((prev) => !prev);
  //     } else {
  //       setMessage("⚠️ No available balance for transfer.");
  //     }

  //     setStatus("enabled");
  //   } catch (error) {
  //     console.error("Stripe process failed:", error);
  //     setMessage("❌ An error occurred. Please check console for details.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleStripeAction = async () => {
    setLoading(true);
    setMessage(" Checking your Stripe account status...");

    try {
      let accountStatus;

      try {
        accountStatus = await axios.get(
          `http://localhost:${port}/check-account-status/${user.provider.provider_id}`
        );
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setMessage(" Creating your new Stripe account...");
          await axios.post(
            `http://localhost:${port}/create-stripe-account/${user.provider.provider_id}`
          );
          setMessage(" Creating onboarding link...");
          const onboard = await axios.get(
            `http://localhost:${port}/create-account-link/${user.provider.provider_id}`
          );

          setMessage("➡️ Redirecting you to Stripe setup...");
          window.location.href = onboard.data.url;
          setLoading(false);
          return;
        } else {
          throw err; 
        }
      }

      if (accountStatus?.data?.status !== "enabled") {
        setStatus("restricted");
        setMessage(
          " Account not enabled yet. Redirecting to Stripe setup..."
        );

        const onboard = await axios.get(
          `http://localhost:${port}/create-account-link/${user.provider.provider_id}`
        );
        window.location.href = onboard.data.url;

        setMessage(" Waiting for Stripe verification (2 minutes)...");
        await delay(2 * 60 * 1000);

        const checkAgain = await axios.get(
          `http://localhost:${port}/check-account-status/${user.provider.provider_id}`
        );

        if (checkAgain.data.status !== "enabled") {
          setMessage(" Still pending. Please try again later.");
          setLoading(false);
          return;
        }
      }

      if (balance > 0) {
        setMessage(" Transferring funds to your Stripe account...");
        await axios.post(
          `http://localhost:${port}/transfer-to-provider/${user.provider.provider_id}`,
          { amount: balance }
        );
        setMessage(" Funds transferred successfully!");
        setRefresh((prev) => !prev);
      } else {
        setMessage(" No available balance for transfer.");
      }

      setStatus("enabled");
    } catch (error) {
      console.error("Stripe process failed:", error);
      setMessage(" An error occurred. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF6E9] py-10 px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 border-t-4 border-[#F5C45E]">
        <h1 className="text-3xl font-extrabold text-[#102E50] mb-6 text-center">
          💰 Provider Dashboard
        </h1>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#E78B48] mb-4">
            Current Balance: ${balance}
          </h2>

          {status === "restricted" && (
            <p className="text-red-600 font-semibold mb-4">
               Your account is under review.
            </p>
          )}
          {status === "enabled" && (
            <p className="text-green-600 font-semibold mb-4">
               Account Enabled and ready for payouts.
            </p>
          )}

          <button
            onClick={handleStripeAction}
            disabled={loading}
            className={`px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-[#102E50] via-[#E78B48] to-[#BE3D2A] hover:from-[#BE3D2A] hover:via-[#F5C45E] hover:to-[#102E50] text-white"
            }`}
          >
            {loading
              ? "Processing..."
              : status === "restricted"
              ? "Awaiting Activation"
              : "Withdraw"}
          </button>

          {message && (
            <p className="mt-4 text-[#102E50] font-medium animate-pulse">
              {message}
            </p>
          )}
        </div>

        {payments.length === 0 ? (
          <p className="text-center text-[#E78B48] font-semibold">
            No payments received yet.
          </p>
        ) : (
          <div className="overflow-x-auto mt-6">
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