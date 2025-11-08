// src/pages/SuccessPage.jsx
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { decrementCartItem } from "../redux/userInfo/userInfo";

export default function SuccessPage() {
  const calledRef = useRef(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { token, user } = useSelector((state) => state.UserInfo);
  const port = import.meta.env.VITE_PORT; // لو محدد في env
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const confirmPayment = async () => {
  //     try {
  //       const sessionId = searchParams.get("session_id");
  //       if (!sessionId) {
  //         console.warn("⚠️ No session_id found in URL");
  //         return;
  //       }

  //       console.log("🔍 SessionId from URL:", sessionId);

  //       // 1️⃣ جيب بيانات الجلسة من Stripe
  //       const { data: session } = await getStripeSession(sessionId, token);
  //       console.log("✅ Full Stripe Session:", session);

  //       const cartId = session.metadata?.cart_id;
  //       const transactionId = session.id;

  //       console.log("🛒 CartId from metadata:", cartId);
  //       console.log("💳 TransactionId (Stripe session.id):", transactionId);

  //       if (!cartId) {
  //         console.error("❌ No cart_id found in session.metadata");
  //         return;
  //       }

  //       // 2️⃣ أضف الدفع في قاعدة البيانات
  //       const { data: paymentResp } = await addPayment(
  //         {
  //           cart_id: cartId,
  //           method: "card",
  //           transaction_id: transactionId,
  //         },
  //         token
  //       );

  //       console.log("✅ Payment Insert Response:", paymentResp);

  //       // إذا السيرفر رجّع خطأ "موجود مسبقًا"
  //       if (paymentResp?.error) {
  //         console.warn("⚠️ Payment already exists, skipping insert:", paymentResp);
  //       }

  //       // 3️⃣ حدّث الحالة لـ "paid"
  //       const paymentId = paymentResp?.payment?.payment_id;
  //       if (paymentId) {
  //         const { data: updated } = await updatePaymentStatus(paymentId, "paid", token);
  //         console.log("🎉 Payment updated to PAID:", updated);
  //       } else {
  //         console.warn("⚠️ No payment_id returned, can't update status");
  //       }

  //     } catch (err) {
  //       console.error("❌ Error confirming payment:", err.response?.data || err.message);
  //     }
  //   };

  //   confirmPayment();

  //   // 4️⃣ تأخير الانتقال لـ PaymentsPage
  //   const timer = setTimeout(() => {
  //     console.log("➡️ Redirecting to /payments...");
  //     navigate("/payments");
  //   }, 6000);

  //   return () => clearTimeout(timer);
  // }, [navigate, searchParams, token, user]);

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const sessionId = searchParams.get("session_id");
        if (!sessionId) return console.error("No session_id found in URL");

        const { data } = await axios.post(
          `https://backend-a2qq.onrender.com/save-payment`,
          { session_id: sessionId , 
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.replace(/^"|"$/g, "")}`,
              },
            
 }
        );

        console.log(" Payment saved successfully:", data);
        const ress = await axios.post(
          `https://backend-a2qq.onrender.com/moveApprovedCartToOrders/${user.user_id}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.replace(/^"|"$/g, "")}`,
              },
            }

        );
        // const res = await axios.get(
        //   `http://localhost:${port}/api/carts/products/${user.user_id}`
        // );

        console.log(ress.data.length);
        dispatch(decrementCartItem({ number: ress.data.length }));
        console.log("ress.data.length");
        console.log(ress.data.length);
        console.log("ess.data.length");
        setTimeout(() => {
          navigate("/payments");
        }, 3000);
      } catch (error) {
        console.error("Payment confirmation failed:", error);
      }
    };

    confirmPayment();
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-">
      <div className="p-10 bg-white shadow-2xl rounded-lg text-center max-w-md mx-4 border-t-4 border-[#F5C45E]">
        <div className="w-16 h-16 bg-[#F5C45E] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-[#102E50]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-#FFF6E9 mb-2">
          Payment Successful
        </h1>

        <p className="text-lg text-[#E78B48] font-semibold mb-4">
          Thank you! Your payment has been completed successfully.
        </p>

        <p className="text-gray-600 mb-6">
          You will be redirected to your payment history in a few moments...
        </p>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-400">
            (Payment details are printed in the Console)
          </p>
        </div>
      </div>
    </div>
  );
}
// // src/pages/SuccessPage.jsx

// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { decrementCartItem } from "../redux/userInfo/userInfo";

// export default function SuccessPage() {
//   const calledRef = useRef(false);

//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const { token, user } = useSelector((state) => state.UserInfo);
//   const port = import.meta.env.VITE_PORT; 
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const confirmPayment = async () => {
//       try {
//         const sessionId = searchParams.get("session_id");
//         if (!sessionId) return console.error("No session_id found in URL");

//         const { data } = await axios.post(
//           `http://localhost:${port}/save-payment`,
//           { session_id: sessionId }
//         );

//         console.log(" Payment saved successfully:", data);
//         const ress = await axios.post(
//           `http://localhost:${port}/moveApprovedCartToOrders/${user.user_id}`
//         );
//         // const res = await axios.get(
//         //   `http://localhost:${port}/api/carts/products/${user.user_id}`
//         // );

//         console.log(ress.data.length);
//         dispatch(decrementCartItem({ number: ress.data.length }));
//         console.log("ress.data.length");
//         console.log(ress.data.length);
//         console.log("ess.data.length");
//         setTimeout(() => {
//           navigate("/payments");
//         }, 3000);
//       } catch (error) {
//         console.error("Payment confirmation failed:", error);
//       }
//     };

//     confirmPayment();
//   }, []);
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-">
//       <div className="p-10 bg-white shadow-2xl rounded-lg text-center max-w-md mx-4 border-t-4 border-[#F5C45E]">
//         <div className="w-16 h-16 bg-[#F5C45E] rounded-full flex items-center justify-center mx-auto mb-4">
//           <svg
//             className="w-8 h-8 text-[#102E50]"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={3}
//               d="M5 13l4 4L19 7"
//             />
//           </svg>
//         </div>

//         <h1 className="text-3xl font-bold text-#FFF6E9 mb-2">
//           Payment Successful
//         </h1>

//         <p className="text-lg text-[#E78B48] font-semibold mb-4">
//           Thank you! Your payment has been completed successfully.
//         </p>

//         <p className="text-gray-600 mb-6">
//           You will be redirected to your payment history in a few moments...
//         </p>

//         <div className="pt-4 border-t border-gray-200">
//           <p className="text-sm text-gray-400">
//             (Payment details are printed in the Console)
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
