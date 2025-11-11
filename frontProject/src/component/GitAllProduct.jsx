"اول كود";

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

"مع هوفر للكبسه ايموجيز فوق ";
"حجم صغير";

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
//   const [openReac, setOpenReac] = useState(null);

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

//   useEffect(() => {
//     const onDocClick = () => setOpenReac(null);
//     const onKey = (e) => {
//       if (e.key === "Escape") setOpenReac(null);
//     };
//     document.addEventListener("click", onDocClick);
//     document.addEventListener("keydown", onKey);
//     return () => {
//       document.removeEventListener("click", onDocClick);
//       document.removeEventListener("keydown", onKey);
//     };
//   }, []);

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
//       const optimistic = cards.map((c) => {
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

//       setCards(optimistic);

//       try {
//         const { data } = await axios.post(
//           `${apiBase}/api/product/reaction`.replace("/api/api", "/api"),
//           { product_id, userId: uid, type: reactionKey },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         if (data?.reactionCounts) {
//           setCards((curr) =>
//             curr.map((c) =>
//               Number(c.product_id) === Number(product_id)
//                 ? { ...c, reaction_counts: data.reactionCounts, selectedReaction: data.selectedReaction ?? c.selectedReaction }
//                 : c
//             )
//           );
//         }
//       } catch {
//         setCards(prevCards);
//       }
//     },
//     [apiBase, token, isLogged, navigate, cards, uid]
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
//                   <div
//                     key={pid}
//                     role="button"
//                     tabIndex={0}
//                     onClick={() =>
//                       isLogged
//                         ? navigate(`/productdatails?product_id=${pid}`, { state: { product_id: pid } })
//                         : navigate("/login")
//                     }
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter") {
//                         isLogged
//                           ? navigate(`/productdatails?product_id=${pid}`, { state: { product_id: pid } })
//                           : navigate("/login");
//                       }
//                     }}
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

//                       {role === "customer" && (
//                         <div className="absolute top-2 right-2" onClick={(e) => e.stopPropagation()}>
//                           <div className="relative group">
//                             <button
//                               type="button"
//                               onClick={() => setOpenReac(openReac === pid ? null : pid)}
//                               className={`${iconBtnBase} bg-white ring-1 ring-[#F5C45E]/50 text-[#0f2a47] relative`}
//                               aria-expanded={openReac === pid}
//                             >
//                               <span className="text-sm">✨</span>
//                               <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold bg-[#F5C45E]/90 text-[#102E50] grid place-items-center">
//                                 {rcCount}
//                               </span>
//                             </button>
//                             {openReac !== pid && (
//                               <span className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-full mr-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#102E50] text-[#FFF6E9] opacity-0 group-hover:opacity-100 whitespace-nowrap shadow">
//                                 Show some love
//                               </span>
//                             )}
//                           </div>

//                           {openReac === pid && (
//                             <div
//                               className="absolute right-0 mt-2 z-30 rounded-2xl bg-white ring-1 ring-[#F5C45E]/40 shadow-[0_10px_30px_rgba(16,46,80,0.15)] px-2.5 py-1.5 flex flex-col gap-1.5"
//                               onClick={(e) => e.stopPropagation()}
//                             >
//                               <button
//                                 type="button"
//                                 onClick={async (e) => {
//                                   await handleReact(e, pid, "love");
//                                   setOpenReac(null);
//                                 }}
//                                 className={`group relative text-[10px] font-extrabold inline-flex items-center gap-1.5 px-2 h-8 rounded-lg ring-1 transition ${
//                                   card.selectedReaction === "love"
//                                     ? "bg-[#BE3D2A]/10 text-[#BE3D2A] ring-[#BE3D2A]/30"
//                                     : "bg-white text-[#BE3D2A]/80 ring-[#BE3D2A]/25 hover:text-[#BE3D2A]"
//                                 }`}
//                               >
//                                 <span className="relative leading-none">
//                                   <span>❤️</span>
//                                   <span className="absolute top-1/2 -translate-y-1/2 right-full mr-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#102E50] text-[#FFF6E9] opacity-0 group-hover:opacity-100 whitespace-nowrap shadow">
//                                     Love
//                                   </span>
//                                 </span>
//                                 <span className="text-[10px] font-bold leading-none">{card.reaction_counts?.love || 0}</span>
//                               </button>

//                               <button
//                                 type="button"
//                                 onClick={async (e) => {
//                                   await handleReact(e, pid, "support");
//                                   setOpenReac(null);
//                                 }}
//                                 className={`group relative text-[10px] font-extrabold inline-flex items-center gap-1.5 px-2 h-8 rounded-lg ring-1 transition ${
//                                   card.selectedReaction === "support"
//                                     ? "bg-[#16A34A]/10 text-[#16A34A] ring-[#16A34A]/30"
//                                     : "bg-white text-[#16A34A]/80 ring-[#16A34A]/25 hover:text-[#16A34A]"
//                                 }`}
//                               >
//                                 <span className="relative leading-none">
//                                   <span>🤝</span>
//                                   <span className="absolute top-1/2 -translate-y-1/2 right-full mr-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#102E50] text-[#FFF6E9] opacity-0 group-hover:opacity-100 whitespace-nowrap shadow">
//                                     Support
//                                   </span>
//                                 </span>
//                                 <span className="text-[10px] font-bold leading-none">{card.reaction_counts?.support || 0}</span>
//                               </button>

//                               <button
//                                 type="button"
//                                 onClick={async (e) => {
//                                   await handleReact(e, pid, "proud");
//                                   setOpenReac(null);
//                                 }}
//                                 className={`group relative text-[10px] font-extrabold inline-flex items-center gap-1.5 px-2 h-8 rounded-lg ring-1 transition ${
//                                   card.selectedReaction === "proud"
//                                     ? "bg-[#F5C45E]/20 text-[#C68E2E] ring-[#F5C45E]/40"
//                                     : "bg-white text-[#C68E2E]/80 ring-[#F5C45E]/35 hover:text-[#C68E2E]"
//                                 }`}
//                               >
//                                 <span className="relative leading-none">
//                                   <span>⭐</span>
//                                   {/* <span className="absolute top-1/2 -translate-y-1/2 right_full mr-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#102E50] text-[#FFF6E9] opacity-0 group-hover:opacity-100 whitespace-nowrap shadow">
//                                     Proud
//                                   </span> */}
//                                   <span className="absolute top-1/2 -translate-y-1/2 right-full mr-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#102E50] text-[#FFF6E9] opacity-0 group-hover:opacity-100 whitespace-nowrap shadow">
//   Proud
// </span>

//                                 </span>
//                                 <span className="text-[10px] font-bold leading-none">{card.reaction_counts?.proud || 0}</span>
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       )}
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
//                         </div>
//                       )}
//                     </div>

//                     <div className="h-0.5 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
//                   </div>
//                 );
//               })}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

"ايموجيز تحت صغار ";

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
//   const [openReac, setOpenReac] = useState(null);

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

//   useEffect(() => {
//     const onDocClick = () => setOpenReac(null);
//     const onKey = (e) => {
//       if (e.key === "Escape") setOpenReac(null);
//     };
//     document.addEventListener("click", onDocClick);
//     document.addEventListener("keydown", onKey);
//     return () => {
//       document.removeEventListener("click", onDocClick);
//       document.removeEventListener("keydown", onKey);
//     };
//   }, []);

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
//       const optimistic = cards.map((c) => {
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

//       setCards(optimistic);

//       try {
//         const { data } = await axios.post(
//           `${apiBase}/api/product/reaction`.replace("/api/api", "/api"),
//           { product_id, userId: uid, type: reactionKey },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         if (data?.reactionCounts) {
//           setCards((curr) =>
//             curr.map((c) =>
//               Number(c.product_id) === Number(product_id)
//                 ? { ...c, reaction_counts: data.reactionCounts, selectedReaction: data.selectedReaction ?? c.selectedReaction }
//                 : c
//             )
//           );
//         }
//       } catch {
//         setCards(prevCards);
//       }
//     },
//     [apiBase, token, isLogged, navigate, cards, uid]
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
//                   <div
//                     key={pid}
//                     role="button"
//                     tabIndex={0}
//                     onClick={() =>
//                       isLogged
//                         ? navigate(`/productdatails?product_id=${pid}`, { state: { product_id: pid } })
//                         : navigate("/login")
//                     }
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter") {
//                         isLogged
//                           ? navigate(`/productdatails?product_id=${pid}`, { state: { product_id: pid } })
//                           : navigate("/login");
//                       }
//                     }}
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
//                       <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text:[10px] text-[10px] font-semibold bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10">
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
//                           <div className="relative group">
//                             <button
//                               type="button"
//                               onClick={() => setOpenReac(openReac === pid ? null : pid)}
//                               className={`${iconBtnBase} bg-white ring-1 ring-[#F5C45E]/50 text-[#0f2a47] relative`}
//                               aria-expanded={openReac === pid}
//                             >
//                               <span className="text-sm">🫶</span>
//                               <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold bg-[#F5C45E]/90 text-[#102E50] grid place-items-center">
//                                 {rcCount}
//                               </span>
//                             </button>
//                             {openReac !== pid && (
//                               <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#102E50] text-[#FFF6E9] opacity-0 group-hover:opacity-100 whitespace-nowrap shadow">
//                                 Show some love
//                               </span>
//                             )}
//                             {openReac === pid && (
//                               <div
//                                 className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 z-30 rounded-2xl bg-white ring-1 ring-[#F5C45E]/40 shadow-[0_10px_30px_rgba(16,46,80,0.15)] px-2.5 py-1.5 flex flex-row items-center gap-1.5"
//                                 onClick={(e) => e.stopPropagation()}
//                               >
//                                 <button
//                                   type="button"
//                                   onClick={async (e) => {
//                                     await handleReact(e, pid, "love");
//                                     setOpenReac(null);
//                                   }}
//                                   className={`group relative text-[10px] font-extrabold inline-flex items-center gap-1.5 px-2 h-8 rounded-lg ring-1 transition ${
//                                     card.selectedReaction === "love"
//                                       ? "bg-[#BE3D2A]/10 text-[#BE3D2A] ring-[#BE3D2A]/30"
//                                       : "bg-white text-[#BE3D2A]/80 ring-[#BE3D2A]/25 hover:text-[#BE3D2A]"
//                                   }`}
//                                 >
//                                   <span className="relative leading-none">
//                                     <span>❤️</span>
//                                     <span className="pointer-events-none absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#102E50] text-[#FFF6E9] opacity-0 group-hover:opacity-100 whitespace-nowrap shadow">
//                                       Love
//                                     </span>
//                                   </span>
//                                   <span className="text-[10px] font-bold leading-none">{card.reaction_counts?.love || 0}</span>
//                                 </button>

//                                 <button
//                                   type="button"
//                                   onClick={async (e) => {
//                                     await handleReact(e, pid, "support");
//                                     setOpenReac(null);
//                                   }}
//                                   className={`group relative text-[10px] font-extrabold inline-flex items-center gap-1.5 px-2 h-8 rounded-lg ring-1 transition ${
//                                     card.selectedReaction === "support"
//                                       ? "bg-[#16A34A]/10 text-[#16A34A] ring-[#16A34A]/30"
//                                       : "bg-white text-[#16A34A]/80 ring-[#16A34A]/25 hover:text-[#16A34A]"
//                                   }`}
//                                 >
//                                   <span className="relative leading-none">
//                                     <span>🤝</span>
//                                     <span className="pointer-events-none absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#102E50] text-[#FFF6E9] opacity-0 group-hover:opacity-100 whitespace-nowrap shadow">
//                                       Support
//                                     </span>
//                                   </span>
//                                   <span className="text-[10px] font-bold leading-none">{card.reaction_counts?.support || 0}</span>
//                                 </button>

//                                 <button
//                                   type="button"
//                                   onClick={async (e) => {
//                                     await handleReact(e, pid, "proud");
//                                     setOpenReac(null);
//                                   }}
//                                   className={`group relative text-[10px] font-extrabold inline-flex items-center gap-1.5 px-2 h-8 rounded-lg ring-1 transition ${
//                                     card.selectedReaction === "proud"
//                                       ? "bg-[#F5C45E]/20 text-[#C68E2E] ring-[#F5C45E]/40"
//                                       : "bg-white text-[#C68E2E]/80 ring-[#F5C45E]/35 hover:text-[#C68E2E]"
//                                   }`}
//                                 >
//                                   <span className="relative leading-none">
//                                     <span>⭐</span>
//                                     <span className="pointer-events-none absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#102E50] text-[#FFF6E9] opacity-0 group-hover:opacity-100 whitespace-nowrap shadow">
//                                       Proud
//                                     </span>
//                                   </span>
//                                   <span className="text-[10px] font-bold leading-none">{card.reaction_counts?.proud || 0}</span>
//                                 </button>
//                               </div>
//                             )}
//                           </div>

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

//                     <div className="h-0.5 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
//                   </div>
//                 );
//               })}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

"ـــ";

import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import defaultImg from "../assets/NoImage.png";
import { useAddToCart } from "./AddToCart";
import AddTOFav from "./AddToFav";

function CategorySelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const currentLabel = value || "All";

  return (
    // <div ref={ref} className="relative">
    //   <button
    //     type="button"
    //     onClick={() => setOpen((v) => !v)}
    //     className="w-full rounded-xl border border-[#E78B48]/40 bg-[#FFF6E9] text-[#102E50] font-semibold px-4 py-2 pr-10 shadow-sm focus:ring-2 focus:ring-[#F5C45E] focus:border-[#E78B48] transition duration-200 hover:border-[#E78B48] appearance-none cursor-pointer"
    //   >
    //     {currentLabel}
    //     <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#E78B48]">
    //       <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor" aria-hidden="true">
    //         <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.17l3.71-2.94a.75.75 0 0 1 1.04 1.08l-4.25 3.37a.75.75 0 0 1-.94 0L5.21 8.31a.75.75 0 0 1 .02-1.1z"/>
    //       </svg>
    //     </span>
    //   </button>

    //   {open && (
    //     <div className="absolute z-30 mt-2 w-56 rounded-xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden">
    //       <ul className="py-1">
    //         <li>
    //           <button
    //             className={`w-full text-left px-4 py-2 text-[#102E50] hover:bg-[#FFF6E9] ${value === "" ? "font-bold" : ""}`}
    //             onClick={() => { onChange(""); setOpen(false); }}
    //           >
    //             ✓ All
    //           </button>
    //         </li>
    //         {options.map((opt, i) => (
    //           <li key={i}>
    //             <button
    //               className={`w-full text-left px-4 py-2 text-[#102E50] hover:bg-[#FFF6E9] ${value === opt ? "font-bold" : ""}`}
    //               onClick={() => { onChange(opt); setOpen(false); }}
    //             >
    //               {opt}
    //             </button>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   )}
    // </div>

    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-40 rounded-xl border border-[#E78B48]/40 bg-[#FFF6E9] text-[#102E50] font-semibold px-4 py-3 pr-10 shadow-sm focus:ring-2 focus:ring-[#F5C45E] focus:border-[#E78B48] transition duration-200 hover:border-[#E78B48] appearance-none cursor-pointer relative flex items-center justify-center text-sm"
      >
        <span className="truncate">{currentLabel}</span>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#E78B48]">
          <svg
            viewBox="0 0 20 20"
            className="w-4 h-4"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.17l3.71-2.94a.75.75 0 0 1 1.04 1.08l-4.25 3.37a.75.75 0 0 1-.94 0L5.21 8.31a.75.75 0 0 1 .02-1.1z" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 z-30 mt-2 w-60 rounded-xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden">
          <ul className="divide-y divide-[#102E50]/10">
            <li>
              <button
                className={`w-full text-left px-4 py-2.5 text-[#102E50] hover:bg-[#FFF6E9] ${
                  value === "" ? "font-bold" : ""
                } text-sm`}
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
              >
                ✓ All
              </button>
            </li>
            {options.map((opt, i) => (
              <li key={i}>
                <button
                  className={`w-full text-left px-4 py-2.5 text-[#102E50] hover:bg-[#FFF6E9] ${
                    value === opt ? "font-bold" : ""
                  } text-sm`}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

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
  const [openReac, setOpenReac] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(textSearch), 250);
    return () => clearTimeout(t);
  }, [textSearch]);

  useEffect(() => {
    const run = async () => {
      if (!uid) return;
      try {
        setLoading(true);
<<<<<<< HEAD
        const res = await axios.get(`https://backend-a2qq.onrender.com/api/ShowCardInUserDashboard/${uid}`);
=======
        const res = await axios.get(
          `${apiBase}/api/ShowCardInUserDashboard/${uid}`
        );
>>>>>>> 1f4dfdf4e2896e97b17ce5ab160ffead4ddce1c8
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
      const { data } = await axios.get(
        `${apiBase}/api/wishlist`.replace("/api/api", "/api"),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const list = Array.isArray(data?.items) ? data.items : [];
      setFavIds(new Set(list.map((x) => Number(x.product_id))));
    } catch {}
  }, [apiBase, token]);

  const loadCartIds = useCallback(async () => {
    try {
      if (!uid || !token) return;
      const res = await axios.get(
        `${apiBase}/api/carts/products/${uid}`.replace("/api/api", "/api"),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const list = Array.isArray(res.data?.cards) ? res.data.cards : [];
      setCartIds(new Set(list.map((c) => Number(c.product_id))));
    } catch {}
  }, [apiBase, token, uid]);

  useEffect(() => {
    loadFavs();
    loadCartIds();
  }, [loadFavs, loadCartIds]);

  useEffect(() => {
    const onDocClick = () => setOpenReac(null);
    const onKey = (e) => {
      if (e.key === "Escape") setOpenReac(null);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const categories = useMemo(
    () => [...new Set(cards.map((c) => c?.category_name).filter(Boolean))],
    [cards]
  );

  const toImg = useCallback(
    (img) => {
      if (!img) return defaultImg;
      const s = String(img).trim();
      if (s.startsWith("http")) return s;
      return `${apiBase}${s.startsWith("/") ? "" : "/"}${s}`;
    },
    [apiBase]
  );

  const money = useMemo(
    () =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }),
    []
  );

  const filtered = cards.filter((card) => {
    const byName = (card?.name || "")
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());
    const byCat =
      !selectore ||
      (card?.category_name || "").toLowerCase() ===
        String(selectore).toLowerCase();
    return byName && byCat;
  });

  const field =
    "h-11 sm:h-12 px-4 rounded-xl border border-[#102E50]/20 bg-[#FFF6E9] text-[#102E50] placeholder-[#102E50]/50 text-sm shadow-sm outline-none focus:ring-2 focus:ring-[#E78B48] focus:border-[#E78B48] transition-all duration-200";

  const iconBtnBase =
    "w-7 h-7 rounded-md grid place-items-center shadow hover:shadow-md active:scale-95 transition";
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
      const optimistic = cards.map((c) => {
        if (Number(c.product_id) !== Number(product_id)) return c;
        const prevSelected = c.selectedReaction || null;
        const counts = {
          love: 0,
          support: 0,
          proud: 0,
          ...(c.reaction_counts || {}),
        };
        if (prevSelected && counts[prevSelected] > 0)
          counts[prevSelected] = Number(counts[prevSelected]) - 1;
        let newSelected = reactionKey;
        if (prevSelected === reactionKey) {
          newSelected = null;
        } else {
          counts[reactionKey] = Number(counts[reactionKey] || 0) + 1;
        }
        return { ...c, reaction_counts: counts, selectedReaction: newSelected };
      });

      setCards(optimistic);

      try {
        const { data } = await axios.post(
          `${apiBase}/api/product/reaction`.replace("/api/api", "/api"),
          { product_id, userId: uid, type: reactionKey },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data?.reactionCounts) {
          setCards((curr) =>
            curr.map((c) =>
              Number(c.product_id) === Number(product_id)
                ? {
                    ...c,
                    reaction_counts: data.reactionCounts,
                    selectedReaction:
                      data.selectedReaction ?? c.selectedReaction,
                  }
                : c
            )
          );
        }
      } catch {
        setCards(prevCards);
      }
    },
    [apiBase, token, isLogged, navigate, cards, uid]
  );

  return (
    <div className="min-h-screen bg-[#FFF6E9] text-[#cb7d2a]">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 pb-8 md:pb-10">
        <div className="sticky top-0 z-20 pt-4 pb-4 bg-[#FFF6E9]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FFF6E9]/80">
          <div className="rounded-[1.6rem] p-[1.2px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
            <div className="rounded-[1.6rem] bg-white/95">
              <div className="p-4 sm:p-6 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                  <div className="flex-1 relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-[#102E50]/50 pointer-events-none">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L19 20.49 20.49 19 15.5 14ZM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z" />
                      </svg>
                    </span>
                    <input
                      value={textSearch}
                      onChange={(e) => setTextSearch(e.target.value)}
                      placeholder="Search services or products"
                      className={`${field} w-full pl-10`}
                    />
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-sm font-semibold text-[#102E50]">
                      Category
                    </span>
                    <CategorySelect
                      value={selectore}
                      onChange={setSelectore}
                      options={categories}
                    />
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
                        ? navigate(`/productdatails?product_id=${pid}`, {
                            state: { product_id: pid },
                          })
                        : navigate("/login")
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        isLogged
                          ? navigate(`/productdatails?product_id=${pid}`, {
                              state: { product_id: pid },
                            })
                          : navigate("/login");
                      }
                    }}
                    className="group rounded-2xl bg-white ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden text-left transition"
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

                      {role === "customer" && (
                        <div
                          className="absolute top-2 right-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="relative group">
                            <button
                              type="button"
                              onClick={() =>
                                setOpenReac(openReac === pid ? null : pid)
                              }
                              className="w-7 h-7 rounded-md grid place-items-center shadow hover:shadow-md active:scale-95 transition bg-white ring-1 ring-[#F5C45E]/50 text-[#0f2a47] relative"
                              aria-expanded={openReac === pid}
                            >
                              <span className="text-sm">✨</span>
                              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold bg-[#F5C45E]/90 text-[#102E50] grid place-items-center">
                                {rcCount}
                              </span>
                            </button>
                            {openReac !== pid && (
                              <span className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-full mr-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#102E50] text-[#FFF6E9] opacity-0 group-hover:opacity-100 whitespace-nowrap shadow">
                                Show some love
                              </span>
                            )}
                          </div>

                          {openReac === pid && (
                            <div
                              className="absolute right-0 mt-2 z-30 rounded-2xl bg-white ring-1 ring-[#F5C45E]/40 shadow-[0_10px_30px_rgba(16,46,80,0.15)] px-2.5 py-1.5 flex flex-col gap-1.5"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                type="button"
                                onClick={async (e) => {
                                  await handleReact(e, pid, "love");
                                  setOpenReac(null);
                                }}
                                className={`group relative text-[10px] font-extrabold inline-flex items-center gap-1.5 px-2 h-8 rounded-lg ring-1 transition ${
                                  card.selectedReaction === "love"
                                    ? "bg-[#BE3D2A]/10 text-[#BE3D2A] ring-[#BE3D2A]/30"
                                    : "bg-white text-[#BE3D2A]/80 ring-[#BE3D2A]/25 hover:text-[#BE3D2A]"
                                }`}
                              >
                                <span className="relative leading-none">
                                  <span>❤️</span>
                                  <span className="absolute top-1/2 -translate-y-1/2 right-full mr-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#102E50] text-[#FFF6E9] opacity-0 group-hover:opacity-100 whitespace-nowrap shadow">
                                    Love
                                  </span>
                                </span>
                                <span className="text-[10px] font-bold leading-none">
                                  {card.reaction_counts?.love || 0}
                                </span>
                              </button>

                              <button
                                type="button"
                                onClick={async (e) => {
                                  await handleReact(e, pid, "support");
                                  setOpenReac(null);
                                }}
                                className={`group relative text-[10px] font-extrabold inline-flex items-center gap-1.5 px-2 h-8 rounded-lg ring-1 transition ${
                                  card.selectedReaction === "support"
                                    ? "bg-[#16A34A]/10 text-[#16A34A] ring-[#16A34A]/30"
                                    : "bg-white text-[#16A34A]/80 ring-[#16A34A]/25 hover:text-[#16A34A]"
                                }`}
                              >
                                <span className="relative leading-none">
                                  <span>🤝</span>
                                  <span className="absolute top-1/2 -translate-y-1/2 right-full mr-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#102E50] text-[#FFF6E9] opacity-0 group-hover:opacity-100 whitespace-nowrap shadow">
                                    Support
                                  </span>
                                </span>
                                <span className="text-[10px] font-bold leading-none">
                                  {card.reaction_counts?.support || 0}
                                </span>
                              </button>

                              <button
                                type="button"
                                onClick={async (e) => {
                                  await handleReact(e, pid, "proud");
                                  setOpenReac(null);
                                }}
                                className={`group relative text-[10px] font-extrabold inline-flex items-center gap-1.5 px-2 h-8 rounded-lg ring-1 transition ${
                                  card.selectedReaction === "proud"
                                    ? "bg-[#F5C45E]/20 text-[#C68E2E] ring-[#F5C45E]/40"
                                    : "bg-white text-[#C68E2E]/80 ring-[#F5C45E]/35 hover:text-[#C68E2E]"
                                }`}
                              >
                                <span className="relative leading-none">
                                  <span>⭐</span>
                                  <span className="absolute top-1/2 -translate-y-1/2 right-full mr-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#102E50] text-[#FFF6E9] opacity-0 group-hover:opacity-100 whitespace-nowrap shadow">
                                    Proud
                                  </span>
                                </span>
                                <span className="text-[10px] font-bold leading-none">
                                  {card.reaction_counts?.proud || 0}
                                </span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="px-3 py-2 bg-[#F5C45E]/18 ring-1 ring-[#F5C45E]/35 flex justify-between items-center">
                      <span className="inline-flex items-center rounded-lg bg-white/90 text-[#102E50] ring-1 ring-[#102E50]/10 text-xs font-extrabold px-2 py-1">
                        {money.format(card?.price || 0)}
                      </span>
                      <span className="text-[#0f2a47] font-semibold text-xs truncate">
                        {card?.name}
                      </span>
                      {role === "customer" && (
                        <div
                          className="relative flex items-center gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span
                            onClick={async () => await toggleCart(card, inCart)}
                            className={`${iconBtnBase} ${
                              inCart ? cartActive : cartInactive
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <circle cx="9" cy="21" r="1" />
                              <circle cx="20" cy="21" r="1" />
                              <path d="M1 1h4l2.68 12.39a2 2 0 002 1.61h7.72a2 2 0 002-1.61L23 6H6" />
                            </svg>
                          </span>

                          <span
                            onClick={async () =>
                              await toggleFavorite(card, isFav)
                            }
                            className={`${iconBtnBase} ${
                              isFav ? heartActive : heartInactive
                            }`}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="w-3.5 h-3.5"
                              fill="currentColor"
                            >
                              <path d="M12 21s-6.72-4.32-9.33-7.38A5.5 5.5 0 0112 5.24a5.5 5.5 0 019.33 8.38C18.72 16.68 12 21 12 21Z" />
                            </svg>
                          </span>
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
