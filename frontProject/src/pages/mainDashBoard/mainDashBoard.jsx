



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
//         <div
//           onClick={() => navigate("/login")}
//           className="absolute inset-0 z-40 cursor-pointer"
//           style={{ background: "transparent" }}
//         />
//       )}

//       <section className="relative overflow-hidden">
//         <div className="mx-auto max-w-7xl px-3 sm:px-6 pt-6 sm:pt-10">
//           <div className="rounded-3xl bg-white shadow-[0_20px_60px_rgba(16,46,80,0.15)] ring-1 ring-[#102E50]/10 overflow-hidden">
//             <div className="grid md:grid-cols-2 items-stretch">
//               <div className="relative p-6 sm:p-10 flex items-center bg-gradient-to-b from-[#FFF6E9] to-white">
//                 <div className="w-full">
//                   <div className="inline-flex items-center gap-2 rounded-full border border-[#102E50]/15 px-3 py-1 text-[11px] font-semibold text-[#102E50] bg-[#F5C45E]/20">
//                     Bidaya
//                   </div>
//                   <h1 className="mt-3 sm:mt-4 text-[#102E50] text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
//                     {heroSlides[slideIndex]?.caption || "Discover trusted providers"}
//                   </h1>
//                   <p className="mt-2 sm:mt-3 text-[#102E50]/70 text-sm sm:text-base md:text-lg">
//                     {heroSlides[slideIndex]?.sub || "Fast, simple, and secure experience"}
//                   </p>
//                   <div className="mt-5 sm:mt-7 flex gap-3">
//                     <button
//                       onClick={() => gotoLoginOr("/userDashboard")}
//                       className="rounded-xl bg-[#102E50] text-[#FFF6E9] px-5 py-3 text-sm sm:text-base font-bold shadow-[0_10px_30px_rgba(16,46,80,0.35)] hover:-translate-y-0.5 transition"
//                     >
//                       Explore Services
//                     </button>
//                     <button
//                       onClick={() => gotoLoginOr("/userDashboard")}
//                       className="rounded-xl bg-[#F5C45E] text-[#102E50] px-5 py-3 text-sm sm:text-base font-bold shadow-[0_10px_30px_rgba(245,196,94,0.40)] hover:-translate-y-0.5 transition"
//                     >
//                       Browse Categories
//                     </button>
//                   </div>
//                   <div className="mt-5 sm:mt-7 flex gap-2">
//                     {heroSlides.map((_, i) => (
//                       <button
//                         key={i}
//                         onClick={() => setSlideIndex(i)}
//                         className={`h-2.5 w-7 rounded-full transition-all ${i === slideIndex ? "bg-[#F5C45E]" : "bg-[#102E50]/15"}`}
//                         aria-label={`Go to slide ${i + 1}`}
//                         aria-pressed={i === slideIndex}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className="relative">
//                 <div className="absolute inset-0">
//                   <div
//                     className="absolute inset-0 bg-center bg-cover scale-110 blur-[14px] opacity-40"
//                     style={{ backgroundImage: `url(${heroSlides[slideIndex]?.src || ""})` }}
//                     aria-hidden="true"
//                   />
//                 </div>
//                 <div className="relative z-10 p-4 sm:p-6 md:p-8">
//                   <div className="grid grid-cols-3 gap-2 sm:gap-3">
//                     {collageList.map((src, idx) => (
//                       <div key={idx} className="rounded-xl overflow-hidden">
//                         <div className="aspect-square">
//                           <img
//                             src={src}
//                             alt={`thumb-${idx + 1}`}
//                             className="block w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//                             loading="lazy"
//                             decoding="async"
//                             onError={(e) => {
//                               e.currentTarget.src = defaultImg;
//                             }}
//                           />
//                         </div>
//                       </div>
//                     ))}
//                     {collageList.length < 6 &&
//                       [...Array(6 - collageList.length)].map((_, k) => (
//                         <div key={`ph-${k}`} className="rounded-xl overflow-hidden">
//                           <div className="aspect-square">
//                             <img
//                               src={defaultImg}
//                               alt="placeholder"
//                               className="block w-full h-full object-cover"
//                               loading="lazy"
//                               decoding="async"
//                             />
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                   <div className="mt-3 text-right">
//                     <img
//                       src={heroSlides[slideIndex]?.src || defaultImg}
//                       alt="main"
//                       className="inline-block w-1/3 aspect-square object-cover rounded-xl ring-2 ring-white shadow-[0_12px_30px_rgba(16,46,80,0.18)]"
//                       onError={(e) => (e.currentTarget.src = defaultImg)}
//                       loading="lazy"
//                       decoding="async"
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

//       <section className="relative">
//         <div className="mx-auto max-w-7xl px-3 sm:px-6 pt-5 sm:pt-8">
//           <div className="relative rounded-3xl overflow-hidden ring-1 ring-[#102E50]/10 shadow-[0_14px_44px_rgba(16,46,80,0.10)]">
//             <div className="relative h-[360px] sm:h-[380px] md:h-[420px] bg-white">
//               <div className="absolute inset-0 pointer-events-none">
//                 <div className="absolute -top-16 -left-16 h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(245,196,94,0.16),transparent_70%)]" />
//                 <div className="absolute -bottom-20 -right-20 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(16,46,80,0.08),transparent_70%)]" />
//               </div>

//               <div className="relative z-10 h-full w-full grid grid-cols-1 lg:grid-cols-2">
//                 <div className="order-2 lg:order-1 flex items-center pr-4 sm:pr-8">
//                   <div className="w-full max-w-[560px]">
//                     <div className="inline-flex items-center gap-2 rounded-full border border-[#102E50]/15 px-3 py-1 text-[10px] sm:text-[11px] font-bold text-[#102E50] bg-white">
//                       Bidaya
//                     </div>
//                     <h1 className="mt-3 text-[#102E50] text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight line-clamp-3">
//                       {heroSlides[slideIndex]?.caption}
//                     </h1>
//                     <p className="mt-2 text-[#0f2a47]/70 text-sm sm:text-base md:text-lg line-clamp-3">
//                       {heroSlides[slideIndex]?.sub}
//                     </p>
//                     <div className="mt-5 flex flex-wrap gap-2.5">
//                       <button
//                         onClick={() => gotoLoginOr("/userDashboard")}
//                         className="rounded-xl bg-[#F5C45E] text-[#102E50] px-4 py-2.5 text-sm sm:text-base font-extrabold shadow-[0_10px_24px_rgba(245,196,94,0.35)] hover:bg-[#E78B48] transition ring-1 ring-[#F5C45E]/30"
//                       >
//                         Browse Categories
//                       </button>
//                       <button
//                         onClick={() => gotoLoginOr("/userDashboard")}
//                         className="rounded-xl border border-[#102E50] text-[#102E50] bg-white px-4 py-2.5 text-sm sm:text-base font-extrabold hover:bg-[#FFF6E9] transition"
//                       >
//                         Explore Services
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="order-1 lg:order-2 flex items-center pl-4 sm:pl-8">
//                   <div className="bg-white ring-1 ring-[#102E50]/10 rounded-2xl p-3 sm:p-4 shadow-[0_14px_40px_rgba(16,46,80,0.12)] ml-auto">
//                     <div className="relative w-[88vw] max-w-[560px] h-[230px] sm:h-[250px] md:h-[280px] rounded-xl overflow-hidden">
//                       {heroSlides.map((s, i) => (
//                         <img
//                           key={i}
//                           src={s.src}
//                           alt={s.caption}
//                           className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === slideIndex ? "opacity-100" : "opacity-0"}`}
//                           loading="lazy"
//                           decoding="async"
//                           onError={(e) => (e.currentTarget.src = defaultImg)}
//                         />
//                       ))}
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
//                       <div className="absolute left-4 bottom-3 right-4">
//                         <div className="text-white font-extrabold text-base sm:text-lg line-clamp-1">{heroSlides[slideIndex]?.caption}</div>
//                         <div className="text-white/90 text-xs sm:text-sm line-clamp-2">{heroSlides[slideIndex]?.sub}</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="absolute inset-x-0 bottom-3 px-4 sm:px-6 z-10">
//                 <div className="mx-auto max-w-6xl flex items-center justify-between gap-3">
//                   <div className="hidden md:flex items-center gap-2">
//                     {heroSlides.map((hs, j) => (
//                       <button
//                         key={j}
//                         onClick={() => setSlideIndex(j)}
//                         className={`h-9 w-12 rounded-md overflow-hidden ring-2 transition-all ${j === slideIndex ? "ring-[#102E50]" : "ring-[#102E50]/20 opacity-80 hover:opacity-100"}`}
//                         aria-label={`Go to slide ${j + 1}`}
//                         aria-pressed={j === slideIndex}
//                       >
//                         <img
//                           src={hs.src}
//                           alt={hs.caption}
//                           className="w-full h-full object-cover"
//                           loading="lazy"
//                           decoding="async"
//                           onError={(e) => (e.currentTarget.src = defaultImg)}
//                         />
//                       </button>
//                     ))}
//                   </div>
//                   <div className="ml-auto flex md:hidden justify-center gap-2">
//                     {heroSlides.map((_, j) => (
//                       <button
//                         key={j}
//                         onClick={() => setSlideIndex(j)}
//                         className={`h-1.5 w-5 rounded-full transition-all ${j === slideIndex ? "bg-[#102E50]" : "bg-[#102E50]/25"}`}
//                         aria-label={`Go to slide ${j + 1}`}
//                         aria-pressed={j === slideIndex}
//                       />
//                     ))}
//                   </div>
//                 </div>
//                 <div className="mt-2 h-[5px] w-full rounded-full bg-[#102E50]/10 overflow-hidden">
//                   <div
//                     className="h-full bg-[#F5C45E] transition-all"
//                     style={{ width: `${((slideIndex + 1) / Math.max(heroSlides.length, 1)) * 100}%` }}
//                   />
//                 </div>
//               </div>

//               <div className="absolute inset-y-0 left-2 sm:left-3 flex items-center z-10">
//                 <button
//                   onClick={() => setSlideIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length)}
//                   className="hidden md:inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#102E50] ring-1 ring-[#102E50]/25 shadow hover:opacity-90 transition"
//                   aria-label="Previous slide"
//                 >
//                   ‹
//                 </button>
//               </div>
//               <div className="absolute inset-y-0 right-2 sm:right-3 flex items-center z-10">
//                 <button
//                   onClick={() => setSlideIndex((i) => (i + 1) % heroSlides.length)}
//                   className="hidden md:inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#102E50] ring-1 ring-[#102E50]/25 shadow hover:opacity-90 transition"
//                   aria-label="Next slide"
//                 >
//                   ›
//                 </button>
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
















import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import defaultImg from "../../assets/NoImage.png";

export default function MainDashBoard() {
  const token = useSelector((s) => s.UserInfo?.token);
  const isLogged = Boolean(token);
  const navigate = useNavigate();

  const apiBase =
    import.meta.env.VITE_API ||
    `http://localhost:${import.meta.env.VITE_PORT}/api`;

  const [slideIndex, setSlideIndex] = useState(0);
  const [topOrders, setTopOrders] = useState([]);
  const [loadingTop, setLoadingTop] = useState(true);
  const [imagesByCategory, setImagesByCategory] = useState({});

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
      { key: "arts", name: "Arts & Creativity", dir: "/dashboardImages/Arts & Creativity/", fallback: "/dashboardImages/Arts & Creativity/Arts & Creativity9.jpg" },
      { key: "handmade", name: "Handmade & Crafts", dir: "/dashboardImages/Handmade & Crafts/", fallback: "/dashboardImages/Handmade & Crafts/Handmade & Crafts5.jpg" },
      { key: "beauty", name: "Beauty & Style", dir: "/dashboardImages/Beauty & Style/", fallback: "/dashboardImages/Beauty & Style/Beauty & Style5.webp" },
      { key: "events", name: "Events & Celebrations", dir: "/dashboardImages/Events & Celebrations/", fallback: "/dashboardImages/Events & Celebrations/Events & Celebrations1.jpg" },
      { key: "learning", name: "Learning & Coaching", dir: "/dashboardImages/Learning & Coaching/", fallback: "/dashboardImages/Learning & Coaching/Learning & Coaching4.jpg" },
      { key: "traditional", name: "Traditional & Cultural", dir: "/dashboardImages/Traditional & Cultural/", fallback: "/dashboardImages/Traditional & Cultural/Traditional & Cultural15.jpg" }
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
    let active = true;

    const normalize = (p) => {
      if (!p) return "";
      return String(p).replace(/%20/g, " ").trim();
    };

    const slug = (s) =>
      String(s || "")
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const belongsToDir = (p, dir, name) => {
      const np = normalize(p);
      const nd = normalize(dir);
      if (np.startsWith(nd)) return true;
      const folder = `/${slug(name)}/`;
      return np.toLowerCase().includes(folder);
    };

    (async () => {
      try {
        const res = await fetch("/dashboardImages/manifest.json", { cache: "no-store" });
        if (!res.ok) throw new Error("manifest not found");
        const manifest = await res.json();
        if (!active) return;

        const mapped = {};
        for (const c of categories) {
          let list =
            manifest?.[c.key] ??
            manifest?.[c.name] ??
            manifest?.[slug(c.name)] ??
            [];

          if (!Array.isArray(list)) list = [];

          const cleaned = list
            .map(normalize)
            .filter((s) => s && (belongsToDir(s, c.dir, c.name) || s.includes("/dashboardImages/")));

          const unique = Array.from(new Set(cleaned));
          const shuffled = unique.length ? unique.sort(() => Math.random() - 0.5) : [];
          mapped[c.key] = shuffled.length ? shuffled.slice(0, 6) : [c.fallback];
        }

        setImagesByCategory(mapped);
      } catch {
        const mapped = {};
        for (const c of categories) mapped[c.key] = [c.fallback];
        setImagesByCategory(mapped);
      }
    })();

    return () => {
      active = false;
    };
  }, [categories]);

  const gotoLoginOr = (path) => {
    if (!isLogged) return navigate("/login");
    navigate(path);
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

  const SixGrid = ({ list }) => {
    const six = list.slice(0, 6);
    return (
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {six.map((src, idx) => (
          <div key={idx} className="rounded-xl overflow-hidden">
            <div className="aspect-square">
              <img
                src={src}
                alt={`item-${idx + 1}`}
                className="block w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.src = defaultImg;
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF6E9] relative antialiased">
      {!isLogged && (
        <div onClick={() => navigate("/login")} className="absolute inset-0 z-40 cursor-pointer" />
      )}

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
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-center bg-white">
                <div className="w-full h-full">
                  <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] rounded-none overflow-hidden">
                    <div
                      className="absolute inset-0 bg-center bg-cover opacity-30 scale-110"
                      style={{ backgroundImage: `url(${heroSlides[slideIndex]?.src || defaultImg})` }}
                    />
                    <img
                      src={heroSlides[slideIndex]?.src || defaultImg}
                      alt="hero"
                      className="relative z-10 w-full h-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => (e.currentTarget.src = defaultImg)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 sm:px-6 py-8 sm:py-12">
        <div className="mb-5 sm:mb-7 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#102E50] tracking-tight">
            Categories
          </h2>
        </div>

        <div className="grid gap-6 md:gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const list = (imagesByCategory[c.key] || [c.fallback]).slice(0, 6);
            return (
              <div
                key={c.key}
                className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_40px_rgba(16,46,80,0.08)] p-4 sm:p-5"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-[#102E50] text-lg font-extrabold truncate">{c.name}</h3>
                  <button
                    onClick={() => gotoLoginOr("/userDashboard")}
                    className="text-[11px] sm:text-xs font-bold text-[#102E50] bg-[#E78B48]/30 px-3 py-1 rounded-full"
                  >
                    Open
                  </button>
                </div>
                <SixGrid list={list} />
                <div className="mt-3 flex items-center justify-end text-[#102E50]/70 text-xs sm:text-sm">
                  <button
                    onClick={() => gotoLoginOr("/userDashboard")}
                    className="underline underline-offset-4 hover:text-[#BE3D2A] transition"
                  >
                    View more
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 sm:px-6 pb-12 sm:pb-16">
        <div className="mb-5 sm:mb-7 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#102E50] tracking-tight">
            Top Ordered
          </h2>
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
            {topOrders.map((p) => {
              const img = toImg(p.image_url || p.image);
              const hasImage = Boolean(p.image_url || p.image);
              return (
                <button
                  key={p.product_id}
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

      <section className="mx-auto max-w-7xl px-3 sm:px-6 pb-16 sm:pb-20">
        <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden">
            <div className="relative w-full h-60 sm:h-64 md:h-72">
              <img
                src="/dashboardImages/Traditional & Cultural/Traditional & Cultural15.jpg"
                alt="Traditional & Cultural"
                className="block w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
                onError={(e) => (e.currentTarget.src = defaultImg)}
              />
            </div>
            <div className="p-4">
              <div className="border-b border-[#102E50]/15 pb-2 mb-3">
                <h3 className="font-extrabold text-[#102E50] truncate">Traditional & Cultural</h3>
              </div>
              <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
                <span>Amman</span>
                <span className="font-extrabold text-[#BE3D2A]">50 JD</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden">
            <div className="relative w-full h-60 sm:h-64 md:h-72">
              <img
                src="/dashboardImages/Handmade & Crafts/Handmade & Crafts18.jpg"
                alt="Handmade accessories"
                className="block w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
                onError={(e) => (e.currentTarget.src = defaultImg)}
              />
            </div>
            <div className="p-4">
              <div className="border-b border-[#102E50]/15 pb-2 mb-3">
                <h3 className="font-extrabold text-[#102E50] truncate">Handmade Picks</h3>
              </div>
              <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
                <span>Irbid</span>
                <span className="font-extrabold text-[#BE3D2A]">15 JD</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_14px_50px_rgba(16,46,80,0.10)] overflow-hidden">
            <div className="relative w-full h-60 sm:h-64 md:h-72">
              <img
                src="/dashboardImages/Beauty & Style/Beauty & Style4.jpeg"
                alt="Event makeup"
                className="block w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
                onError={(e) => (e.currentTarget.src = defaultImg)}
              />
            </div>
            <div className="p-4">
              <div className="border-b border-[#102E50]/15 pb-2 mb-3">
                <h3 className="font-extrabold text-[#102E50] truncate">Beauty & Style</h3>
              </div>
              <div className="flex items-center justify-between text-[#102E50]/80 text-sm sm:text-base">
                <span>Zarqa</span>
                <span className="font-extrabold text-[#BE3D2A]">30 JD</span>
              </div>
            </div>
          </div>
        </div>


<div className="mt-7 sm:mt-9 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3 place-items-center">
  <button
    onClick={() => gotoLoginOr("/userDashboard")}
    className="w-64 sm:w-72 rounded-xl bg-[#102E50] text-white py-3 sm:py-3.5 font-bold text-base sm:text-lg shadow-[0_4px_14px_rgba(16,46,80,0.25)] hover:bg-[#F5C45E] hover:text-[#102E50] transition-all duration-300 ring-1 ring-[#102E50]/10 hover:scale-105"
  >
    Thousands of Providers
  </button>
  <button
    onClick={() => gotoLoginOr("/userDashboard")}
    className="w-64 sm:w-72 rounded-xl bg-[#102E50] text-white py-3 sm:py-3.5 font-bold text-base sm:text-lg shadow-[0_4px_14px_rgba(16,46,80,0.25)] hover:bg-[#F5C45E] hover:text-[#102E50] transition-all duration-300 ring-1 ring-[#102E50]/10 hover:scale-105"
  >
    Fast & Reliable Orders
  </button>
  <button
    onClick={() => gotoLoginOr("/userDashboard")}
    className="w-64 sm:w-72 rounded-xl bg-[#102E50] text-white py-3 sm:py-3.5 font-bold text-base sm:text-lg shadow-[0_4px_14px_rgba(16,46,80,0.25)] hover:bg-[#F5C45E] hover:text-[#102E50] transition-all duration-300 ring-1 ring-[#102E50]/10 hover:scale-105"
  >
    Happy Customers
  </button>
</div>



      </section>
    </div>
  );
}
