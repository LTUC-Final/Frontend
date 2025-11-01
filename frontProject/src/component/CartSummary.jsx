// src/component/CartSummary.jsx
// src/component/CartSummary.jsx
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { createCheckoutSession } from "../services/paymentService";

const stripePromise = loadStripe(
  "pk_test_51SLmeU7XNof7c0LK21QyvjJxb28OZnQ9uOo3leNgWR3PHE7agxDJforXF2no1WQrRg29jAP4K4iMoodJPTL7ClpT00Gbwg0TCH"
);

export default function CartSummary({ items }) {
  const { token } = useSelector((state) => state.UserInfo);

  //  فلترة العناصر المقبولة فقط
  const approvedItems = items.filter((item) => item.status_pay === "Approve");

  const total = approvedItems.reduce(
    (sum, item) => sum + (parseFloat(item.cart_price) || 0),
    0
  );

  const handleCheckout = async () => {
    if (approvedItems.length === 0) {
      return alert("🚨 لا يوجد منتجات مقبولة للدفع!");
    }

    try {
      const stripe = await stripePromise;
      // 👇 جمع كل cart_id
      const cartIds = approvedItems.map((item) => item.cart_id);

      const { data } = await createCheckoutSession(cartIds, token);

      if (data.id) {
        await stripe.redirectToCheckout({ sessionId: data.id });
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("⚠️ خطأ أثناء إتمام الدفع");
    }
  };
  return (
    <div className="bg-yellow-400 rounded-lg shadow-lg p-6 border border-amber-950 text-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        📋 ملخص الطلب
      </h2>

      <div className="flex justify-between mb-2 text-gray-700">
        <span>عدد المنتجات المقبولة:</span>
        <span>{approvedItems.length}</span>
      </div>

      <div className="flex justify-between mb-2 text-gray-700">
        <span>إجمالي الكمية:</span>
        <span>
          {approvedItems.reduce((sum, item) => sum + item.quantity, 0)}
        </span>
      </div>

      <div className="flex justify-between font-bold text-lg border-t pt-2">
        <span className="text-gray-800">المجموع:</span>
        <span className="text-green-600">{total.toFixed(2)} $</span>
      </div>

      <button
        onClick={handleCheckout}
        className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
      >
        💳 إتمام الدفع
      </button>
    </div>
  );
}
