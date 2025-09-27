import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddToCart from "../../component/AddToCart.jsx";
import AddTOFav from "../../component/AddToFav.jsx";

export default function WishList() {
  const token = useSelector((s) => s.UserInfo.token);
  const user = useSelector((s) => s.UserInfo.user);
  const userId = user?.user_id;
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [snacks, setSnacks] = useState([]);
  const pushSnack = useCallback((text, type = "success") => {
    const id = `${Date.now()}-${Math.random()}`;
    setSnacks((s) => [...s, { id, text, type }]);
    setTimeout(() => setSnacks((s) => s.filter((n) => n.id !== id)), 4000);
  }, []);

  const port = import.meta.env.VITE_PORT;
  const apiBase = useMemo(() => `http://localhost:${port}/api`, [port]);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${apiBase}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      setItems(Array.isArray(data?.items) ? data.items : []);
      console.log(items);
      setErr("");
    } catch (e) {
      const m =
        e?.response?.data?.error || e?.message || "Failed to load wishlist";
      setErr(m);
      pushSnack(m, "error");
    } finally {
      setLoading(false);
    }
  }, [apiBase, token, pushSnack]);

  useEffect(() => {
    if (!token || !userId) {
      navigate("/login");
      return;
    }
    load();
  }, [token, userId, load, navigate]);

  const onToggleFav = async (p) => {
    const prev = items;
    setItems((list) => list.filter((x) => x.wishlist_id !== p.wishlist_id));
    try {
      await AddTOFav({ product_id: p.product_id }, { user });
      pushSnack("Removed from wishlist", "success");
      setTimeout(load, 250);
    } catch (e) {
      setItems(prev);
      const m =
        e?.response?.data?.error || e?.message || "Failed to toggle favorite";
      setErr(m);
      pushSnack(m, "error");
    }
  };

  const onAddToCart = async (p) => {
    try {
      if (p.provider_id == null) {
        const m = "Missing provider_id for this product";
        setErr(m);
        pushSnack(m, "error");
        return;
      }
      const card = {
        provider_id: p.provider_id,
        product_id: p.product_id,
        quantity: 1,
        details_order_user: "",
        price: p.price,
      };
      await AddToCart(card, { user });
      pushSnack("Added to cart", "success");
    } catch (e) {
      const m =
        e?.response?.data?.error || e?.message || "Failed to add to cart";
      setErr(m);
      pushSnack(m, "error");
    }
  };

  if (!token) return null;
  if (loading) return <div className="p-6">Loading…</div>;
  if (items.length === 0)
    return <div className="p-6">Your wishlist is empty.</div>;

  return (
    <>
      {/* Top-center snackbar: big, clear, click-through */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] space-y-3 pointer-events-none w-[92%] max-w-2xl">
        {snacks.map((n) => (
          <div
            key={n.id}
            className={`pointer-events-none rounded-2xl px-6 py-4 text-white text-xl sm:text-2xl font-semibold shadow-2xl text-center
              ${n.type === "error" ? "bg-rose-600" : "bg-green-600"}`}
          >
            {n.text}
          </div>
        ))}
      </div>

      {/* Optional error banner (close it if you prefer only snackbars) */}
      {err && (
        <div className="max-w-3xl mx-auto mt-2">
          <div className="bg-rose-600 text-white shadow rounded-xl px-4 py-3 flex items-center justify-between">
            <span className="text-sm sm:text-base">{err}</span>
            <button
              onClick={() => setErr("")}
              className="ml-4 px-3 py-1 rounded-md bg-white/20 hover:bg-white/30"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <div key={p.wishlist_id} className="rounded-2xl shadow p-4">
            <div className="aspect-[4/3] overflow-hidden rounded-xl mb-3 bg-gray-100">
              <img
                src={p.image || ""}
                alt={p.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="font-medium">{p.name}</div>
            <div className="opacity-70 mb-3">
              {Number(p.price).toFixed(2)} JOD
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onToggleFav(p)}
                className="px-4 py-2 rounded-xl bg-gray-900 text-white"
              >
                Remove
              </button>
              <button
                onClick={() => onAddToCart(p)}
                className="px-4 py-2 rounded-xl bg-gray-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
