



// import axios from "axios";
// import { useCallback, useEffect, useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useAddToCart } from "../../component/AddToCart.jsx";
// import AddTOFav from "../../component/AddToFav.jsx";
// import defaultImg from "../../assets/NoImage.png";

// export default function WishList() {
//   const token = useSelector((s) => s.UserInfo.token);
//   const user = useSelector((s) => s.UserInfo.user);
//   const userId = user?.user_id;
//   const isLogged = Boolean(token);
//   const navigate = useNavigate();
//   const { AddToCart } = useAddToCart();

//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [cartIds, setCartIds] = useState(new Set());
//   const [ratios, setRatios] = useState({});

//   const port = import.meta.env.VITE_PORT;
//   const originBase = useMemo(() => `http://localhost:${port}`, [port]);
//   const apiBase = useMemo(() => `${originBase}/api`, [originBase]);

//   const withMutedAlerts = useCallback(async (fn) => {
//     const prev = window.alert;
//     window.alert = () => {};
//     try {
//       return await fn();
//     } finally {
//       window.alert = prev;
//     }
//   }, []);

//   const toImg = useCallback(
//     (img) => {
//       if (!img) return defaultImg;
//       const s = String(img).trim();
//       if (s.startsWith("http")) return s;
//       return `${originBase}${s.startsWith("/") ? "" : "/"}${s}`;
//     },
//     [originBase]
//   );

//   const handleImgLoad = (id, e) => {
//     const nw = e.currentTarget.naturalWidth || 0;
//     const nh = e.currentTarget.naturalHeight || 0;
//     if (nw > 0 && nh > 0) {
//       setRatios((r) => ({ ...r, [id]: `${nw} / ${nh}` }));
//     }
//   };

//   const alertError = useCallback(async (message) => {
//     await Swal.fire({
//       title: "Error",
//       text: message,
//       icon: "error",
//       confirmButtonText: "OK",
//       confirmButtonColor: "#BE3D2A",
//       background: "#FFF6E9",
//       color: "#102E50",
//     });
//   }, []);

//   const alertSuccess = useCallback(async (title, text) => {
//     await Swal.fire({
//       title,
//       text,
//       icon: "success",
//       confirmButtonText: "OK",
//       confirmButtonColor: "#102E50",
//       background: "#FFF6E9",
//       color: "#102E50",
//     });
//   }, []);

//   const loadCart = useCallback(async () => {
//     try {
//       if (!userId) return;
//       const res = await axios.get(`${apiBase}/carts/products/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const list = Array.isArray(res.data?.cards) ? res.data.cards : [];
//       setCartIds(new Set(list.map((c) => Number(c.product_id))));
//     } catch {}
//   }, [apiBase, token, userId]);

//   const load = useCallback(async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`${apiBase}/wishlist`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setItems(Array.isArray(data?.items) ? data.items : []);
//     } catch (e) {
//       const m = e?.response?.data?.error || e?.message || "Failed to load wishlist";
//       await alertError(m);
//     } finally {
//       setLoading(false);
//     }
//   }, [apiBase, token, alertError]);

//   useEffect(() => {
//     if (!token || !userId) {
//       navigate("/login");
//       return;
//     }
//     load();
//     loadCart();
//   }, [token, userId, load, loadCart, navigate]);

//   const onToggleFav = async (p) => {
//     const result = await Swal.fire({
//       title: "Remove from wishlist?",
//       text: p.name ? `Remove "${p.name}" from your wishlist?` : "Are you sure?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Remove",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#BE3D2A",
//       cancelButtonColor: "#102E50",
//       background: "#FFF6E9",
//       color: "#102E50",
//     });
//     if (!result.isConfirmed) return;
//     const prev = [...items];
//     setItems((list) => list.filter((x) => x.wishlist_id !== p.wishlist_id));
//     try {
//       await withMutedAlerts(() => AddTOFav({ product_id: p.product_id }, { user }));
//       await alertSuccess("Removed", `${p.name ?? "Item"} removed from wishlist.`);
//       setTimeout(load, 200);
//     } catch (e) {
//       setItems(prev);
//       const m = e?.response?.data?.error || e?.message || "Failed to toggle favorite";
//       await alertError(m);
//     }
//   };

//   const onAddToCart = async (p) => {
//     try {
//       if (p.provider_id == null) {
//         await alertError("Missing provider_id for this product");
//         return;
//       }
//       const inCart = cartIds.has(Number(p.product_id));
//       if (inCart) {
//         const result = await Swal.fire({
//           title: "Already in cart",
//           text: p.name
//             ? `"${p.name}" is already in your cart. Do you want to remove it?`
//             : "This item is already in your cart. Remove it?",
//           icon: "info",
//           showCancelButton: true,
//           confirmButtonText: "Remove from cart",
//           cancelButtonText: "Keep",
//           confirmButtonColor: "#BE3D2A",
//           cancelButtonColor: "#102E50",
//           background: "#FFF6E9",
//           color: "#102E50",
//         });
//         if (!result.isConfirmed) return;
//       }
//       const card = {
//         provider_id: p.provider_id,
//         product_id: p.product_id,
//         quantity: 1,
//         details_order_user: "",
//         price: p.price,
//       };
//       await withMutedAlerts(() => AddToCart(p, { user }));
//       await alertSuccess(inCart ? "Removed from cart" : "Added to cart", inCart ? "Item removed." : "Item added successfully.");
//       await loadCart();
//     } catch (e) {
//       const m = e?.response?.data?.error || e?.message || "Failed to add to cart";
//       await alertError(m);
//     }
//   };

//   if (!token) return null;

//   if (loading)
//     return (
//       <div className="min-h-screen grid place-items-center bg-[#FFF6E9]">
//         <div className="rounded-2xl px-4 py-3 bg-white shadow ring-1 ring-[#102E50]/10 text-[#102E50]">
//           Loading…
//         </div>
//       </div>
//     );

//   if (items.length === 0)
//     return (
//       <div className="min-h-screen grid place-items-center bg-[#FFF6E9]">
//         <div className="rounded-2xl px-4 py-3 bg-white shadow ring-1 ring-[#102E50]/10 text-[#102E50]">
//           Your wishlist is empty.
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] px-3 sm:px-4 md:px-6 py-6 md:py-8">
//       <div className="mx-auto w-full max-w-7xl">
//         <div className="mb-4 text-center">
//           <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-[#102E50] tracking-tight">
//             My Wishlist
//           </h1>
//           <div className="mt-2 h-1 w-32 mx-auto rounded-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
//         </div>

//         <div className="mt-6 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
//           {items.map((p) => {
//             const key = p.product_id ?? p.wishlist_id;
//             return (
//               <button
//                 key={p.product_id}
//                 onClick={() =>
//                   isLogged
//                     ? navigate(`/productdatails?product_id=${p.product_id}`, {
//                         state: { product_id: p.product_id }
//                       })
//                     : navigate("/login")
//                 }
//                 className="group rounded-2xl bg-white ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden text-left transition"
//               >
//                 <div className="relative w-full h-60 sm:h-64 md:h-72 bg-[#0f2a47]/5">
//                   <img
//                     src={toImg(p.image)}
//                     alt={p.name || "wishlist item"}
//                     className="w-full h-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
//                     onLoad={(e) => handleImgLoad(key, e)}
//                     onError={(e) => (e.currentTarget.src = defaultImg)}
//                     loading="lazy"
//                     decoding="async"
//                   />
//                   <div className="absolute left-3 top-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10">
//                     <span className="w-1.5 h-1.5 rounded-full bg-[#F5C45E]" />
//                     Favorite
//                   </div>
//                 </div>

//                 <div className="px-2.5 sm:px-3 py-2 bg-[#F5C45E]/18 ring-1 ring-[#F5C45E]/35 flex items-center gap-2 justify-between">
//                   <span className="shrink-0 inline-flex items-center rounded-lg bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10 text-[11px] sm:text-xs font-extrabold px-2 py-1">
//                     {Number(p.price).toFixed(2)} JOD
//                   </span>

//                   <span className="min-w-0 text-[#0f2a47] font-semibold text-[11px] sm:text-xs leading-tight truncate">
//                     {p.name}
//                   </span>

//                   <div className="shrink-0 flex items-center gap-2">
//                     <button
//                       onClick={async (e) => {
//                         e.stopPropagation();
//                         await onToggleFav(p);
//                       }}
//                       className="w-7 h-7 rounded-md grid place-items-center bg-[#BE3D2A] text-white shadow hover:shadow-md active:scale-95 transition"
//                       aria-label="Remove"
//                       title="Remove"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <polyline points="3 6 5 6 21 6" />
//                         <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
//                         <path d="M10 11v6" />
//                         <path d="M14 11v6" />
//                         <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
//                       </svg>
//                     </button>

//                     <button
//                       onClick={async (e) => {
//                         e.stopPropagation();
//                         await onAddToCart(p);
//                       }}
//                       className="w-7 h-7 rounded-md grid place-items-center bg-[#102E50] text-[#FFF6E9] shadow hover:shadow-md active:scale-95 transition"
//                       aria-label="Add to Cart"
//                       title="Add to Cart"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <circle cx="9" cy="21" r="1" />
//                         <circle cx="20" cy="21" r="1" />
//                         <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 <div className="h-0.5 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }






import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAddToCart } from "../../component/AddToCart.jsx";
import AddTOFav from "../../component/AddToFav.jsx";
import defaultImg from "../../assets/NoImage.png";

export default function WishList() {
  const token = useSelector((s) => s.UserInfo.token);
  const user = useSelector((s) => s.UserInfo.user);
  const userId = user?.user_id;
  const isLogged = Boolean(token);
  const navigate = useNavigate();
  const { AddToCart } = useAddToCart();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartIds, setCartIds] = useState(new Set());
  const [ratios, setRatios] = useState({});

  const port = import.meta.env.VITE_PORT;
  const originBase = useMemo(() => `http://localhost:${port}`, [port]);
  const apiBase = useMemo(() => `${originBase}/api`, [originBase]);

  const withMutedAlerts = useCallback(async (fn) => {
    const prev = window.alert;
    window.alert = () => {};
    try {
      return await fn();
    } finally {
      window.alert = prev;
    }
  }, []);

  const toImg = useCallback(
    (img) => {
      if (!img) return defaultImg;
      const s = String(img).trim();
      if (s.startsWith("http")) return s;
      return `${originBase}${s.startsWith("/") ? "" : "/"}${s}`;
    },
    [originBase]
  );

  const handleImgLoad = (id, e) => {
    const nw = e.currentTarget.naturalWidth || 0;
    const nh = e.currentTarget.naturalHeight || 0;
    if (nw > 0 && nh > 0) {
      setRatios((r) => ({ ...r, [id]: `${nw} / ${nh}` }));
    }
  };

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

  const loadCart = useCallback(async () => {
    try {
      if (!userId) return;
      const res = await axios.get(`${apiBase}/carts/products/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const list = Array.isArray(res.data?.cards) ? res.data.cards : [];
      setCartIds(new Set(list.map((c) => Number(c.product_id))));
    } catch {}
  }, [apiBase, token, userId]);

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
    loadCart();
  }, [token, userId, load, loadCart, navigate]);

  const onToggleFav = async (p) => {
    const result = await Swal.fire({
      title: "Remove from wishlist?",
      text: p.name ? `Remove "${p.name}" from your wishlist?` : "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remove",
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
      await withMutedAlerts(() => AddTOFav({ product_id: p.product_id }, { user }));
      await alertSuccess("Removed", `${p.name ?? "Item"} removed from wishlist.`);
      setTimeout(load, 200);
    } catch (e) {
      setItems(prev);
      const m = e?.response?.data?.error || e?.message || "Failed to toggle favorite";
      await alertError(m);
    }
  };

  const onAddToCart = async (p) => {
    try {
      if (p.provider_id == null) {
        await alertError("Missing provider_id for this product");
        return;
      }
      const inCart = cartIds.has(Number(p.product_id));
      if (inCart) {
        const result = await Swal.fire({
          title: "Already in cart",
          text: p.name
            ? `"${p.name}" is already in your cart. Do you want to remove it?`
            : "This item is already in your cart. Remove it?",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Remove from cart",
          cancelButtonText: "Keep",
          confirmButtonColor: "#BE3D2A",
          cancelButtonColor: "#102E50",
          background: "#FFF6E9",
          color: "#102E50",
        });
        if (!result.isConfirmed) return;
      }
      await withMutedAlerts(() => AddToCart(p, { user }));
      await alertSuccess(inCart ? "Removed from cart" : "Added to cart", inCart ? "Item removed." : "Item added successfully.");
      await loadCart();
    } catch (e) {
      const m = e?.response?.data?.error || e?.message || "Failed to add to cart";
      await alertError(m);
    }
  };

  if (!token) return null;

  if (loading)
    return (
      <div className="min-h-screen grid place-items-center bg-[#FFF6E9] px-3">
        <div className="rounded-2xl px-4 py-3 bg-white shadow ring-1 ring-[#102E50]/10 text-[#102E50]">
          Loading…
        </div>
      </div>
    );

  if (items.length === 0)
    return (
      <div className="min-h-screen grid place-items-center bg-[#FFF6E9] px-3">
        <div className="rounded-2xl px-4 py-3 bg-white shadow ring-1 ring-[#102E50]/10 text-[#102E50]">
          Your wishlist is empty.
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FFF6E9] px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-4 text-center">
          <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-[#102E50] tracking-tight">
            My Wishlist
          </h1>
          <div className="mt-2 h-1 w-28 sm:w-32 mx-auto rounded-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
        </div>

        <div className="mt-6 grid gap-3 sm:gap-4 md:gap-5 lg:gap-6 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((p) => {
            const key = p.product_id ?? p.wishlist_id;
            return (
              <button
                key={p.product_id}
                onClick={() =>
                  isLogged
                    ? navigate(`/productdatails?product_id=${p.product_id}`, {
                        state: { product_id: p.product_id },
                      })
                    : navigate("/login")
                }
                className="group rounded-2xl bg-white ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] shadow-[0_12px_40px_rgba(16,46,80,0.10)] overflow-hidden text-left transition"
              >
                <div className="relative w-full h-56 sm:h-60 md:h-64 bg-[#0f2a47]/5">
                  <img
                    src={toImg(p.image)}
                    alt={p.name || "wishlist item"}
                    className="w-full h-full object-cover object-center scale-[1.03] transition duration-500 group-hover:scale-[1.06]"
                    onLoad={(e) => handleImgLoad(key, e)}
                    onError={(e) => (e.currentTarget.src = defaultImg)}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute left-3 top-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5C45E]" />
                    Favorite
                  </div>
                </div>

                <div className="px-2.5 sm:px-3 py-2 bg-[#F5C45E]/18 ring-1 ring-[#F5C45E]/35 flex items-center gap-2 justify-between">
                  <span className="shrink-0 inline-flex items-center rounded-lg bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10 text-[11px] sm:text-xs font-extrabold px-2 py-1">
                    {Number(p.price).toFixed(2)} JOD
                  </span>

                  <span className="min-w-0 text-[#0f2a47] font-semibold text-[11px] sm:text-xs leading-tight truncate">
                    {p.name}
                  </span>

                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        await onToggleFav(p);
                      }}
                      className="w-7 h-7 rounded-md grid place-items-center bg-[#BE3D2A] text-white shadow hover:shadow-md active:scale-95 transition"
                      aria-label="Remove"
                      title="Remove"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button>

                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        await onAddToCart(p);
                      }}
                      className="w-7 h-7 rounded-md grid place-items-center bg-[#102E50] text-[#FFF6E9] shadow hover:shadow-md active:scale-95 transition"
                      aria-label="Add to Cart"
                      title="Add to Cart"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="h-0.5 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

