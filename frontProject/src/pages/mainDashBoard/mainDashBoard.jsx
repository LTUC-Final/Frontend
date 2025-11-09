



// import { useEffect, useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import defaultImg from "../../assets/NoImage.png";

// export default function MainDashBoard() {
//   const token = useSelector((s) => s.UserInfo?.token);
//   const isLogged = Boolean(token);
//   const navigate = useNavigate();

//   const apiBase =
//     import.meta.env.VITE_API ||
//     `http://localhost:${import.meta.env.VITE_PORT}/api`;

//   const [slideIndex, setSlideIndex] = useState(0);
//   const [topOrders, setTopOrders] = useState([]);
//   const [loadingTop, setLoadingTop] = useState(true);
//   const [imagesByCategory, setImagesByCategory] = useState({});

//   const apiOrigin = useMemo(() => {
//     const m = String(apiBase || "").match(/^(.+?)\/api\/?$/);
//     return m ? m[1] : "";
//   }, [apiBase]);

//   const resolveImage = (u) => {
//     if (!u) return "";
//     const s = String(u).trim();
//     if (/^https?:\/\//i.test(s)) return s;
//     if (s.startsWith("/uploads")) return `${apiOrigin}${s}`;
//     if (s.startsWith("/")) return `${apiOrigin}${s}`;
//     return s;
//   };

//   const toImg = (img) => {
//     if (!img) return defaultImg;
//     const s = String(img).trim();
//     if (/^https?:\/\//i.test(s)) return s;
//     if (s.startsWith("/")) return `${apiOrigin}${s}`;
//     return s || defaultImg;
//   };

//   const categories = useMemo(
//     () => [
//       { key: "arts", name: "Arts & Creativity", dir: "/dashboardImages/Arts & Creativity/", fallback: "/dashboardImages/Arts & Creativity/Arts & Creativity9.jpg" },
//       { key: "handmade", name: "Handmade & Crafts", dir: "/dashboardImages/Handmade & Crafts/", fallback: "/dashboardImages/Handmade & Crafts/Handmade & Crafts5.jpg" },
//       { key: "beauty", name: "Beauty & Style", dir: "/dashboardImages/Beauty & Style/", fallback: "/dashboardImages/Beauty & Style/Beauty & Style5.webp" },
//       { key: "events", name: "Events & Celebrations", dir: "/dashboardImages/Events & Celebrations/", fallback: "/dashboardImages/Events & Celebrations/Events & Celebrations1.jpg" },
//       { key: "learning", name: "Learning & Coaching", dir: "/dashboardImages/Learning & Coaching/", fallback: "/dashboardImages/Learning & Coaching/Learning & Coaching4.jpg" },
//       { key: "traditional", name: "Traditional & Cultural", dir: "/dashboardImages/Traditional & Cultural/", fallback: "/dashboardImages/Traditional & Cultural/Traditional & Cultural15.jpg" }
//     ],
//     []
//   );

//   const heroSlides = useMemo(() => {
//     const picks = [];
//     for (const c of categories) {
//       const arr = imagesByCategory[c.key];
//       if (Array.isArray(arr) && arr.length) picks.push({ src: arr[0], caption: c.name, sub: "Discover more" });
//     }
//     if (picks.length) return picks;
//     return [
//       { src: "/dashboardImages/Arts & Creativity/Arts & Creativity1.jpg", caption: "Discover trusted providers", sub: "Photography, henna, face painting, accessories, and more" },
//       { src: "/dashboardImages/Beauty & Style/Beauty & Style1.webp", caption: "Book services in minutes", sub: "Fast, simple, and secure experience" },
//       { src: "/dashboardImages/Handmade & Crafts/Handmade & Crafts1.jpg", caption: "Find what suits your event", sub: "Quality work and fair prices" }
//     ];
//   }, [categories, imagesByCategory]);

//   useEffect(() => {
//     const reduce =
//       typeof window !== "undefined" &&
//       window.matchMedia &&
//       window.matchMedia("(prefers-reduced-motion: reduce)").matches;
//     if (reduce || heroSlides.length <= 1) return;
//     const t = setInterval(() => {
//       setSlideIndex((i) => (i + 1) % heroSlides.length);
//     }, 3500);
//     return () => clearInterval(t);
//   }, [heroSlides.length]);

//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         setLoadingTop(true);
//         const { data } = await axios.get(`${apiBase}/topordered`);
//         const items = Array.isArray(data?.items) ? data.items.slice(0, 3) : [];
//         if (mounted) setTopOrders(items);
//       } catch {
//         if (mounted) setTopOrders([]);
//       } finally {
//         if (mounted) setLoadingTop(false);
//       }
//     })();
//     return () => {
//       mounted = false;
//     };
//   }, [apiBase]);

//   useEffect(() => {
//     let active = true;
//     (async () => {
//       try {
//         const res = await fetch("/dashboardImages/manifest.json", { cache: "no-store" });
//         if (!res.ok) throw new Error("manifest not found");
//         const manifest = await res.json();
//         if (!active) return;
//         const mapped = {};
//         for (const c of categories) {
//           const list = manifest[c.key] || manifest[c.name] || [];
//           const cleaned = Array.isArray(list)
//             ? list.map((p) => String(p)).filter((s) => s && s.startsWith(c.dir))
//             : [];
//           const shuffled = cleaned.length ? cleaned.sort(() => Math.random() - 0.5) : [];
//           mapped[c.key] = shuffled.length ? shuffled : [c.fallback];
//         }
//         setImagesByCategory(mapped);
//       } catch {
//         const mapped = {};
//         for (const c of categories) mapped[c.key] = [c.fallback];
//         setImagesByCategory(mapped);
//       }
//     })();
//     return () => {
//       active = false;
//     };
//   }, [categories]);

//   const gotoLoginOr = (path) => {
//     if (!isLogged) return navigate("/login");
//     navigate(path);
//   };

//   const HeroImage = ({ src, alt }) => {
//     return (
//       <div className="relative w-full h-60 sm:h-72 md:h-96 overflow-hidden">
//         <div
//           className="absolute inset-0 bg-center bg-cover scale-110 blur-[12px] opacity-40"
//           style={{ backgroundImage: `url(${src})` }}
//           aria-hidden="true"
//         />
//         <img
//           src={src}
//           alt={alt}
//           className="relative z-10 block w-full h-full object-contain"
//           loading="lazy"
//           decoding="async"
//           onError={(e) => (e.currentTarget.src = defaultImg)}
//         />
//       </div>
//     );
//   };

//   const CardImage = ({ src, hasImage, alt }) => {
//     if (!hasImage) {
//       return (
//         <div className="relative w-full aspect-[4/3] overflow-hidden">
//           <div
//             className="absolute inset-0 bg-center bg-cover scale-110 blur-[10px] opacity-40"
//             style={{ backgroundImage: `url(${defaultImg})` }}
//             aria-hidden="true"
//           />
//           <img
//             src={defaultImg}
//             alt={alt}
//             className="relative z-10 block w-full h-full object-contain"
//             loading="lazy"
//             decoding="async"
//           />
//         </div>
//       );
//     }
//     return (
//       <div className="relative w-full aspect-[4/3] bg-[#0f2a47]/5">
//         <img
//           src={src}
//           alt={alt}
//           className="block w-full h-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
//           onError={(e) => (e.currentTarget.src = defaultImg)}
//           loading="lazy"
//           decoding="async"
//         />
//       </div>
//     );
//   };

//   const MediaBox = ({ src, alt, ratio = "aspect-[4/3]", fallback = defaultImg }) => {
//     const ok = Boolean(src);
//     return (
//       <div className={`relative w-full ${ratio} overflow-hidden rounded-2xl`}>
//         {ok ? (
//           <img
//             src={src}
//             alt={alt}
//             className="block w-full h-full object-cover"
//             loading="lazy"
//             decoding="async"
//             onError={(e) => {
//               e.currentTarget.src = fallback;
//             }}
//           />
//         ) : (
//           <img
//             src={fallback}
//             alt={alt || "image"}
//             className="block w-full h-full object-cover"
//             loading="lazy"
//             decoding="async"
//           />
//         )}
//       </div>
//     );
//   };

//   const SixGrid = ({ list }) => {
//     const six = list.slice(0, 6);
//     return (
//       <div className="grid grid-cols-3 gap-2 sm:gap-3">
//         {six.map((src, idx) => (
//           <div key={idx} className="rounded-xl overflow-hidden">
//             <div className="aspect-square">
//               <img
//                 src={src}
//                 alt={`item-${idx + 1}`}
//                 className="block w-full h-full object-cover transition-transform duration-300 hover:scale-110"
//                 loading="lazy"
//                 decoding="async"
//                 onError={(e) => {
//                   e.currentTarget.src = defaultImg;
//                 }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] relative antialiased">
//       {!isLogged && (
//         <div
//           onClick={() => navigate("/login")}
//           className="absolute inset-0 z-40 cursor-pointer"
//           style={{ background: "transparent" }}
//         />
//       )}

//       <section className="relative overflow-hidden">
//         <div className="mx-auto max-w-7xl px-3 sm:px-6 pt-6 sm:pt-10">
//           <div className="rounded-3xl bg-white shadow-[0_20px_60px_rgba(16,46,80,0.15)] ring-1 ring-[#102E50]/10 overflow-hidden">
//             <div className="relative">
//               {heroSlides.map((s, i) => (
//                 <div
//                   key={i}
//                   className={`transition-all duration-700 ${i === slideIndex ? "opacity-100 scale-100 relative" : "opacity-0 scale-95 pointer-events-none absolute inset-0"}`}
//                 >
//                   <div className="grid md:grid-cols-2 gap-0 items-stretch">
//                     <div className="order-2 md:order-1 p-6 sm:p-10 flex items-center">
//                       <div className="w-full">
//                         <div className="inline-flex items-center gap-2 rounded-full border border-[#102E50]/15 px-3 py-1 text-[11px] font-semibold text-[#102E50] bg-[#F5C45E]/20">
//                           Bidaya
//                         </div>
//                         <h1 className="mt-3 sm:mt-4 text-[#102E50] text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
//                           {s.caption}
//                         </h1>
//                         <p className="mt-2 sm:mt-3 text-[#102E50]/70 text-sm sm:text-base md:text-lg">
//                           {s.sub}
//                         </p>
//                         <div className="mt-5 sm:mt-7 flex gap-3">
//                           <button
//                             onClick={() => gotoLoginOr("/userDashboard")}
//                             className="rounded-xl bg-[#102E50] text-[#FFF6E9] px-5 py-3 text-sm sm:text-base font-bold shadow-[0_10px_30px_rgba(16,46,80,0.35)] hover:-translate-y-0.5 transition"
//                           >
//                             Explore Services
//                           </button>
//                           <button
//                             onClick={() => gotoLoginOr("/userDashboard")}
//                             className="rounded-xl bg-[#F5C45E] text-[#102E50] px-5 py-3 text-sm sm:text-base font-bold shadow-[0_10px_30px_rgba(245,196,94,0.40)] hover:-translate-y-0.5 transition"
//                           >
//                             Browse Categories
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="order-1 md:order-2">
//                       <HeroImage src={s.src} alt={s.caption} />
//                     </div>
//                   </div>
//                 </div>
//               ))}

//               <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
//                 {heroSlides.map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setSlideIndex(i)}
//                     className={`h-2.5 w-7 rounded-full transition-all ${i === slideIndex ? "bg-[#F5C45E]" : "bg-[#102E50]/15"}`}
//                     aria-label={`Go to slide ${i + 1}`}
//                     aria-pressed={i === slideIndex}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="mx-auto max-w-7xl px-3 sm:px-6 py-10 sm:py-14">
//         <div className="mb-5 sm:mb-7 flex items-center justify-between">
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#102E50] tracking-tight">
//             Categories
//           </h2>
//         </div>

//         <div className="grid gap-6 md:gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {categories.map((c) => {
//             const base = imagesByCategory[c.key] || [c.fallback];
//             const list = base.slice(0, 6);
//             return (
//               <div
//                 key={c.key}
//                 className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_40px_rgba(16,46,80,0.08)] p-4 sm:p-5"
//               >
//                 <div className="flex items-center justify-between mb-3 sm:mb-4">
//                   <h3 className="text-[#102E50] text-lg font-extrabold truncate">{c.name}</h3>
//                   <button
//                     onClick={() => gotoLoginOr("/userDashboard")}
//                     className="text-[11px] sm:text-xs font-bold text-[#102E50] bg-[#E78B48]/30 px-3 py-1 rounded-full"
//                   >
//                     Open
//                   </button>
//                 </div>
//                 <SixGrid list={list} />
//                 <div className="mt-3 flex items-center justify-end text-[#102E50]/70 text-xs sm:text-sm">
//                   <button
//                     onClick={() => gotoLoginOr("/userDashboard")}
//                     className="underline underline-offset-4 hover:text-[#BE3D2A] transition"
//                   >
//                     View more
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       <section className="mx-auto max-w-7xl px-3 sm:px-6 pb-12 sm:pb-16">
//         <div className="mb-5 sm:mb-7 flex items-center justify-between">
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#102E50] tracking-tight">
//             Top Ordered
//           </h2>
//         </div>

//         {loadingTop ? (
//           <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//             {[...Array(3)].map((_, i) => (
//               <div
//                 key={i}
//                 className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-[0_12px_40px_rgba(16,46,80,0.08)] overflow-hidden ring-1 ring-[#102E50]/10 animate-pulse"
//               >
//                 <div className="h-60 sm:h-64 md:h-72 bg-[#102E50]/10" />
//                 <div className="p-4 space-y-2">
//                   <div className="h-4 bg-[#102E50]/10 rounded w-3/4" />
//                   <div className="h-3 bg-[#102E50]/5 rounded w-1/3" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : topOrders.length === 0 ? (
//           <div className="text-[#102E50]/70 text-sm sm:text-base">No data yet.</div>
//         ) : (
//           <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//             {topOrders.map((p) => {
//               const img = toImg(p.image_url || p.image);
//               const hasImage = Boolean(p.image_url || p.image);
//               return (
//                 <button
//                   key={p.product_id}
//                   onClick={() =>
//                     isLogged
//                       ? navigate(`/productdatails?product_id=${p.product_id}`, { state: { product_id: p.product_id } })
//                       : navigate("/login")
//                   }
//                   className="group rounded-2xl bg-white ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden text-left transition"
//                 >
//                   <CardImage src={img} hasImage={hasImage} alt={p.name || `#${p.product_id}`} />
//                   <div className="p-4">
//                     <div className="font-extrabold text-[#102E50] text-sm sm:text-base line-clamp-2">
//                       {p.name || `#${p.product_id}`}
//                     </div>
//                     {p.price !== undefined && p.price !== null && (
//                       <div className="mt-2 flex items-center gap-2">
//                         <span className="rounded-md bg-[#F5C45E] px-2.5 py-1 text-[#102E50] text-xs sm:text-sm font-extrabold shadow">
//                           {Number(p.price).toFixed(2)} JD
//                         </span>
//                         <span className="rounded-md bg-[#BE3D2A] px-2 py-1 text-white text-[10px] uppercase tracking-wide shadow-sm">
//                           Top
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         )}
//       </section>

//       <section className="mx-auto max-w-7xl px-3 sm:px-6 pb-16 sm:pb-20">
//         <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
//           <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden">
//             <div className="relative w-full h-60 sm:h-64 md:h-72">
//               <img
//                 src="/dashboardImages/Traditional & Cultural/Traditional & Cultural15.jpg"
//                 alt="Traditional & Cultural"
//                 className="block w-full h-full object-cover object-center"
//                 loading="lazy"
//                 decoding="async"
//                 onError={(e) => (e.currentTarget.src = defaultImg)}
//               />
//             </div>
//             <div className="p-4">
//               <div className="border-b border-[#102E50]/15 pb-2 mb-3">
//                 <h3 className="font-extrabold text-[#102E50] truncate">Traditional & Cultural</h3>
//               </div>
//               <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
//                 <span>Amman</span>
//                 <span className="font-extrabold text-[#BE3D2A]">50 JD</span>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden">
//             <div className="relative w-full h-60 sm:h-64 md:h-72">
//               <img
//                 src="/dashboardImages/Handmade & Crafts/Handmade & Crafts18.jpg"
//                 alt="Handmade accessories"
//                 className="block w-full h-full object-cover object-center"
//                 loading="lazy"
//                 decoding="async"
//                 onError={(e) => (e.currentTarget.src = defaultImg)}
//               />
//             </div>
//             <div className="p-4">
//               <div className="border-b border-[#102E50]/15 pb-2 mb-3">
//                 <h3 className="font-extrabold text-[#102E50] truncate">Handmade Picks</h3>
//               </div>
//               <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
//                 <span>Irbid</span>
//                 <span className="font-extrabold text-[#BE3D2A]">15 JD</span>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden">
//             <div className="relative w-full h-60 sm:h-64 md:h-72">
//               <img
//                 src="/dashboardImages/Beauty & Style/Beauty & Style4.jpeg"
//                 alt="Event makeup"
//                 className="block w-full h-full object-cover object-center"
//                 loading="lazy"
//                 decoding="async"
//                 onError={(e) => (e.currentTarget.src = defaultImg)}
//               />
//             </div>
//             <div className="p-4">
//               <div className="border-b border-[#102E50]/15 pb-2 mb-3">
//                 <h3 className="font-extrabold text-[#102E50] truncate">Beauty & Style</h3>
//               </div>
//               <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
//                 <span>Zarqa</span>
//                 <span className="font-extrabold text-[#BE3D2A]">30 JD</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-7 sm:mt-9 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
//           <button
//             onClick={() => gotoLoginOr("/userDashboard")}
//             className="rounded-2xl bg-[#102E50] text-[#FFF6E9] py-3.5 sm:py-4 font-extrabold shadow-[0_14px_40px_rgba(16,46,80,0.35)] hover:-translate-y-0.5 transition ring-2 ring-[#102E50]/20 text-sm sm:text-base"
//           >
//             Thousands of Providers
//           </button>
//           <button
//             onClick={() => gotoLoginOr("/userDashboard")}
//             className="rounded-2xl bg-[#E78B48] text-[#102E50] py-3.5 sm:py-4 font-extrabold shadow-[0_14px_40px_rgba(231,139,72,0.35)] hover:-translate-y-0.5 transition ring-2 ring-[#E78B48]/25 text-sm sm:text-base"
//           >
//             Fast & Reliable Orders
//           </button>
//           <button
//             onClick={() => gotoLoginOr("/userDashboard")}
//             className="rounded-2xl bg-[#F5C45E] text-[#102E50] py-3.5 sm:py-4 font-extrabold shadow-[0_14px_40px_rgba(245,196,94,0.40)] hover:-translate-y-0.5 transition ring-2 ring-[#F5C45E]/25 text-sm sm:text-base"
//           >
//             Happy Customers
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// }
















// import { useEffect, useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import defaultImg from "../../assets/NoImage.png";

// export default function MainDashBoard() {
//   const token = useSelector((s) => s.UserInfo?.token);
//   const isLogged = Boolean(token);
//   const navigate = useNavigate();

//   const apiBase =
//     import.meta.env.VITE_API ||
//     `http://localhost:${import.meta.env.VITE_PORT}/api`;

//   const [slideIndex, setSlideIndex] = useState(0);
//   const [topOrders, setTopOrders] = useState([]);
//   const [loadingTop, setLoadingTop] = useState(true);
//   const [imagesByCategory, setImagesByCategory] = useState({});

//   const apiOrigin = useMemo(() => {
//     const m = String(apiBase || "").match(/^(.+?)\/api\/?$/);
//     return m ? m[1] : "";
//   }, [apiBase]);

//   const resolveImage = (u) => {
//     if (!u) return "";
//     const s = String(u).trim();
//     if (/^https?:\/\//i.test(s)) return s;
//     if (s.startsWith("/uploads")) return `${apiOrigin}${s}`;
//     if (s.startsWith("/")) return `${apiOrigin}${s}`;
//     return s;
//   };

//   const toImg = (img) => {
//     if (!img) return defaultImg;
//     const s = String(img).trim();
//     if (/^https?:\/\//i.test(s)) return s;
//     if (s.startsWith("/")) return `${apiOrigin}${s}`;
//     return s || defaultImg;
//   };

//   const categories = useMemo(
//     () => [
//       { key: "arts", name: "Arts & Creativity", dir: "/dashboardImages/Arts & Creativity/", fallback: "/dashboardImages/Arts & Creativity/Arts & Creativity9.jpg" },
//       { key: "handmade", name: "Handmade & Crafts", dir: "/dashboardImages/Handmade & Crafts/", fallback: "/dashboardImages/Handmade & Crafts/Handmade & Crafts5.jpg" },
//       { key: "beauty", name: "Beauty & Style", dir: "/dashboardImages/Beauty & Style/", fallback: "/dashboardImages/Beauty & Style/Beauty & Style5.webp" },
//       { key: "events", name: "Events & Celebrations", dir: "/dashboardImages/Events & Celebrations/", fallback: "/dashboardImages/Events & Celebrations/Events & Celebrations1.jpg" },
//       { key: "learning", name: "Learning & Coaching", dir: "/dashboardImages/Learning & Coaching/", fallback: "/dashboardImages/Learning & Coaching/Learning & Coaching4.jpg" },
//       { key: "traditional", name: "Traditional & Cultural", dir: "/dashboardImages/Traditional & Cultural/", fallback: "/dashboardImages/Traditional & Cultural/Traditional & Cultural15.jpg" }
//     ],
//     []
//   );

//   const heroSlides = useMemo(() => {
//     const picks = [];
//     for (const c of categories) {
//       const arr = imagesByCategory[c.key];
//       if (Array.isArray(arr) && arr.length) picks.push({ src: arr[0], caption: c.name, sub: "Discover more" });
//     }
//     if (picks.length) return picks;
//     return [
//       { src: "/dashboardImages/Arts & Creativity/Arts & Creativity1.jpg", caption: "Discover trusted providers", sub: "Photography, henna, face painting, accessories, and more" },
//       { src: "/dashboardImages/Beauty & Style/Beauty & Style1.webp", caption: "Book services in minutes", sub: "Fast, simple, and secure experience" },
//       { src: "/dashboardImages/Handmade & Crafts/Handmade & Crafts1.jpg", caption: "Find what suits your event", sub: "Quality work and fair prices" }
//     ];
//   }, [categories, imagesByCategory]);

//   useEffect(() => {
//     const reduce =
//       typeof window !== "undefined" &&
//       window.matchMedia &&
//       window.matchMedia("(prefers-reduced-motion: reduce)").matches;
//     if (reduce || heroSlides.length <= 1) return;
//     const t = setInterval(() => {
//       setSlideIndex((i) => (i + 1) % heroSlides.length);
//     }, 3500);
//     return () => clearInterval(t);
//   }, [heroSlides.length]);

//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         setLoadingTop(true);
//         const { data } = await axios.get(`${apiBase}/topordered`);
//         const items = Array.isArray(data?.items) ? data.items.slice(0, 3) : [];
//         if (mounted) setTopOrders(items);
//       } catch {
//         if (mounted) setTopOrders([]);
//       } finally {
//         if (mounted) setLoadingTop(false);
//       }
//     })();
//     return () => {
//       mounted = false;
//     };
//   }, [apiBase]);

//   useEffect(() => {
//     let active = true;
//     (async () => {
//       try {
//         const res = await fetch("/dashboardImages/manifest.json", { cache: "no-store" });
//         if (!res.ok) throw new Error("manifest not found");
//         const manifest = await res.json();
//         if (!active) return;
//         const mapped = {};
//         for (const c of categories) {
//           const list = manifest[c.key] || manifest[c.name] || [];
//           const cleaned = Array.isArray(list)
//             ? list.map((p) => String(p)).filter((s) => s && s.startsWith(c.dir))
//             : [];
//           const shuffled = cleaned.length ? cleaned.sort(() => Math.random() - 0.5) : [];
//           mapped[c.key] = shuffled.length ? shuffled : [c.fallback];
//         }
//         setImagesByCategory(mapped);
//       } catch {
//         const mapped = {};
//         for (const c of categories) mapped[c.key] = [c.fallback];
//         setImagesByCategory(mapped);
//       }
//     })();
//     return () => {
//       active = false;
//     };
//   }, [categories]);

//   const gotoLoginOr = (path) => {
//     if (!isLogged) return navigate("/login");
//     navigate(path);
//   };

//   const CardImage = ({ src, hasImage, alt }) => {
//     if (!hasImage) {
//       return (
//         <div className="relative w-full aspect-[4/3] overflow-hidden">
//           <div
//             className="absolute inset-0 bg-center bg-cover scale-110 blur-[10px] opacity-40"
//             style={{ backgroundImage: `url(${defaultImg})` }}
//           />
//           <img
//             src={defaultImg}
//             alt={alt}
//             className="relative z-10 block w-full h-full object-contain"
//             loading="lazy"
//             decoding="async"
//           />
//         </div>
//       );
//     }
//     return (
//       <div className="relative w-full aspect-[4/3] bg-[#0f2a47]/5">
//         <img
//           src={src}
//           alt={alt}
//           className="block w-full h-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
//           onError={(e) => (e.currentTarget.src = defaultImg)}
//           loading="lazy"
//           decoding="async"
//         />
//       </div>
//     );
//   };

//   const SixGrid = ({ list }) => {
//     const six = list.slice(0, 6);
//     return (
//       <div className="grid grid-cols-3 gap-2 sm:gap-3">
//         {six.map((src, idx) => (
//           <div key={idx} className="rounded-xl overflow-hidden">
//             <div className="aspect-square">
//               <img
//                 src={src}
//                 alt={`item-${idx + 1}`}
//                 className="block w-full h-full object-cover transition-transform duration-300 hover:scale-110"
//                 loading="lazy"
//                 decoding="async"
//                 onError={(e) => {
//                   e.currentTarget.src = defaultImg;
//                 }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const currentCat = useMemo(() => {
//     const cur = heroSlides[slideIndex];
//     if (!cur) return null;
//     return categories.find((c) => c.name === cur.caption) || null;
//   }, [heroSlides, slideIndex, categories]);

//   const collageList = useMemo(() => {
//     if (!currentCat) return [];
//     const base = imagesByCategory[currentCat.key] || [currentCat.fallback];
//     return base.slice(0, 6);
//   }, [currentCat, imagesByCategory]);

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] relative antialiased">
//       {!isLogged && (
//         <div onClick={() => navigate("/login")} className="absolute inset-0 z-40 cursor-pointer" />
//       )}

//       <section className="relative overflow-hidden">
//         <div className="mx-auto max-w-7xl px-3 sm:px-6 pt-4 sm:pt-6">
//           <div className="rounded-3xl bg-white shadow-[0_16px_44px_rgba(16,46,80,0.12)] ring-1 ring-[#102E50]/10 overflow-hidden">
//             <div className="grid md:grid-cols-2 items-stretch">
//               <div className="relative p-5 sm:p-8 md:p-9 flex items-center bg-gradient-to-b from-[#FFF6E9] to-white">
//                 <div className="w-full">
//                   <div className="inline-flex items-center gap-2 rounded-full border border-[#102E50]/15 px-3 py-1 text-[11px] font-semibold text-[#102E50] bg-[#F5C45E]/20">
//                     Bidaya
//                   </div>
//                   <h1 className="mt-2 sm:mt-3 text-[#102E50] text-xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
//                     {heroSlides[slideIndex]?.caption || "Discover trusted providers"}
//                   </h1>
//                   <p className="mt-1.5 sm:mt-2 text-[#102E50]/70 text-sm sm:text-base">
//                     {heroSlides[slideIndex]?.sub || "Fast, simple, and secure experience"}
//                   </p>
//                   <div className="mt-4 sm:mt-6 flex gap-3">
//                     <button
//                       onClick={() => gotoLoginOr("/userDashboard")}
//                       className="rounded-xl bg-[#102E50] text-[#FFF6E9] px-4 py-2.5 text-sm font-bold shadow-[0_10px_26px_rgba(16,46,80,0.32)] hover:-translate-y-0.5 transition"
//                     >
//                       Explore Services
//                     </button>
//                     <button
//                       onClick={() => gotoLoginOr("/userDashboard")}
//                       className="rounded-xl bg-[#F5C45E] text-[#102E50] px-4 py-2.5 text-sm font-bold shadow-[0_10px_26px_rgba(245,196,94,0.36)] hover:-translate-y-0.5 transition"
//                     >
//                       Browse Categories
//                     </button>
//                   </div>
//                   <div className="mt-4 sm:mt-5 flex gap-2">
//                     {heroSlides.map((_, i) => (
//                       <button
//                         key={i}
//                         onClick={() => setSlideIndex(i)}
//                         className={`h-2 w-6 rounded-full transition-all ${i === slideIndex ? "bg-[#F5C45E]" : "bg-[#102E50]/15"}`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="relative flex items-center justify-center bg-white">
//                 <div className="w-full h-full">
//                   <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] rounded-none overflow-hidden">
//                     <div
//                       className="absolute inset-0 bg-center bg-cover opacity-30 scale-110"
//                       style={{ backgroundImage: `url(${heroSlides[slideIndex]?.src || defaultImg})` }}
//                     />
//                     <img
//                       src={heroSlides[slideIndex]?.src || defaultImg}
//                       alt="hero"
//                       className="relative z-10 w-full h-full object-cover object-center"
//                       loading="lazy"
//                       decoding="async"
//                       onError={(e) => (e.currentTarget.src = defaultImg)}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="mx-auto max-w-7xl px-3 sm:px-6 py-8 sm:py-12">
//         <div className="mb-5 sm:mb-7 flex items-center justify-between">
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#102E50] tracking-tight">
//             Categories
//           </h2>
//         </div>

//         <div className="grid gap-6 md:gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {categories.map((c) => {
//             const base = imagesByCategory[c.key] || [c.fallback];
//             const list = base.slice(0, 6);
//             return (
//               <div
//                 key={c.key}
//                 className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_40px_rgba(16,46,80,0.08)] p-4 sm:p-5"
//               >
//                 <div className="flex items-center justify-between mb-3 sm:mb-4">
//                   <h3 className="text-[#102E50] text-lg font-extrabold truncate">{c.name}</h3>
//                   <button
//                     onClick={() => gotoLoginOr("/userDashboard")}
//                     className="text-[11px] sm:text-xs font-bold text-[#102E50] bg-[#E78B48]/30 px-3 py-1 rounded-full"
//                   >
//                     Open
//                   </button>
//                 </div>
//                 <SixGrid list={list} />
//                 <div className="mt-3 flex items-center justify-end text-[#102E50]/70 text-xs sm:text-sm">
//                   <button
//                     onClick={() => gotoLoginOr("/userDashboard")}
//                     className="underline underline-offset-4 hover:text-[#BE3D2A] transition"
//                   >
//                     View more
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       <section className="mx-auto max-w-7xl px-3 sm:px-6 pb-12 sm:pb-16">
//         <div className="mb-5 sm:mb-7 flex items-center justify-between">
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#102E50] tracking-tight">
//             Top Ordered
//           </h2>
//         </div>

//         {loadingTop ? (
//           <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//             {[...Array(3)].map((_, i) => (
//               <div
//                 key={i}
//                 className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-[0_12px_40px_rgba(16,46,80,0.08)] overflow-hidden ring-1 ring-[#102E50]/10 animate-pulse"
//               >
//                 <div className="h-60 sm:h-64 md:h-72 bg-[#102E50]/10" />
//                 <div className="p-4 space-y-2">
//                   <div className="h-4 bg-[#102E50]/10 rounded w-3/4" />
//                   <div className="h-3 bg-[#102E50]/5 rounded w-1/3" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : topOrders.length === 0 ? (
//           <div className="text-[#102E50]/70 text-sm sm:text-base">No data yet.</div>
//         ) : (
//           <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//             {topOrders.map((p) => {
//               const img = toImg(p.image_url || p.image);
//               const hasImage = Boolean(p.image_url || p.image);
//               return (
//                 <button
//                   key={p.product_id}
//                   onClick={() =>
//                     isLogged
//                       ? navigate(`/productdatails?product_id=${p.product_id}`, { state: { product_id: p.product_id } })
//                       : navigate("/login")
//                   }
//                   className="group rounded-2xl bg-white ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden text-left transition"
//                 >
//                   <CardImage src={img} hasImage={hasImage} alt={p.name || `#${p.product_id}`} />
//                   <div className="p-4">
//                     <div className="font-extrabold text-[#102E50] text-sm sm:text-base line-clamp-2">
//                       {p.name || `#${p.product_id}`}
//                     </div>
//                     {p.price !== undefined && p.price !== null && (
//                       <div className="mt-2 flex items-center gap-2">
//                         <span className="rounded-md bg-[#F5C45E] px-2.5 py-1 text-[#102E50] text-xs sm:text-sm font-extrabold shadow">
//                           {Number(p.price).toFixed(2)} JD
//                         </span>
//                         <span className="rounded-md bg-[#BE3D2A] px-2 py-1 text-white text-[10px] uppercase tracking-wide shadow-sm">
//                           Top
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         )}
//       </section>

//       <section className="mx-auto max-w-7xl px-3 sm:px-6 pb-16 sm:pb-20">
//         <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
//           <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden">
//             <div className="relative w-full h-60 sm:h-64 md:h-72">
//               <img
//                 src="/dashboardImages/Traditional & Cultural/Traditional & Cultural15.jpg"
//                 alt="Traditional & Cultural"
//                 className="block w-full h-full object-cover object-center"
//                 loading="lazy"
//                 decoding="async"
//                 onError={(e) => (e.currentTarget.src = defaultImg)}
//               />
//             </div>
//             <div className="p-4">
//               <div className="border-b border-[#102E50]/15 pb-2 mb-3">
//                 <h3 className="font-extrabold text-[#102E50] truncate">Traditional & Cultural</h3>
//               </div>
//               <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
//                 <span>Amman</span>
//                 <span className="font-extrabold text-[#BE3D2A]">50 JD</span>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden">
//             <div className="relative w-full h-60 sm:h-64 md:h-72">
//               <img
//                 src="/dashboardImages/Handmade & Crafts/Handmade & Crafts18.jpg"
//                 alt="Handmade accessories"
//                 className="block w-full h-full object-cover object-center"
//                 loading="lazy"
//                 decoding="async"
//                 onError={(e) => (e.currentTarget.src = defaultImg)}
//               />
//             </div>
//             <div className="p-4">
//               <div className="border-b border-[#102E50]/15 pb-2 mb-3">
//                 <h3 className="font-extrabold text-[#102E50] truncate">Handmade Picks</h3>
//               </div>
//               <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
//                 <span>Irbid</span>
//                 <span className="font-extrabold text-[#BE3D2A]">15 JD</span>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden">
//             <div className="relative w-full h-60 sm:h-64 md:h-72">
//               <img
//                 src="/dashboardImages/Beauty & Style/Beauty & Style4.jpeg"
//                 alt="Event makeup"
//                 className="block w-full h-full object-cover object-center"
//                 loading="lazy"
//                 decoding="async"
//                 onError={(e) => (e.currentTarget.src = defaultImg)}
//               />
//             </div>
//             <div className="p-4">
//               <div className="border-b border-[#102E50]/15 pb-2 mb-3">
//                 <h3 className="font-extrabold text-[#102E50] truncate">Beauty & Style</h3>
//               </div>
//               <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
//                 <span>Zarqa</span>
//                 <span className="font-extrabold text-[#BE3D2A]">30 JD</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-7 sm:mt-9 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
//           <button
//             onClick={() => gotoLoginOr("/userDashboard")}
//             className="rounded-2xl bg-[#102E50] text-[#FFF6E9] py-3.5 sm:py-4 font-extrabold shadow-[0_14px_40px_rgba(16,46,80,0.35)] hover:-translate-y-0.5 transition ring-2 ring-[#102E50]/20 text-sm sm:text-base"
//           >
//             Thousands of Providers
//           </button>
//           <button
//             onClick={() => gotoLoginOr("/userDashboard")}
//             className="rounded-2xl bg-[#E78B48] text-[#102E50] py-3.5 sm:py-4 font-extrabold shadow-[0_14px_40px_rgba(231,139,72,0.35)] hover:-translate-y-0.5 transition ring-2 ring-[#E78B48]/25 text-sm sm:text-base"
//           >
//             Fast & Reliable Orders
//           </button>
//           <button
//             onClick={() => gotoLoginOr("/userDashboard")}
//             className="rounded-2xl bg-[#F5C45E] text-[#102E50] py-3.5 sm:py-4 font-extrabold shadow-[0_14px_40px_rgba(245,196,94,0.40)] hover:-translate-y-0.5 transition ring-2 ring-[#F5C45E]/25 text-sm sm:text-base"
//           >
//             Happy Customers
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// }







// import { useEffect, useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import defaultImg from "../../assets/NoImage.png";

// export default function MainDashBoard() {
//   const token = useSelector((s) => s.UserInfo?.token);
//   const isLogged = Boolean(token);
//   const navigate = useNavigate();

//   const apiBase =
//     import.meta.env.VITE_API ||
//     `http://localhost:${import.meta.env.VITE_PORT}/api`;

//   const [slideIndex, setSlideIndex] = useState(0);
//   const [topOrders, setTopOrders] = useState([]);
//   const [loadingTop, setLoadingTop] = useState(true);

//   const apiOrigin = useMemo(() => {
//     const m = String(apiBase || "").match(/^(.+?)\/api\/?$/);
//     return m ? m[1] : "";
//   }, [apiBase]);

//   const toImg = (img) => {
//     if (!img) return defaultImg;
//     const s = String(img).trim();
//     if (/^https?:\/\//i.test(s)) return s;
//     if (s.startsWith("/")) return `${apiOrigin}${s}`;
//     return s || defaultImg;
//   };

//   const categories = useMemo(
//     () => [
//       { key: "arts", name: "Arts & Creativity", image: "/dashboardImages/Arts & Creativity/Arts & Creativity1.jpg" },
//       { key: "handmade", name: "Handmade & Crafts", image: "/dashboardImages/Handmade & Crafts/Handmade & Crafts1.jpg" },
//       { key: "beauty", name: "Beauty & Style", image: "/dashboardImages/Beauty & Style/Beauty & Style1.webp" },
//       { key: "events", name: "Events & Celebrations", image: "/dashboardImages/Events & Celebrations/Events & Celebrations1.jpg" },
//       { key: "learning", name: "Learning & Coaching", image: "/dashboardImages/Learning & Coaching/Learning & Coaching1.jpg" },
//       { key: "traditional", name: "Traditional & Cultural", image: "/dashboardImages/Traditional & Cultural/Traditional & Cultural1.jpg" },
//     ],
//     []
//   );

//   const heroSlides = useMemo(
//     () => [
//       { src: "/dashboardImages/Arts & Creativity/Arts & Creativity1.jpg", caption: "Discover trusted providers", sub: "Photography, henna, face painting, accessories, and more" },
//       { src: "/dashboardImages/Beauty & Style/Beauty & Style1.webp", caption: "Book services in minutes", sub: "Fast, simple, and secure experience" },
//       { src: "/dashboardImages/Handmade & Crafts/Handmade & Crafts1.jpg", caption: "Find what suits your event", sub: "Quality work and fair prices" },
//     ],
//     []
//   );

//   useEffect(() => {
//     if (heroSlides.length <= 1) return;
//     const t = setInterval(() => {
//       setSlideIndex((i) => (i + 1) % heroSlides.length);
//     }, 3500);
//     return () => clearInterval(t);
//   }, [heroSlides.length]);

//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         setLoadingTop(true);
//         const { data } = await axios.get(`${apiBase}/topordered`);
//         const items = Array.isArray(data?.items) ? data.items.slice(0, 3) : [];
//         if (mounted) setTopOrders(items);
//       } catch {
//         if (mounted) setTopOrders([]);
//       } finally {
//         if (mounted) setLoadingTop(false);
//       }
//     })();
//     return () => {
//       mounted = false;
//     };
//   }, [apiBase]);

//   const gotoLoginOr = (path) => {
//     if (!isLogged) return navigate("/login");
//     navigate(path);
//   };

//   const CardImage = ({ src, hasImage, alt }) => {
//     if (!hasImage) {
//       return (
//         <div className="relative w-full aspect-[4/3] overflow-hidden">
//           <div
//             className="absolute inset-0 bg-center bg-cover scale-110 blur-[10px] opacity-40"
//             style={{ backgroundImage: `url(${defaultImg})` }}
//           />
//           <img
//             src={defaultImg}
//             alt={alt}
//             className="relative z-10 block w-full h-full object-contain"
//             loading="lazy"
//             decoding="async"
//           />
//         </div>
//       );
//     }
//     return (
//       <div className="relative w-full aspect-[4/3] bg-[#0f2a47]/5">
//         <img
//           src={src}
//           alt={alt}
//           className="block w-full h-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
//           onError={(e) => (e.currentTarget.src = defaultImg)}
//           loading="lazy"
//           decoding="async"
//         />
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] relative antialiased">
//       {!isLogged && (
//         <div onClick={() => navigate("/login")} className="absolute inset-0 z-40 cursor-pointer" />
//       )}

//       <section className="relative overflow-hidden">
//         <div className="mx-auto max-w-7xl px-3 sm:px-6 pt-4 sm:pt-6">
//           <div className="rounded-3xl bg-white shadow-[0_16px_44px_rgba(16,46,80,0.12)] ring-1 ring-[#102E50]/10 overflow-hidden">
//             <div className="grid md:grid-cols-2 items-stretch">
//               <div className="relative p-5 sm:p-8 md:p-9 flex items-center bg-gradient-to-b from-[#FFF6E9] to-white">
//                 <div className="w-full">
//                   <div className="inline-flex items-center gap-2 rounded-full border border-[#102E50]/15 px-3 py-1 text-[11px] font-semibold text-[#102E50] bg-[#F5C45E]/20">
//                     Bidaya
//                   </div>
//                   <h1 className="mt-2 sm:mt-3 text-[#102E50] text-xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
//                     {heroSlides[slideIndex]?.caption || "Discover trusted providers"}
//                   </h1>
//                   <p className="mt-1.5 sm:mt-2 text-[#102E50]/70 text-sm sm:text-base">
//                     {heroSlides[slideIndex]?.sub || "Fast, simple, and secure experience"}
//                   </p>
//                   <div className="mt-4 sm:mt-6 flex gap-3">
//                     <button
//                       onClick={() => gotoLoginOr("/userDashboard")}
//                       className="rounded-xl bg-[#102E50] text-[#FFF6E9] px-4 py-2.5 text-sm font-bold shadow-[0_10px_26px_rgba(16,46,80,0.32)] hover:-translate-y-0.5 transition"
//                     >
//                       Explore Services
//                     </button>
//                     <button
//                       onClick={() => gotoLoginOr("/userDashboard")}
//                       className="rounded-xl bg-[#F5C45E] text-[#102E50] px-4 py-2.5 text-sm font-bold shadow-[0_10px_26px_rgba(245,196,94,0.36)] hover:-translate-y-0.5 transition"
//                     >
//                       Browse Categories
//                     </button>
//                   </div>
//                   <div className="mt-4 sm:mt-5 flex gap-2">
//                     {heroSlides.map((_, i) => (
//                       <button
//                         key={i}
//                         onClick={() => setSlideIndex(i)}
//                         className={`h-2 w-6 rounded-full transition-all ${i === slideIndex ? "bg-[#F5C45E]" : "bg-[#102E50]/15"}`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="relative flex items-center justify-center bg-white">
//                 <div className="w-full h-full">
//                   <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] rounded-none overflow-hidden">
//                     <div
//                       className="absolute inset-0 bg-center bg-cover opacity-30 scale-110"
//                       style={{ backgroundImage: `url(${heroSlides[slideIndex]?.src || defaultImg})` }}
//                     />
//                     <img
//                       src={heroSlides[slideIndex]?.src || defaultImg}
//                       alt="hero"
//                       className="relative z-10 w-full h-full object-cover object-center"
//                       loading="lazy"
//                       decoding="async"
//                       onError={(e) => (e.currentTarget.src = defaultImg)}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="mx-auto max-w-7xl px-3 sm:px-6 py-10 sm:py-14">
//         <div className="mb-5 sm:mb-7 flex items-center justify-between">
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#102E50] tracking-tight">
//             Categories
//           </h2>
//         </div>

//         <div className="grid gap-6 md:gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {categories.map((c) => (
//             <div
//               key={c.key}
//               className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_40px_rgba(16,46,80,0.08)] p-4 sm:p-5"
//             >
//               <div className="flex items-center justify-between mb-3 sm:mb-4">
//                 <h3 className="text-[#102E50] text-lg font-extrabold truncate">{c.name}</h3>
//                 <button
//                   onClick={() => gotoLoginOr("/userDashboard")}
//                   className="text-[11px] sm:text-xs font-bold text-[#102E50] bg-[#E78B48]/30 px-3 py-1 rounded-full"
//                 >
//                   Open
//                 </button>
//               </div>
//               <div className="rounded-xl overflow-hidden">
//                 <img
//                   src={c.image}
//                   alt={c.name}
//                   className="w-full h-[200px] object-cover rounded-xl"
//                   onError={(e) => (e.currentTarget.src = defaultImg)}
//                 />
//               </div>
//               <div className="mt-3 flex items-center justify-end text-[#102E50]/70 text-xs sm:text-sm">
//                 <button
//                   onClick={() => gotoLoginOr("/userDashboard")}
//                   className="underline underline-offset-4 hover:text-[#BE3D2A] transition"
//                 >
//                   View more
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="mx-auto max-w-7xl px-3 sm:px-6 pb-12 sm:pb-16">
//         <div className="mb-5 sm:mb-7 flex items-center justify-between">
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#102E50] tracking-tight">
//             Top Ordered
//           </h2>
//         </div>

//         {loadingTop ? (
//           <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//             {[...Array(3)].map((_, i) => (
//               <div
//                 key={i}
//                 className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-[0_12px_40px_rgba(16,46,80,0.08)] overflow-hidden ring-1 ring-[#102E50]/10 animate-pulse"
//               >
//                 <div className="h-60 sm:h-64 md:h-72 bg-[#102E50]/10" />
//                 <div className="p-4 space-y-2">
//                   <div className="h-4 bg-[#102E50]/10 rounded w-3/4" />
//                   <div className="h-3 bg-[#102E50]/5 rounded w-1/3" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : topOrders.length === 0 ? (
//           <div className="text-[#102E50]/70 text-sm sm:text-base">No data yet.</div>
//         ) : (
//           <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//             {topOrders.map((p) => {
//               const img = toImg(p.image_url || p.image);
//               const hasImage = Boolean(p.image_url || p.image);
//               return (
//                 <button
//                   key={p.product_id}
//                   onClick={() =>
//                     isLogged
//                       ? navigate(`/productdatails?product_id=${p.product_id}`, { state: { product_id: p.product_id } })
//                       : navigate("/login")
//                   }
//                   className="group rounded-2xl bg-white ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden text-left transition"
//                 >
//                   <CardImage src={img} hasImage={hasImage} alt={p.name || `#${p.product_id}`} />
//                   <div className="p-4">
//                     <div className="font-extrabold text-[#102E50] text-sm sm:text-base line-clamp-2">
//                       {p.name || `#${p.product_id}`}
//                     </div>
//                     {p.price !== undefined && p.price !== null && (
//                       <div className="mt-2 flex items-center gap-2">
//                         <span className="rounded-md bg-[#F5C45E] px-2.5 py-1 text-[#102E50] text-xs sm:text-sm font-extrabold shadow">
//                           {Number(p.price).toFixed(2)} JD
//                         </span>
//                         <span className="rounded-md bg-[#BE3D2A] px-2 py-1 text-white text-[10px] uppercase tracking-wide shadow-sm">
//                           Top
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         )}
//       </section>

//       <section className="mx-auto max-w-7xl px-3 sm:px-6 pb-16 sm:pb-20">
//         <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
//           <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden">
//             <div className="relative w-full h-60 sm:h-64 md:h-72">
//               <img
//                 src="/dashboardImages/Traditional & Cultural/Traditional & Cultural15.jpg"
//                 alt="Traditional & Cultural"
//                 className="block w-full h-full object-cover object-center"
//                 loading="lazy"
//                 decoding="async"
//                 onError={(e) => (e.currentTarget.src = defaultImg)}
//               />
//             </div>
//             <div className="p-4">
//               <div className="border-b border-[#102E50]/15 pb-2 mb-3">
//                 <h3 className="font-extrabold text-[#102E50] truncate">Traditional & Cultural</h3>
//               </div>
//               <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
//                 <span>Amman</span>
//                 <span className="font-extrabold text-[#BE3D2A]">50 JD</span>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden">
//             <div className="relative w-full h-60 sm:h-64 md:h-72">
//               <img
//                 src="/dashboardImages/Handmade & Crafts/Handmade & Crafts18.jpg"
//                 alt="Handmade accessories"
//                 className="block w-full h-full object-cover object-center"
//                 loading="lazy"
//                 decoding="async"
//                 onError={(e) => (e.currentTarget.src = defaultImg)}
//               />
//             </div>
//             <div className="p-4">
//               <div className="border-b border-[#102E50]/15 pb-2 mb-3">
//                 <h3 className="font-extrabold text-[#102E50] truncate">Handmade Picks</h3>
//               </div>
//               <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
//                 <span>Irbid</span>
//                 <span className="font-extrabold text-[#BE3D2A]">15 JD</span>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden">
//             <div className="relative w-full h-60 sm:h-64 md:h-72">
//               <img
//                 src="/dashboardImages/Beauty & Style/Beauty & Style4.jpeg"
//                 alt="Event makeup"
//                 className="block w-full h-full object-cover object-center"
//                 loading="lazy"
//                 decoding="async"
//                 onError={(e) => (e.currentTarget.src = defaultImg)}
//               />
//             </div>
//             <div className="p-4">
//               <div className="border-b border-[#102E50]/15 pb-2 mb-3">
//                 <h3 className="font-extrabold text-[#102E50] truncate">Beauty & Style</h3>
//               </div>
//               <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
//                 <span>Zarqa</span>
//                 <span className="font-extrabold text-[#BE3D2A]">30 JD</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-7 sm:mt-9 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
//           <button
//             onClick={() => gotoLoginOr("/userDashboard")}
//             className="rounded-2xl bg-[#102E50] text-[#FFF6E9] py-3.5 sm:py-4 font-extrabold shadow-[0_14px_40px_rgba(16,46,80,0.35)] hover:-translate-y-0.5 transition ring-2 ring-[#102E50]/20 text-sm sm:text-base"
//           >
//             Thousands of Providers
//           </button>
//           <button
//             onClick={() => gotoLoginOr("/userDashboard")}
//             className="rounded-2xl bg-[#E78B48] text-[#102E50] py-3.5 sm:py-4 font-extrabold shadow-[0_14px_40px_rgba(231,139,72,0.35)] hover:-translate-y-0.5 transition ring-2 ring-[#E78B48]/25 text-sm sm:text-base"
//           >
//             Fast & Reliable Orders
//           </button>
//           <button
//             onClick={() => gotoLoginOr("/userDashboard")}
//             className="rounded-2xl bg-[#F5C45E] text-[#102E50] py-3.5 sm:py-4 font-extrabold shadow-[0_14px_40px_rgba(245,196,94,0.40)] hover:-translate-y-0.5 transition ring-2 ring-[#F5C45E]/25 text-sm sm:text-base"
//           >
//             Happy Customers
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// }







// import { useEffect, useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import defaultImg from "../../assets/NoImage.png";

// export default function MainDashBoard() {
//   const token = useSelector((s) => s.UserInfo?.token);
//   const isLogged = Boolean(token);
//   const navigate = useNavigate();

//   const apiBase =
//     import.meta.env.VITE_API ||
//     `http://localhost:${import.meta.env.VITE_PORT}/api`;

//   const [slideIndex, setSlideIndex] = useState(0);
//   const [topOrders, setTopOrders] = useState([]);
//   const [loadingTop, setLoadingTop] = useState(true);
//   const [imagesByCategory, setImagesByCategory] = useState({});

//   const apiOrigin = useMemo(() => {
//     const m = String(apiBase || "").match(/^(.+?)\/api\/?$/);
//     return m ? m[1] : "";
//   }, [apiBase]);

//   const resolveImage = (u) => {
//     if (!u) return "";
//     const s = String(u).trim();
//     if (/^https?:\/\//i.test(s)) return s;
//     if (s.startsWith("/uploads")) return `${apiOrigin}${s}`;
//     if (s.startsWith("/")) return `${apiOrigin}${s}`;
//     return s;
//   };

//   const toImg = (img) => {
//     if (!img) return defaultImg;
//     const s = String(img).trim();
//     if (/^https?:\/\//i.test(s)) return s;
//     if (s.startsWith("/")) return `${apiOrigin}${s}`;
//     return s || defaultImg;
//   };

//   const categories = useMemo(
//     () => [
//       { key: "arts", name: "Arts & Creativity", dir: "/dashboardImages/Arts & Creativity/", fallback: "/dashboardImages/Arts & Creativity/Arts & Creativity9.jpg" },
//       { key: "handmade", name: "Handmade & Crafts", dir: "/dashboardImages/Handmade & Crafts/", fallback: "/dashboardImages/Handmade & Crafts/Handmade & Crafts5.jpg" },
//       { key: "beauty", name: "Beauty & Style", dir: "/dashboardImages/Beauty & Style/", fallback: "/dashboardImages/Beauty & Style/Beauty & Style5.webp" },
//       { key: "events", name: "Events & Celebrations", dir: "/dashboardImages/Events & Celebrations/", fallback: "/dashboardImages/Events & Celebrations/Events & Celebrations1.jpg" },
//       { key: "learning", name: "Learning & Coaching", dir: "/dashboardImages/Learning & Coaching/", fallback: "/dashboardImages/Learning & Coaching/Learning & Coaching4.jpg" },
//       { key: "traditional", name: "Traditional & Cultural", dir: "/dashboardImages/Traditional & Cultural/", fallback: "/dashboardImages/Traditional & Cultural/Traditional & Cultural15.jpg" }
//     ],
//     []
//   );

//   // === Hero slider ثابت (منهج القديم) مع 7 صور ===
//   const heroSlides = useMemo(
//     () => [
//       { src: "/dashboardImages/Arts & Creativity/Arts & Creativity1.jpg", caption: "Discover trusted providers", sub: "Photography, henna, face painting, accessories, and more" },
//       { src: "/dashboardImages/Beauty & Style/Beauty & Style1.webp", caption: "Book services in minutes", sub: "Fast, simple, and secure experience" },
//       { src: "/dashboardImages/Handmade & Crafts/Handmade & Crafts1.jpg", caption: "Find what suits your event", sub: "Quality work and fair prices" },
//       { src: "/dashboardImages/Events & Celebrations/Events & Celebrations2.jpg", caption: "Events & Celebrations", sub: "Plan your perfect day with ease" },
//       { src: "/dashboardImages/Learning & Coaching/Learning & Coaching3.jpg", caption: "Learning & Coaching", sub: "Grow skills with local experts" },
//       { src: "/dashboardImages/Traditional & Cultural/Traditional & Cultural12.jpg", caption: "Traditional & Cultural", sub: "Authentic local heritage and crafts" },
//       { src: "/dashboardImages/Beauty & Style/Beauty & Style4.jpeg", caption: "Beauty & Style Picks", sub: "Top-rated stylists near you" }
//     ],
//     []
//   );

//   useEffect(() => {
//     const reduce =
//       typeof window !== "undefined" &&
//       window.matchMedia &&
//       window.matchMedia("(prefers-reduced-motion: reduce)").matches;
//     if (reduce || heroSlides.length <= 1) return;
//     const t = setInterval(() => {
//       setSlideIndex((i) => (i + 1) % heroSlides.length);
//     }, 3500);
//     return () => clearInterval(t);
//   }, [heroSlides.length]);

//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         setLoadingTop(true);
//         const { data } = await axios.get(`${apiBase}/topordered`);
//         const items = Array.isArray(data?.items) ? data.items.slice(0, 3) : [];
//         if (mounted) setTopOrders(items);
//       } catch {
//         if (mounted) setTopOrders([]);
//       } finally {
//         if (mounted) setLoadingTop(false);
//       }
//     })();
//     return () => {
//       mounted = false;
//     };
//   }, [apiBase]);

//   useEffect(() => {
//     let active = true;
//     (async () => {
//       try {
//         const res = await fetch("/dashboardImages/manifest.json", { cache: "no-store" });
//         if (!res.ok) throw new Error("manifest not found");
//         const manifest = await res.json();
//         if (!active) return;
//         const mapped = {};
//         for (const c of categories) {
//           const list = manifest[c.key] || manifest[c.name] || [];
//           const cleaned = Array.isArray(list)
//             ? list.map((p) => String(p)).filter((s) => s && s.startsWith(c.dir))
//             : [];
//           const shuffled = cleaned.length ? cleaned.sort(() => Math.random() - 0.5) : [];
//           mapped[c.key] = shuffled.length ? shuffled : [c.fallback];
//         }
//         setImagesByCategory(mapped);
//       } catch {
//         const mapped = {};
//         for (const c of categories) mapped[c.key] = [c.fallback];
//         setImagesByCategory(mapped);
//       }
//     })();
//     return () => {
//       active = false;
//     };
//   }, [categories]);

//   const gotoLoginOr = (path) => {
//     if (!isLogged) return navigate("/login");
//     navigate(path);
//   };

//   const CardImage = ({ src, hasImage, alt }) => {
//     if (!hasImage) {
//       return (
//         <div className="relative w-full aspect-[4/3] overflow-hidden">
//           <div
//             className="absolute inset-0 bg-center bg-cover scale-110 blur-[10px] opacity-40"
//             style={{ backgroundImage: `url(${defaultImg})` }}
//           />
//           <img
//             src={defaultImg}
//             alt={alt}
//             className="relative z-10 block w-full h-full object-contain"
//             loading="lazy"
//             decoding="async"
//           />
//         </div>
//       );
//     }
//     return (
//       <div className="relative w-full aspect-[4/3] bg-[#0f2a47]/5">
//         <img
//           src={src}
//           alt={alt}
//           className="block w-full h-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
//           onError={(e) => (e.currentTarget.src = defaultImg)}
//           loading="lazy"
//           decoding="async"
//         />
//       </div>
//     );
//   };

//   const SixGrid = ({ list }) => {
//     const six = list.slice(0, 6);
//     return (
//       <div className="grid grid-cols-3 gap-2 sm:gap-3">
//         {six.map((src, idx) => (
//           <div key={idx} className="rounded-xl overflow-hidden">
//             <div className="aspect-square">
//               <img
//                 src={src}
//                 alt={`item-${idx + 1}`}
//                 className="block w-full h-full object-cover transition-transform duration-300 hover:scale-110"
//                 loading="lazy"
//                 decoding="async"
//                 onError={(e) => {
//                   e.currentTarget.src = defaultImg;
//                 }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const currentCat = useMemo(() => {
//     const cur = heroSlides[slideIndex];
//     if (!cur) return null;
//     return categories.find((c) => c.name === cur.caption) || null;
//   }, [heroSlides, slideIndex, categories]);

//   const collageList = useMemo(() => {
//     if (!currentCat) return [];
//     const base = imagesByCategory[currentCat.key] || [currentCat.fallback];
//     return base.slice(0, 6);
//   }, [currentCat, imagesByCategory]);

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] relative antialiased">
//       {!isLogged && (
//         <div onClick={() => navigate("/login")} className="absolute inset-0 z-40 cursor-pointer" />
//       )}

//       <section className="relative overflow-hidden">
//         <div className="mx-auto max-w-7xl px-3 sm:px-6 pt-4 sm:pt-6">
//           <div className="rounded-3xl bg-white shadow-[0_16px_44px_rgba(16,46,80,0.12)] ring-1 ring-[#102E50]/10 overflow-hidden">
//             <div className="grid md:grid-cols-2 items-stretch">
//               <div className="relative p-5 sm:p-8 md:p-9 flex items-center bg-gradient-to-b from-[#FFF6E9] to-white">
//                 <div className="w-full">
//                   <div className="inline-flex items-center gap-2 rounded-full border border-[#102E50]/15 px-3 py-1 text-[11px] font-semibold text-[#102E50] bg-[#F5C45E]/20">
//                     Bidaya
//                   </div>
//                   <h1 className="mt-2 sm:mt-3 text-[#102E50] text-xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
//                     {heroSlides[slideIndex]?.caption || "Discover trusted providers"}
//                   </h1>
//                   <p className="mt-1.5 sm:mt-2 text-[#102E50]/70 text-sm sm:text-base">
//                     {heroSlides[slideIndex]?.sub || "Fast, simple, and secure experience"}
//                   </p>
//                   <div className="mt-4 sm:mt-6 flex gap-3">
//                     <button
//                       onClick={() => gotoLoginOr("/userDashboard")}
//                       className="rounded-xl bg-[#102E50] text-[#FFF6E9] px-4 py-2.5 text-sm font-bold shadow-[0_10px_26px_rgba(16,46,80,0.32)] hover:-translate-y-0.5 transition"
//                     >
//                       Explore Services
//                     </button>
//                     <button
//                       onClick={() => gotoLoginOr("/userDashboard")}
//                       className="rounded-xl bg-[#F5C45E] text-[#102E50] px-4 py-2.5 text-sm font-bold shadow-[0_10px_26px_rgba(245,196,94,0.36)] hover:-translate-y-0.5 transition"
//                     >
//                       Browse Categories
//                     </button>
//                   </div>
//                   <div className="mt-4 sm:mt-5 flex gap-2">
//                     {heroSlides.map((_, i) => (
//                       <button
//                         key={i}
//                         onClick={() => setSlideIndex(i)}
//                         className={`h-2 w-6 rounded-full transition-all ${i === slideIndex ? "bg-[#F5C45E]" : "bg-[#102E50]/15"}`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="relative flex items-center justify-center bg-white">
//                 <div className="w-full h-full">
//                   <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] rounded-none overflow-hidden">
//                     <div
//                       className="absolute inset-0 bg-center bg-cover opacity-30 scale-110"
//                       style={{ backgroundImage: `url(${heroSlides[slideIndex]?.src || defaultImg})` }}
//                     />
//                     <img
//                       src={heroSlides[slideIndex]?.src || defaultImg}
//                       alt="hero"
//                       className="relative z-10 w-full h-full object-cover object-center"
//                       loading="lazy"
//                       decoding="async"
//                       onError={(e) => (e.currentTarget.src = defaultImg)}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="mx-auto max-w-7xl px-3 sm:px-6 py-8 sm:py-12">
//         <div className="mb-5 sm:mb-7 flex items-center justify-between">
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#102E50] tracking-tight">
//             Categories
//           </h2>
//         </div>

//         <div className="grid gap-6 md:gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {categories.map((c) => {
//             const base = imagesByCategory[c.key] || [c.fallback];
//             const list = base.slice(0, 6);
//             return (
//               <div
//                 key={c.key}
//                 className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_40px_rgba(16,46,80,0.08)] p-4 sm:p-5"
//               >
//                 <div className="flex items-center justify-between mb-3 sm:mb-4">
//                   <h3 className="text-[#102E50] text-lg font-extrabold truncate">{c.name}</h3>
//                   <button
//                     onClick={() => gotoLoginOr("/userDashboard")}
//                     className="text-[11px] sm:text-xs font-bold text-[#102E50] bg-[#E78B48]/30 px-3 py-1 rounded-full"
//                   >
//                     Open
//                   </button>
//                 </div>
//                 <SixGrid list={list} />
//                 <div className="mt-3 flex items-center justify-end text-[#102E50]/70 text-xs sm:text-sm">
//                   <button
//                     onClick={() => gotoLoginOr("/userDashboard")}
//                     className="underline underline-offset-4 hover:text-[#BE3D2A] transition"
//                   >
//                     View more
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       <section className="mx-auto max-w-7xl px-3 sm:px-6 pb-12 sm:pb-16">
//         <div className="mb-5 sm:mb-7 flex items-center justify-between">
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#102E50] tracking-tight">
//             Top Ordered
//           </h2>
//         </div>

//         {loadingTop ? (
//           <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//             {[...Array(3)].map((_, i) => (
//               <div
//                 key={i}
//                 className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-[0_12px_40px_rgba(16,46,80,0.08)] overflow-hidden ring-1 ring-[#102E50]/10 animate-pulse"
//               >
//                 <div className="h-60 sm:h-64 md:h-72 bg-[#102E50]/10" />
//                 <div className="p-4 space-y-2">
//                   <div className="h-4 bg-[#102E50]/10 rounded w-3/4" />
//                   <div className="h-3 bg-[#102E50]/5 rounded w-1/3" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : topOrders.length === 0 ? (
//           <div className="text-[#102E50]/70 text-sm sm:text-base">No data yet.</div>
//         ) : (
//           <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//             {topOrders.map((p) => {
//               const img = toImg(p.image_url || p.image);
//               const hasImage = Boolean(p.image_url || p.image);
//               return (
//                 <button
//                   key={p.product_id}
//                   onClick={() =>
//                     isLogged
//                       ? navigate(`/productdatails?product_id=${p.product_id}`, { state: { product_id: p.product_id } })
//                       : navigate("/login")
//                   }
//                   className="group rounded-2xl bg-white ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden text-left transition"
//                 >
//                   <CardImage src={img} hasImage={hasImage} alt={p.name || `#${p.product_id}`} />
//                   <div className="p-4">
//                     <div className="font-extrabold text-[#102E50] text-sm sm:text-base line-clamp-2">
//                       {p.name || `#${p.product_id}`}
//                     </div>
//                     {p.price !== undefined && p.price !== null && (
//                       <div className="mt-2 flex items-center gap-2">
//                         <span className="rounded-md bg-[#F5C45E] px-2.5 py-1 text-[#102E50] text-xs sm:text-sm font-extrabold shadow">
//                           {Number(p.price).toFixed(2)} JD
//                         </span>
//                         <span className="rounded-md bg-[#BE3D2A] px-2 py-1 text-white text-[10px] uppercase tracking-wide shadow-sm">
//                           Top
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         )}
//       </section>

//       <section className="mx-auto max-w-7xl px-3 sm:px-6 pb-16 sm:pb-20">
//         <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
//           <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden">
//             <div className="relative w-full h-60 sm:h-64 md:h-72">
//               <img
//                 src="/dashboardImages/Traditional & Cultural/Traditional & Cultural15.jpg"
//                 alt="Traditional & Cultural"
//                 className="block w-full h-full object-cover object-center"
//                 loading="lazy"
//                 decoding="async"
//                 onError={(e) => (e.currentTarget.src = defaultImg)}
//               />
//             </div>
//             <div className="p-4">
//               <div className="border-b border-[#102E50]/15 pb-2 mb-3">
//                 <h3 className="font-extrabold text-[#102E50] truncate">Traditional & Cultural</h3>
//               </div>
//               <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
//                 <span>Amman</span>
//                 <span className="font-extrabold text-[#BE3D2A]">50 JD</span>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden">
//             <div className="relative w-full h-60 sm:h-64 md:h-72">
//               <img
//                 src="/dashboardImages/Handmade & Crafts/Handmade & Crafts18.jpg"
//                 alt="Handmade accessories"
//                 className="block w-full h-full object-cover object-center"
//                 loading="lazy"
//                 decoding="async"
//                 onError={(e) => (e.currentTarget.src = defaultImg)}
//               />
//             </div>
//             <div className="p-4">
//               <div className="border-b border-[#102E50]/15 pb-2 mb-3">
//                 <h3 className="font-extrabold text-[#102E50] truncate">Handmade Picks</h3>
//               </div>
//               <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
//                 <span>Irbid</span>
//                 <span className="font-extrabold text-[#BE3D2A]">15 JD</span>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden">
//             <div className="relative w-full h-60 sm:h-64 md:h-72">
//               <img
//                 src="/dashboardImages/Beauty & Style/Beauty & Style4.jpeg"
//                 alt="Event makeup"
//                 className="block w-full h-full object-cover object-center"
//                 loading="lazy"
//                 decoding="async"
//                 onError={(e) => (e.currentTarget.src = defaultImg)}
//               />
//             </div>
//             <div className="p-4">
//               <div className="border-b border-[#102E50]/15 pb-2 mb-3">
//                 <h3 className="font-extrabold text-[#102E50] truncate">Beauty & Style</h3>
//               </div>
//               <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
//                 <span>Zarqa</span>
//                 <span className="font-extrabold text-[#BE3D2A]">30 JD</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-7 sm:mt-9 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
//           <button
//             onClick={() => gotoLoginOr("/userDashboard")}
//             className="rounded-2xl bg-[#102E50] text-[#FFF6E9] py-3.5 sm:py-4 font-extrabold shadow-[0_14px_40px_rgba(16,46,80,0.35)] hover:-translate-y-0.5 transition ring-2 ring-[#102E50]/20 text-sm sm:text-base"
//           >
//             Thousands of Providers
//           </button>
//           <button
//             onClick={() => gotoLoginOr("/userDashboard")}
//             className="rounded-2xl bg-[#E78B48] text-[#102E50] py-3.5 sm:py-4 font-extrabold shadow-[0_14px_40px_rgba(231,139,72,0.35)] hover:-translate-y-0.5 transition ring-2 ring-[#E78B48]/25 text-sm sm:text-base"
//           >
//             Fast & Reliable Orders
//           </button>
//           <button
//             onClick={() => gotoLoginOr("/userDashboard")}
//             className="rounded-2xl bg-[#F5C45E] text-[#102E50] py-3.5 sm:py-4 font-extrabold shadow-[0_14px_40px_rgba(245,196,94,0.40)] hover:-translate-y-0.5 transition ring-2 ring-[#F5C45E]/25 text-sm sm:text-base"
//           >
//             Happy Customers
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// }
















// import { useEffect, useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import defaultImg from "../../assets/NoImage.png";

// export default function MainDashBoard() {
//   const token = useSelector((s) => s.UserInfo?.token);
//   const isLogged = Boolean(token);
//   const navigate = useNavigate();

//   const apiBase =
//     import.meta.env.VITE_API ||
//     `http://localhost:${import.meta.env.VITE_PORT}/api`;

//   const [slideIndex, setSlideIndex] = useState(0);
//   const [topOrders, setTopOrders] = useState([]);
//   const [loadingTop, setLoadingTop] = useState(true);
//   const [imagesByCategory, setImagesByCategory] = useState({});

//   const apiOrigin = useMemo(() => {
//     const m = String(apiBase || "").match(/^(.+?)\/api\/?$/);
//     return m ? m[1] : "";
//   }, [apiBase]);

//   const resolveImage = (u) => {
//     if (!u) return "";
//     const s = String(u).trim();
//     if (/^https?:\/\//i.test(s)) return s;
//     if (s.startsWith("/uploads")) return `${apiOrigin}${s}`;
//     if (s.startsWith("/")) return `${apiOrigin}${s}`;
//     return s;
//   };

//   const toImg = (img) => {
//     if (!img) return defaultImg;
//     const s = String(img).trim();
//     if (/^https?:\/\//i.test(s)) return s;
//     if (s.startsWith("/")) return `${apiOrigin}${s}`;
//     return s || defaultImg;
//   };

//   const categories = useMemo(
//     () => [
//       { key: "arts", name: "Arts & Creativity", dir: "/dashboardImages/Arts & Creativity/", fallback: "/dashboardImages/Arts & Creativity/Arts & Creativity9.jpg" },
//       { key: "handmade", name: "Handmade & Crafts", dir: "/dashboardImages/Handmade & Crafts/", fallback: "/dashboardImages/Handmade & Crafts/Handmade & Crafts5.jpg" },
//       { key: "beauty", name: "Beauty & Style", dir: "/dashboardImages/Beauty & Style/", fallback: "/dashboardImages/Beauty & Style/Beauty & Style5.webp" },
//       { key: "events", name: "Events & Celebrations", dir: "/dashboardImages/Events & Celebrations/", fallback: "/dashboardImages/Events & Celebrations/Events & Celebrations1.jpg" },
//       { key: "learning", name: "Learning & Coaching", dir: "/dashboardImages/Learning & Coaching/", fallback: "/dashboardImages/Learning & Coaching/Learning & Coaching4.jpg" },
//       { key: "traditional", name: "Traditional & Cultural", dir: "/dashboardImages/Traditional & Cultural/", fallback: "/dashboardImages/Traditional & Cultural/Traditional & Cultural15.jpg" }
//     ],
//     []
//   );

//   const heroSlides = useMemo(
//     () => [
//       { src: "/dashboardImages/Traditional & Cultural/Traditional & Cultural4.jpg", caption: "Book services in minutes", sub: "Fast, simple, and secure experience" },
//       { src: "/dashboardImages/Handmade & Crafts/Handmade & Crafts14.jpg", caption: "Find what suits your event", sub: "Quality work and fair prices" },
//       { src: "/dashboardImages/Events & Celebrations/Events & Celebrations5.jpg", caption: "Plan unforgettable moments", sub: "Decor, catering, DJs, and more" },
//       { src: "/dashboardImages/Learning & Coaching/Learning & Coaching5.jpg", caption: "Learn from local experts", sub: "Workshops, coaching, and training" },
//       { src: "/dashboardImages/Traditional & Cultural/Traditional & Cultural9.jpg", caption: "Celebrate local heritage", sub: "Traditional crafts and cultural services" },
//       { src: "/dashboardImages/Arts & Creativity/Arts & Creativity1.jpg", caption: "Discover trusted providers", sub: "Photography, henna, face painting, accessories, and more" }
//     ],
//     []
//   );

//   useEffect(() => {
//     const reduce =
//       typeof window !== "undefined" &&
//       window.matchMedia &&
//       window.matchMedia("(prefers-reduced-motion: reduce)").matches;
//     if (reduce || heroSlides.length <= 1) return;
//     const t = setInterval(() => {
//       setSlideIndex((i) => (i + 1) % heroSlides.length);
//     }, 3500);
//     return () => clearInterval(t);
//   }, [heroSlides.length]);

//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         setLoadingTop(true);
//         const { data } = await axios.get(`${apiBase}/topordered`);
//         const items = Array.isArray(data?.items) ? data.items.slice(0, 3) : [];
//         if (mounted) setTopOrders(items);
//       } catch {
//         if (mounted) setTopOrders([]);
//       } finally {
//         if (mounted) setLoadingTop(false);
//       }
//     })();
//     return () => {
//       mounted = false;
//     };
//   }, [apiBase]);

//   useEffect(() => {
//     let active = true;

//     const normalize = (p) => {
//       if (!p) return "";
//       return String(p).replace(/%20/g, " ").trim();
//     };

//     const slug = (s) =>
//       String(s || "")
//         .toLowerCase()
//         .replace(/&/g, "and")
//         .replace(/[^a-z0-9]+/g, "-")
//         .replace(/^-+|-+$/g, "");

//     const belongsToDir = (p, dir, name) => {
//       const np = normalize(p);
//       const nd = normalize(dir);
//       if (np.startsWith(nd)) return true;
//       const folder = `/${slug(name)}/`;
//       return np.toLowerCase().includes(folder);
//     };

//     (async () => {
//       try {
//         const res = await fetch("/dashboardImages/manifest.json", { cache: "no-store" });
//         if (!res.ok) throw new Error("manifest not found");
//         const manifest = await res.json();
//         if (!active) return;

//         const mapped = {};
//         for (const c of categories) {
//           let list =
//             manifest?.[c.key] ??
//             manifest?.[c.name] ??
//             manifest?.[slug(c.name)] ??
//             [];

//           if (!Array.isArray(list)) list = [];

//           const cleaned = list
//             .map(normalize)
//             .filter((s) => s && (belongsToDir(s, c.dir, c.name) || s.includes("/dashboardImages/")));

//           const unique = Array.from(new Set(cleaned));
//           const shuffled = unique.length ? unique.sort(() => Math.random() - 0.5) : [];
//           mapped[c.key] = shuffled.length ? shuffled.slice(0, 6) : [c.fallback];
//         }

//         setImagesByCategory(mapped);
//       } catch {
//         const mapped = {};
//         for (const c of categories) mapped[c.key] = [c.fallback];
//         setImagesByCategory(mapped);
//       }
//     })();

//     return () => {
//       active = false;
//     };
//   }, [categories]);

//   const gotoLoginOr = (path) => {
//     if (!isLogged) return navigate("/login");
//     navigate(path);
//   };

//   const CardImage = ({ src, hasImage, alt }) => {
//     if (!hasImage) {
//       return (
//         <div className="relative w-full aspect-[4/3] overflow-hidden">
//           <div
//             className="absolute inset-0 bg-center bg-cover scale-110 blur-[10px] opacity-40"
//             style={{ backgroundImage: `url(${defaultImg})` }}
//           />
//           <img
//             src={defaultImg}
//             alt={alt}
//             className="relative z-10 block w-full h-full object-contain"
//             loading="lazy"
//             decoding="async"
//           />
//         </div>
//       );
//     }
//     return (
//       <div className="relative w-full aspect-[4/3] bg-[#0f2a47]/5">
//         <img
//           src={src}
//           alt={alt}
//           className="block w-full h-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
//           onError={(e) => (e.currentTarget.src = defaultImg)}
//           loading="lazy"
//           decoding="async"
//         />
//       </div>
//     );
//   };

//   const SixGrid = ({ list }) => {
//     const six = list.slice(0, 6);
//     return (
//       <div className="grid grid-cols-3 gap-2 sm:gap-3">
//         {six.map((src, idx) => (
//           <div key={idx} className="rounded-xl overflow-hidden">
//             <div className="aspect-square">
//               <img
//                 src={src}
//                 alt={`item-${idx + 1}`}
//                 className="block w-full h-full object-cover transition-transform duration-300 hover:scale-110"
//                 loading="lazy"
//                 decoding="async"
//                 onError={(e) => {
//                   e.currentTarget.src = defaultImg;
//                 }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] relative antialiased">
//       {!isLogged && (
//         <div onClick={() => navigate("/login")} className="absolute inset-0 z-40 cursor-pointer" />
//       )}

//       <section className="relative overflow-hidden">
//         <div className="mx-auto max-w-7xl px-3 sm:px-6 pt-4 sm:pt-6">
//           <div className="rounded-3xl bg-white shadow-[0_16px_44px_rgba(16,46,80,0.12)] ring-1 ring-[#102E50]/10 overflow-hidden">
//             <div className="grid md:grid-cols-2 items-stretch">
//               <div className="relative p-5 sm:p-8 md:p-9 flex items-center bg-gradient-to-b from-[#FFF6E9] to-white">
//                 <div className="w-full">
//                   <div className="inline-flex items-center gap-2 rounded-full border border-[#102E50]/15 px-3 py-1 text-[11px] font-semibold text-[#102E50] bg-[#F5C45E]/20">
//                     Bidaya
//                   </div>
//                   <h1 className="mt-2 sm:mt-3 text-[#102E50] text-xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
//                     {heroSlides[slideIndex]?.caption || "Discover trusted providers"}
//                   </h1>
//                   <p className="mt-1.5 sm:mt-2 text-[#102E50]/70 text-sm sm:text-base">
//                     {heroSlides[slideIndex]?.sub || "Fast, simple, and secure experience"}
//                   </p>
//                   <div className="mt-4 sm:mt-6 flex gap-3">
//                     <button
//                       onClick={() => gotoLoginOr("/userDashboard")}
//                       className="rounded-xl bg-[#102E50] text-[#FFF6E9] px-4 py-2.5 text-sm font-bold shadow-[0_10px_26px_rgba(16,46,80,0.32)] hover:-translate-y-0.5 transition"
//                     >
//                       Explore Services
//                     </button>
//                     <button
//                       onClick={() => gotoLoginOr("/userDashboard")}
//                       className="rounded-xl bg-[#F5C45E] text-[#102E50] px-4 py-2.5 text-sm font-bold shadow-[0_10px_26px_rgba(245,196,94,0.36)] hover:-translate-y-0.5 transition"
//                     >
//                       Browse Categories
//                     </button>
//                   </div>
//                   <div className="mt-4 sm:mt-5 flex gap-2">
//                     {heroSlides.map((_, i) => (
//                       <button
//                         key={i}
//                         onClick={() => setSlideIndex(i)}
//                         className={`h-2 w-6 rounded-full transition-all ${i === slideIndex ? "bg-[#F5C45E]" : "bg-[#102E50]/15"}`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="relative flex items-center justify-center bg-white">
//                 <div className="w-full h-full">
//                   <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] rounded-none overflow-hidden">
//                     <div
//                       className="absolute inset-0 bg-center bg-cover opacity-30 scale-110"
//                       style={{ backgroundImage: `url(${heroSlides[slideIndex]?.src || defaultImg})` }}
//                     />
//                     <img
//                       src={heroSlides[slideIndex]?.src || defaultImg}
//                       alt="hero"
//                       className="relative z-10 w-full h-full object-cover object-center"
//                       loading="lazy"
//                       decoding="async"
//                       onError={(e) => (e.currentTarget.src = defaultImg)}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="mx-auto max-w-7xl px-3 sm:px-6 py-8 sm:py-12">
//         <div className="mb-5 sm:mb-7 flex items-center justify-between">
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#102E50] tracking-tight">
//             Categories
//           </h2>
//         </div>

//         <div className="grid gap-6 md:gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {categories.map((c) => {
//             const list = (imagesByCategory[c.key] || [c.fallback]).slice(0, 6);
//             return (
//               <div
//                 key={c.key}
//                 className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_40px_rgba(16,46,80,0.08)] p-4 sm:p-5"
//               >
//                 <div className="flex items-center justify-between mb-3 sm:mb-4">
//                   <h3 className="text-[#102E50] text-lg font-extrabold truncate">{c.name}</h3>
//                   <button
//                     onClick={() => gotoLoginOr("/userDashboard")}
//                     className="text-[11px] sm:text-xs font-bold text-[#102E50] bg-[#E78B48]/30 px-3 py-1 rounded-full"
//                   >
//                     Open
//                   </button>
//                 </div>
//                 <SixGrid list={list} />
//                 <div className="mt-3 flex items-center justify-end text-[#102E50]/70 text-xs sm:text-sm">
//                   <button
//                     onClick={() => gotoLoginOr("/userDashboard")}
//                     className="underline underline-offset-4 hover:text-[#BE3D2A] transition"
//                   >
//                     View more
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       <section className="mx-auto max-w-7xl px-3 sm:px-6 pb-12 sm:pb-16">
//         <div className="mb-5 sm:mb-7 flex items-center justify-between">
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#102E50] tracking-tight">
//             Top Ordered
//           </h2>
//         </div>

//         {loadingTop ? (
//           <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//             {[...Array(3)].map((_, i) => (
//               <div
//                 key={i}
//                 className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-[0_12px_40px_rgba(16,46,80,0.08)] overflow-hidden ring-1 ring-[#102E50]/10 animate-pulse"
//               >
//                 <div className="h-60 sm:h-64 md:h-72 bg-[#102E50]/10" />
//                 <div className="p-4 space-y-2">
//                   <div className="h-4 bg-[#102E50]/10 rounded w-3/4" />
//                   <div className="h-3 bg-[#102E50]/5 rounded w-1/3" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : topOrders.length === 0 ? (
//           <div className="text-[#102E50]/70 text-sm sm:text-base">No data yet.</div>
//         ) : (
//           <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//             {topOrders.map((p) => {
//               const img = toImg(p.image_url || p.image);
//               const hasImage = Boolean(p.image_url || p.image);
//               return (
//                 <button
//                   key={p.product_id}
//                   onClick={() =>
//                     isLogged
//                       ? navigate(`/productdatails?product_id=${p.product_id}`, { state: { product_id: p.product_id } })
//                       : navigate("/login")
//                   }
//                   className="group rounded-2xl bg-white ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden text-left transition"
//                 >
//                   <CardImage src={img} hasImage={hasImage} alt={p.name || `#${p.product_id}`} />
//                   <div className="p-4">
//                     <div className="font-extrabold text-[#102E50] text-sm sm:text-base line-clamp-2">
//                       {p.name || `#${p.product_id}`}
//                     </div>
//                     {p.price !== undefined && p.price !== null && (
//                       <div className="mt-2 flex items-center gap-2">
//                         <span className="rounded-md bg-[#F5C45E] px-2.5 py-1 text-[#102E50] text-xs sm:text-sm font-extrabold shadow">
//                           {Number(p.price).toFixed(2)} JD
//                         </span>
//                         <span className="rounded-md bg-[#BE3D2A] px-2 py-1 text-white text-[10px] uppercase tracking-wide shadow-sm">
//                           Top
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         )}
//       </section>

//       <section className="mx-auto max-w-7xl px-3 sm:px-6 pb-16 sm:pb-20">
//         <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
//           <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden">
//             <div className="relative w-full h-60 sm:h-64 md:h-72">
//               <img
//                 src="/dashboardImages/Traditional & Cultural/Traditional & Cultural15.jpg"
//                 alt="Traditional & Cultural"
//                 className="block w-full h-full object-cover object-center"
//                 loading="lazy"
//                 decoding="async"
//                 onError={(e) => (e.currentTarget.src = defaultImg)}
//               />
//             </div>
//             <div className="p-4">
//               <div className="border-b border-[#102E50]/15 pb-2 mb-3">
//                 <h3 className="font-extrabold text-[#102E50] truncate">Traditional & Cultural</h3>
//               </div>
//               <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
//                 <span>Amman</span>
//                 <span className="font-extrabold text-[#BE3D2A]">50 JD</span>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden">
//             <div className="relative w-full h-60 sm:h-64 md:h-72">
//               <img
//                 src="/dashboardImages/Handmade & Crafts/Handmade & Crafts18.jpg"
//                 alt="Handmade accessories"
//                 className="block w-full h-full object-cover object-center"
//                 loading="lazy"
//                 decoding="async"
//                 onError={(e) => (e.currentTarget.src = defaultImg)}
//               />
//             </div>
//             <div className="p-4">
//               <div className="border-b border-[#102E50]/15 pb-2 mb-3">
//                 <h3 className="font-extrabold text-[#102E50] truncate">Handmade Picks</h3>
//               </div>
//               <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
//                 <span>Irbid</span>
//                 <span className="font-extrabold text-[#BE3D2A]">15 JD</span>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden">
//             <div className="relative w-full h-60 sm:h-64 md:h-72">
//               <img
//                 src="/dashboardImages/Beauty & Style/Beauty & Style4.jpeg"
//                 alt="Event makeup"
//                 className="block w-full h-full object-cover object-center"
//                 loading="lazy"
//                 decoding="async"
//                 onError={(e) => (e.currentTarget.src = defaultImg)}
//               />
//             </div>
//             <div className="p-4">
//               <div className="border-b border-[#102E50]/15 pb-2 mb-3">
//                 <h3 className="font-extrabold text-[#102E50] truncate">Beauty & Style</h3>
//               </div>
//               <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
//                 <span>Zarqa</span>
//                 <span className="font-extrabold text-[#BE3D2A]">30 JD</span>
//               </div>
//             </div>
//           </div>
//         </div>


// <div className="mt-7 sm:mt-9 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3 place-items-center">
//   <button
//     onClick={() => gotoLoginOr("/userDashboard")}
//     className="w-64 sm:w-72 rounded-xl bg-[#102E50] text-white py-3 sm:py-3.5 font-bold text-base sm:text-lg shadow-[0_4px_14px_rgba(16,46,80,0.25)] hover:bg-[#F5C45E] hover:text-[#102E50] transition-all duration-300 ring-1 ring-[#102E50]/10 hover:scale-105"
//   >
//     Thousands of Providers
//   </button>
//   <button
//     onClick={() => gotoLoginOr("/userDashboard")}
//     className="w-64 sm:w-72 rounded-xl bg-[#102E50] text-white py-3 sm:py-3.5 font-bold text-base sm:text-lg shadow-[0_4px_14px_rgba(16,46,80,0.25)] hover:bg-[#F5C45E] hover:text-[#102E50] transition-all duration-300 ring-1 ring-[#102E50]/10 hover:scale-105"
//   >
//     Fast & Reliable Orders
//   </button>
//   <button
//     onClick={() => gotoLoginOr("/userDashboard")}
//     className="w-64 sm:w-72 rounded-xl bg-[#102E50] text-white py-3 sm:py-3.5 font-bold text-base sm:text-lg shadow-[0_4px_14px_rgba(16,46,80,0.25)] hover:bg-[#F5C45E] hover:text-[#102E50] transition-all duration-300 ring-1 ring-[#102E50]/10 hover:scale-105"
//   >
//     Happy Customers
//   </button>
// </div>



//       </section>
//     </div>
//   );
// }




"use client";

import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img5 from "../../assets/handmade-jewelry.png";
import img6 from "../../assets/professional-makeup-artist.jpg";
import img4 from "../../assets/professional-photo-session.png";
import { Brush, LibraryBig, Scissors, Smile, Store, Volleyball } from "lucide-react";
import img11 from "../../assets/arts-and-creativity-workspace (1).jpg";
import img7 from "../../assets/handmade-crafts-and-artisan-work.jpg";
import img8 from "../../assets/learning-and-education.jpg";
import img10 from "../../assets/professional-makeup-artist.jpg";
import img9 from "../../assets/traditional-jordanian-culture.jpg";
import img12 from "../../assets/traditional-jordanian-culture (2).jpg";
import defaultImg from "../../assets/NoImage.png";

export default function MainDashBoard1() {
  const token = useSelector((s) => s.UserInfo?.token);
  const isLogged = Boolean(token);
  const navigate = useNavigate();

  const apiBase =
    import.meta.env.VITE_API ||
    `http://localhost:${import.meta.env.VITE_PORT}/api`;

  const [slideIndex, setSlideIndex] = useState(0);
  const [topOrders, setTopOrders] = useState([]);
  const [loadingTop, setLoadingTop] = useState(true);

  const apiOrigin = useMemo(() => {
    const m = String(apiBase || "").match(/^(.+?)\/api\/?$/);
    return m ? m[1] : "";
  }, [apiBase]);

  const resolveImage = (u) => {
    if (!u) return "";
    const s = String(u).trim();
    if (/^https?:\/\//i.test(s)) return s;
    if (s.startsWith("/uploads")) return `${apiOrigin}${s}`;
    if (s.startsWith("/")) return `${apiOrigin}${s}`;
    return s;
  };

  const toImg = (img) => {
    if (!img) return defaultImg;
    const s = String(img).trim();
    if (/^https?:\/\//i.test(s)) return s;
    if (s.startsWith("/")) return `${apiOrigin}${s}`;
    return s || defaultImg;
  };

  const categories = useMemo(
    () => [
      {
        key: "arts",
        name: "Arts & Creativity",
        icon: <Brush />,
        description: "Photography, painting, digital art",
        color: "from-amber-500/10 to-orange-500/10",
        image: img11,
      },
      {
        key: "handmade",
        name: "Handmade & Crafts",
        icon: <Scissors />,
        description: "Unique handcrafted items",
        color: "from-amber-500/10 to-orange-500/10",
        image: img7,
      },
      {
        key: "beauty",
        name: "Beauty & Style",
        icon: <Smile />,
        description: "Makeup, styling, fashion",
        color: "from-rose-500/10 to-red-500/10",
        image: img10,
      },
      {
        key: "learning",
        name: "Learning & Coaching",
        icon: <LibraryBig />,
        description: "Courses, tutoring, mentorship",
        color: "from-blue-500/10 to-cyan-500/10",
        image: img8,
      },
      {
        key: "local",
        name: "Local Services",
        icon: <Store />,
        description: "Community services nearby",
        color: "from-green-500/10 to-emerald-500/10",
        image: img9,
      },
      {
        key: "traditional",
        name: "Traditional & Cultural",
        icon: <Volleyball />,
        description: "Heritage and cultural services",
        color: "from-yellow-500/10 to-amber-500/10",
        image: img12,
      },
    ],
    []
  );

  const heroSlides = useMemo(
    () => [
      { src: "/dashboardImages/Traditional & Cultural/Traditional & Cultural4.jpg", caption: "Book services in minutes", sub: "Fast, simple, and secure experience" },
      { src: "/dashboardImages/Handmade & Crafts/Handmade & Crafts14.jpg", caption: "Find what suits your event", sub: "Quality work and fair prices" },
      { src: "/dashboardImages/Events & Celebrations/Events & Celebrations5.jpg", caption: "Plan unforgettable moments", sub: "Decor, catering, DJs, and more" },
      { src: "/dashboardImages/Learning & Coaching/Learning & Coaching5.jpg", caption: "Learn from local experts", sub: "Workshops, coaching, and training" },
      { src: "/dashboardImages/Traditional & Cultural/Traditional & Cultural9.jpg", caption: "Celebrate local heritage", sub: "Traditional crafts and cultural services" },
      { src: "/dashboardImages/Arts & Creativity/Arts & Creativity1.jpg", caption: "Discover trusted providers", sub: "Photography, henna, face painting, accessories, and more" }
    ],
    []
  );

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || heroSlides.length <= 1) return;
    const t = setInterval(() => {
      setSlideIndex((i) => (i + 1) % heroSlides.length);
    }, 3500);
    return () => clearInterval(t);
  }, [heroSlides.length]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingTop(true);
        const { data } = await axios.get(`${apiBase}/topordered`);
        const items = Array.isArray(data?.items) ? data.items.slice(0, 3) : [];
        if (mounted) setTopOrders(items);
      } catch {
        if (mounted) setTopOrders([]);
      } finally {
        if (mounted) setLoadingTop(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [apiBase]);

  useEffect(() => {
    if (topOrders && topOrders.length) return;
    setTopOrders([
      { product_id: 1, name: "Professional Photography", price: 50, image_url: img4 },
      { product_id: 2, name: "Handmade Jewelry", price: 15, image_url: img5 },
      { product_id: 3, name: "Event Makeup", price: 30, image_url: img6 },
    ]);
    setLoadingTop(false);
  }, [topOrders]);

  const gotoLoginOr = (path) => {
    if (!isLogged) return navigate("/login");
    navigate(path);
  };

  const MediaBox = ({ src, alt, ratio = "aspect-[4/3]" }) => {
    return (
      <div className={`relative w-full ${ratio} bg-gradient-to-br from-[#102E50]/5 to-[#F5C45E]/5 rounded-2xl overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={src || "/placeholder.svg"}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-700"
            loading="lazy"
            onError={(e) => (e.currentTarget.src = defaultImg)}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#102E50]/20 via-transparent to-transparent opacity-0" />
      </div>
    );
  };

  const CardImage = ({ src, hasImage, alt }) => {
    if (!hasImage) {
      return (
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <div
            className="absolute inset-0 bg-center bg-cover scale-110 blur-[10px] opacity-40"
            style={{ backgroundImage: `url(${defaultImg})` }}
          />
          <img
            src={defaultImg}
            alt={alt}
            className="relative z-10 block w-full h-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      );
    }
    return (
      <div className="relative w-full aspect-[4/3] bg-[#0f2a47]/5">
        <img
          src={src}
          alt={alt}
          className="block w-full h-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
          onError={(e) => (e.currentTarget.src = defaultImg)}
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF6E9] via-[#FFF6E9] to-[#F5C45E]/10 relative antialiased">
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #102E50 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 pt-4 sm:pt-6">
          <div className="rounded-3xl bg-white shadow-[0_16px_44px_rgba(16,46,80,0.12)] ring-1 ring-[#102E50]/10 overflow-hidden">
            <div className="grid md:grid-cols-2 items-stretch">
              <div className="relative p-5 sm:p-8 md:p-9 flex items-center bg-gradient-to-b from-[#FFF6E9] to-white">
                <div className="w-full">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#102E50]/15 px-3 py-1 text-[11px] font-semibold text-[#102E50] bg-[#F5C45E]/20">
                    Bidaya
                  </div>
                  <h1 className="mt-2 sm:mt-3 text-[#102E50] text-xl sm:text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
                    {heroSlides[slideIndex]?.caption || "Discover trusted providers"}
                  </h1>
                  <p className="mt-1.5 sm:mt-2 text-[#102E50]/70 text-sm sm:text-base">
                    {heroSlides[slideIndex]?.sub || "Fast, simple, and secure experience"}
                  </p>
                  <div className="mt-4 sm:mt-6 flex gap-3">
                    <button
                      onClick={() => gotoLoginOr("/userDashboard")}
                      className="rounded-xl bg-[#102E50] text-[#FFF6E9] px-4 py-2.5 text-sm font-bold shadow-[0_10px_26px_rgba(16,46,80,0.32)] hover:-translate-y-0.5 transition"
                    >
                      Explore Services
                    </button>
                    <button
                      onClick={() => gotoLoginOr("/userDashboard")}
                      className="rounded-xl bg-[#F5C45E] text-[#102E50] px-4 py-2.5 text-sm font-bold shadow-[0_10px_26px_rgba(245,196,94,0.36)] hover:-translate-y-0.5 transition"
                    >
                      Browse Categories
                    </button>
                  </div>
                  <div className="mt-4 sm:mt-5 flex gap-2">
                    {heroSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSlideIndex(i)}
                        className={`h-2 w-6 rounded-full transition-all ${i === slideIndex ? "bg-[#F5C45E]" : "bg-[#102E50]/15"}`}
                        aria-label={`slide-${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-center bg-white">
                <div className="w-full h-full">
                  <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-center bg-cover opacity-30 scale-110"
                      style={{ backgroundImage: `url(${heroSlides[slideIndex]?.src || defaultImg})` }}
                    />
                    <img
                      src={heroSlides[slideIndex]?.src || defaultImg}
                      alt="hero"
                      className="relative z-10 w-full h-full object-cover object-center"
                      loading="lazy"
                      onError={(e) => (e.currentTarget.src = defaultImg)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102E50] tracking-tight">Explore Categories</h2>
            <p className="mt-2 text-[#102E50]/60 text-base sm:text-lg">Find the perfect service for your needs</p>
          </div>
          <button
            onClick={() => gotoLoginOr("/userDashboard")}
            className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#BE3D2A] hover:text-[#BE3D2A]/80 transition-colors"
          >
            View All
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, idx) => (
            <div
              key={c.key}
              className="group rounded-3xl bg-white/80 backdrop-blur-sm ring-1 ring-[#102E50]/5 shadow-[0_20px_50px_rgba(16,46,80,0.08)] hover:shadow-[0_28px_64px_rgba(16,46,80,0.14)] p-6 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${c.color} opacity-0`} />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F5C45E]/20 to-[#E78B48]/20 flex items-center justify-center text-2xl shadow-lg">
                      {c.icon}
                    </div>
                    <div>
                      <h3 className="text-[#102E50] text-lg font-black">{c.name}</h3>
                      <p className="text-[#102E50]/60 text-xs mt-0.5">{c.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => gotoLoginOr("/userDashboard")}
                    className="rounded-full bg-[#E78B48]/20 hover:bg-[#E78B48] text-[#102E50] hover:text-white px-4 py-2 text-xs font-bold transition-all duration-300"
                  >
                    View
                  </button>
                </div>

                <div className="mt-4">
                  <div className="relative w-full h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden bg-[#102E50]/5 ring-1 ring-[#102E50]/5">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover rounded-2xl"
                      loading="lazy"
                      onError={(e) => (e.currentTarget.src = defaultImg)}
                    />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#102E50]/10 flex items-center justify-between text-xs text-[#102E50]/60">
                  <span className="flex items-center gap-1">1.2k+ providers</span>
                  <button onClick={() => gotoLoginOr("/userDashboard")} className="font-semibold text-[#BE3D2A] hover:underline">
                    Explore →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102E50] tracking-tight">Top Ordered Services</h2>
          <p className="mt-2 text-[#102E50]/60 text-base sm:text-lg">Most popular choices from our community</p>
        </div>

        {loadingTop ? (
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-[0_12px_40px_rgba(16,46,80,0.08)] overflow-hidden ring-1 ring-[#102E50]/10 animate-pulse"
              >
                <div className="h-60 sm:h-64 md:h-72 bg-[#102E50]/10" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-[#102E50]/10 rounded w-3/4" />
                  <div className="h-3 bg-[#102E50]/5 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : topOrders.length === 0 ? (
          <div className="text-[#102E50]/70 text-sm sm:text-base">No data yet.</div>
        ) : (
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {topOrders.map((p, idx) => {
              const img = toImg(p.image_url || p.image);
              const hasImage = Boolean(p.image_url || p.image);
              return (
                <button
                  key={p.product_id || idx}
                  onClick={() =>
                    isLogged
                      ? navigate(`/productdatails?product_id=${p.product_id}`, { state: { product_id: p.product_id } })
                      : navigate("/login")
                  }
                  className="group rounded-2xl bg-white ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden text-left transition"
                >
                  <CardImage src={img} hasImage={hasImage} alt={p.name || `#${p.product_id}`} />
                  <div className="p-4">
                    <div className="font-extrabold text-[#102E50] text-sm sm:text-base line-clamp-2">
                      {p.name || `#${p.product_id}`}
                    </div>
                    {p.price !== undefined && p.price !== null && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="rounded-md bg-[#F5C45E] px-2.5 py-1 text-[#102E50] text-xs sm:text-sm font-extrabold shadow">
                          {Number(p.price).toFixed(2)} JD
                        </span>
                        <span className="rounded-md bg-[#BE3D2A] px-2 py-1 text-white text-[10px] uppercase tracking-wide shadow-sm">
                          Top
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 lg:pb-32">
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-3">
          {[
            { label: "Active Providers", value: "10M+" },
            { label: "Orders Completed", value: "100M+" },
            { label: "Happy Customers", value: "50M+" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm ring-1 ring-[#102E50]/5 shadow-[0_20px_50px_rgba(16,46,80,0.10)] hover:shadow-[0_28px_64px_rgba(16,46,80,0.16)] p-8 transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
            >
              <div className="relative z-10 text-center">
                <div className="text-5xl sm:text-6xl font-black text-[#102E50] mb-2">{stat.value}</div>
                <div className="text-base font-bold text-[#102E50]/70">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

