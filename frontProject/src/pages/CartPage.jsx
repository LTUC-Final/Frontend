// src/pages/CartPage.jsx
// src/pages/CartPage.jsx
import { useEffect, useState } from "react";
import {
  getCartProducts,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../services/cartService";
import CartItem from "../component/CartItem";
import CartSummary from "../component/CartSummary";
import { useSelector } from "react-redux";

export default function CartPage() {
  const { user } = useSelector((state) => state.UserInfo);
  const userId = user?.user_id || 1; // مؤقت للتجربة

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    loadCart();
  }, [userId]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const { data } = await getCartProducts(userId);
      setCartItems(data);
    } catch (err) {
      console.error("Error loading cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrement = async (cart_id) => {
    await incrementQuantity(cart_id, userId);
    loadCart();
  };

  const handleDecrement = async (cart_id) => {
    await decrementQuantity(cart_id, userId);
    loadCart();
  };

  const handleRemove = async (cart_id) => {
    await removeFromCart(cart_id, userId);
    loadCart();
  };

  if (loading) return <p className="text-center mt-10">⏳ جاري تحميل السلة...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">🛒 سلة المشتريات</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">السلة فارغة</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ✅ المنتجات */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.cart_id}
                item={item}
                onIncrement={() => handleIncrement(item.cart_id)}
                onDecrement={() => handleDecrement(item.cart_id)}
                onRemove={() => handleRemove(item.cart_id)}
                reloadCart={loadCart}   // 🔑 تحديث بعد أي تعديل
                userId={userId}         // 🔑 تمرير الـ userId للباكند
              />
            ))}
          </div>

          {/* ✅ ملخص الدفع */}
          <div>
            <CartSummary items={cartItems} />
          </div>
        </div>
      )}
    </div>
  );
}
