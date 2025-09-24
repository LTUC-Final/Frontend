// src/component/CartItem.jsx
import { useState } from "react";
import {
  updateCustomReqAndToOrder,
  changeStatusPay,
} from "../services/cartService";

export default function CartItem({ item, onIncrement, onDecrement, onRemove, reloadCart, userId }) {
  const [customReq, setCustomReq] = useState(item.custom_requirement || "");
  const [showBox, setShowBox] = useState(false);

  const handleAddCustomReq = async () => {
    if (!customReq.trim()) return alert("⚠️ اكتب الطلب المخصص أولاً");

    try {
      await updateCustomReqAndToOrder({
        cart_id: item.cart_id,
        user_id: userId,
        custom_requirement: customReq,
        price: item.cart_price,
        Prodact_id: item.product_id,
        provider_id: item.provider_id,
        quntity: item.quantity,
      });

      // 🔄 تحديث الحالة Unapprove
      await changeStatusPay(item.cart_id, userId);

      reloadCart();
    } catch (err) {
      console.error("Error adding custom requirement:", err);
      alert("⚠️ خطأ أثناء إضافة الطلب المخصص");
    }
  };

  return (
    <div className="border rounded-lg shadow p-4 flex flex-col gap-4 border-fuchsia-500">
      {/* صورة + بيانات المنتج */}
      <div className="flex items-center gap-4">
        <img
          src={item.product_image || "/images/default-product.png"}
          alt={item.product_name}
          className="w-20 h-20 object-cover rounded-md border border-gray-300"
        />
        <div>
          <h3 className="text-lg font-semibold text-amber-800">{item.product_name}</h3>
          <p className="text-gray-600 text-sm">{item.details_order_user || "—"}</p>
          <p className="font-bold text-green-600 mt-1">
            {parseFloat(item.cart_price).toFixed(2)} $
          </p>
          <p className="text-xs text-gray-500">الحالة: {item.status_pay || "—"}</p>
        </div>
      </div>

      {/* أزرار الكمية */}
      <div className="flex items-center gap-3">
        <button onClick={onDecrement} className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">-</button>
        <span className="font-semibold">{item.quantity}</span>
        <button onClick={onIncrement} className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">+</button>
      </div>

      {/* زر حذف */}
      <button onClick={onRemove} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
        حذف
      </button>

      {/* ✅ إضافة طلب مخصص */}
      <div className="mt-2">
        {!showBox ? (
          <button
            onClick={() => setShowBox(true)}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            ➕ إضافة طلب مخصص
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <textarea
              value={customReq}
              onChange={(e) => setCustomReq(e.target.value)}
              className="border rounded p-2 text-sm"
              placeholder="اكتب متطلباتك هنا..."
            />
            <button
              onClick={handleAddCustomReq}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              ✅ إرسال للموفر
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
