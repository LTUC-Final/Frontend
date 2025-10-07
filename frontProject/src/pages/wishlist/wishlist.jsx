import axios from "axios";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddToCart from "../../component/AddToCart.jsx";
import AddTOFav from "../../component/AddToFav.jsx";
import Swal from "sweetalert2";

export default function WishList() {
  const token = useSelector((s) => s.UserInfo.token);
  const user = useSelector((s) => s.UserInfo.user);
  const userId = user?.user_id;
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const port = import.meta.env.VITE_PORT;
  const apiBase = useMemo(() => `http://localhost:${port}/api`, [port]);

  const alertError = useCallback(async (message) => {
    await Swal.fire({
      title: "Error",
      text: message,
      icon: "error",
      confirmButtonText: "OK",
      confirmButtonColor: "#BE3D2A",
      background: "#FFF6E9",
      color: "#102E50",
    });
  }, []);

  const alertSuccess = useCallback(async (title, text) => {
    await Swal.fire({
      title,
      text,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#102E50",
      background: "#FFF6E9",
      color: "#102E50",
    });
  }, []);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${apiBase}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(Array.isArray(data?.items) ? data.items : []);
    } catch (e) {
      const m = e?.response?.data?.error || e?.message || "Failed to load wishlist";
      await alertError(m);
    } finally {
      setLoading(false);
    }
  }, [apiBase, token, alertError]);

  useEffect(() => {
    if (!token || !userId) {
      navigate("/login");
      return;
    }
    load();
  }, [token, userId, load, navigate]);

  const onToggleFav = async (p) => {
    const result = await Swal.fire({
      title: "Remove from wishlist?",
      text: p.name ? `Remove "${p.name}" from your wishlist?` : "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#BE3D2A",
      cancelButtonColor: "#102E50",
      background: "#FFF6E9",
      color: "#102E50",
    });
    if (!result.isConfirmed) return;

    const prev = [...items];
    setItems((list) => list.filter((x) => x.wishlist_id !== p.wishlist_id));

    try {
      await AddTOFav({ product_id: p.product_id }, { user });
      await alertSuccess("Removed!", `${p.name ?? "Item"} has been removed from your wishlist.`);
      setTimeout(load, 250);
    } catch (e) {
      setItems(prev);
      const m = e?.response?.data?.error || e?.message || "Failed to toggle favorite";
      await alertError(m);
    }
  };

  const onAddToCart = async (p) => {
    try {
      if (p.provider_id == null) {
        const m = "Missing provider_id for this product";
        await alertError(m);
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
      await alertSuccess("Added to cart!", `${p.name ?? "Item"} has been added successfully.`);
    } catch (e) {
      const m = e?.response?.data?.error || e?.message || "Failed to add to cart";
      await alertError(m);
    }
  };

  if (!token) return null;

  if (loading)
    return (
      <div className="min-h-screen grid place-items-center bg-[#FFF6E9] p-6">
        <div className="rounded-2xl px-6 py-4 bg-white shadow ring-1 ring-[#102E50]/10 text-[#102E50]">
          Loading…
        </div>
      </div>
    );

  if (items.length === 0)
    return (
      <div className="min-h-screen grid place-items-center bg-[#FFF6E9] p-6">
        <div className="rounded-2xl px-6 py-4 bg-white shadow ring-1 ring-[#102E50]/10 text-[#102E50]">
          Your wishlist is empty.
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FFF6E9] p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#102E50] mb-6">My Wishlist</h1>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <div
              key={p.wishlist_id}
              className="group rounded-2xl bg-white shadow-sm ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] transition overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#102E50]/5">
                <img
                  src={p.image || "https://via.placeholder.com/800x600?text=No+Image"}
                  alt={p.name || "wishlist item"}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/800x600?text=No+Image";
                  }}
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-[#102E50] line-clamp-1">{p.name}</div>
                    <div className="text-sm text-[#102E50]/70">
                      {Number(p.price).toFixed(2)} JOD
                    </div>
                  </div>
                  <span className="shrink-0 rounded-md bg-[#F5C45E] text-[#102E50] text-xs font-semibold px-2 py-1">
                    Wish
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => onToggleFav(p)}
                    className="px-4 py-2 rounded-xl bg-[#BE3D2A] text-white font-semibold shadow hover:shadow-md active:scale-[0.99] transition"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => onAddToCart(p)}
                    className="px-4 py-2 rounded-xl bg-[#102E50] text-[#FFF6E9] font-semibold shadow hover:shadow-md active:scale-[0.99] transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
