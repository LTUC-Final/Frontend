

// import axios from "axios";
// import { useEffect, useMemo, useState, useCallback } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import defaultImg from "../assets/NoImage.png";
// import ReactionPicker from "./reaction";
// import { useAddToCart } from "./AddToCart";

// export default function GitAllProduct() {
//   const navigate = useNavigate();
//   const { AddToCart } = useAddToCart();
//   const CusData = useSelector((s) => s.UserInfo);
//   const uid = CusData?.user?.user_id;
//   const role = CusData?.user?.role;
//   const token = useSelector((s) => s.UserInfo?.token);
//   const isLogged = Boolean(token);

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const [cards, setCards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [textSearch, setTextSearch] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [selectore, setSelectore] = useState("");
//   const [openReactions, setOpenReactions] = useState({});
//   const [favIds, setFavIds] = useState(new Set());
//   const [cartIds, setCartIds] = useState(new Set());

//   const withMutedAlerts = useCallback(async (fn) => {
//     const prev = window.alert;
//     window.alert = () => {};
//     try {
//       return await fn();
//     } finally {
//       window.alert = prev;
//     }
//   }, []);

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

//   useEffect(() => {
//     const t = setTimeout(() => setDebouncedSearch(textSearch), 250);
//     return () => clearTimeout(t);
//   }, [textSearch]);

//   useEffect(() => {
//     const run = async () => {
//       if (!uid) return;
//       try {
//         setLoading(true);
//         const res = await axios.get(`${apiBase}/api/ShowCardInUserDashboard/${uid}`);
//         setCards(Array.isArray(res.data) ? res.data : []);
//       } catch {
//         setCards([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     run();
//   }, [apiBase, uid]);

//   const loadFavs = useCallback(async () => {
//     try {
//       if (!token) return;
//       const { data } = await axios.get(`${apiBase}/api/wishlist`.replace("/api/api", "/api"), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const list = Array.isArray(data?.items) ? data.items : [];
//       setFavIds(new Set(list.map((x) => Number(x.product_id))));
//     } catch {}
//   }, [apiBase, token]);

//   const loadCartIds = useCallback(async () => {
//     try {
//       if (!uid || !token) return;
//       const res = await axios.get(`${apiBase}/api/carts/products/${uid}`.replace("/api/api", "/api"), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const list = Array.isArray(res.data?.cards) ? res.data.cards : [];
//       setCartIds(new Set(list.map((c) => Number(c.product_id))));
//     } catch {}
//   }, [apiBase, token, uid]);

//   useEffect(() => {
//     loadFavs();
//     loadCartIds();
//   }, [loadFavs, loadCartIds]);

//   const categories = useMemo(
//     () => [...new Set(cards.map((c) => c?.category_name).filter(Boolean))],
//     [cards]
//   );

//   const toImg = useCallback(
//     (img) => {
//       if (!img) return defaultImg;
//       const s = String(img).trim();
//       if (s.startsWith("http")) return s;
//       return `${apiBase}${s.startsWith("/") ? "" : "/"}${s}`;
//     },
//     [apiBase]
//   );

//   const money = useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }), []);

//   const filtered = cards.filter((card) => {
//     const byName = (card?.name || "").toLowerCase().includes(debouncedSearch.toLowerCase());
//     const byCat = !selectore || (card?.category_name || "").toLowerCase() === String(selectore).toLowerCase();
//     return byName && byCat;
//   });

//   const field =
//     "h-12 px-4 rounded-2xl bg-white/95 text-[#0f2a47] placeholder-[#0f2a47]/60 text-sm outline-none ring-1 ring-[#0f2a47]/15 focus:ring-2 focus:ring-[#F5C45E] transition";

//   const iconBtnBase = "w-7 h-7 rounded-md grid place-items-center shadow hover:shadow-md active:scale-95 transition";
//   const heartInactive = "bg-white ring-1 ring-[#BE3D2A]/30 text-[#BE3D2A]";
//   const heartActive = "bg-[#BE3D2A] text-white";
//   const cartInactive = "bg-white ring-1 ring-[#102E50]/30 text-[#102E50]";
//   const cartActive = "bg-[#102E50] text-[#FFF6E9]";

//   const totalReactions = (rc) => {
//     if (!rc || typeof rc !== "object") return 0;
//     return Object.values(rc).reduce((a, b) => a + Number(b || 0), 0);
//   };

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] text-[#0f2a47]">
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pb-8 md:pb-10">
//         <div className="sticky top-0 z-20 pt-4 pb-4 bg-[#FFF6E9]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FFF6E9]/80">
//           <div className="rounded-[1.6rem] p-[1.2px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//             <div className="rounded-[1.6rem] bg-white/95">
//               <div className="p-4 sm:p-6 flex flex-col gap-4">
//                 <div className="flex flex-col md:flex-row gap-3 md:gap-4">
//                   <div className="flex-1 relative">
//                     <span className="absolute inset-y-0 left-3 flex items-center text-[#0f2a47]/60 pointer-events-none">
//                       <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L19 20.49 20.49 19 15.5 14ZM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"/></svg>
//                     </span>
//                     <input
//                       value={textSearch}
//                       onChange={(e) => setTextSearch(e.target.value)}
//                       placeholder="Search services or providers"
//                       className={`${field} w-full pl-10`}
//                       aria-label="Search services or providers"
//                     />
//                   </div>
//                   <div className="flex items-center gap-2 sm:gap-3">
//                     <span className="text-sm font-semibold">Category</span>
//                     <select
//                       value={selectore}
//                       onChange={(e) => setSelectore(e.target.value)}
//                       className={field}
//                       aria-label="Select category"
//                     >
//                       <option value="">All</option>
//                       {categories.map((cat, i) => (
//                         <option key={i} value={cat}>{cat}</option>
//                       ))}
//                     </select>
//                     <button
//                       onClick={() => {
//                         setTextSearch("");
//                         setSelectore("");
//                       }}
//                       className="h-12 px-4 rounded-2xl bg-white text-[#0f2a47] text-sm font-semibold ring-1 ring-[#0f2a47]/15 hover:ring-[#F5C45E] transition"
//                       aria-label="Reset filters"
//                     >
//                       Reset
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
//                   <button
//                     onClick={() => setSelectore("")}
//                     className={`px-4 h-10 rounded-xl text-sm font-semibold ring-1 transition ${selectore === "" ? "bg-[#102E50] text-[#FFF6E9] ring-transparent" : "bg-white text-[#0f2a47] ring-[#0f2a47]/15 hover:ring-[#F5C45E]"}`}
//                     aria-pressed={selectore === ""}
//                     aria-label="Filter All"
//                   >
//                     All
//                   </button>
//                   {categories.map((cat) => (
//                     <button
//                       key={cat}
//                       onClick={() => setSelectore(cat)}
//                       className={`px-4 h-10 rounded-xl text-sm font-semibold ring-1 transition ${selectore === cat ? "bg-[#102E50] text-[#FFF6E9] ring-transparent" : "bg-white text-[#0f2a47] ring-[#0f2a47]/15 hover:ring-[#F5C45E]"}`}
//                       aria-pressed={selectore === cat}
//                       aria-label={`Filter ${cat}`}
//                     >
//                       {cat}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {loading ? (
//           <div className="mt-6 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
//             {Array.from({ length: 8 }).map((_, i) => (
//               <div key={i} className="rounded-2xl overflow-hidden bg-white ring-1 ring-[#0f2a47]/10 animate-pulse">
//                 <div className="w-full h-60 sm:h-64 md:h-72 bg-[#0f2a47]/10" />
//                 <div className="p-5 space-y-3">
//                   <div className="h-5 w-2/3 bg-[#0f2a47]/10 rounded" />
//                   <div className="h-4 w-1/2 bg-[#0f2a47]/10 rounded" />
//                   <div className="h-10 w-full bg-[#0f2a47]/10 rounded-2xl" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <>
//             <div className="mt-6 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
//               {filtered.map((card, i) => {
//                 const pid = Number(card?.product_id);
//                 const isFav = favIds.has(pid);
//                 const inCart = cartIds.has(pid);
//                 const rcCount = totalReactions(card?.reaction_counts);

//                 return (
//                   <button
//                     key={i}
//                     onClick={() =>
//                       isLogged
//                         ? navigate(`/productdatails?product_id=${pid}`, { state: { product_id: pid } })
//                         : navigate("/login")
//                     }
//                     className="group rounded-2xl bg-white ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden text-left transition"
//                   >
//                     <div className="relative w-full h-60 sm:h-64 md:h-72 bg-[#0f2a47]/5">
//                       <img
//                         src={toImg(card?.image)}
//                         alt={card?.name || "Product image"}
//                         loading="lazy"
//                         decoding="async"
//                         className="w-full h-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
//                         onError={(e) => {
//                           e.currentTarget.src = defaultImg;
//                         }}
//                       />
//                       <div className="absolute left-3 top-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10">
//                         <span className="w-1.5 h-1.5 rounded-full bg-[#F5C45E]" />
//                         {card?.category_name}
//                       </div>
//                     </div>

//                     <div className="px-2.5 sm:px-3 py-2 bg-[#F5C45E]/18 ring-1 ring-[#F5C45E]/35 flex items-center gap-2 justify-between">
//                       <span className="shrink-0 inline-flex items-center rounded-lg bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10 text-[11px] sm:text-xs font-extrabold px-2 py-1">
//                         {money.format(card?.price || 0)}
//                       </span>

//                       <span className="min-w-0 text-[#0f2a47] font-semibold text-[11px] sm:text-xs leading-tight truncate">
//                         {card?.name}
//                       </span>

//                       {role === "customer" && (
//                         <div className="shrink-0 flex items-center gap-2">
//                           <span
//                             onClick={async (e) => {
//                               e.stopPropagation();
//                               try {
//                                 await withMutedAlerts(() => window.AddTOFav ? window.AddTOFav(card, CusData) : Promise.reject(new Error("AddTOFav not provided")));
//                                 const next = new Set(favIds);
//                                 if (isFav) next.delete(pid);
//                                 else next.add(pid);
//                                 setFavIds(next);
//                                 await alertSuccess("Updated", isFav ? "Removed from favorites." : "Added to favorites.");
//                               } catch (e2) {
//                                 const m = e2?.response?.data?.error || e2?.message || "Failed to update favorite";
//                                 await alertError(m);
//                               }
//                             }}
//                             className={`${iconBtnBase} ${isFav ? heartActive : heartInactive}`}
//                             title={isFav ? "In favorites" : "Add to favorites"}
//                             aria-label="Favorite"
//                           >
//                             <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
//                               <path d="M12 21s-6.72-4.32-9.33-7.38A5.5 5.5 0 0 1 12 5.24a5.5 5.5 0 0 1 9.33 8.38C18.72 16.68 12 21 12 21Z" />
//                             </svg>
//                           </span>

//                           <span
//                             onClick={async (e) => {
//                               e.stopPropagation();
//                               try {
//                                 if (inCart) {
//                                   const r = await Swal.fire({
//                                     title: "Already in cart",
//                                     text: "Remove this item from your cart?",
//                                     icon: "info",
//                                     showCancelButton: true,
//                                     confirmButtonText: "Remove",
//                                     cancelButtonText: "Keep",
//                                     confirmButtonColor: "#BE3D2A",
//                                     cancelButtonColor: "#102E50",
//                                     background: "#FFF6E9",
//                                     color: "#102E50",
//                                   });
//                                   if (!r.isConfirmed) return;
//                                 }
//                                 await withMutedAlerts(() => AddToCart(card, CusData));
//                                 const next = new Set(cartIds);
//                                 if (inCart) next.delete(pid);
//                                 else next.add(pid);
//                                 setCartIds(next);
//                                 await alertSuccess(inCart ? "Removed from cart" : "Added to cart", inCart ? "Item removed." : "Item added successfully.");
//                               } catch (e2) {
//                                 const m = e2?.response?.data?.error || e2?.message || "Failed to update cart";
//                                 await alertError(m);
//                               }
//                             }}
//                             className={`${iconBtnBase} ${inCart ? cartActive : cartInactive}`}
//                             title={inCart ? "In cart" : "Add to cart"}
//                             aria-label="Add to Cart"
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                               <circle cx="9" cy="21" r="1" />
//                               <circle cx="20" cy="21" r="1" />
//                               <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6" />
//                             </svg>
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     <div className="px-4 sm:px-5 pb-4 sm:pb-5">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setOpenReactions((prev) => ({ ...prev, [pid]: !prev[pid] }));
//                         }}
//                         className="w-full h-10 rounded-xl bg-white text-[#0f2a47] text-sm font-semibold ring-1 ring-[#F5C45E]/40 hover:ring-[#F5C45E] transition inline-flex items-center justify-center gap-2"
//                         aria-expanded={Boolean(openReactions[pid])}
//                         title="Reactions"
//                       >
//                         <span className="text-base">🙂</span>
//                         <span>Reactions</span>
//                         <span className="inline-flex items-center justify-center min-w-[26px] h-6 px-2 rounded-full text-xs font-bold bg-[#F5C45E]/20 ring-1 ring-[#F5C45E]/50">
//                           {rcCount}
//                         </span>
//                       </button>
//                       {openReactions[pid] && (
//                         <div className="mt-3 rounded-2xl bg-[#F5C45E]/15 ring-1 ring-[#F5C45E]/40 px-3 py-2" onClick={(e) => e.stopPropagation()}>
//                           <div className="flex flex-wrap gap-2">
//                             <ReactionPicker
//                               card={card}
//                               product_id={pid}
//                               userId={uid}
//                               onReactionUpdate={(product_id, reactionCounts, selectedReaction) => {
//                                 setCards((prev) =>
//                                   prev.map((c) =>
//                                     c.product_id === product_id ? { ...c, reaction_counts: reactionCounts, selectedReaction } : c
//                                   )
//                                 );
//                               }}
//                             />
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     <div className="h-0.5 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
//                   </button>
//                 );
//               })}
//             </div>

//             {!loading && filtered.length === 0 && (
//               <div className="text-center text-[#0f2a47] mt-14">
//                 <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white ring-1 ring-[#0f2a47]/10">
//                   <span className="w-2 h-2 rounded-full bg-[#F5C45E] animate-pulse" />
//                   No results. Try another search or category.
//                 </div>
//               </div>
//             )}
//           </>
//         )}

//         <div className="mt-10 text-center">
//           <button
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//             className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-[#0f2a47] ring-1 ring-[#0f2a47]/10 hover:ring-[#F5C45E] transition"
//             aria-label="Back to top"
//           >
//             <span className="w-2 h-2 rounded-full bg-[#F5C45E] animate-pulse" />
//             Back to top
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }












//اوبشن بي B 
// import axios from "axios";
// import { useEffect, useMemo, useState, useCallback } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import defaultImg from "../assets/NoImage.png";
// import { useAddToCart } from "./AddToCart";

// export default function GitAllProduct() {
//   const navigate = useNavigate();
//   const { AddToCart } = useAddToCart();
//   const CusData = useSelector((s) => s.UserInfo);
//   const uid = CusData?.user?.user_id;
//   const role = CusData?.user?.role;
//   const token = useSelector((s) => s.UserInfo?.token);
//   const isLogged = Boolean(token);

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const [cards, setCards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [textSearch, setTextSearch] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [selectore, setSelectore] = useState("");
//   const [favIds, setFavIds] = useState(new Set());
//   const [cartIds, setCartIds] = useState(new Set());

//   const withMutedAlerts = useCallback(async (fn) => {
//     const prev = window.alert;
//     window.alert = () => {};
//     try {
//       return await fn();
//     } finally {
//       window.alert = prev;
//     }
//   }, []);

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

//   useEffect(() => {
//     const t = setTimeout(() => setDebouncedSearch(textSearch), 250);
//     return () => clearTimeout(t);
//   }, [textSearch]);

//   useEffect(() => {
//     const run = async () => {
//       if (!uid) return;
//       try {
//         setLoading(true);
//         const res = await axios.get(`${apiBase}/api/ShowCardInUserDashboard/${uid}`);
//         setCards(Array.isArray(res.data) ? res.data : []);
//       } catch {
//         setCards([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     run();
//   }, [apiBase, uid]);

//   const loadFavs = useCallback(async () => {
//     try {
//       if (!token) return;
//       const { data } = await axios.get(`${apiBase}/api/wishlist`.replace("/api/api", "/api"), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const list = Array.isArray(data?.items) ? data.items : [];
//       setFavIds(new Set(list.map((x) => Number(x.product_id))));
//     } catch {}
//   }, [apiBase, token]);

//   const loadCartIds = useCallback(async () => {
//     try {
//       if (!uid || !token) return;
//       const res = await axios.get(`${apiBase}/api/carts/products/${uid}`.replace("/api/api", "/api"), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const list = Array.isArray(res.data?.cards) ? res.data.cards : [];
//       setCartIds(new Set(list.map((c) => Number(c.product_id))));
//     } catch {}
//   }, [apiBase, token, uid]);

//   useEffect(() => {
//     loadFavs();
//     loadCartIds();
//   }, [loadFavs, loadCartIds]);

//   const categories = useMemo(
//     () => [...new Set(cards.map((c) => c?.category_name).filter(Boolean))],
//     [cards]
//   );

//   const toImg = useCallback(
//     (img) => {
//       if (!img) return defaultImg;
//       const s = String(img).trim();
//       if (s.startsWith("http")) return s;
//       return `${apiBase}${s.startsWith("/") ? "" : "/"}${s}`;
//     },
//     [apiBase]
//   );

//   const money = useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }), []);

//   const filtered = cards.filter((card) => {
//     const byName = (card?.name || "").toLowerCase().includes(debouncedSearch.toLowerCase());
//     const byCat = !selectore || (card?.category_name || "").toLowerCase() === String(selectore).toLowerCase();
//     return byName && byCat;
//   });

//   const field =
//     "h-12 px-4 rounded-2xl bg-white/95 text-[#0f2a47] placeholder-[#0f2a47]/60 text-sm outline-none ring-1 ring-[#0f2a47]/15 focus:ring-2 focus:ring-[#F5C45E] transition";

//   const iconBtnBase = "w-7 h-7 rounded-md grid place-items-center shadow hover:shadow-md active:scale-95 transition";
//   const heartInactive = "bg-white ring-1 ring-[#BE3D2A]/30 text-[#BE3D2A]";
//   const heartActive = "bg-[#BE3D2A] text-white";
//   const cartInactive = "bg-white ring-1 ring-[#102E50]/30 text-[#102E50]";
//   const cartActive = "bg-[#102E50] text-[#FFF6E9]";

//   const handleReact = useCallback(
//     async (e, product_id, reactionKey) => {
//       e.stopPropagation();
//       if (!isLogged) {
//         navigate("/login");
//         return;
//       }
//       const allowed = ["love", "support", "proud"];
//       if (!allowed.includes(reactionKey)) return;

//       const prevCards = cards;
//       const nextCards = cards.map((c) => {
//         if (Number(c.product_id) !== Number(product_id)) return c;
//         const prevSelected = c.selectedReaction || null;
//         const counts = { love: 0, support: 0, proud: 0, ...(c.reaction_counts || {}) };
//         if (prevSelected && counts[prevSelected] > 0) counts[prevSelected] = Number(counts[prevSelected]) - 1;
//         let newSelected = reactionKey;
//         if (prevSelected === reactionKey) {
//           newSelected = null;
//         } else {
//           counts[reactionKey] = Number(counts[reactionKey] || 0) + 1;
//         }
//         return { ...c, reaction_counts: counts, selectedReaction: newSelected };
//       });

//       setCards(nextCards);

//       try {
//         const currentSelected =
//           nextCards.find((c) => Number(c.product_id) === Number(product_id))?.selectedReaction || null;
//         await axios.post(
//           `${apiBase}/api/products/${product_id}/react`,
//           { reaction: currentSelected },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       } catch (err) {
//         setCards(prevCards);
//         const m = err?.response?.data?.error || "Failed to react on this product";
//         await alertError(m);
//       }
//     },
//     [apiBase, token, isLogged, navigate, cards, alertError]
//   );

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] text-[#0f2a47]">
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pb-8 md:pb-10">
//         <div className="sticky top-0 z-20 pt-4 pb-4 bg-[#FFF6E9]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FFF6E9]/80">
//           <div className="rounded-[1.6rem] p-[1.2px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//             <div className="rounded-[1.6rem] bg-white/95">
//               <div className="p-4 sm:p-6 flex flex-col gap-4">
//                 <div className="flex flex-col md:flex-row gap-3 md:gap-4">
//                   <div className="flex-1 relative">
//                     <span className="absolute inset-y-0 left-3 flex items-center text-[#0f2a47]/60 pointer-events-none">
//                       <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L19 20.49 20.49 19 15.5 14ZM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"/></svg>
//                     </span>
//                     <input
//                       value={textSearch}
//                       onChange={(e) => setTextSearch(e.target.value)}
//                       placeholder="Search services or providers"
//                       className={`${field} w-full pl-10`}
//                       aria-label="Search services or providers"
//                     />
//                   </div>
//                   <div className="flex items-center gap-2 sm:gap-3">
//                     <span className="text-sm font-semibold">Category</span>
//                     <select
//                       value={selectore}
//                       onChange={(e) => setSelectore(e.target.value)}
//                       className={field}
//                       aria-label="Select category"
//                     >
//                       <option value="">All</option>
//                       {categories.map((cat, i) => (
//                         <option key={i} value={cat}>{cat}</option>
//                       ))}
//                     </select>
//                     <button
//                       onClick={() => {
//                         setTextSearch("");
//                         setSelectore("");
//                       }}
//                       className="h-12 px-4 rounded-2xl bg-white text-[#0f2a47] text-sm font-semibold ring-1 ring-[#0f2a47]/15 hover:ring-[#F5C45E] transition"
//                       aria-label="Reset filters"
//                     >
//                       Reset
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
//                   <button
//                     onClick={() => setSelectore("")}
//                     className={`px-4 h-10 rounded-xl text-sm font-semibold ring-1 transition ${selectore === "" ? "bg-[#102E50] text-[#FFF6E9] ring-transparent" : "bg-white text-[#0f2a47] ring-[#0f2a47]/15 hover:ring-[#F5C45E]"}`}
//                     aria-pressed={selectore === ""}
//                     aria-label="Filter All"
//                   >
//                     All
//                   </button>
//                   {categories.map((cat) => (
//                     <button
//                       key={cat}
//                       onClick={() => setSelectore(cat)}
//                       className={`px-4 h-10 rounded-xl text-sm font-semibold ring-1 transition ${selectore === cat ? "bg-[#102E50] text-[#FFF6E9] ring-transparent" : "bg-white text-[#0f2a47] ring-[#0f2a47]/15 hover:ring-[#F5C45E]"}`}
//                       aria-pressed={selectore === cat}
//                       aria-label={`Filter ${cat}`}
//                     >
//                       {cat}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {loading ? (
//           <div className="mt-6 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
//             {Array.from({ length: 8 }).map((_, i) => (
//               <div key={i} className="rounded-2xl overflow-hidden bg-white ring-1 ring-[#0f2a47]/10 animate-pulse">
//                 <div className="w-full h-60 sm:h-64 md:h-72 bg-[#0f2a47]/10" />
//                 <div className="p-5 space-y-3">
//                   <div className="h-5 w-2/3 bg-[#0f2a47]/10 rounded" />
//                   <div className="h-4 w-1/2 bg-[#0f2a47]/10 rounded" />
//                   <div className="h-10 w-full bg-[#0f2a47]/10 rounded-2xl" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <>
//             <div className="mt-6 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
//               {filtered.map((card, i) => {
//                 const pid = Number(card?.product_id);
//                 const isFav = favIds.has(pid);
//                 const inCart = cartIds.has(pid);
//                 const rcCount =
//                   Number(card?.reaction_counts?.love || 0) +
//                   Number(card?.reaction_counts?.support || 0) +
//                   Number(card?.reaction_counts?.proud || 0);

//                 return (
//                   <button
//                     key={i}
//                     onClick={() =>
//                       isLogged
//                         ? navigate(`/productdatails?product_id=${pid}`, { state: { product_id: pid } })
//                         : navigate("/login")
//                     }
//                     className="group rounded-2xl bg-white ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden text-left transition"
//                   >
//                     <div className="relative w-full h-60 sm:h-64 md:h-72 bg-[#0f2a47]/5">
//                       <img
//                         src={toImg(card?.image)}
//                         alt={card?.name || "Product image"}
//                         loading="lazy"
//                         decoding="async"
//                         className="w-full h-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
//                         onError={(e) => {
//                           e.currentTarget.src = defaultImg;
//                         }}
//                       />
//                       <div className="absolute left-3 top-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10">
//                         <span className="w-1.5 h-1.5 rounded-full bg-[#F5C45E]" />
//                         {card?.category_name}
//                       </div>

//                       <div
//                         className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 rounded-xl backdrop-blur bg-white/70 ring-1 ring-[#102E50]/10 px-2 py-1.5"
//                         onClick={(e)=>e.stopPropagation()}
//                       >
//                         <div className="flex items-center gap-2">
//                           <button
//                             onClick={(e)=>handleReact(e, pid, "love")}
//                             className={`text-xs font-extrabold inline-flex items-center gap-1 ${
//                               card.selectedReaction === "love" ? "text-[#BE3D2A]" : "text-[#BE3D2A]/80 hover:text-[#BE3D2A]"
//                             }`}
//                             title="Love"
//                             aria-label="Love reaction"
//                           >
//                             <span>❤️</span>
//                             <span>{card.reaction_counts?.love || 0}</span>
//                           </button>
//                           <button
//                             onClick={(e)=>handleReact(e, pid, "support")}
//                             className={`text-xs font-extrabold inline-flex items-center gap-1 ${
//                               card.selectedReaction === "support" ? "text-[#16A34A]" : "text-[#16A34A]/80 hover:text-[#16A34A]"
//                             }`}
//                             title="Support"
//                             aria-label="Support reaction"
//                           >
//                             <span>🤝</span>
//                             <span>{card.reaction_counts?.support || 0}</span>
//                           </button>
//                           <button
//                             onClick={(e)=>handleReact(e, pid, "proud")}
//                             className={`text-xs font-extrabold inline-flex items-center gap-1 ${
//                               card.selectedReaction === "proud" ? "text-[#F5C45E]" : "text-[#F5C45E]/80 hover:text-[#F5C45E]"
//                             }`}
//                             title="Proud"
//                             aria-label="Proud reaction"
//                           >
//                             <span>⭐</span>
//                             <span>{card.reaction_counts?.proud || 0}</span>
//                           </button>
//                         </div>
//                         <span className="inline-flex items-center justify-center min-w-[26px] h-6 px-2 rounded-full text-xs font-bold bg-[#F5C45E]/20 ring-1 ring-[#F5C45E]/50">
//                           {rcCount}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="px-2.5 sm:px-3 py-2 bg-[#F5C45E]/18 ring-1 ring-[#F5C45E]/35 flex items-center gap-2 justify-between">
//                       <span className="shrink-0 inline-flex items-center rounded-lg bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10 text-[11px] sm:text-xs font-extrabold px-2 py-1">
//                         {money.format(card?.price || 0)}
//                       </span>

//                       <span className="min-w-0 text-[#0f2a47] font-semibold text-[11px] sm:text-xs leading-tight truncate">
//                         {card?.name}
//                       </span>

//                       {role === "customer" && (
//                         <div className="shrink-0 flex items-center gap-2">
//                           <span
//                             onClick={async (e) => {
//                               e.stopPropagation();
//                               try {
//                                 await withMutedAlerts(() => window.AddTOFav ? window.AddTOFav(card, CusData) : Promise.reject(new Error("AddTOFav not provided")));
//                                 const next = new Set(favIds);
//                                 if (isFav) next.delete(pid);
//                                 else next.add(pid);
//                                 setFavIds(next);
//                                 await alertSuccess("Updated", isFav ? "Removed from favorites." : "Added to favorites.");
//                               } catch (e2) {
//                                 const m = e2?.response?.data?.error || e2?.message || "Failed to update favorite";
//                                 await alertError(m);
//                               }
//                             }}
//                             className={`${iconBtnBase} ${isFav ? heartActive : heartInactive}`}
//                             title={isFav ? "In favorites" : "Add to favorites"}
//                             aria-label="Favorite"
//                           >
//                             <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
//                               <path d="M12 21s-6.72-4.32-9.33-7.38A5.5 5.5 0 0 1 12 5.24a5.5 5.5 0 0 1 9.33 8.38C18.72 16.68 12 21 12 21Z" />
//                             </svg>
//                           </span>

//                           <span
//                             onClick={async (e) => {
//                               e.stopPropagation();
//                               try {
//                                 if (inCart) {
//                                   const r = await Swal.fire({
//                                     title: "Already in cart",
//                                     text: "Remove this item from your cart?",
//                                     icon: "info",
//                                     showCancelButton: true,
//                                     confirmButtonText: "Remove",
//                                     cancelButtonText: "Keep",
//                                     confirmButtonColor: "#BE3D2A",
//                                     cancelButtonColor: "#102E50",
//                                     background: "#FFF6E9",
//                                     color: "#102E50",
//                                   });
//                                   if (!r.isConfirmed) return;
//                                 }
//                                 await withMutedAlerts(() => AddToCart(card, CusData));
//                                 const next = new Set(cartIds);
//                                 if (inCart) next.delete(pid);
//                                 else next.add(pid);
//                                 setCartIds(next);
//                                 await alertSuccess(inCart ? "Removed from cart" : "Added to cart", inCart ? "Item removed." : "Item added successfully.");
//                               } catch (e2) {
//                                 const m = e2?.response?.data?.error || e2?.message || "Failed to update cart";
//                                 await alertError(m);
//                               }
//                             }}
//                             className={`${iconBtnBase} ${inCart ? cartActive : cartInactive}`}
//                             title={inCart ? "In cart" : "Add to cart"}
//                             aria-label="Add to Cart"
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                               <circle cx="9" cy="21" r="1" />
//                               <circle cx="20" cy="21" r="1" />
//                               <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6" />
//                             </svg>
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     <div className="h-0.5 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
//                   </button>
//                 );
//               })}
//             </div>

//             {!loading && filtered.length === 0 && (
//               <div className="text-center text-[#0f2a47] mt-14">
//                 <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white ring-1 ring-[#0f2a47]/10">
//                   <span className="w-2 h-2 rounded-full bg-[#F5C45E] animate-pulse" />
//                   No results. Try another search or category.
//                 </div>
//               </div>
//             )}
//           </>
//         )}

//         <div className="mt-10 text-center">
//           <button
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//             className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-[#0f2a47] ring-1 ring-[#0f2a47]/10 hover:ring-[#F5C45E] transition"
//             aria-label="Back to top"
//           >
//             <span className="w-2 h-2 rounded-full bg-[#F5C45E] animate-pulse" />
//             Back to top
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }










// import axios from "axios";
// import { useEffect, useMemo, useState, useCallback } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import defaultImg from "../assets/NoImage.png";
// import ReactionPicker from "./reaction";
// import { useAddToCart } from "./AddToCart";

// export default function GitAllProduct() {
//   const navigate = useNavigate();
//   const { AddToCart } = useAddToCart();
//   const CusData = useSelector((s) => s.UserInfo);
//   const uid = CusData?.user?.user_id;
//   const role = CusData?.user?.role;
//   const token = useSelector((s) => s.UserInfo?.token);
//   const isLogged = Boolean(token);

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const [cards, setCards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [textSearch, setTextSearch] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [selectore, setSelectore] = useState("");
//   const [favIds, setFavIds] = useState(new Set());
//   const [cartIds, setCartIds] = useState(new Set());

//   const withMutedAlerts = useCallback(async (fn) => {
//     const prev = window.alert;
//     window.alert = () => {};
//     try {
//       return await fn();
//     } finally {
//       window.alert = prev;
//     }
//   }, []);

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

//   useEffect(() => {
//     const t = setTimeout(() => setDebouncedSearch(textSearch), 250);
//     return () => clearTimeout(t);
//   }, [textSearch]);

//   useEffect(() => {
//     const run = async () => {
//       if (!uid) return;
//       try {
//         setLoading(true);
//         const res = await axios.get(`${apiBase}/api/ShowCardInUserDashboard/${uid}`);
//         setCards(Array.isArray(res.data) ? res.data : []);
//       } catch {
//         setCards([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     run();
//   }, [apiBase, uid]);

//   const loadFavs = useCallback(async () => {
//     try {
//       if (!token) return;
//       const { data } = await axios.get(`${apiBase}/api/wishlist`.replace("/api/api", "/api"), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const list = Array.isArray(data?.items) ? data.items : [];
//       setFavIds(new Set(list.map((x) => Number(x.product_id))));
//     } catch {}
//   }, [apiBase, token]);

//   const loadCartIds = useCallback(async () => {
//     try {
//       if (!uid || !token) return;
//       const res = await axios.get(`${apiBase}/api/carts/products/${uid}`.replace("/api/api", "/api"), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const list = Array.isArray(res.data?.cards) ? res.data.cards : [];
//       setCartIds(new Set(list.map((c) => Number(c.product_id))));
//     } catch {}
//   }, [apiBase, token, uid]);

//   useEffect(() => {
//     loadFavs();
//     loadCartIds();
//   }, [loadFavs, loadCartIds]);

//   const categories = useMemo(
//     () => [...new Set(cards.map((c) => c?.category_name).filter(Boolean))],
//     [cards]
//   );

//   const toImg = useCallback(
//     (img) => {
//       if (!img) return defaultImg;
//       const s = String(img).trim();
//       if (s.startsWith("http")) return s;
//       return `${apiBase}${s.startsWith("/") ? "" : "/"}${s}`;
//     },
//     [apiBase]
//   );

//   const money = useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }), []);

//   const filtered = cards.filter((card) => {
//     const byName = (card?.name || "").toLowerCase().includes(debouncedSearch.toLowerCase());
//     const byCat = !selectore || (card?.category_name || "").toLowerCase() === String(selectore).toLowerCase();
//     return byName && byCat;
//   });

//   const field =
//     "h-12 px-4 rounded-2xl bg-white/95 text-[#0f2a47] placeholder-[#0f2a47]/60 text-sm outline-none ring-1 ring-[#0f2a47]/15 focus:ring-2 focus:ring-[#F5C45E] transition";

//   const iconBtnBase = "w-7 h-7 rounded-md grid place-items-center shadow hover:shadow-md active:scale-95 transition";
//   const heartInactive = "bg-white ring-1 ring-[#BE3D2A]/30 text-[#BE3D2A]";
//   const heartActive = "bg-[#BE3D2A] text-white";
//   const cartInactive = "bg-white ring-1 ring-[#102E50]/30 text-[#102E50]";
//   const cartActive = "bg-[#102E50] text-[#FFF6E9]";

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] text-[#0f2a47]">
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pb-8 md:pb-10">
//         <div className="sticky top-0 z-20 pt-4 pb-4 bg-[#FFF6E9]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FFF6E9]/80">
//           <div className="rounded-[1.6rem] p-[1.2px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//             <div className="rounded-[1.6rem] bg-white/95">
//               <div className="p-4 sm:px-6 sm:py-6 flex flex-col gap-4">
//                 <div className="flex flex-col md:flex-row gap-3 md:gap-4">
//                   <div className="flex-1 relative">
//                     <span className="absolute inset-y-0 left-3 flex items-center text-[#0f2a47]/60 pointer-events-none">
//                       <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L19 20.49 20.49 19 15.5 14ZM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"/></svg>
//                     </span>
//                     <input
//                       value={textSearch}
//                       onChange={(e) => setTextSearch(e.target.value)}
//                       placeholder="Search services or providers"
//                       className={`${field} w-full pl-10`}
//                       aria-label="Search services or providers"
//                     />
//                   </div>
//                   <div className="flex items-center gap-2 sm:gap-3">
//                     <span className="text-sm font-semibold">Category</span>
//                     <select
//                       value={selectore}
//                       onChange={(e) => setSelectore(e.target.value)}
//                       className={field}
//                       aria-label="Select category"
//                     >
//                       <option value="">All</option>
//                       {categories.map((cat, i) => (
//                         <option key={i} value={cat}>{cat}</option>
//                       ))}
//                     </select>
//                     <button
//                       onClick={() => {
//                         setTextSearch("");
//                         setSelectore("");
//                       }}
//                       className="h-12 px-4 rounded-2xl bg-white text-[#0f2a47] text-sm font-semibold ring-1 ring-[#0f2a47]/15 hover:ring-[#F5C45E] transition"
//                       aria-label="Reset filters"
//                     >
//                       Reset
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
//                   <button
//                     onClick={() => setSelectore("")}
//                     className={`px-4 h-10 rounded-xl text-sm font-semibold ring-1 transition ${selectore === "" ? "bg-[#102E50] text-[#FFF6E9] ring-transparent" : "bg-white text-[#0f2a47] ring-[#0f2a47]/15 hover:ring-[#F5C45E]"}`}
//                     aria-pressed={selectore === ""}
//                     aria-label="Filter All"
//                   >
//                     All
//                   </button>
//                   {categories.map((cat) => (
//                     <button
//                       key={cat}
//                       onClick={() => setSelectore(cat)}
//                       className={`px-4 h-10 rounded-xl text-sm font-semibold ring-1 transition ${selectore === cat ? "bg-[#102E50] text-[#FFF6E9] ring-transparent" : "bg-white text-[#0f2a47] ring-[#0f2a47]/15 hover:ring-[#F5C45E]"}`}
//                       aria-pressed={selectore === cat}
//                       aria-label={`Filter ${cat}`}
//                     >
//                       {cat}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {loading ? (
//           <div className="mt-6 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
//             {Array.from({ length: 8 }).map((_, i) => (
//               <div key={i} className="rounded-2xl overflow-hidden bg-white ring-1 ring-[#0f2a47]/10 animate-pulse">
//                 <div className="w-full h-60 sm:h-64 md:h-72 bg-[#0f2a47]/10" />
//                 <div className="p-5 space-y-3">
//                   <div className="h-5 w-2/3 bg-[#0f2a47]/10 rounded" />
//                   <div className="h-4 w-1/2 bg-[#0f2a47]/10 rounded" />
//                   <div className="h-10 w-full bg-[#0f2a47]/10 rounded-2xl" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <>
//             <div className="mt-6 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
//               {filtered.map((card, i) => {
//                 const pid = Number(card?.product_id);
//                 const isFav = favIds.has(pid);
//                 const inCart = cartIds.has(pid);
//                 const rcCount =
//                   Number(card?.reaction_counts?.love || 0) +
//                   Number(card?.reaction_counts?.support || 0) +
//                   Number(card?.reaction_counts?.proud || 0);

//                 return (
//                   <button
//                     key={i}
//                     onClick={() =>
//                       isLogged
//                         ? navigate(`/productdatails?product_id=${pid}`, { state: { product_id: pid } })
//                         : navigate("/login")
//                     }
//                     className="group rounded-2xl bg-white ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden text-left transition"
//                   >
//                     <div className="relative w-full h-60 sm:h-64 md:h-72 bg-[#0f2a47]/5">
//                       <img
//                         src={toImg(card?.image)}
//                         alt={card?.name || "Product image"}
//                         loading="lazy"
//                         decoding="async"
//                         className="w-full h-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
//                         onError={(e) => {
//                           e.currentTarget.src = defaultImg;
//                         }}
//                       />
//                       <div className="absolute left-3 top-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10">
//                         <span className="w-1.5 h-1.5 rounded-full bg-[#F5C45E]" />
//                         {card?.category_name}
//                       </div>

//                       <div
//                         className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 rounded-xl backdrop-blur bg-white/70 ring-1 ring-[#102E50]/10 px-2 py-1.5"
//                         onClick={(e)=>e.stopPropagation()}
//                       >
//                         <div className="flex items-center">
//                           <ReactionPicker
//                             card={card}
//                             product_id={pid}
//                             userId={uid}
//                             onReactionUpdate={(product_id, reactionCounts, selectedReaction) => {
//                               setCards((prev) =>
//                                 prev.map((c) =>
//                                   c.product_id === product_id ? { ...c, reaction_counts: reactionCounts, selectedReaction } : c
//                                 )
//                               );
//                             }}
//                           />
//                         </div>
//                         <span className="inline-flex items-center justify-center min-w-[26px] h-6 px-2 rounded-full text-xs font-bold bg-[#F5C45E]/20 ring-1 ring-[#F5C45E]/50">
//                           {rcCount}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="px-2.5 sm:px-3 py-2 bg-[#F5C45E]/18 ring-1 ring-[#F5C45E]/35 flex items-center gap-2 justify-between">
//                       <span className="shrink-0 inline-flex items-center rounded-lg bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10 text-[11px] sm:text-xs font-extrabold px-2 py-1">
//                         {money.format(card?.price || 0)}
//                       </span>

//                       <span className="min-w-0 text-[#0f2a47] font-semibold text-[11px] sm:text-xs leading-tight truncate">
//                         {card?.name}
//                       </span>

//                       {role === "customer" && (
//                         <div className="shrink-0 flex items-center gap-2">
//                           <span
//                             onClick={async (e) => {
//                               e.stopPropagation();
//                               try {
//                                 await withMutedAlerts(() => window.AddTOFav ? window.AddTOFav(card, CusData) : Promise.reject(new Error("AddTOFav not provided")));
//                                 const next = new Set(favIds);
//                                 if (isFav) next.delete(pid);
//                                 else next.add(pid);
//                                 setFavIds(next);
//                                 await alertSuccess("Updated", isFav ? "Removed from favorites." : "Added to favorites.");
//                               } catch (e2) {
//                                 const m = e2?.response?.data?.error || e2?.message || "Failed to update favorite";
//                                 await alertError(m);
//                               }
//                             }}
//                             className={`${iconBtnBase} ${isFav ? heartActive : heartInactive}`}
//                             title={isFav ? "In favorites" : "Add to favorites"}
//                             aria-label="Favorite"
//                           >
//                             <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
//                               <path d="M12 21s-6.72-4.32-9.33-7.38A5.5 5.5 0 0 1 12 5.24a5.5 5.5 0 0 1 9.33 8.38C18.72 16.68 12 21 12 21Z" />
//                             </svg>
//                           </span>

//                           <span
//                             onClick={async (e) => {
//                               e.stopPropagation();
//                               try {
//                                 if (inCart) {
//                                   const r = await Swal.fire({
//                                     title: "Already in cart",
//                                     text: "Remove this item from your cart?",
//                                     icon: "info",
//                                     showCancelButton: true,
//                                     confirmButtonText: "Remove",
//                                     cancelButtonText: "Keep",
//                                     confirmButtonColor: "#BE3D2A",
//                                     cancelButtonColor: "#102E50",
//                                     background: "#FFF6E9",
//                                     color: "#102E50",
//                                   });
//                                   if (!r.isConfirmed) return;
//                                 }
//                                 await withMutedAlerts(() => AddToCart(card, CusData));
//                                 const next = new Set(cartIds);
//                                 if (inCart) next.delete(pid);
//                                 else next.add(pid);
//                                 setCartIds(next);
//                                 await alertSuccess(inCart ? "Removed from cart" : "Added to cart", inCart ? "Item removed." : "Item added successfully.");
//                               } catch (e2) {
//                                 const m = e2?.response?.data?.error || e2?.message || "Failed to update cart";
//                                 await alertError(m);
//                               }
//                             }}
//                             className={`${iconBtnBase} ${inCart ? cartActive : cartInactive}`}
//                             title={inCart ? "In cart" : "Add to cart"}
//                             aria-label="Add to Cart"
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                               <circle cx="9" cy="21" r="1" />
//                               <circle cx="20" cy="21" r="1" />
//                               <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6" />
//                             </svg>
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     <div className="h-0.5 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
//                   </button>
//                 );
//               })}
//             </div>

//             {!loading && filtered.length === 0 && (
//               <div className="text-center text-[#0f2a47] mt-14">
//                 <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white ring-1 ring-[#0f2a47]/10">
//                   <span className="w-2 h-2 rounded-full bg-[#F5C45E] animate-pulse" />
//                   No results. Try another search or category.
//                 </div>
//               </div>
//             )}
//           </>
//         )}

//         <div className="mt-10 text-center">
//           <button
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//             className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-[#0f2a47] ring-1 ring-[#0f2a47]/10 hover:ring-[#F5C45E] transition"
//             aria-label="Back to top"
//           >
//             <span className="w-2 h-2 rounded-full bg-[#F5C45E] animate-pulse" />
//             Back to top
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }






// import axios from "axios";
// import { useEffect, useMemo, useState, useCallback } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import defaultImg from "../assets/NoImage.png";
// import ReactionPicker from "./reaction";
// import { useAddToCart } from "./AddToCart";

// export default function GitAllProduct() {
//   const navigate = useNavigate();
//   const { AddToCart } = useAddToCart();
//   const CusData = useSelector((s) => s.UserInfo);
//   const uid = CusData?.user?.user_id;
//   const role = CusData?.user?.role;
//   const token = useSelector((s) => s.UserInfo?.token);
//   const isLogged = Boolean(token);
//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const [cards, setCards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [textSearch, setTextSearch] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [selectore, setSelectore] = useState("");
//   const [favIds, setFavIds] = useState(new Set());
//   const [cartIds, setCartIds] = useState(new Set());

//   useEffect(() => {
//     const t = setTimeout(() => setDebouncedSearch(textSearch), 250);
//     return () => clearTimeout(t);
//   }, [textSearch]);

//   useEffect(() => {
//     const run = async () => {
//       if (!uid) return;
//       try {
//         setLoading(true);
//         const res = await axios.get(`${apiBase}/api/ShowCardInUserDashboard/${uid}`);
//         setCards(Array.isArray(res.data) ? res.data : []);
//       } catch {
//         setCards([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     run();
//   }, [apiBase, uid]);

//   const loadFavs = useCallback(async () => {
//     try {
//       if (!token) return;
//       const { data } = await axios.get(`${apiBase}/api/wishlist`.replace("/api/api", "/api"), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const list = Array.isArray(data?.items) ? data.items : [];
//       setFavIds(new Set(list.map((x) => Number(x.product_id))));
//     } catch {}
//   }, [apiBase, token]);

//   const loadCartIds = useCallback(async () => {
//     try {
//       if (!uid || !token) return;
//       const res = await axios.get(`${apiBase}/api/carts/products/${uid}`.replace("/api/api", "/api"), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const list = Array.isArray(res.data?.cards) ? res.data.cards : [];
//       setCartIds(new Set(list.map((c) => Number(c.product_id))));
//     } catch {}
//   }, [apiBase, token, uid]);

//   useEffect(() => {
//     loadFavs();
//     loadCartIds();
//   }, [loadFavs, loadCartIds]);

//   const categories = useMemo(() => [...new Set(cards.map((c) => c?.category_name).filter(Boolean))], [cards]);

//   const money = useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }), []);

//   const filtered = cards.filter((card) => {
//     const byName = (card?.name || "").toLowerCase().includes(debouncedSearch.toLowerCase());
//     const byCat = !selectore || (card?.category_name || "").toLowerCase() === String(selectore).toLowerCase();
//     return byName && byCat;
//   });

//   const field =
//     "h-12 px-4 rounded-2xl bg-white/95 text-[#0f2a47] placeholder-[#0f2a47]/60 text-sm outline-none ring-1 ring-[#0f2a47]/15 focus:ring-2 focus:ring-[#F5C45E] transition";
//   const iconBtnBase = "w-7 h-7 rounded-md grid place-items-center shadow hover:shadow-md active:scale-95 transition";
//   const heartInactive = "bg-white ring-1 ring-[#BE3D2A]/30 text-[#BE3D2A]";
//   const heartActive = "bg-[#BE3D2A] text-white";
//   const cartInactive = "bg-white ring-1 ring-[#102E50]/30 text-[#102E50]";
//   const cartActive = "bg-[#102E50] text-[#FFF6E9]";

//   const toggleFavorite = useCallback(
//     async (card, isFavNow) => {
//       const pid = Number(card?.product_id);
//       const prev = new Set(favIds);
//       const next = new Set(favIds);
//       if (isFavNow) next.delete(pid);
//       else next.add(pid);
//       setFavIds(next);

//       try {
//         if (!isLogged) {
//           setFavIds(prev);
//           navigate("/login");
//           return;
//         }
//         if (typeof window !== "undefined" && typeof window.AddTOFav === "function") {
//           await window.AddTOFav(card, CusData);
//         } else {
//           await axios.post(
//             `${apiBase}/api/wishlist/toggle`.replace("/api/api", "/api"),
//             { product_id: pid },
//             { headers: { Authorization: `Bearer ${token}` } }
//           );
//         }
//       } catch {
//         setFavIds(prev);
//       }
//     },
//     [favIds, isLogged, navigate, CusData, apiBase, token]
//   );

//   const toggleCart = useCallback(
//     async (card, inCartNow) => {
//       const pid = Number(card?.product_id);
//       const prev = new Set(cartIds);
//       const next = new Set(cartIds);
//       if (inCartNow) next.delete(pid);
//       else next.add(pid);
//       setCartIds(next);

//       try {
//         if (!isLogged) {
//           setCartIds(prev);
//           navigate("/login");
//           return;
//         }
//         await AddToCart(card, CusData);
//       } catch {
//         setCartIds(prev);
//       }
//     },
//     [cartIds, isLogged, navigate, AddToCart, CusData]
//   );

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] text-[#0f2a47]">
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pb-8 md:pb-10">
//         <div className="sticky top-0 z-20 pt-4 pb-4 bg-[#FFF6E9]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FFF6E9]/80">
//           <div className="rounded-[1.6rem] p-[1.2px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//             <div className="rounded-[1.6rem] bg-white/95">
//               <div className="p-4 sm:px-6 sm:py-6 flex flex-col gap-4">
//                 <div className="flex flex-col md:flex-row gap-3 md:gap-4">
//                   <div className="flex-1 relative">
//                     <span className="absolute inset-y-0 left-3 flex items-center text-[#0f2a47]/60 pointer-events-none">
//                       <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
//                         <path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L19 20.49 20.49 19 15.5 14ZM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"/>
//                       </svg>
//                     </span>
//                     <input
//                       value={textSearch}
//                       onChange={(e) => setTextSearch(e.target.value)}
//                       placeholder="Search services or providers"
//                       className={`${field} w-full pl-10`}
//                       aria-label="Search services or providers"
//                     />
//                   </div>
//                   <div className="flex items-center gap-2 sm:gap-3">
//                     <span className="text-sm font-semibold">Category</span>
//                     <select
//                       value={selectore}
//                       onChange={(e) => setSelectore(e.target.value)}
//                       className={field}
//                       aria-label="Select category"
//                     >
//                       <option value="">All</option>
//                       {categories.map((cat, i) => (
//                         <option key={i} value={cat}>{cat}</option>
//                       ))}
//                     </select>
//                     <button
//                       onClick={() => {
//                         setTextSearch("");
//                         setSelectore("");
//                       }}
//                       className="h-12 px-4 rounded-2xl bg-white text-[#0f2a47] text-sm font-semibold ring-1 ring-[#0f2a47]/15 hover:ring-[#F5C45E] transition"
//                       aria-label="Reset filters"
//                     >
//                       Reset
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
//                   <button
//                     onClick={() => setSelectore("")}
//                     className={`px-4 h-10 rounded-xl text-sm font-semibold ring-1 transition ${selectore === "" ? "bg-[#102E50] text-[#FFF6E9] ring-transparent" : "bg-white text-[#0f2a47] ring-[#0f2a47]/15 hover:ring-[#F5C45E]"}`}
//                     aria-pressed={selectore === ""}
//                     aria-label="Filter All"
//                   >
//                     All
//                   </button>
//                   {categories.map((cat) => (
//                     <button
//                       key={cat}
//                       onClick={() => setSelectore(cat)}
//                       className={`px-4 h-10 rounded-xl text-sm font-semibold ring-1 transition ${selectore === cat ? "bg-[#102E50] text-[#FFF6E9] ring-transparent" : "bg-white text-[#0f2a47] ring-[#0f2a47]/15 hover:ring-[#F5C45E]"}`}
//                       aria-pressed={selectore === cat}
//                       aria-label={`Filter ${cat}`}
//                     >
//                       {cat}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {loading ? (
//           <div className="mt-6 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
//             {Array.from({ length: 8 }).map((_, i) => (
//               <div key={i} className="rounded-2xl overflow-hidden bg-white ring-1 ring-[#0f2a47]/10 animate-pulse">
//                 <div className="w-full h-60 sm:h-64 md:h-72 bg-[#0f2a47]/10" />
//                 <div className="p-5 space-y-3">
//                   <div className="h-5 w-2/3 bg-[#0f2a47]/10 rounded" />
//                   <div className="h-4 w-1/2 bg-[#0f2a47]/10 rounded" />
//                   <div className="h-10 w-full bg-[#0f2a47]/10 rounded-2xl" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <>
//             <div className="mt-6 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
//               {filtered.map((card, i) => {
//                 const pid = Number(card?.product_id);
//                 const isFav = favIds.has(pid);
//                 const inCart = cartIds.has(pid);

//                 return (
//                   <button
//                     key={i}
//                     onClick={() =>
//                       isLogged
//                         ? navigate(`/productdatails?product_id=${pid}`, { state: { product_id: pid } })
//                         : navigate("/login")
//                     }
//                     className="group rounded-2xl bg-white ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden text-left transition"
//                   >
//                     <div className="relative w-full h-60 sm:h-64 md:h-72 bg-[#0f2a47]/5 overflow-visible">
//                       <img
//                         src={
//                           card.image
//                             ? card.image.includes("firebase") || card.image.includes("googleapis")
//                               ? card.image
//                               : card.image.startsWith("http")
//                               ? card.image
//                               : `http://localhost:${port}${card.image}`
//                             : defaultImg
//                         }
//                         alt={card?.name || "Product image"}
//                         loading="lazy"
//                         decoding="async"
//                         className="w-full h-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
//                         onError={(e) => {
//                           e.currentTarget.src = defaultImg;
//                         }}
//                       />
//                       <div className="absolute left-3 top-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10">
//                         <span className="w-1.5 h-1.5 rounded-full bg-[#F5C45E]" />
//                         {card?.category_name}
//                       </div>
//                     </div>

//                     <div className="px-2.5 sm:px-3 py-2 bg-[#F5C45E]/18 ring-1 ring-[#F5C45E]/35 flex items-center gap-2 justify-between">
//                       <span className="shrink-0 inline-flex items-center rounded-lg bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10 text-[11px] sm:text-xs font-extrabold px-2 py-1">
//                         {money.format(card?.price || 0)}
//                       </span>
//                       <span className="min-w-0 text-[#0f2a47] font-semibold text-[11px] sm:text-xs leading-tight truncate">
//                         {card?.name}
//                       </span>
//                       {role === "customer" && (
//                         <div className="shrink-0 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
//                           <span
//                             onClick={async () => {
//                               await toggleFavorite(card, isFav);
//                             }}
//                             className={`${iconBtnBase} ${isFav ? heartActive : heartInactive}`}
//                             title={isFav ? "In favorites" : "Add to favorites"}
//                             aria-label="Favorite"
//                           >
//                             <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
//                               <path d="M12 21s-6.72-4.32-9.33-7.38A5.5 5.5 0 0 1 12 5.24a5.5 5.5 0 0 1 9.33 8.38C18.72 16.68 12 21 12 21Z" />
//                             </svg>
//                           </span>
//                           <span
//                             onClick={async () => {
//                               await toggleCart(card, inCart);
//                             }}
//                             className={`${iconBtnBase} ${inCart ? cartActive : cartInactive}`}
//                             title={inCart ? "In cart" : "Add to cart"}
//                             aria-label="Add to Cart"
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                               <circle cx="9" cy="21" r="1" />
//                               <circle cx="20" cy="21" r="1" />
//                               <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6" />
//                             </svg>
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     <div className="h-0.5 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />

//                     <div className="px-2.5 sm:px-3 py-2.5 bg-white/95" onClick={(e) => e.stopPropagation()}>
//                       <ReactionPicker
//                         variant="inline"
//                         product_id={pid}
//                         card={card}
//                         userId={uid}
//                         onReactionUpdate={(product_id, reactionCounts, selectedReaction) => {
//                           setCards((prev) =>
//                             prev.map((c) =>
//                               c.product_id === product_id ? { ...c, reaction_counts: reactionCounts, selectedReaction } : c
//                             )
//                           );
//                         }}
//                       />
//                     </div>
//                   </button>
//                 );
//               })}
//             </div>

//             {!loading && filtered.length === 0 && (
//               <div className="text-center text-[#0f2a47] mt-14">
//                 <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white ring-1 ring-[#0f2a47]/10">
//                   <span className="w-2 h-2 rounded-full bg-[#F5C45E] animate-pulse" />
//                   No results. Try another search or category.
//                 </div>
//               </div>
//             )}
//           </>
//         )}

//         <div className="mt-10 text-center">
//           <button
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//             className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-[#0f2a47] ring-1 ring-[#0f2a47]/10 hover:ring-[#F5C45E] transition"
//             aria-label="Back to top"
//           >
//             <span className="w-2 h-2 rounded-full bg-[#F5C45E] animate-pulse" />
//             Back to top
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }





// import axios from "axios";
// import { useEffect, useMemo, useState, useCallback } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import defaultImg from "../assets/NoImage.png";
// import ReactionPicker from "./reaction";
// import { useAddToCart } from "./AddToCart";
// import AddTOFav from "./AddToFav";

// export default function GitAllProduct() {
//   const navigate = useNavigate();
//   const { AddToCart } = useAddToCart();
//   const CusData = useSelector((s) => s.UserInfo);
//   const uid = CusData?.user?.user_id;
//   const role = CusData?.user?.role;
//   const token = useSelector((s) => s.UserInfo?.token);
//   const isLogged = Boolean(token);

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const [cards, setCards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [textSearch, setTextSearch] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [selectore, setSelectore] = useState("");
//   const [openReactions, setOpenReactions] = useState({});
//   const [favIds, setFavIds] = useState(new Set());
//   const [cartIds, setCartIds] = useState(new Set());

//   useEffect(() => {
//     const t = setTimeout(() => setDebouncedSearch(textSearch), 250);
//     return () => clearTimeout(t);
//   }, [textSearch]);

//   useEffect(() => {
//     const run = async () => {
//       if (!uid) return;
//       try {
//         setLoading(true);
//         const res = await axios.get(`${apiBase}/api/ShowCardInUserDashboard/${uid}`);
//         setCards(Array.isArray(res.data) ? res.data : []);
//       } catch {
//         setCards([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     run();
//   }, [apiBase, uid]);

//   const loadFavs = useCallback(async () => {
//     try {
//       if (!token) return;
//       const { data } = await axios.get(`${apiBase}/api/wishlist`.replace("/api/api", "/api"), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const list = Array.isArray(data?.items) ? data.items : [];
//       setFavIds(new Set(list.map((x) => Number(x.product_id))));
//     } catch {}
//   }, [apiBase, token]);

//   const loadCartIds = useCallback(async () => {
//     try {
//       if (!uid || !token) return;
//       const res = await axios.get(`${apiBase}/api/carts/products/${uid}`.replace("/api/api", "/api"), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const list = Array.isArray(res.data?.cards) ? res.data.cards : [];
//       setCartIds(new Set(list.map((c) => Number(c.product_id))));
//     } catch {}
//   }, [apiBase, token, uid]);

//   useEffect(() => {
//     loadFavs();
//     loadCartIds();
//   }, [loadFavs, loadCartIds]);

//   const categories = useMemo(() => [...new Set(cards.map((c) => c?.category_name).filter(Boolean))], [cards]);

//   const toImg = useCallback(
//     (img) => {
//       if (!img) return defaultImg;
//       const s = String(img).trim();
//       if (s.startsWith("http")) return s;
//       return `${apiBase}${s.startsWith("/") ? "" : "/"}${s}`;
//     },
//     [apiBase]
//   );

//   const money = useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }), []);

//   const filtered = cards.filter((card) => {
//     const byName = (card?.name || "").toLowerCase().includes(debouncedSearch.toLowerCase());
//     const byCat = !selectore || (card?.category_name || "").toLowerCase() === String(selectore).toLowerCase();
//     return byName && byCat;
//   });

//   const field =
//     "h-12 px-4 rounded-2xl bg-white/95 text-[#0f2a47] placeholder-[#0f2a47]/60 text-sm outline-none ring-1 ring-[#0f2a47]/15 focus:ring-2 focus:ring-[#F5C45E] transition";

//   const iconBtnBase = "w-7 h-7 rounded-md grid place-items-center shadow hover:shadow-md active:scale-95 transition";
//   const heartInactive = "bg-white ring-1 ring-[#BE3D2A]/30 text-[#BE3D2A]";
//   const heartActive = "bg-[#BE3D2A] text-white";
//   const cartInactive = "bg-white ring-1 ring-[#102E50]/30 text-[#102E50]";
//   const cartActive = "bg-[#102E50] text-[#FFF6E9]";

//   const totalReactions = (rc) => {
//     if (!rc || typeof rc !== "object") return 0;
//     return Object.values(rc).reduce((a, b) => a + Number(b || 0), 0);
//   };

//   const toggleFavorite = useCallback(
//     async (card, isFavNow) => {
//       const pid = Number(card?.product_id);
//       if (!isLogged) {
//         navigate("/login");
//         return;
//       }
//       const prev = new Set(favIds);
//       const next = new Set(favIds);
//       if (isFavNow) next.delete(pid);
//       else next.add(pid);
//       setFavIds(next);
//       try {
//         await AddTOFav(card, CusData);
//       } catch {
//         setFavIds(prev);
//       }
//     },
//     [favIds, isLogged, navigate, CusData]
//   );

//   const toggleCart = useCallback(
//     async (card, inCartNow) => {
//       const pid = Number(card?.product_id);
//       if (!isLogged) {
//         navigate("/login");
//         return;
//       }
//       const prev = new Set(cartIds);
//       const next = new Set(cartIds);
//       if (inCartNow) next.delete(pid);
//       else next.add(pid);
//       setCartIds(next);
//       try {
//         await AddToCart(card, CusData);
//       } catch {
//         setCartIds(prev);
//       }
//     },
//     [cartIds, isLogged, navigate, AddToCart, CusData]
//   );

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] text-[#0f2a47]">
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pb-8 md:pb-10">
//         <div className="sticky top-0 z-20 pt-4 pb-4 bg-[#FFF6E9]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FFF6E9]/80">
//           <div className="rounded-[1.6rem] p-[1.2px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//             <div className="rounded-[1.6rem] bg-white/95">
//               <div className="p-4 sm:p-6 flex flex-col gap-4">
//                 <div className="flex flex-col md:flex-row gap-3 md:gap-4">
//                   <div className="flex-1 relative">
//                     <span className="absolute inset-y-0 left-3 flex items-center text-[#0f2a47]/60 pointer-events-none">
//                       <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L19 20.49 20.49 19 15.5 14ZM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"/></svg>
//                     </span>
//                     <input
//                       value={textSearch}
//                       onChange={(e) => setTextSearch(e.target.value)}
//                       placeholder="Search services or providers"
//                       className={`${field} w-full pl-10`}
//                     />
//                   </div>
//                   <div className="flex items-center gap-2 sm:gap-3">
//                     <span className="text-sm font-semibold">Category</span>
//                     <select
//                       value={selectore}
//                       onChange={(e) => setSelectore(e.target.value)}
//                       className={field}
//                     >
//                       <option value="">All</option>
//                       {categories.map((cat, i) => (
//                         <option key={i} value={cat}>{cat}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {!loading && (
//           <>
//             <div className="mt-6 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
//               {filtered.map((card) => {
//                 const pid = Number(card?.product_id);
//                 const isFav = favIds.has(pid);
//                 const inCart = cartIds.has(pid);
//                 const rcCount = totalReactions(card?.reaction_counts);

//                 return (
//                   <button
//                     key={pid}
//                     onClick={() =>
//                       isLogged
//                         ? navigate(`/productdatails?product_id=${pid}`, { state: { product_id: pid } })
//                         : navigate("/login")
//                     }
//                     className="group rounded-2xl bg-white ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden text-left transition"
//                   >
//                     <div className="relative w-full h-60 sm:h-64 md:h-72 bg-[#0f2a47]/5">
//                       <img
//                         src={toImg(card?.image)}
//                         alt={card?.name || "Product"}
//                         loading="lazy"
//                         className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]"
//                         onError={(e) => (e.currentTarget.src = defaultImg)}
//                       />
//                     </div>

//                     <div className="px-3 py-2 bg-[#F5C45E]/18 ring-1 ring-[#F5C45E]/35 flex justify-between items-center">
//                       <span className="inline-flex items-center rounded-lg bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10 text-xs font-extrabold px-2 py-1">
//                         {money.format(card?.price || 0)}
//                       </span>
//                       <span className="text-[#0f2a47] font-semibold text-xs truncate">{card?.name}</span>
//                       {role === "customer" && (
//                         <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
//                           <span
//                             onClick={async () => await toggleFavorite(card, isFav)}
//                             className={`${iconBtnBase} ${isFav ? heartActive : heartInactive}`}
//                           >
//                             <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
//                               <path d="M12 21s-6.72-4.32-9.33-7.38A5.5 5.5 0 0112 5.24a5.5 5.5 0 019.33 8.38C18.72 16.68 12 21 12 21Z" />
//                             </svg>
//                           </span>
//                           <span
//                             onClick={async () => await toggleCart(card, inCart)}
//                             className={`${iconBtnBase} ${inCart ? cartActive : cartInactive}`}
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                               <circle cx="9" cy="21" r="1" />
//                               <circle cx="20" cy="21" r="1" />
//                               <path d="M1 1h4l2.68 12.39a2 2 0 002 1.61h7.72a2 2 0 002-1.61L23 6H6" />
//                             </svg>
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     <div className="px-4 pb-5">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setOpenReactions((prev) => ({ ...prev, [pid]: !prev[pid] }));
//                         }}
//                         className="w-full h-10 rounded-xl bg-white text-[#0f2a47] text-sm font-semibold ring-1 ring-[#F5C45E]/40 hover:ring-[#F5C45E] flex items-center justify-center gap-2"
//                       >
//                         <span>🙂</span>
//                         <span>Reactions</span>
//                         <span className="min-w-[26px] h-6 px-2 rounded-full text-xs font-bold bg-[#F5C45E]/20 ring-1 ring-[#F5C45E]/50 flex items-center justify-center">
//                           {rcCount}
//                         </span>
//                       </button>
//                       {openReactions[pid] && (
//                         <div className="mt-3 rounded-2xl bg-[#F5C45E]/15 ring-1 ring-[#F5C45E]/40 p-2" onClick={(e) => e.stopPropagation()}>
//                           <ReactionPicker
//                             card={card}
//                             product_id={pid}
//                             userId={uid}
//                             onReactionUpdate={(product_id, reactionCounts, selectedReaction) =>
//                               setCards((prev) =>
//                                 prev.map((c) =>
//                                   c.product_id === product_id
//                                     ? { ...c, reaction_counts: reactionCounts, selectedReaction }
//                                     : c
//                                 )
//                               )
//                             }
//                           />
//                         </div>
//                       )}
//                     </div>

//                     <div className="h-0.5 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
//                   </button>
//                 );
//               })}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }





// اوبشن فيه رياكشنز حلوين 


// import axios from "axios";
// import { useEffect, useMemo, useState, useCallback } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import defaultImg from "../assets/NoImage.png";
// import { useAddToCart } from "./AddToCart";

// export default function GitAllProduct() {
//   const navigate = useNavigate();
//   const { AddToCart } = useAddToCart();
//   const CusData = useSelector((s) => s.UserInfo);
//   const uid = CusData?.user?.user_id;
//   const role = CusData?.user?.role;
//   const token = useSelector((s) => s.UserInfo?.token);
//   const isLogged = Boolean(token);

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const [cards, setCards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [textSearch, setTextSearch] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [selectore, setSelectore] = useState("");
//   const [favIds, setFavIds] = useState(new Set());
//   const [cartIds, setCartIds] = useState(new Set());

//   const withMutedAlerts = useCallback(async (fn) => {
//     const prev = window.alert;
//     window.alert = () => {};
//     try {
//       return await fn();
//     } finally {
//       window.alert = prev;
//     }
//   }, []);

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

//   useEffect(() => {
//     const t = setTimeout(() => setDebouncedSearch(textSearch), 250);
//     return () => clearTimeout(t);
//   }, [textSearch]);

//   useEffect(() => {
//     const run = async () => {
//       if (!uid) return;
//       try {
//         setLoading(true);
//         const res = await axios.get(`${apiBase}/api/ShowCardInUserDashboard/${uid}`);
//         setCards(Array.isArray(res.data) ? res.data : []);
//       } catch {
//         setCards([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     run();
//   }, [apiBase, uid]);

//   const loadFavs = useCallback(async () => {
//     try {
//       if (!token) return;
//       const { data } = await axios.get(`${apiBase}/api/wishlist`.replace("/api/api", "/api"), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const list = Array.isArray(data?.items) ? data.items : [];
//       setFavIds(new Set(list.map((x) => Number(x.product_id))));
//     } catch {}
//   }, [apiBase, token]);

//   const loadCartIds = useCallback(async () => {
//     try {
//       if (!uid || !token) return;
//       const res = await axios.get(`${apiBase}/api/carts/products/${uid}`.replace("/api/api", "/api"), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const list = Array.isArray(res.data?.cards) ? res.data.cards : [];
//       setCartIds(new Set(list.map((c) => Number(c.product_id))));
//     } catch {}
//   }, [apiBase, token, uid]);

//   useEffect(() => {
//     loadFavs();
//     loadCartIds();
//   }, [loadFavs, loadCartIds]);

//   const categories = useMemo(
//     () => [...new Set(cards.map((c) => c?.category_name).filter(Boolean))],
//     [cards]
//   );

//   const toImg = useCallback(
//     (img) => {
//       if (!img) return defaultImg;
//       const s = String(img).trim();
//       if (s.startsWith("http")) return s;
//       return `${apiBase}${s.startsWith("/") ? "" : "/"}${s}`;
//     },
//     [apiBase]
//   );

//   const money = useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }), []);

//   const filtered = cards.filter((card) => {
//     const byName = (card?.name || "").toLowerCase().includes(debouncedSearch.toLowerCase());
//     const byCat = !selectore || (card?.category_name || "").toLowerCase() === String(selectore).toLowerCase();
//     return byName && byCat;
//   });

//   const field =
//     "h-12 px-4 rounded-2xl bg-white/95 text-[#0f2a47] placeholder-[#0f2a47]/60 text-sm outline-none ring-1 ring-[#0f2a47]/15 focus:ring-2 focus:ring-[#F5C45E] transition";

//   const iconBtnBase = "w-7 h-7 rounded-md grid place-items-center shadow hover:shadow-md active:scale-95 transition";
//   const heartInactive = "bg-white ring-1 ring-[#BE3D2A]/30 text-[#BE3D2A]";
//   const heartActive = "bg-[#BE3D2A] text-white";
//   const cartInactive = "bg-white ring-1 ring-[#102E50]/30 text-[#102E50]";
//   const cartActive = "bg-[#102E50] text-[#FFF6E9]";

//   const handleReact = useCallback(
//     async (e, product_id, reactionKey) => {
//       e.stopPropagation();
//       if (!isLogged) {
//         navigate("/login");
//         return;
//       }
//       const allowed = ["love", "support", "proud"];
//       if (!allowed.includes(reactionKey)) return;

//       const prevCards = cards;
//       const nextCards = cards.map((c) => {
//         if (Number(c.product_id) !== Number(product_id)) return c;
//         const prevSelected = c.selectedReaction || null;
//         const counts = { love: 0, support: 0, proud: 0, ...(c.reaction_counts || {}) };
//         if (prevSelected && counts[prevSelected] > 0) counts[prevSelected] = Number(counts[prevSelected]) - 1;
//         let newSelected = reactionKey;
//         if (prevSelected === reactionKey) {
//           newSelected = null;
//         } else {
//           counts[reactionKey] = Number(counts[reactionKey] || 0) + 1;
//         }
//         return { ...c, reaction_counts: counts, selectedReaction: newSelected };
//       });

//       setCards(nextCards);

//       try {
//         const currentSelected =
//           nextCards.find((c) => Number(c.product_id) === Number(product_id))?.selectedReaction || null;
//         await axios.post(
//           `${apiBase}/api/products/${product_id}/react`,
//           { reaction: currentSelected },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       } catch (err) {
//         setCards(prevCards);
//         const m = err?.response?.data?.error || "Failed to react on this product";
//         await alertError(m);
//       }
//     },
//     [apiBase, token, isLogged, navigate, cards, alertError]
//   );

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] text-[#0f2a47]">
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pb-8 md:pb-10">
//         <div className="sticky top-0 z-20 pt-4 pb-4 bg-[#FFF6E9]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FFF6E9]/80">
//           <div className="rounded-[1.6rem] p-[1.2px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//             <div className="rounded-[1.6rem] bg-white/95">
//               <div className="p-4 sm:p-6 flex flex-col gap-4">
//                 <div className="flex flex-col md:flex-row gap-3 md:gap-4">
//                   <div className="flex-1 relative">
//                     <span className="absolute inset-y-0 left-3 flex items-center text-[#0f2a47]/60 pointer-events-none">
//                       <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L19 20.49 20.49 19 15.5 14ZM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"/></svg>
//                     </span>
//                     <input
//                       value={textSearch}
//                       onChange={(e) => setTextSearch(e.target.value)}
//                       placeholder="Search services or providers"
//                       className={`${field} w-full pl-10`}
//                       aria-label="Search services or providers"
//                     />
//                   </div>
//                   <div className="flex items-center gap-2 sm:gap-3">
//                     <span className="text-sm font-semibold">Category</span>
//                     <select
//                       value={selectore}
//                       onChange={(e) => setSelectore(e.target.value)}
//                       className={field}
//                       aria-label="Select category"
//                     >
//                       <option value="">All</option>
//                       {categories.map((cat, i) => (
//                         <option key={i} value={cat}>{cat}</option>
//                       ))}
//                     </select>
//                     <button
//                       onClick={() => {
//                         setTextSearch("");
//                         setSelectore("");
//                       }}
//                       className="h-12 px-4 rounded-2xl bg-white text-[#0f2a47] text-sm font-semibold ring-1 ring-[#0f2a47]/15 hover:ring-[#F5C45E] transition"
//                       aria-label="Reset filters"
//                     >
//                       Reset
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
//                   <button
//                     onClick={() => setSelectore("")}
//                     className={`px-4 h-10 rounded-xl text-sm font-semibold ring-1 transition ${selectore === "" ? "bg-[#102E50] text-[#FFF6E9] ring-transparent" : "bg-white text-[#0f2a47] ring-[#0f2a47]/15 hover:ring-[#F5C45E]"}`}
//                     aria-pressed={selectore === ""}
//                     aria-label="Filter All"
//                   >
//                     All
//                   </button>
//                   {categories.map((cat) => (
//                     <button
//                       key={cat}
//                       onClick={() => setSelectore(cat)}
//                       className={`px-4 h-10 rounded-xl text-sm font-semibold ring-1 transition ${selectore === cat ? "bg-[#102E50] text-[#FFF6E9] ring-transparent" : "bg-white text-[#0f2a47] ring-[#0f2a47]/15 hover:ring-[#F5C45E]"}`}
//                       aria-pressed={selectore === cat}
//                       aria-label={`Filter ${cat}`}
//                     >
//                       {cat}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {loading ? (
//           <div className="mt-6 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
//             {Array.from({ length: 8 }).map((_, i) => (
//               <div key={i} className="rounded-2xl overflow-hidden bg-white ring-1 ring-[#0f2a47]/10 animate-pulse">
//                 <div className="w-full h-60 sm:h-64 md:h-72 bg-[#0f2a47]/10" />
//                 <div className="p-5 space-y-3">
//                   <div className="h-5 w-2/3 bg-[#0f2a47]/10 rounded" />
//                   <div className="h-4 w-1/2 bg-[#0f2a47]/10 rounded" />
//                   <div className="h-10 w-full bg-[#0f2a47]/10 rounded-2xl" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <>
//             <div className="mt-6 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
//               {filtered.map((card, i) => {
//                 const pid = Number(card?.product_id);
//                 const isFav = favIds.has(pid);
//                 const inCart = cartIds.has(pid);

//                 return (
//                   <button
//                     key={i}
//                     onClick={() =>
//                       isLogged
//                         ? navigate(`/productdatails?product_id=${pid}`, { state: { product_id: pid } })
//                         : navigate("/login")
//                     }
//                     className="group rounded-2xl bg-white ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden text-left transition"
//                   >
//                     <div className="relative w-full h-60 sm:h-64 md:h-72 bg-[#0f2a47]/5">
//                       <img
//                         src={toImg(card?.image)}
//                         alt={card?.name || "Product image"}
//                         loading="lazy"
//                         decoding="async"
//                         className="w-full h-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
//                         onError={(e) => {
//                           e.currentTarget.src = defaultImg;
//                         }}
//                       />
//                       <div className="absolute left-3 top-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10">
//                         <span className="w-1.5 h-1.5 rounded-full bg-[#F5C45E]" />
//                         {card?.category_name}
//                       </div>
//                     </div>

//                     <div className="px-2.5 sm:px-3 py-2 bg-[#F5C45E]/18 ring-1 ring-[#F5C45E]/35 flex items-center gap-2 justify-between">
//                       <span className="shrink-0 inline-flex items-center rounded-lg bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10 text-[11px] sm:text-xs font-extrabold px-2 py-1">
//                         {money.format(card?.price || 0)}
//                       </span>

//                       <span className="min-w-0 text-[#0f2a47] font-semibold text-[11px] sm:text-xs leading-tight truncate">
//                         {card?.name}
//                       </span>

//                       {role === "customer" && (
//                         <div className="shrink-0 flex items-center gap-2">
//                           <span
//                             onClick={async (e) => {
//                               e.stopPropagation();
//                               try {
//                                 await withMutedAlerts(() => window.AddTOFav ? window.AddTOFav(card, CusData) : Promise.reject(new Error("AddTOFav not provided")));
//                                 const next = new Set(favIds);
//                                 if (isFav) next.delete(pid);
//                                 else next.add(pid);
//                                 setFavIds(next);
//                                 await alertSuccess("Updated", isFav ? "Removed from favorites." : "Added to favorites.");
//                               } catch (e2) {
//                                 const m = e2?.response?.data?.error || e2?.message || "Failed to update favorite";
//                                 await alertError(m);
//                               }
//                             }}
//                             className={`${iconBtnBase} ${isFav ? heartActive : heartInactive}`}
//                             title={isFav ? "In favorites" : "Add to favorites"}
//                             aria-label="Favorite"
//                           >
//                             <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
//                               <path d="M12 21s-6.72-4.32-9.33-7.38A5.5 5.5 0 0 1 12 5.24a5.5 5.5 0 0 1 9.33 8.38C18.72 16.68 12 21 12 21Z" />
//                             </svg>
//                           </span>

//                           <span
//                             onClick={async (e) => {
//                               e.stopPropagation();
//                               try {
//                                 if (inCart) {
//                                   const r = await Swal.fire({
//                                     title: "Already in cart",
//                                     text: "Remove this item from your cart?",
//                                     icon: "info",
//                                     showCancelButton: true,
//                                     confirmButtonText: "Remove",
//                                     cancelButtonText: "Keep",
//                                     confirmButtonColor: "#BE3D2A",
//                                     cancelButtonColor: "#102E50",
//                                     background: "#FFF6E9",
//                                     color: "#102E50",
//                                   });
//                                   if (!r.isConfirmed) return;
//                                 }
//                                 await withMutedAlerts(() => AddToCart(card, CusData));
//                                 const next = new Set(cartIds);
//                                 if (inCart) next.delete(pid);
//                                 else next.add(pid);
//                                 setCartIds(next);
//                                 await alertSuccess(inCart ? "Removed from cart" : "Added to cart", inCart ? "Item removed." : "Item added successfully.");
//                               } catch (e2) {
//                                 const m = e2?.response?.data?.error || e2?.message || "Failed to update cart";
//                                 await alertError(m);
//                               }
//                             }}
//                             className={`${iconBtnBase} ${inCart ? cartActive : cartInactive}`}
//                             title={inCart ? "In cart" : "Add to cart"}
//                             aria-label="Add to Cart"
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                               <circle cx="9" cy="21" r="1" />
//                               <circle cx="20" cy="21" r="1" />
//                               <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6" />
//                             </svg>
//                           </span>
//                         </div>
//                       )}
//                     </div>










//                     <div className="px-4 sm:px-5 pb-4 sm:pb-5">
//                       <div className="h-10 w-full rounded-xl bg-white ring-1 ring-[#102E50]/10 flex items-center justify-around">
//                         <button
//                           onClick={(e) => handleReact(e, pid, "love")}
//                           className={`text-xs font-extrabold inline-flex items-center gap-1 ${
//                             card.selectedReaction === "love" ? "text-[#BE3D2A]" : "text-[#BE3D2A]/80 hover:text-[#BE3D2A]"
//                           }`}
//                           title="Love"
//                           aria-label="Love reaction"
//                         >
//                           <span>❤️</span>
//                           <span>{card.reaction_counts?.love || 0}</span>
//                         </button>
//                         <button
//                           onClick={(e) => handleReact(e, pid, "support")}
//                           className={`text-xs font-extrabold inline-flex items-center gap-1 ${
//                             card.selectedReaction === "support" ? "text-[#16A34A]" : "text-[#16A34A]/80 hover:text-[#16A34A]"
//                           }`}
//                           title="Support"
//                           aria-label="Support reaction"
//                         >
//                           <span>🤝</span>
//                           <span>{card.reaction_counts?.support || 0}</span>
//                         </button>
//                         <button
//                           onClick={(e) => handleReact(e, pid, "proud")}
//                           className={`text-xs font-extrabold inline-flex items-center gap-1 ${
//                             card.selectedReaction === "proud" ? "text-[#F5C45E]" : "text-[#F5C45E]/80 hover:text-[#F5C45E]"
//                           }`}
//                           title="Proud"
//                           aria-label="Proud reaction"
//                         >
//                           <span>⭐</span>
//                           <span>{card.reaction_counts?.proud || 0}</span>
//                         </button>
//                       </div>
//                     </div>


//                     <div className="h-0.5 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
//                   </button>
//                 );
//               })}
//             </div>

//             {!loading && filtered.length === 0 && (
//               <div className="text-center text-[#0f2a47] mt-14">
//                 <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white ring-1 ring-[#0f2a47]/10">
//                   <span className="w-2 h-2 rounded-full bg-[#F5C45E] animate-pulse" />
//                   No results. Try another search or category.
//                 </div>
//               </div>
//             )}
//           </>
//         )}

//         <div className="mt-10 text-center">
//           <button
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//             className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-[#0f2a47] ring-1 ring-[#0f2a47]/10 hover:ring-[#F5C45E] transition"
//             aria-label="Back to top"
//           >
//             <span className="w-2 h-2 rounded-full bg-[#F5C45E] animate-pulse" />
//             Back to top
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }






// import axios from "axios";
// import { useEffect, useMemo, useState, useCallback } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import defaultImg from "../assets/NoImage.png";
// import { useAddToCart } from "./AddToCart";
// import AddTOFav from "./AddToFav";

// export default function GitAllProduct() {
//   const navigate = useNavigate();
//   const { AddToCart } = useAddToCart();
//   const CusData = useSelector((s) => s.UserInfo);
//   const uid = CusData?.user?.user_id;
//   const role = CusData?.user?.role;
//   const token = useSelector((s) => s.UserInfo?.token);
//   const isLogged = Boolean(token);

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const [cards, setCards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [textSearch, setTextSearch] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [selectore, setSelectore] = useState("");
//   const [favIds, setFavIds] = useState(new Set());
//   const [cartIds, setCartIds] = useState(new Set());

//   useEffect(() => {
//     const t = setTimeout(() => setDebouncedSearch(textSearch), 250);
//     return () => clearTimeout(t);
//   }, [textSearch]);

//   useEffect(() => {
//     const run = async () => {
//       if (!uid) return;
//       try {
//         setLoading(true);
//         const res = await axios.get(`${apiBase}/api/ShowCardInUserDashboard/${uid}`);
//         setCards(Array.isArray(res.data) ? res.data : []);
//       } catch {
//         setCards([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     run();
//   }, [apiBase, uid]);

//   const loadFavs = useCallback(async () => {
//     try {
//       if (!token) return;
//       const { data } = await axios.get(`${apiBase}/api/wishlist`.replace("/api/api", "/api"), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const list = Array.isArray(data?.items) ? data.items : [];
//       setFavIds(new Set(list.map((x) => Number(x.product_id))));
//     } catch {}
//   }, [apiBase, token]);

//   const loadCartIds = useCallback(async () => {
//     try {
//       if (!uid || !token) return;
//       const res = await axios.get(`${apiBase}/api/carts/products/${uid}`.replace("/api/api", "/api"), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const list = Array.isArray(res.data?.cards) ? res.data.cards : [];
//       setCartIds(new Set(list.map((c) => Number(c.product_id))));
//     } catch {}
//   }, [apiBase, token, uid]);

//   useEffect(() => {
//     loadFavs();
//     loadCartIds();
//   }, [loadFavs, loadCartIds]);

//   const categories = useMemo(() => [...new Set(cards.map((c) => c?.category_name).filter(Boolean))], [cards]);

//   const toImg = useCallback(
//     (img) => {
//       if (!img) return defaultImg;
//       const s = String(img).trim();
//       if (s.startsWith("http")) return s;
//       return `${apiBase}${s.startsWith("/") ? "" : "/"}${s}`;
//     },
//     [apiBase]
//   );

//   const money = useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }), []);

//   const filtered = cards.filter((card) => {
//     const byName = (card?.name || "").toLowerCase().includes(debouncedSearch.toLowerCase());
//     const byCat = !selectore || (card?.category_name || "").toLowerCase() === String(selectore).toLowerCase();
//     return byName && byCat;
//   });

//   const field =
//     "h-12 px-4 rounded-2xl bg-white/95 text-[#0f2a47] placeholder-[#0f2a47]/60 text-sm outline-none ring-1 ring-[#0f2a47]/15 focus:ring-2 focus:ring-[#F5C45E] transition";

//   const iconBtnBase = "w-7 h-7 rounded-md grid place-items-center shadow hover:shadow-md active:scale-95 transition";
//   const heartInactive = "bg-white ring-1 ring-[#BE3D2A]/30 text-[#BE3D2A]";
//   const heartActive = "bg-[#BE3D2A] text-white";
//   const cartInactive = "bg-white ring-1 ring-[#102E50]/30 text-[#102E50]";
//   const cartActive = "bg-[#102E50] text-[#FFF6E9]";

//   const totalReactions = (rc) => {
//     if (!rc || typeof rc !== "object") return 0;
//     return Object.values(rc).reduce((a, b) => a + Number(b || 0), 0);
//   };

//   const toggleFavorite = useCallback(
//     async (card, isFavNow) => {
//       const pid = Number(card?.product_id);
//       if (!isLogged) {
//         navigate("/login");
//         return;
//       }
//       const prev = new Set(favIds);
//       const next = new Set(favIds);
//       if (isFavNow) next.delete(pid);
//       else next.add(pid);
//       setFavIds(next);
//       try {
//         await AddTOFav(card, CusData);
//       } catch {
//         setFavIds(prev);
//       }
//     },
//     [favIds, isLogged, navigate, CusData]
//   );

//   const toggleCart = useCallback(
//     async (card, inCartNow) => {
//       const pid = Number(card?.product_id);
//       if (!isLogged) {
//         navigate("/login");
//         return;
//       }
//       const prev = new Set(cartIds);
//       const next = new Set(cartIds);
//       if (inCartNow) next.delete(pid);
//       else next.add(pid);
//       setCartIds(next);
//       try {
//         await AddToCart(card, CusData);
//       } catch {
//         setCartIds(prev);
//       }
//     },
//     [cartIds, isLogged, navigate, AddToCart, CusData]
//   );

//   const handleReact = useCallback(
//     async (e, product_id, reactionKey) => {
//       e.stopPropagation();
//       if (!isLogged) {
//         navigate("/login");
//         return;
//       }
//       const allowed = ["love", "support", "proud"];
//       if (!allowed.includes(reactionKey)) return;

//       const prevCards = cards;
//       const nextCards = cards.map((c) => {
//         if (Number(c.product_id) !== Number(product_id)) return c;
//         const prevSelected = c.selectedReaction || null;
//         const counts = { love: 0, support: 0, proud: 0, ...(c.reaction_counts || {}) };
//         if (prevSelected && counts[prevSelected] > 0) counts[prevSelected] = Number(counts[prevSelected]) - 1;
//         let newSelected = reactionKey;
//         if (prevSelected === reactionKey) {
//           newSelected = null;
//         } else {
//           counts[reactionKey] = Number(counts[reactionKey] || 0) + 1;
//         }
//         return { ...c, reaction_counts: counts, selectedReaction: newSelected };
//       });

//       setCards(nextCards);

//       try {
//         const currentSelected =
//           nextCards.find((c) => Number(c.product_id) === Number(product_id))?.selectedReaction || null;
//         await axios.post(
//           `${apiBase}/api/products/${product_id}/react`,
//           { reaction: currentSelected },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       } catch {
//         setCards(prevCards);
//       }
//     },
//     [apiBase, token, isLogged, navigate, cards]
//   );

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] text-[#0f2a47]">
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pb-8 md:pb-10">
//         <div className="sticky top-0 z-20 pt-4 pb-4 bg-[#FFF6E9]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FFF6E9]/80">
//           <div className="rounded-[1.6rem] p-[1.2px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//             <div className="rounded-[1.6rem] bg-white/95">
//               <div className="p-4 sm:p-6 flex flex-col gap-4">
//                 <div className="flex flex-col md:flex-row gap-3 md:gap-4">
//                   <div className="flex-1 relative">
//                     <span className="absolute inset-y-0 left-3 flex items-center text-[#0f2a47]/60 pointer-events-none">
//                       <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L19 20.49 20.49 19 15.5 14ZM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"/></svg>
//                     </span>
//                     <input
//                       value={textSearch}
//                       onChange={(e) => setTextSearch(e.target.value)}
//                       placeholder="Search services or providers"
//                       className={`${field} w-full pl-10`}
//                     />
//                   </div>
//                   <div className="flex items-center gap-2 sm:gap-3">
//                     <span className="text-sm font-semibold">Category</span>
//                     <select
//                       value={selectore}
//                       onChange={(e) => setSelectore(e.target.value)}
//                       className={field}
//                     >
//                       <option value="">All</option>
//                       {categories.map((cat, i) => (
//                         <option key={i} value={cat}>{cat}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {!loading && (
//           <>
//             <div className="mt-6 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
//               {filtered.map((card) => {
//                 const pid = Number(card?.product_id);
//                 const isFav = favIds.has(pid);
//                 const inCart = cartIds.has(pid);
//                 const rcCount = totalReactions(card?.reaction_counts);

//                 return (
//                   <button
//                     key={pid}
//                     onClick={() =>
//                       isLogged
//                         ? navigate(`/productdatails?product_id=${pid}`, { state: { product_id: pid } })
//                         : navigate("/login")
//                     }
//                     className="group rounded-2xl bg-white ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden text-left transition"
//                   >
//                     <div className="relative w-full h-60 sm:h-64 md:h-72 bg-[#0f2a47]/5">
//                       <img
//                         src={toImg(card?.image)}
//                         alt={card?.name || "Product"}
//                         loading="lazy"
//                         className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]"
//                         onError={(e) => (e.currentTarget.src = defaultImg)}
//                       />
//                     </div>

//                     <div className="px-3 py-2 bg-[#F5C45E]/18 ring-1 ring-[#F5C45E]/35 flex justify-between items-center">
//                       <span className="inline-flex items-center rounded-lg bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10 text-xs font-extrabold px-2 py-1">
//                         {money.format(card?.price || 0)}
//                       </span>
//                       <span className="text-[#0f2a47] font-semibold text-xs truncate">{card?.name}</span>
//                       {role === "customer" && (
//                         <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
//                           <span
//                             onClick={async () => await toggleFavorite(card, isFav)}
//                             className={`${iconBtnBase} ${isFav ? heartActive : heartInactive}`}
//                           >
//                             <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
//                               <path d="M12 21s-6.72-4.32-9.33-7.38A5.5 5.5 0 0112 5.24a5.5 5.5 0 019.33 8.38C18.72 16.68 12 21 12 21Z" />
//                             </svg>
//                           </span>
//                           <span
//                             onClick={async () => await toggleCart(card, inCart)}
//                             className={`${iconBtnBase} ${inCart ? cartActive : cartInactive}`}
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                               <circle cx="9" cy="21" r="1" />
//                               <circle cx="20" cy="21" r="1" />
//                               <path d="M1 1h4l2.68 12.39a2 2 0 002 1.61h7.72a2 2 0 002-1.61L23 6H6" />
//                             </svg>
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     <div className="px-4 pb-5">
//                       <div className="h-10 w-full rounded-xl bg-white ring-1 ring-[#102E50]/10 flex items-center justify-around" onClick={(e) => e.stopPropagation()}>
//                         <button
//                           onClick={(e) => handleReact(e, pid, "love")}
//                           className={`text-xs font-extrabold inline-flex items-center gap-1 ${card.selectedReaction === "love" ? "text-[#BE3D2A]" : "text-[#BE3D2A]/80 hover:text-[#BE3D2A]"}`}
//                           title="Love"
//                         >
//                           <span>❤️</span>
//                           <span>{card.reaction_counts?.love || 0}</span>
//                         </button>
//                         <button
//                           onClick={(e) => handleReact(e, pid, "support")}
//                           className={`text-xs font-extrabold inline-flex items-center gap-1 ${card.selectedReaction === "support" ? "text-[#16A34A]" : "text-[#16A34A]/80 hover:text-[#16A34A]"}`}
//                           title="Support"
//                         >
//                           <span>🤝</span>
//                           <span>{card.reaction_counts?.support || 0}</span>
//                         </button>
//                         <button
//                           onClick={(e) => handleReact(e, pid, "proud")}
//                           className={`text-xs font-extrabold inline-flex items-center gap-1 ${card.selectedReaction === "proud" ? "text-[#F5C45E]" : "text-[#F5C45E]/80 hover:text-[#F5C45E]"}`}
//                           title="Proud"
//                         >
//                           <span>⭐</span>
//                           <span>{card.reaction_counts?.proud || 0}</span>
//                         </button>
//                         <div className="ml-2 px-2 py-1 rounded-lg text-[10px] font-bold bg-[#F5C45E]/20 ring-1 ring-[#F5C45E]/40">
//                           {rcCount}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="h-0.5 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
//                   </button>
//                 );
//               })}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


"testtt";



// import axios from "axios";
// import { useEffect, useMemo, useState, useCallback } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import defaultImg from "../assets/NoImage.png";
// import ReactionPicker from "./reaction";
// import { useAddToCart } from "./AddToCart";
// import AddTOFav from "./AddToFav";

// export default function GitAllProduct() {
//   const navigate = useNavigate();
//   const { AddToCart } = useAddToCart();
//   const CusData = useSelector((s) => s.UserInfo);
//   const uid = CusData?.user?.user_id;
//   const role = CusData?.user?.role;
//   const token = useSelector((s) => s.UserInfo?.token);
//   const isLogged = Boolean(token);

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const [cards, setCards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [textSearch, setTextSearch] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [selectore, setSelectore] = useState("");
//   const [openReactions, setOpenReactions] = useState({});
//   const [favIds, setFavIds] = useState(new Set());
//   const [cartIds, setCartIds] = useState(new Set());

//   useEffect(() => {
//     const t = setTimeout(() => setDebouncedSearch(textSearch), 250);
//     return () => clearTimeout(t);
//   }, [textSearch]);

//   useEffect(() => {
//     const run = async () => {
//       if (!uid) return;
//       try {
//         setLoading(true);
//         const res = await axios.get(`${apiBase}/api/ShowCardInUserDashboard/${uid}`);
//         setCards(Array.isArray(res.data) ? res.data : []);
//       } catch {
//         setCards([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     run();
//   }, [apiBase, uid]);

//   const loadFavs = useCallback(async () => {
//     try {
//       if (!token) return;
//       const { data } = await axios.get(`${apiBase}/api/wishlist`.replace("/api/api", "/api"), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const list = Array.isArray(data?.items) ? data.items : [];
//       setFavIds(new Set(list.map((x) => Number(x.product_id))));
//     } catch {}
//   }, [apiBase, token]);

//   const loadCartIds = useCallback(async () => {
//     try {
//       if (!uid || !token) return;
//       const res = await axios.get(`${apiBase}/api/carts/products/${uid}`.replace("/api/api", "/api"), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const list = Array.isArray(res.data?.cards) ? res.data.cards : [];
//       setCartIds(new Set(list.map((c) => Number(c.product_id))));
//     } catch {}
//   }, [apiBase, token, uid]);

//   useEffect(() => {
//     loadFavs();
//     loadCartIds();
//   }, [loadFavs, loadCartIds]);

//   const categories = useMemo(() => [...new Set(cards.map((c) => c?.category_name).filter(Boolean))], [cards]);

//   const toImg = useCallback(
//     (img) => {
//       if (!img) return defaultImg;
//       const s = String(img).trim();
//       if (s.startsWith("http")) return s;
//       return `${apiBase}${s.startsWith("/") ? "" : "/"}${s}`;
//     },
//     [apiBase]
//   );

//   const money = useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }), []);

//   const filtered = cards.filter((card) => {
//     const byName = (card?.name || "").toLowerCase().includes(debouncedSearch.toLowerCase());
//     const byCat = !selectore || (card?.category_name || "").toLowerCase() === String(selectore).toLowerCase();
//     return byName && byCat;
//   });

//   const field =
//     "h-12 px-4 rounded-2xl bg-white/95 text-[#0f2a47] placeholder-[#0f2a47]/60 text-sm outline-none ring-1 ring-[#0f2a47]/15 focus:ring-2 focus:ring-[#F5C45E] transition";

//   const iconBtnBase = "w-7 h-7 rounded-md grid place-items-center shadow hover:shadow-md active:scale-95 transition";
//   const heartInactive = "bg-white ring-1 ring-[#BE3D2A]/30 text-[#BE3D2A]";
//   const heartActive = "bg-[#BE3D2A] text-white";
//   const cartInactive = "bg-white ring-1 ring-[#102E50]/30 text-[#102E50]";
//   const cartActive = "bg-[#102E50] text-[#FFF6E9]";

//   const totalReactions = (rc) => {
//     if (!rc || typeof rc !== "object") return 0;
//     return Object.values(rc).reduce((a, b) => a + Number(b || 0), 0);
//   };

//   const toggleFavorite = useCallback(
//     async (card, isFavNow) => {
//       const pid = Number(card?.product_id);
//       if (!isLogged) {
//         navigate("/login");
//         return;
//       }
//       const prev = new Set(favIds);
//       const next = new Set(favIds);
//       if (isFavNow) next.delete(pid);
//       else next.add(pid);
//       setFavIds(next);
//       try {
//         await AddTOFav(card, CusData);
//       } catch {
//         setFavIds(prev);
//       }
//     },
//     [favIds, isLogged, navigate, CusData]
//   );

//   const toggleCart = useCallback(
//     async (card, inCartNow) => {
//       const pid = Number(card?.product_id);
//       if (!isLogged) {
//         navigate("/login");
//         return;
//       }
//       const prev = new Set(cartIds);
//       const next = new Set(cartIds);
//       if (inCartNow) next.delete(pid);
//       else next.add(pid);
//       setCartIds(next);
//       try {
//         await AddToCart(card, CusData);
//       } catch {
//         setCartIds(prev);
//       }
//     },
//     [cartIds, isLogged, navigate, AddToCart, CusData]
//   );

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] text-[#0f2a47]">
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pb-8 md:pb-10">
//         <div className="sticky top-0 z-20 pt-4 pb-4 bg-[#FFF6E9]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FFF6E9]/80">
//           <div className="rounded-[1.6rem] p-[1.2px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//             <div className="rounded-[1.6rem] bg-white/95">
//               <div className="p-4 sm:p-6 flex flex-col gap-4">
//                 <div className="flex flex-col md:flex-row gap-3 md:gap-4">
//                   <div className="flex-1 relative">
//                     <span className="absolute inset-y-0 left-3 flex items-center text-[#0f2a47]/60 pointer-events-none">
//                       <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L19 20.49 20.49 19 15.5 14ZM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"/></svg>
//                     </span>
//                     <input
//                       value={textSearch}
//                       onChange={(e) => setTextSearch(e.target.value)}
//                       placeholder="Search services or providers"
//                       className={`${field} w-full pl-10`}
//                     />
//                   </div>
//                   <div className="flex items-center gap-2 sm:gap-3">
//                     <span className="text-sm font-semibold">Category</span>
//                     <select
//                       value={selectore}
//                       onChange={(e) => setSelectore(e.target.value)}
//                       className={field}
//                     >
//                       <option value="">All</option>
//                       {categories.map((cat, i) => (
//                         <option key={i} value={cat}>{cat}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {!loading && (
//           <>
//             <div className="mt-6 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
//               {filtered.map((card) => {
//                 const pid = Number(card?.product_id);
//                 const isFav = favIds.has(pid);
//                 const inCart = cartIds.has(pid);
//                 const rcCount = totalReactions(card?.reaction_counts);

//                 return (
//                   <button
//                     key={pid}
//                     onClick={() =>
//                       isLogged
//                         ? navigate(`/productdatails?product_id=${pid}`, { state: { product_id: pid } })
//                         : navigate("/login")
//                     }
//                     className="group rounded-2xl bg-white ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden text-left transition"
//                   >
//                     <div className="relative w-full h-60 sm:h-64 md:h-72 bg-[#0f2a47]/5">
//                       <img
//                         src={toImg(card?.image)}
//                         alt={card?.name || "Product"}
//                         loading="lazy"
//                         className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]"
//                         onError={(e) => (e.currentTarget.src = defaultImg)}
//                       />
//                     </div>

//                     <div className="px-3 py-2 bg-[#F5C45E]/18 ring-1 ring-[#F5C45E]/35 flex justify-between items-center">
//                       <span className="inline-flex items-center rounded-lg bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10 text-xs font-extrabold px-2 py-1">
//                         {money.format(card?.price || 0)}
//                       </span>
//                       <span className="text-[#0f2a47] font-semibold text-xs truncate">{card?.name}</span>
//                       {role === "customer" && (
//                         <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
//                           <span
//                             onClick={async () => await toggleFavorite(card, isFav)}
//                             className={`${iconBtnBase} ${isFav ? heartActive : heartInactive}`}
//                           >
//                             <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
//                               <path d="M12 21s-6.72-4.32-9.33-7.38A5.5 5.5 0 0112 5.24a5.5 5.5 0 019.33 8.38C18.72 16.68 12 21 12 21Z" />
//                             </svg>
//                           </span>
//                           <span
//                             onClick={async () => await toggleCart(card, inCart)}
//                             className={`${iconBtnBase} ${inCart ? cartActive : cartInactive}`}
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                               <circle cx="9" cy="21" r="1" />
//                               <circle cx="20" cy="21" r="1" />
//                               <path d="M1 1h4l2.68 12.39a2 2 0 002 1.61h7.72a2 2 0 002-1.61L23 6H6" />
//                             </svg>
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     <div className="px-4 pb-5">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setOpenReactions((prev) => ({ ...prev, [pid]: !prev[pid] }));
//                         }}
//                         className="inline-flex items-center justify-center gap-2 px-4 h-10 rounded-xl bg-white text-[#0f2a47] text-sm font-semibold ring-1 ring-[#F5C45E]/40 hover:ring-[#F5C45E] mx-auto whitespace-nowrap"
//                       >
//                         <span>🙂</span>
//                         <span>Reactions</span>
//                         <span className="min-w-[26px] h-6 px-2 rounded-full text-xs font-bold bg-[#F5C45E]/20 ring-1 ring-[#F5C45E]/50 flex items-center justify-center">
//                           {rcCount}
//                         </span>
//                       </button>
//                       {openReactions[pid] && (
//                         <div className="mt-3 rounded-2xl bg-[#F5C45E]/15 ring-1 ring-[#F5C45E]/40 p-2" onClick={(e) => e.stopPropagation()}>
//                           <ReactionPicker
//                             card={card}
//                             product_id={pid}
//                             userId={uid}
//                             onReactionUpdate={(product_id, reactionCounts, selectedReaction) =>
//                               setCards((prev) =>
//                                 prev.map((c) =>
//                                   c.product_id === product_id
//                                     ? { ...c, reaction_counts: reactionCounts, selectedReaction }
//                                     : c
//                                 )
//                               )
//                             }
//                           />
//                         </div>
//                       )}
//                     </div>

//                     <div className="h-0.5 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
//                   </button>
//                 );
//               })}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

"testtt";



// import axios from "axios";
// import { useEffect, useMemo, useState, useCallback } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import defaultImg from "../assets/NoImage.png";
// import { useAddToCart } from "./AddToCart";
// import AddTOFav from "./AddToFav";

// export default function GitAllProduct() {
//   const navigate = useNavigate();
//   const { AddToCart } = useAddToCart();
//   const CusData = useSelector((s) => s.UserInfo);
//   const uid = CusData?.user?.user_id;
//   const role = CusData?.user?.role;
//   const token = useSelector((s) => s.UserInfo?.token);
//   const isLogged = Boolean(token);

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const [cards, setCards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [textSearch, setTextSearch] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [selectore, setSelectore] = useState("");
//   const [favIds, setFavIds] = useState(new Set());
//   const [cartIds, setCartIds] = useState(new Set());
//   const [openReactions, setOpenReactions] = useState({});

//   useEffect(() => {
//     const t = setTimeout(() => setDebouncedSearch(textSearch), 250);
//     return () => clearTimeout(t);
//   }, [textSearch]);

//   useEffect(() => {
//     const run = async () => {
//       if (!uid) return;
//       try {
//         setLoading(true);
//         const res = await axios.get(`${apiBase}/api/ShowCardInUserDashboard/${uid}`);
//         setCards(Array.isArray(res.data) ? res.data : []);
//       } catch {
//         setCards([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     run();
//   }, [apiBase, uid]);

//   const loadFavs = useCallback(async () => {
//     try {
//       if (!token) return;
//       const { data } = await axios.get(`${apiBase}/api/wishlist`.replace("/api/api", "/api"), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const list = Array.isArray(data?.items) ? data.items : [];
//       setFavIds(new Set(list.map((x) => Number(x.product_id))));
//     } catch {}
//   }, [apiBase, token]);

//   const loadCartIds = useCallback(async () => {
//     try {
//       if (!uid || !token) return;
//       const res = await axios.get(`${apiBase}/api/carts/products/${uid}`.replace("/api/api", "/api"), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const list = Array.isArray(res.data?.cards) ? res.data.cards : [];
//       setCartIds(new Set(list.map((c) => Number(c.product_id))));
//     } catch {}
//   }, [apiBase, token, uid]);

//   useEffect(() => {
//     loadFavs();
//     loadCartIds();
//   }, [loadFavs, loadCartIds]);

//   const categories = useMemo(() => [...new Set(cards.map((c) => c?.category_name).filter(Boolean))], [cards]);

//   const toImg = useCallback(
//     (img) => {
//       if (!img) return defaultImg;
//       const s = String(img).trim();
//       if (s.startsWith("http")) return s;
//       return `${apiBase}${s.startsWith("/") ? "" : "/"}${s}`;
//     },
//     [apiBase]
//   );

//   const money = useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }), []);

//   const filtered = cards.filter((card) => {
//     const byName = (card?.name || "").toLowerCase().includes(debouncedSearch.toLowerCase());
//     const byCat = !selectore || (card?.category_name || "").toLowerCase() === String(selectore).toLowerCase();
//     return byName && byCat;
//   });

//   const field =
//     "h-12 px-4 rounded-2xl bg-white/95 text-[#0f2a47] placeholder-[#0f2a47]/60 text-sm outline-none ring-1 ring-[#0f2a47]/15 focus:ring-2 focus:ring-[#F5C45E] transition";

//   const iconBtnBase = "w-7 h-7 rounded-md grid place-items-center shadow hover:shadow-md active:scale-95 transition";
//   const heartInactive = "bg-white ring-1 ring-[#BE3D2A]/30 text-[#BE3D2A]";
//   const heartActive = "bg-[#BE3D2A] text-white";
//   const cartInactive = "bg-white ring-1 ring-[#102E50]/30 text-[#102E50]";
//   const cartActive = "bg-[#102E50] text-[#FFF6E9]";

//   const totalReactions = (rc) => {
//     if (!rc || typeof rc !== "object") return 0;
//     return Object.values(rc).reduce((a, b) => a + Number(b || 0), 0);
//   };

//   const toggleFavorite = useCallback(
//     async (card, isFavNow) => {
//       const pid = Number(card?.product_id);
//       if (!isLogged) {
//         navigate("/login");
//         return;
//       }
//       const prev = new Set(favIds);
//       const next = new Set(favIds);
//       if (isFavNow) next.delete(pid);
//       else next.add(pid);
//       setFavIds(next);
//       try {
//         await AddTOFav(card, CusData);
//       } catch {
//         setFavIds(prev);
//       }
//     },
//     [favIds, isLogged, navigate, CusData]
//   );

//   const toggleCart = useCallback(
//     async (card, inCartNow) => {
//       const pid = Number(card?.product_id);
//       if (!isLogged) {
//         navigate("/login");
//         return;
//       }
//       const prev = new Set(cartIds);
//       const next = new Set(cartIds);
//       if (inCartNow) next.delete(pid);
//       else next.add(pid);
//       setCartIds(next);
//       try {
//         await AddToCart(card, CusData);
//       } catch {
//         setCartIds(prev);
//       }
//     },
//     [cartIds, isLogged, navigate, AddToCart, CusData]
//   );

//   const handleReact = useCallback(
//     async (e, product_id, reactionKey) => {
//       e.stopPropagation();
//       if (!isLogged) {
//         navigate("/login");
//         return;
//       }
//       const allowed = ["love", "support", "proud"];
//       if (!allowed.includes(reactionKey)) return;

//       const prevCards = cards;
//       const nextCards = cards.map((c) => {
//         if (Number(c.product_id) !== Number(product_id)) return c;
//         const prevSelected = c.selectedReaction || null;
//         const counts = { love: 0, support: 0, proud: 0, ...(c.reaction_counts || {}) };
//         if (prevSelected && counts[prevSelected] > 0) counts[prevSelected] = Number(counts[prevSelected]) - 1;
//         let newSelected = reactionKey;
//         if (prevSelected === reactionKey) {
//           newSelected = null;
//         } else {
//           counts[reactionKey] = Number(counts[reactionKey] || 0) + 1;
//         }
//         return { ...c, reaction_counts: counts, selectedReaction: newSelected };
//       });

//       setCards(nextCards);
//       setOpenReactions((p) => ({ ...p, [product_id]: false }));

//       try {
//         const currentSelected =
//           nextCards.find((c) => Number(c.product_id) === Number(product_id))?.selectedReaction || null;
//         await axios.post(
//           `${apiBase}/api/products/${product_id}/react`,
//           { reaction: currentSelected },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       } catch {
//         setCards(prevCards);
//       }
//     },
//     [apiBase, token, isLogged, navigate, cards]
//   );

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] text-[#0f2a47]">
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pb-8 md:pb-10">
//         <div className="sticky top-0 z-20 pt-4 pb-4 bg-[#FFF6E9]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FFF6E9]/80">
//           <div className="rounded-[1.6rem] p-[1.2px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//             <div className="rounded-[1.6rem] bg-white/95">
//               <div className="p-4 sm:p-6 flex flex-col gap-4">
//                 <div className="flex flex-col md:flex-row gap-3 md:gap-4">
//                   <div className="flex-1 relative">
//                     <span className="absolute inset-y-0 left-3 flex items-center text-[#0f2a47]/60 pointer-events-none">
//                       <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L19 20.49 20.49 19 15.5 14ZM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"/></svg>
//                     </span>
//                     <input
//                       value={textSearch}
//                       onChange={(e) => setTextSearch(e.target.value)}
//                       placeholder="Search services or providers"
//                       className={`${field} w-full pl-10`}
//                     />
//                   </div>
//                   <div className="flex items-center gap-2 sm:gap-3">
//                     <span className="text-sm font-semibold">Category</span>
//                     <select
//                       value={selectore}
//                       onChange={(e) => setSelectore(e.target.value)}
//                       className={field}
//                     >
//                       <option value="">All</option>
//                       {categories.map((cat, i) => (
//                         <option key={i} value={cat}>{cat}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {!loading && (
//           <>
//             <div className="mt-6 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
//               {filtered.map((card) => {
//                 const pid = Number(card?.product_id);
//                 const isFav = favIds.has(pid);
//                 const inCart = cartIds.has(pid);
//                 const rcCount = totalReactions(card?.reaction_counts);
//                 const isOpen = !!openReactions[pid];

//                 return (
//                   <button
//                     key={pid}
//                     onClick={() =>
//                       isLogged
//                         ? navigate(`/productdatails?product_id=${pid}`, { state: { product_id: pid } })
//                         : navigate("/login")
//                     }
//                     className="group rounded-2xl bg-white ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden text-left transition"
//                   >
//                     <div className="relative w-full h-60 sm:h-64 md:h-72 bg-[#0f2a47]/5">
//                       <img
//                         src={toImg(card?.image)}
//                         alt={card?.name || "Product"}
//                         loading="lazy"
//                         className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]"
//                         onError={(e) => (e.currentTarget.src = defaultImg)}
//                       />
//                     </div>

//                     <div className="px-3 py-2 bg-[#F5C45E]/18 ring-1 ring-[#F5C45E]/35 flex justify-between items-center">
//                       <span className="inline-flex items-center rounded-lg bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10 text-xs font-extrabold px-2 py-1">
//                         {money.format(card?.price || 0)}
//                       </span>
//                       <span className="text-[#0f2a47] font-semibold text-xs truncate">{card?.name}</span>
//                       {role === "customer" && (
//                         <div className="relative flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
//                           <span
//                             onClick={async () => await toggleFavorite(card, isFav)}
//                             className={`${iconBtnBase} ${isFav ? heartActive : heartInactive}`}
//                           >
//                             <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
//                               <path d="M12 21s-6.72-4.32-9.33-7.38A5.5 5.5 0 0112 5.24a5.5 5.5 0 019.33 8.38C18.72 16.68 12 21 12 21Z" />
//                             </svg>
//                           </span>

//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setOpenReactions((prev) => ({ ...prev, [pid]: !prev[pid] }));
//                             }}
//                             className={`${iconBtnBase} bg-white ring-1 ring-[#F5C45E]/50 text-[#0f2a47] relative`}
//                             title="Reactions"
//                           >
//                             <span className="text-sm">🙂</span>
//                             <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold bg-[#F5C45E]/90 text-[#102E50] grid place-items-center">
//                               {rcCount}
//                             </span>
//                           </button>

//                           <span
//                             onClick={async () => await toggleCart(card, inCart)}
//                             className={`${iconBtnBase} ${inCart ? cartActive : cartInactive}`}
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                               <circle cx="9" cy="21" r="1" />
//                               <circle cx="20" cy="21" r="1" />
//                               <path d="M1 1h4l2.68 12.39a2 2 0 002 1.61h7.72a2 2 0 002-1.61L23 6H6" />
//                             </svg>
//                           </span>

//                           {isOpen && (
//                             <div className="absolute right-0 top-9 z-30 rounded-2xl bg-white ring-1 ring-[#F5C45E]/40 shadow-[0_10px_30px_rgba(16,46,80,0.15)] px-3 py-2 flex items-center gap-3">
//                               <button
//                                 onClick={(e) => handleReact(e, pid, "love")}
//                                 className={`text-xs font-extrabold inline-flex items-center gap-1 px-2.5 h-8 rounded-lg ring-1 transition ${
//                                   card.selectedReaction === "love"
//                                     ? "bg-[#BE3D2A]/10 text-[#BE3D2A] ring-[#BE3D2A]/30"
//                                     : "bg-white text-[#BE3D2A]/80 ring-[#BE3D2A]/25 hover:text-[#BE3D2A]"
//                                 }`}
//                                 title="Love"
//                               >
//                                 <span>❤️</span>
//                                 <span>{card.reaction_counts?.love || 0}</span>
//                               </button>
//                               <button
//                                 onClick={(e) => handleReact(e, pid, "support")}
//                                 className={`text-xs font-extrabold inline-flex items-center gap-1 px-2.5 h-8 rounded-lg ring-1 transition ${
//                                   card.selectedReaction === "support"
//                                     ? "bg-[#16A34A]/10 text-[#16A34A] ring-[#16A34A]/30"
//                                     : "bg-white text-[#16A34A]/80 ring-[#16A34A]/25 hover:text-[#16A34A]"
//                                 }`}
//                                 title="Support"
//                               >
//                                 <span>🤝</span>
//                                 <span>{card.reaction_counts?.support || 0}</span>
//                               </button>
//                               <button
//                                 onClick={(e) => handleReact(e, pid, "proud")}
//                                 className={`text-xs font-extrabold inline-flex items-center gap-1 px-2.5 h-8 rounded-lg ring-1 transition ${
//                                   card.selectedReaction === "proud"
//                                     ? "bg-[#F5C45E]/20 text-[#C68E2E] ring-[#F5C45E]/40"
//                                     : "bg-white text-[#C68E2E]/80 ring-[#F5C45E]/35 hover:text-[#C68E2E]"
//                                 }`}
//                                 title="Proud"
//                               >
//                                 <span>⭐</span>
//                                 <span>{card.reaction_counts?.proud || 0}</span>
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       )}
//                     </div>

//                     <div className="h-0.5 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
//                   </button>
//                 );
//               })}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }







"testtt";

// import axios from "axios";
// import { useEffect, useMemo, useState, useCallback } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import defaultImg from "../assets/NoImage.png";
// import { useAddToCart } from "./AddToCart";
// import AddTOFav from "./AddToFav";

// export default function GitAllProduct() {
//   const navigate = useNavigate();
//   const { AddToCart } = useAddToCart();
//   const CusData = useSelector((s) => s.UserInfo);
//   const uid = CusData?.user?.user_id;
//   const role = CusData?.user?.role;
//   const token = useSelector((s) => s.UserInfo?.token);
//   const isLogged = Boolean(token);

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const [cards, setCards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [textSearch, setTextSearch] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [selectore, setSelectore] = useState("");
//   const [favIds, setFavIds] = useState(new Set());
//   const [cartIds, setCartIds] = useState(new Set());

//   useEffect(() => {
//     const t = setTimeout(() => setDebouncedSearch(textSearch), 250);
//     return () => clearTimeout(t);
//   }, [textSearch]);

//   useEffect(() => {
//     const run = async () => {
//       if (!uid) return;
//       try {
//         setLoading(true);
//         const res = await axios.get(`${apiBase}/api/ShowCardInUserDashboard/${uid}`);
//         setCards(Array.isArray(res.data) ? res.data : []);
//       } catch {
//         setCards([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     run();
//   }, [apiBase, uid]);

//   const loadFavs = useCallback(async () => {
//     try {
//       if (!token) return;
//       const { data } = await axios.get(`${apiBase}/api/wishlist`.replace("/api/api", "/api"), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const list = Array.isArray(data?.items) ? data.items : [];
//       setFavIds(new Set(list.map((x) => Number(x.product_id))));
//     } catch {}
//   }, [apiBase, token]);

//   const loadCartIds = useCallback(async () => {
//     try {
//       if (!uid || !token) return;
//       const res = await axios.get(`${apiBase}/api/carts/products/${uid}`.replace("/api/api", "/api"), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const list = Array.isArray(res.data?.cards) ? res.data.cards : [];
//       setCartIds(new Set(list.map((c) => Number(c.product_id))));
//     } catch {}
//   }, [apiBase, token, uid]);

//   useEffect(() => {
//     loadFavs();
//     loadCartIds();
//   }, [loadFavs, loadCartIds]);

//   const categories = useMemo(() => [...new Set(cards.map((c) => c?.category_name).filter(Boolean))], [cards]);

//   const toImg = useCallback(
//     (img) => {
//       if (!img) return defaultImg;
//       const s = String(img).trim();
//       if (s.startsWith("http")) return s;
//       return `${apiBase}${s.startsWith("/") ? "" : "/"}${s}`;
//     },
//     [apiBase]
//   );

//   const money = useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }), []);

//   const filtered = cards.filter((card) => {
//     const byName = (card?.name || "").toLowerCase().includes(debouncedSearch.toLowerCase());
//     const byCat = !selectore || (card?.category_name || "").toLowerCase() === String(selectore).toLowerCase();
//     return byName && byCat;
//   });

//   const field =
//     "h-12 px-4 rounded-2xl bg-white/95 text-[#0f2a47] placeholder-[#0f2a47]/60 text-sm outline-none ring-1 ring-[#0f2a47]/15 focus:ring-2 focus:ring-[#F5C45E] transition";

//   const iconBtnBase = "w-7 h-7 rounded-md grid place-items-center shadow hover:shadow-md active:scale-95 transition";
//   const heartInactive = "bg-white ring-1 ring-[#BE3D2A]/30 text-[#BE3D2A]";
//   const heartActive = "bg-[#BE3D2A] text-white";
//   const cartInactive = "bg-white ring-1 ring-[#102E50]/30 text-[#102E50]";
//   const cartActive = "bg-[#102E50] text-[#FFF6E9]";

//   const totalReactions = (rc) => {
//     if (!rc || typeof rc !== "object") return 0;
//     return Object.values(rc).reduce((a, b) => a + Number(b || 0), 0);
//   };

//   const toggleFavorite = useCallback(
//     async (card, isFavNow) => {
//       const pid = Number(card?.product_id);
//       if (!isLogged) {
//         navigate("/login");
//         return;
//       }
//       const prev = new Set(favIds);
//       const next = new Set(favIds);
//       if (isFavNow) next.delete(pid);
//       else next.add(pid);
//       setFavIds(next);
//       try {
//         await AddTOFav(card, CusData);
//       } catch {
//         setFavIds(prev);
//       }
//     },
//     [favIds, isLogged, navigate, CusData]
//   );

//   const toggleCart = useCallback(
//     async (card, inCartNow) => {
//       const pid = Number(card?.product_id);
//       if (!isLogged) {
//         navigate("/login");
//         return;
//       }
//       const prev = new Set(cartIds);
//       const next = new Set(cartIds);
//       if (inCartNow) next.delete(pid);
//       else next.add(pid);
//       setCartIds(next);
//       try {
//         await AddToCart(card, CusData);
//       } catch {
//         setCartIds(prev);
//       }
//     },
//     [cartIds, isLogged, navigate, AddToCart, CusData]
//   );

//   const handleReact = useCallback(
//     async (e, product_id, reactionKey) => {
//       e.stopPropagation();
//       if (!isLogged) {
//         navigate("/login");
//         return;
//       }
//       const allowed = ["love", "support", "proud"];
//       if (!allowed.includes(reactionKey)) return;

//       const prevCards = cards;
//       const nextCards = cards.map((c) => {
//         if (Number(c.product_id) !== Number(product_id)) return c;
//         const prevSelected = c.selectedReaction || null;
//         const counts = { love: 0, support: 0, proud: 0, ...(c.reaction_counts || {}) };
//         if (prevSelected && counts[prevSelected] > 0) counts[prevSelected] = Number(counts[prevSelected]) - 1;
//         let newSelected = reactionKey;
//         if (prevSelected === reactionKey) {
//           newSelected = null;
//         } else {
//           counts[reactionKey] = Number(counts[reactionKey] || 0) + 1;
//         }
//         return { ...c, reaction_counts: counts, selectedReaction: newSelected };
//       });

//       setCards(nextCards);

//       try {
//         const currentSelected =
//           nextCards.find((c) => Number(c.product_id) === Number(product_id))?.selectedReaction || null;
//         await axios.post(
//           `${apiBase}/api/products/${product_id}/react`,
//           { reaction: currentSelected },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       } catch {
//         setCards(prevCards);
//       }
//     },
//     [apiBase, token, isLogged, navigate, cards]
//   );

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] text-[#0f2a47]">
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pb-8 md:pb-10">
//         <div className="sticky top-0 z-20 pt-4 pb-4 bg-[#FFF6E9]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FFF6E9]/80">
//           <div className="rounded-[1.6rem] p-[1.2px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//             <div className="rounded-[1.6rem] bg-white/95">
//               <div className="p-4 sm:p-6 flex flex-col gap-4">
//                 <div className="flex flex-col md:flex-row gap-3 md:gap-4">
//                   <div className="flex-1 relative">
//                     <span className="absolute inset-y-0 left-3 flex items-center text-[#0f2a47]/60 pointer-events-none">
//                       <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L19 20.49 20.49 19 15.5 14ZM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"/></svg>
//                     </span>
//                     <input
//                       value={textSearch}
//                       onChange={(e) => setTextSearch(e.target.value)}
//                       placeholder="Search services or providers"
//                       className={`${field} w-full pl-10`}
//                     />
//                   </div>
//                   <div className="flex items-center gap-2 sm:gap-3">
//                     <span className="text-sm font-semibold">Category</span>
//                     <select
//                       value={selectore}
//                       onChange={(e) => setSelectore(e.target.value)}
//                       className={field}
//                     >
//                       <option value="">All</option>
//                       {categories.map((cat, i) => (
//                         <option key={i} value={cat}>{cat}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {!loading && (
//           <>
//             <div className="mt-6 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
//               {filtered.map((card) => {
//                 const pid = Number(card?.product_id);
//                 const isFav = favIds.has(pid);
//                 const inCart = cartIds.has(pid);
//                 const rcCount = totalReactions(card?.reaction_counts);

//                 return (
//                   <button
//                     key={pid}
//                     onClick={() =>
//                       isLogged
//                         ? navigate(`/productdatails?product_id=${pid}`, { state: { product_id: pid } })
//                         : navigate("/login")
//                     }
//                     className="group rounded-2xl bg-white ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden text-left transition"
//                   >
//                     <div className="relative w-full h-60 sm:h-64 md:h-72 bg-[#0f2a47]/5">
//                       <img
//                         src={toImg(card?.image)}
//                         alt={card?.name || "Product"}
//                         loading="lazy"
//                         className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]"
//                         onError={(e) => (e.currentTarget.src = defaultImg)}
//                       />
//                       <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10">
//                         {card?.category_name || "Category"}
//                       </span>
//                     </div>

//                     <div className="px-3 py-2 bg-[#F5C45E]/18 ring-1 ring-[#F5C45E]/35 flex justify-between items-center">
//                       <span className="inline-flex items-center rounded-lg bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10 text-xs font-extrabold px-2 py-1">
//                         {money.format(card?.price || 0)}
//                       </span>
//                       <span className="text-[#0f2a47] font-semibold text-xs truncate">{card?.name}</span>
//                       {role === "customer" && (
//                         <div className="relative flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
//                           <span
//                             onClick={async () => await toggleCart(card, inCart)}
//                             className={`${iconBtnBase} ${inCart ? cartActive : cartInactive}`}
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                               <circle cx="9" cy="21" r="1" />
//                               <circle cx="20" cy="21" r="1" />
//                               <path d="M1 1h4l2.68 12.39a2 2 0 002 1.61h7.72a2 2 0 002-1.61L23 6H6" />
//                             </svg>
//                           </span>

//                           <span
//                             onClick={async () => await toggleFavorite(card, isFav)}
//                             className={`${iconBtnBase} ${isFav ? heartActive : heartInactive}`}
//                           >
//                             <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
//                               <path d="M12 21s-6.72-4.32-9.33-7.38A5.5 5.5 0 0112 5.24a5.5 5.5 0 019.33 8.38C18.72 16.68 12 21 12 21Z" />
//                             </svg>
//                           </span>

//                           <div className="relative group/reac">
//                             <button
//                               onMouseDown={(e) => e.stopPropagation()}
//                               className={`${iconBtnBase} bg-white ring-1 ring-[#F5C45E]/50 text-[#0f2a47] relative`}
//                               title="Reactions"
//                             >
//                               <span className="text-sm">🙂</span>
//                               <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold bg-[#F5C45E]/90 text-[#102E50] grid place-items-center">
//                                 {rcCount}
//                               </span>
//                             </button>

//                             <div className="pointer-events-none absolute right-0 bottom-9 z-30 hidden group-hover/reac:flex group-focus-within/reac:flex rounded-2xl bg-white ring-1 ring-[#F5C45E]/40 shadow-[0_10px_30px_rgba(16,46,80,0.15)] px-3 py-2 items-center gap-3">
//                               <button
//                                 onClick={(e) => handleReact(e, pid, "love")}
//                                 className={`pointer-events-auto text-xs font-extrabold inline-flex items-center gap-1 px-2.5 h-8 rounded-lg ring-1 transition ${
//                                   card.selectedReaction === "love"
//                                     ? "bg-[#BE3D2A]/10 text-[#BE3D2A] ring-[#BE3D2A]/30"
//                                     : "bg-white text-[#BE3D2A]/80 ring-[#BE3D2A]/25 hover:text-[#BE3D2A]"
//                                 }`}
//                                 title="Love"
//                               >
//                                 <span>❤️</span>
//                                 <span>{card.reaction_counts?.love || 0}</span>
//                               </button>
//                               <button
//                                 onClick={(e) => handleReact(e, pid, "support")}
//                                 className={`pointer-events-auto text-xs font-extrabold inline-flex items-center gap-1 px-2.5 h-8 rounded-lg ring-1 transition ${
//                                   card.selectedReaction === "support"
//                                     ? "bg-[#16A34A]/10 text-[#16A34A] ring-[#16A34A]/30"
//                                     : "bg-white text-[#16A34A]/80 ring-[#16A34A]/25 hover:text-[#16A34A]"
//                                 }`}
//                                 title="Support"
//                               >
//                                 <span>🤝</span>
//                                 <span>{card.reaction_counts?.support || 0}</span>
//                               </button>
//                               <button
//                                 onClick={(e) => handleReact(e, pid, "proud")}
//                                 className={`pointer-events-auto text-xs font-extrabold inline-flex items-center gap-1 px-2.5 h-8 rounded-lg ring-1 transition ${
//                                   card.selectedReaction === "proud"
//                                     ? "bg-[#F5C45E]/20 text-[#C68E2E] ring-[#F5C45E]/40"
//                                     : "bg-white text-[#C68E2E]/80 ring-[#F5C45E]/35 hover:text-[#C68E2E]"
//                                 }`}
//                                 title="Proud"
//                               >
//                                 <span>⭐</span>
//                                 <span>{card.reaction_counts?.proud || 0}</span>
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     <div className="h-0.5 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
//                   </button>
//                 );
//               })}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }









"testtt";



import axios from "axios";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import defaultImg from "../assets/NoImage.png";
import { useAddToCart } from "./AddToCart";
import AddTOFav from "./AddToFav";

export default function GitAllProduct() {
  const navigate = useNavigate();
  const { AddToCart } = useAddToCart();
  const CusData = useSelector((s) => s.UserInfo);
  const uid = CusData?.user?.user_id;
  const role = CusData?.user?.role;
  const token = useSelector((s) => s.UserInfo?.token);
  const isLogged = Boolean(token);

  const port = import.meta.env.VITE_PORT;
  const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [textSearch, setTextSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectore, setSelectore] = useState("");
  const [favIds, setFavIds] = useState(new Set());
  const [cartIds, setCartIds] = useState(new Set());

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(textSearch), 250);
    return () => clearTimeout(t);
  }, [textSearch]);

  useEffect(() => {
    const run = async () => {
      if (!uid) return;
      try {
        setLoading(true);
        const res = await axios.get(`${apiBase}/api/ShowCardInUserDashboard/${uid}`);
        setCards(Array.isArray(res.data) ? res.data : []);
      } catch {
        setCards([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [apiBase, uid]);

  const loadFavs = useCallback(async () => {
    try {
      if (!token) return;
      const { data } = await axios.get(`${apiBase}/api/wishlist`.replace("/api/api", "/api"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const list = Array.isArray(data?.items) ? data.items : [];
      setFavIds(new Set(list.map((x) => Number(x.product_id))));
    } catch {}
  }, [apiBase, token]);

  const loadCartIds = useCallback(async () => {
    try {
      if (!uid || !token) return;
      const res = await axios.get(`${apiBase}/api/carts/products/${uid}`.replace("/api/api", "/api"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const list = Array.isArray(res.data?.cards) ? res.data.cards : [];
      setCartIds(new Set(list.map((c) => Number(c.product_id))));
    } catch {}
  }, [apiBase, token, uid]);

  useEffect(() => {
    loadFavs();
    loadCartIds();
  }, [loadFavs, loadCartIds]);

  const categories = useMemo(() => [...new Set(cards.map((c) => c?.category_name).filter(Boolean))], [cards]);

  const toImg = useCallback(
    (img) => {
      if (!img) return defaultImg;
      const s = String(img).trim();
      if (s.startsWith("http")) return s;
      return `${apiBase}${s.startsWith("/") ? "" : "/"}${s}`;
    },
    [apiBase]
  );

  const money = useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }), []);

  const filtered = cards.filter((card) => {
    const byName = (card?.name || "").toLowerCase().includes(debouncedSearch.toLowerCase());
    const byCat = !selectore || (card?.category_name || "").toLowerCase() === String(selectore).toLowerCase();
    return byName && byCat;
  });

  const field =
    "h-12 px-4 rounded-2xl bg-white/95 text-[#0f2a47] placeholder-[#0f2a47]/60 text-sm outline-none ring-1 ring-[#0f2a47]/15 focus:ring-2 focus:ring-[#F5C45E] transition";

  const iconBtnBase = "w-7 h-7 rounded-md grid place-items-center shadow hover:shadow-md active:scale-95 transition";
  const heartInactive = "bg-white ring-1 ring-[#BE3D2A]/30 text-[#BE3D2A]";
  const heartActive = "bg-[#BE3D2A] text-white";
  const cartInactive = "bg-white ring-1 ring-[#102E50]/30 text-[#102E50]";
  const cartActive = "bg-[#102E50] text-[#FFF6E9]";

  const totalReactions = (rc) => {
    if (!rc || typeof rc !== "object") return 0;
    return Object.values(rc).reduce((a, b) => a + Number(b || 0), 0);
  };

  const toggleFavorite = useCallback(
    async (card, isFavNow) => {
      const pid = Number(card?.product_id);
      if (!isLogged) {
        navigate("/login");
        return;
      }
      const prev = new Set(favIds);
      const next = new Set(favIds);
      if (isFavNow) next.delete(pid);
      else next.add(pid);
      setFavIds(next);
      try {
        await AddTOFav(card, CusData);
      } catch {
        setFavIds(prev);
      }
    },
    [favIds, isLogged, navigate, CusData]
  );

  const toggleCart = useCallback(
    async (card, inCartNow) => {
      const pid = Number(card?.product_id);
      if (!isLogged) {
        navigate("/login");
        return;
      }
      const prev = new Set(cartIds);
      const next = new Set(cartIds);
      if (inCartNow) next.delete(pid);
      else next.add(pid);
      setCartIds(next);
      try {
        await AddToCart(card, CusData);
      } catch {
        setCartIds(prev);
      }
    },
    [cartIds, isLogged, navigate, AddToCart, CusData]
  );

  const handleReact = useCallback(
    async (e, product_id, reactionKey) => {
      e.stopPropagation();
      if (!isLogged) {
        navigate("/login");
        return;
      }
      const allowed = ["love", "support", "proud"];
      if (!allowed.includes(reactionKey)) return;

      const prevCards = cards;
      const nextCards = cards.map((c) => {
        if (Number(c.product_id) !== Number(product_id)) return c;
        const prevSelected = c.selectedReaction || null;
        const counts = { love: 0, support: 0, proud: 0, ...(c.reaction_counts || {}) };
        if (prevSelected && counts[prevSelected] > 0) counts[prevSelected] = Number(counts[prevSelected]) - 1;
        let newSelected = reactionKey;
        if (prevSelected === reactionKey) {
          newSelected = null;
        } else {
          counts[reactionKey] = Number(counts[reactionKey] || 0) + 1;
        }
        return { ...c, reaction_counts: counts, selectedReaction: newSelected };
      });

      setCards(nextCards);

      try {
        const currentSelected =
          nextCards.find((c) => Number(c.product_id) === Number(product_id))?.selectedReaction || null;
        await axios.post(
          `${apiBase}/api/products/${product_id}/react`,
          { reaction: currentSelected },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch {
        setCards(prevCards);
      }
    },
    [apiBase, token, isLogged, navigate, cards]
  );

  return (
    <div className="min-h-screen bg-[#FFF6E9] text-[#0f2a47]">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pb-8 md:pb-10">
        <div className="sticky top-0 z-20 pt-4 pb-4 bg-[#FFF6E9]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FFF6E9]/80">
          <div className="rounded-[1.6rem] p-[1.2px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
            <div className="rounded-[1.6rem] bg-white/95">
              <div className="p-4 sm:p-6 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                  <div className="flex-1 relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-[#0f2a47]/60 pointer-events-none">
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L19 20.49 20.49 19 15.5 14ZM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"/></svg>
                    </span>
                    <input
                      value={textSearch}
                      onChange={(e) => setTextSearch(e.target.value)}
                      placeholder="Search services or providers"
                      className={`${field} w-full pl-10`}
                    />
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-sm font-semibold">Category</span>
                    <select
                      value={selectore}
                      onChange={(e) => setSelectore(e.target.value)}
                      className={field}
                    >
                      <option value="">All</option>
                      {categories.map((cat, i) => (
                        <option key={i} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!loading && (
          <>
            <div className="mt-6 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {filtered.map((card) => {
                const pid = Number(card?.product_id);
                const isFav = favIds.has(pid);
                const inCart = cartIds.has(pid);
                const rcCount = totalReactions(card?.reaction_counts);

                return (
                  <div
                    key={pid}
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      isLogged
                        ? navigate(`/productdatails?product_id=${pid}`, { state: { product_id: pid } })
                        : navigate("/login")
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        isLogged
                          ? navigate(`/productdatails?product_id=${pid}`, { state: { product_id: pid } })
                          : navigate("/login");
                      }
                    }}
                    className="group rounded-2xl bg-white ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden text-left transition relative"
                  >
                    <div className="relative w-full h-60 sm:h-64 md:h-72 bg-[#0f2a47]/5">
                      <img
                        src={toImg(card?.image)}
                        alt={card?.name || "Product"}
                        loading="lazy"
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        onError={(e) => (e.currentTarget.src = defaultImg)}
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10">
                        {card?.category_name || "Category"}
                      </span>
                    </div>

                    <div className="px-3 py-2 bg-[#F5C45E]/18 ring-1 ring-[#F5C45E]/35 flex justify-between items-center">
                      <span className="inline-flex items-center rounded-lg bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10 text-xs font-extrabold px-2 py-1">
                        {money.format(card?.price || 0)}
                      </span>
                      <span className="text-[#0f2a47] font-semibold text-xs truncate">{card?.name}</span>
                      {role === "customer" && (
                        <div className="relative flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <span
                            onClick={async () => await toggleCart(card, inCart)}
                            className={`${iconBtnBase} ${inCart ? cartActive : cartInactive}`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="9" cy="21" r="1" />
                              <circle cx="20" cy="21" r="1" />
                              <path d="M1 1h4l2.68 12.39a2 2 0 002 1.61h7.72a2 2 0 002-1.61L23 6H6" />
                            </svg>
                          </span>

                          <span
                            onClick={async () => await toggleFavorite(card, isFav)}
                            className={`${iconBtnBase} ${isFav ? heartActive : heartInactive}`}
                          >
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                              <path d="M12 21s-6.72-4.32-9.33-7.38A5.5 5.5 0 0112 5.24a5.5 5.5 0 019.33 8.38C18.72 16.68 12 21 12 21Z" />
                            </svg>
                          </span>

                          <div className="relative group/reac">
                            <button
                              onMouseDown={(e) => e.stopPropagation()}
                              className={`${iconBtnBase} bg-white ring-1 ring-[#F5C45E]/50 text-[#0f2a47] relative`}
                              title="Reactions"
                            >
                              <span className="text-sm">🙂</span>
                              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold bg-[#F5C45E]/90 text-[#102E50] grid place-items-center">
                                {rcCount}
                              </span>
                            </button>

                            <div className="pointer-events-none absolute right-0 bottom-9 z-30 hidden group-hover/reac:flex group-focus-within/reac:flex rounded-2xl bg-white ring-1 ring-[#F5C45E]/40 shadow-[0_10px_30px_rgba(16,46,80,0.15)] px-3 py-2 items-center gap-3">
                              <button
                                onClick={(e) => handleReact(e, pid, "love")}
                                className={`pointer-events-auto text-xs font-extrabold inline-flex items-center gap-1 px-2.5 h-8 rounded-lg ring-1 transition ${
                                  card.selectedReaction === "love"
                                    ? "bg-[#BE3D2A]/10 text-[#BE3D2A] ring-[#BE3D2A]/30"
                                    : "bg-white text-[#BE3D2A]/80 ring-[#BE3D2A]/25 hover:text-[#BE3D2A]"
                                }`}
                                title="Love"
                              >
                                <span>❤️</span>
                                <span>{card.reaction_counts?.love || 0}</span>
                              </button>
                              <button
                                onClick={(e) => handleReact(e, pid, "support")}
                                className={`pointer-events-auto text-xs font-extrabold inline-flex items-center gap-1 px-2.5 h-8 rounded-lg ring-1 transition ${
                                  card.selectedReaction === "support"
                                    ? "bg-[#16A34A]/10 text-[#16A34A] ring-[#16A34A]/30"
                                    : "bg-white text-[#16A34A]/80 ring-[#16A34A]/25 hover:text-[#16A34A]"
                                }`}
                                title="Support"
                              >
                                <span>🤝</span>
                                <span>{card.reaction_counts?.support || 0}</span>
                              </button>
                              <button
                                onClick={(e) => handleReact(e, pid, "proud")}
                                className={`pointer-events-auto text-xs font-extrabold inline-flex items-center gap-1 px-2.5 h-8 rounded-lg ring-1 transition ${
                                  card.selectedReaction === "proud"
                                    ? "bg-[#F5C45E]/20 text-[#C68E2E] ring-[#F5C45E]/40"
                                    : "bg-white text-[#C68E2E]/80 ring-[#F5C45E]/35 hover:text-[#C68E2E]"
                                }`}
                                title="Proud"
                              >
                                <span>⭐</span>
                                <span>{card.reaction_counts?.proud || 0}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="h-0.5 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}









"testtt";




