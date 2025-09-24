// src/component/CartSummary.jsx
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "../services/paymentService";

const stripePromise = loadStripe(
  "pk_test_51SAEZ3QPQtLWS1vCPiN9kGlqL93nETlIHNB5qJGtuIfnRtbw9P6tSD7nbMZLgeBap0wh4ES2CaX36dwvUq1jOWJ500cfKI9ikD"
);

export default function CartSummary({ items }) {
  const total = items.reduce(
    (sum, item) => sum + (parseFloat(item.cart_price) || 0),
    0
  );

  const handleCheckout = async () => {
    if (items.length === 0) return alert("🚨 السلة فارغة!");

    try {
      const stripe = await stripePromise;
      const { data } = await createCheckoutSession(items[0].cart_id);

      if (data.id) {
        await stripe.redirectToCheckout({ sessionId: data.id });
      } else {
        alert(" لم يتم إنشاء جلسة دفع.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert(" حدث خطأ أثناء إتمام الدفع");
    }
  };

  return (
    <div className="bg-yellow-400 rounded-lg shadow-lg p-6 border border-amber-950 text-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        📋 ملخص الطلب
      </h2>

      <div className="flex justify-between mb-2 text-gray-700">
        <span>عدد المنتجات:</span>
        <span>{items.length}</span>
      </div>

      <div className="flex justify-between mb-2 text-gray-700">
        <span>الكمية الإجمالية:</span>
        <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
      </div>

      <div className="flex justify-between font-bold text-lg border-t pt-2">
        <span className="text-gray-800">المجموع:</span>
        <span className="text-green-600">{total.toFixed(2)} $</span>
      </div>

      {/* زر الدفع */}
      <button
        onClick={handleCheckout}
        className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
      >
        💳 إتمام الدفع
      </button>
    </div>
  );
}