"use client";

// import { useEffect, useMemo, useState } from "react";
// import img2 from "../../assets/jordanian-artisan-working-on-handmade-crafts.jpg";
// import img1 from "../../assets/jordanian-creators-collaborating-on-creative-proje.jpg";

// import img3 from "../../assets/jordanian-marketplace-with-local-products.jpg";

// import axios from "axios";
// import img5 from "../../assets/handmade-jewelry.png";
// import img6 from "../../assets/professional-makeup-artist.jpg";
// import img4 from "../../assets/professional-photo-session.png";
// import img12 from "../../assets/traditional-jordanian-culture (2).jpg";

// import { Brush, LibraryBig, Scissors, Shirt, Smile, Store, Volleyball } from "lucide-react";
// import img11 from "../../assets/arts-and-creativity-workspace (1).jpg";
// import img7 from "../../assets/handmade-crafts-and-artisan-work.jpg";
// import img8 from "../../assets/learning-and-education.jpg";
// import img10 from "../../assets/professional-makeup-artist.jpg";
// import img9 from "../../assets/traditional-jordanian-culture.jpg";

// export default function MainDashBoard1() {
//   const port = import.meta.env.VITE_PORT;

//   const [slideIndex, setSlideIndex] = useState(0);
//   const [topOrders, setTopOrders] = useState([]);
//   const [loadingTop, setLoadingTop] = useState(false);
//   const [imagesByCategory, setImagesByCategory] = useState({});
//   const [isLogged] = useState(false); // Demo mode

//   useEffect(() => {
//     const fetchTopOrdered = async () => {
//       try {
//         const res = await axios.get(`http://localhost:${port}/api/topordered`);
//         console.log("res.data.items");
//         console.log(res.data.items);

//         console.log("res.data.items");

//         setTopOrders(res.data.items);
//       } catch (error) {
//         console.error("Error fetching top ordered items:", error);
//       }
//     };
//     fetchTopOrdered();
//   }, [port]);

//   const categories = useMemo(
//     () => [
//       {
//         key: "arts",
//         name: "Arts & Creativity",
//         icon: <Brush />,
//         description: "Photography, painting, digital art",
//         color: "from-purple-500/20 to-pink-500/20",
//         fallback: "/arts-and-creativity-workspace.jpg",
//         image: img11,
//       },
//       {
//         key: "handmade",
//         name: "Handmade & Crafts",
//         icon: <Scissors />,
//         description: "Unique handcrafted items",
//         color: "from-amber-500/20 to-orange-500/20",
//         fallback: "/handmade-crafts-and-artisan-work.jpg",
//         image: img7,
//       },
//       {
//         key: "beauty",
//         name: "Beauty & Style",
//         icon: <Smile />,
//         description: "Makeup, styling, fashion",
//         color: "from-rose-500/20 to-red-500/20",
//         fallback: "/beauty-and-style-services.jpg",
//         image: img10,
//       },
//       {
//         key: "learning",
//         name: "Learning & Coaching",
//         icon: <LibraryBig />,
//         description: "Courses, tutoring, mentorship",
//         color: "from-blue-500/20 to-cyan-500/20",
//         fallback: "/learning-and-education.jpg",
//         image: img8,
//       },
//       {
//         key: "local",
//         name: "Local Services",
//         icon:<Store />,
//         description: "Community services nearby",
//         color: "from-green-500/20 to-emerald-500/20",
//         fallback: "/local-services-and-community.jpg",
//         image: img9,
//       },
//       {
//         key: "traditional",
//         name: "Traditional & Cultural",
//         icon: <Volleyball />,
//         description: "Heritage and cultural services",
//         color: "from-yellow-500/20 to-amber-500/20",
//         fallback: "/traditional-jordanian-culture.jpg",
//         image: img12,
//       },
//     ],
//     []
//   );

//   const heroSlides = useMemo(
//     () => [
//       {
//         src: img2,
//         caption: "Book Services in Minutes",
//         sub: "Fast, simple, and secure experience",
//         gradient: "from-[#E78B48] via-[#f5a563] to-[#E78B48]",
//       },
//       {
//         src: img1,
//         caption: "Discover Trusted Providers",
//         sub: "Photography, henna, face painting, accessories, and more",
//         gradient: "from-[#102E50] via-[#1a4570] to-[#102E50]",
//       },

//       {
//         src: img3,
//         caption: "Find What Suits Your Event",
//         sub: "Quality work and fair prices",
//         gradient: "from-[#F5C45E] via-[#ffd77a] to-[#F5C45E]",
//       },
//     ],
//     []
//   );

//   useEffect(() => {
//     const t = setInterval(
//       () => setSlideIndex((i) => (i + 1) % heroSlides.length),
//       4500
//     );
//     return () => clearInterval(t);
//   }, [heroSlides.length]);

//   // Demo data
//   useEffect(() => {
//     setTopOrders([
//       {
//         product_id: 1,
//         name: "Professional Photography",
//         price: 50,
//         image: img4,
//       },
//       {
//         product_id: 2,
//         name: "Handmade Jewelry",
//         price: 15,
//         image: img5,
//       },
//       {
//         product_id: 3,
//         name: "Event Makeup",
//         price: 30,
//         image: img6,
//       },
//     ]);
//   }, []);

//   const MediaBox = ({ src, alt, ratio = "aspect-[4/3]" }) => {
//     return (
//       <div
//         className={`relative w-full ${ratio} bg-gradient-to-br from-[#102E50]/5 to-[#F5C45E]/5 rounded-2xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500`}
//       >
//         <div className="absolute inset-0 flex items-center justify-center">
//           <img
//             src={src || "/placeholder.svg"}
//             alt={alt}
//             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//             loading="lazy"
//           />
//         </div>
//         <div className="absolute inset-0 bg-gradient-to-t from-[#102E50]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#FFF6E9] via-[#FFF6E9] to-[#F5C45E]/10 relative antialiased">
//       <div className="fixed inset-0 opacity-[0.015] pointer-events-none">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `radial-gradient(circle at 2px 2px, #102E50 1px, transparent 0)`,
//             backgroundSize: "48px 48px",
//           }}
//         />
//       </div>

//       {/* Hero Section */}
//       <section className="relative overflow-hidden">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16">
//           <div className="rounded-[2rem] bg-white/80 backdrop-blur-xl shadow-[0_32px_64px_rgba(16,46,80,0.12)] ring-1 ring-[#102E50]/5 overflow-hidden hover:shadow-[0_40px_80px_rgba(16,46,80,0.16)] transition-all duration-500">
//             <div className="relative">
//               {heroSlides.map((s, i) => (
//                 <div
//                   key={i}
//                   className={`transition-all duration-1000 ${
//                     i === slideIndex
//                       ? "opacity-100 scale-100"
//                       : "opacity-0 scale-95 pointer-events-none absolute inset-0"
//                   }`}
//                 >
//                   <div className="grid lg:grid-cols-2 gap-0">
//                     {/* Content Side */}
//                     <div className="order-2 lg:order-1 p-8 sm:p-12 lg:p-16 flex items-center relative overflow-hidden">
//                       <div
//                         className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-5 animate-pulse`}
//                       />

//                       <div className="w-full relative z-10">
//                         <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#F5C45E]/30 bg-gradient-to-r from-[#F5C45E]/10 to-[#E78B48]/10 px-4 py-2 text-xs font-bold text-[#102E50] backdrop-blur-sm shadow-lg animate-fade-in-up">
//                           <span className="relative flex h-2 w-2">
//                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5C45E] opacity-75"></span>
//                             <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5C45E]"></span>
//                           </span>
//                           BidayaMart
//                         </div>

//                         <h1 className="mt-6 text-[#102E50] text-3xl sm:text-4xl lg:text-6xl font-black leading-[1.1] tracking-tight text-balance animate-fade-in-up [animation-delay:100ms]">
//                           {s.caption}
//                         </h1>
//                         <p className="mt-4 text-[#102E50]/70 text-base sm:text-lg lg:text-xl leading-relaxed text-pretty animate-fade-in-up [animation-delay:200ms]">
//                           {s.sub}
//                         </p>

//                         <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up [animation-delay:300ms]">
//                           <button className="group relative rounded-2xl bg-[#102E50] text-[#FFF6E9] px-8 py-4 text-base font-bold shadow-[0_20px_40px_rgba(16,46,80,0.3)] hover:shadow-[0_24px_48px_rgba(16,46,80,0.4)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 overflow-hidden">
//                             <span className="relative z-10">
//                               Explore Services
//                             </span>
//                             <div className="absolute inset-0 bg-gradient-to-r from-[#1a4570] to-[#102E50] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                           </button>
//                           <button className="group relative rounded-2xl bg-gradient-to-r from-[#F5C45E] to-[#E78B48] text-[#102E50] px-8 py-4 text-base font-bold shadow-[0_20px_40px_rgba(245,196,94,0.35)] hover:shadow-[0_24px_48px_rgba(245,196,94,0.45)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300">
//                             <span className="relative z-10">
//                               Browse Categories
//                             </span>
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Image Side */}
//                     <div className="order-1 lg:order-2 border-b lg:border-b-0 lg:border-l border-[#102E50]/5 bg-gradient-to-br from-[#102E50]/5 to-transparent relative overflow-hidden">
//                       <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5C45E]/10 rounded-full blur-3xl" />
//                       <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E78B48]/10 rounded-full blur-3xl" />

//                       <div className="relative p-6 sm:p-8 lg:p-12 h-full flex items-center">
//                         <div className="w-full rounded-3xl bg-white/50 backdrop-blur-sm ring-1 ring-[#102E50]/10 overflow-hidden shadow-2xl group">
//                           <MediaBox
//                             src={s.src}
//                             alt={s.caption}
//                             ratio="aspect-[4/3]"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}

//               <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
//                 {heroSlides.map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setSlideIndex(i)}
//                     className={`h-2 rounded-full transition-all duration-500 ${
//                       i === slideIndex
//                         ? "w-12 bg-gradient-to-r from-[#F5C45E] to-[#E78B48] shadow-lg"
//                         : "w-2 bg-[#102E50]/20 hover:bg-[#102E50]/40"
//                     }`}
//                     aria-label={`Go to slide ${i + 1}`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Categories Section */}
//       <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
//         <div className="mb-10 flex items-end justify-between">
//           <div>
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102E50] tracking-tight text-balance">
//               Explore Categories
//             </h2>
//             <p className="mt-2 text-[#102E50]/60 text-base sm:text-lg">
//               Find the perfect service for your needs
//             </p>
//           </div>
//           <button className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#BE3D2A] hover:text-[#BE3D2A]/80 transition-colors group">
//             View All
//             <svg
//               className="w-4 h-4 group-hover:translate-x-1 transition-transform"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 5l7 7-7 7"
//               />
//             </svg>
//           </button>
//         </div>

//         <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {categories.map((c, idx) => (
//             <div
//               key={c.key}
//               className="group rounded-3xl bg-white/80 backdrop-blur-sm ring-1 ring-[#102E50]/5 shadow-[0_20px_50px_rgba(16,46,80,0.08)] hover:shadow-[0_28px_64px_rgba(16,46,80,0.14)] p-6 transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-fade-in-up"
//               style={{ animationDelay: `${idx * 100}ms` }}
//             >
//               <div
//                 className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
//               />

//               <div className="relative z-10">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F5C45E]/20 to-[#E78B48]/20 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
//                       {c.icon}
//                     </div>
//                     <div>
//                       <h3 className="text-[#102E50] text-lg font-black">
//                         {c.name}
//                       </h3>
//                       <p className="text-[#102E50]/60 text-xs mt-0.5">
//                         {c.description}
//                       </p>
//                     </div>
//                   </div>
//                   <button className="rounded-full bg-[#E78B48]/20 group-hover:bg-[#E78B48] text-[#102E50] group-hover:text-white px-4 py-2 text-xs font-bold transition-all duration-300 shadow-sm">
//                     View
//                   </button>
//                 </div>

//                 <div className="mt-4">
//                   <div
//                     key={idx}
//                     className="relative w-full h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden bg-[#102E50]/5 ring-1 ring-[#102E50]/5 group/img"
//                   >
//                     <img
//                       src={c.image}
//                       alt={`${c.name} ${idx + 1}`}
//                       className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
//                       loading="lazy"
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-4 pt-4 border-t border-[#102E50]/10 flex items-center justify-between text-xs text-[#102E50]/60">
//                   <span className="flex items-center gap-1">
//                     <svg
//                       className="w-4 h-4"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                       <path
//                         fillRule="evenodd"
//                         d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     1.2k+ providers
//                   </span>
//                   <button className="font-semibold text-[#BE3D2A] hover:underline">
//                     Explore →
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Top Ordered Section */}
//       <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
//         <div className="mb-10">
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102E50] tracking-tight">
//             Top Ordered Services
//           </h2>
//           <p className="mt-2 text-[#102E50]/60 text-base sm:text-lg">
//             Most popular choices from our community
//           </p>
//         </div>

//         <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {topOrders.map((p, idx) => (
//             <div
//               key={p.product_id}
//               className="group rounded-3xl bg-white/80 backdrop-blur-sm ring-1 ring-[#102E50]/5 hover:ring-[#F5C45E] shadow-[0_20px_50px_rgba(16,46,80,0.10)] hover:shadow-[0_28px_64px_rgba(245,196,94,0.25)] overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-fade-in-up"
//               style={{ animationDelay: `${idx * 100}ms` }}
//             >
//               <div className="relative">
//                 <MediaBox src={p.image_url} alt={p.name} ratio="aspect-[4/3]" />
//                 <div className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-[#BE3D2A] to-[#E78B48] px-4 py-2 text-white text-xs font-bold shadow-xl flex items-center gap-2 animate-bounce-subtle">
//                   <svg
//                     className="w-4 h-4"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                   Top
//                 </div>
//               </div>
//               <div className="p-6">
//                 <h3 className="font-black text-[#102E50] text-xl mb-3 group-hover:text-[#E78B48] transition-colors">
//                   {p.name}
//                 </h3>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-baseline gap-2">
//                     <span className="text-3xl font-black text-[#102E50]">
//                       {p.price}
//                     </span>
//                     <span className="text-sm font-bold text-[#102E50]/60">
//                       JD
//                     </span>
//                   </div>
//                   <button className="rounded-xl bg-gradient-to-r from-[#F5C45E] to-[#E78B48] text-[#102E50] px-6 py-3 text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 lg:pb-32">
//         <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-3">
//           {[
//             {
//               label: "Active Providers",
//               value: "10M+",
//               icon: "👥",
//               color: "from-[#102E50] to-[#1a4570]",
//             },
//             {
//               label: "Orders Completed",
//               value: "100M+",
//               icon: "📦",
//               color: "from-[#E78B48] to-[#f5a563]",
//             },
//             {
//               label: "Happy Customers",
//               value: "50M+",
//               icon: "⭐",
//               color: "from-[#F5C45E] to-[#ffd77a]",
//             },
//           ].map((stat, idx) => (
//             <div
//               key={idx}
//               className="group relative rounded-3xl bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm ring-1 ring-[#102E50]/5 shadow-[0_20px_50px_rgba(16,46,80,0.10)] hover:shadow-[0_28px_64px_rgba(16,46,80,0.16)] p-8 transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden animate-fade-in-up"
//               style={{ animationDelay: `${idx * 100}ms` }}
//             >
//               <div
//                 className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
//               />

//               <div className="relative z-10 text-center">
//                 <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
//                   {/* {stat.icon} */}
//                 </div>
//                 <div className="text-5xl sm:text-6xl font-black text-[#102E50] mb-2 group-hover:scale-105 transition-transform duration-300">
//                   {stat.value}
//                 </div>
//                 <div className="text-base font-bold text-[#102E50]/70">
//                   {stat.label}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }









"use client";

// import { useEffect, useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import img2 from "../../assets/jordanian-artisan-working-on-handmade-crafts.jpg";
// import img1 from "../../assets/jordanian-creators-collaborating-on-creative-proje.jpg";
// import img3 from "../../assets/jordanian-marketplace-with-local-products.jpg";
// import img5 from "../../assets/handmade-jewelry.png";
// import img6 from "../../assets/professional-makeup-artist.jpg";
// import img4 from "../../assets/professional-photo-session.png";
// import img12 from "../../assets/traditional-jordanian-culture (2).jpg";
// import { Brush, LibraryBig, Scissors, Smile, Store, Volleyball } from "lucide-react";
// import img11 from "../../assets/arts-and-creativity-workspace (1).jpg";
// import img7 from "../../assets/handmade-crafts-and-artisan-work.jpg";
// import img8 from "../../assets/learning-and-education.jpg";
// import img10 from "../../assets/professional-makeup-artist.jpg";
// import img9 from "../../assets/traditional-jordanian-culture.jpg";
// import defaultImg from "../../assets/NoImage.png";

// export default function MainDashBoard1() {
//   const token = useSelector((s) => s.UserInfo?.token);
//   const isLogged = Boolean(token);
//   const navigate = useNavigate();
//   const port = import.meta.env.VITE_PORT;

//   const [slideIndex, setSlideIndex] = useState(0);
//   const [topOrders, setTopOrders] = useState([]);
//   const [loadingTop, setLoadingTop] = useState(false);
//   const [imagesByCategory, setImagesByCategory] = useState({});

//   useEffect(() => {
//     const fetchTopOrdered = async () => {
//       try {
//         const res = await axios.get(`http://localhost:${port}/api/topordered`);
//         setTopOrders(res.data.items || []);
//       } catch {
//         setTopOrders([]);
//       }
//     };
//     fetchTopOrdered();
//   }, [port]);

//   const categories = useMemo(
//     () => [
//       {
//         key: "arts",
//         name: "Arts & Creativity",
//         icon: <Brush />,
//         description: "Photography, painting, digital art",
//         color: "from-amber-500/10 to-orange-500/10",
//         fallback: "/arts-and-creativity-workspace.jpg",
//         image: img11,
//       },
//       {
//         key: "handmade",
//         name: "Handmade & Crafts",
//         icon: <Scissors />,
//         description: "Unique handcrafted items",
//         color: "from-amber-500/10 to-orange-500/10",
//         fallback: "/handmade-crafts-and-artisan-work.jpg",
//         image: img7,
//       },
//       {
//         key: "beauty",
//         name: "Beauty & Style",
//         icon: <Smile />,
//         description: "Makeup, styling, fashion",
//         color: "from-rose-500/10 to-red-500/10",
//         fallback: "/beauty-and-style-services.jpg",
//         image: img10,
//       },
//       {
//         key: "learning",
//         name: "Learning & Coaching",
//         icon: <LibraryBig />,
//         description: "Courses, tutoring, mentorship",
//         color: "from-blue-500/10 to-cyan-500/10",
//         fallback: "/learning-and-education.jpg",
//         image: img8,
//       },
//       {
//         key: "local",
//         name: "Local Services",
//         icon: <Store />,
//         description: "Community services nearby",
//         color: "from-green-500/10 to-emerald-500/10",
//         fallback: "/local-services-and-community.jpg",
//         image: img9,
//       },
//       {
//         key: "traditional",
//         name: "Traditional & Cultural",
//         icon: <Volleyball />,
//         description: "Heritage and cultural services",
//         color: "from-yellow-500/10 to-amber-500/10",
//         fallback: "/traditional-jordanian-culture.jpg",
//         image: img12,
//       },
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
//     if (topOrders && topOrders.length) return;
//     setTopOrders([
//       { product_id: 1, name: "Professional Photography", price: 50, image_url: img4 },
//       { product_id: 2, name: "Handmade Jewelry", price: 15, image_url: img5 },
//       { product_id: 3, name: "Event Makeup", price: 30, image_url: img6 },
//     ]);
//   }, [topOrders]);

//   const MediaBox = ({ src, alt, ratio = "aspect-[4/3]" }) => {
//     return (
//       <div className={`relative w-full ${ratio} bg-gradient-to-br from-[#102E50]/5 to-[#F5C45E]/5 rounded-2xl overflow-hidden`}>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <img
//             src={src || "/placeholder.svg"}
//             alt={alt}
//             className="w-full h-full object-cover transition-transform duration-700"
//             loading="lazy"
//             onError={(e) => (e.currentTarget.src = defaultImg)}
//           />
//         </div>
//         <div className="absolute inset-0 bg-gradient-to-t from-[#102E50]/20 via-transparent to-transparent opacity-0" />
//       </div>
//     );
//   };

//   const gotoLoginOr = (path) => {
//     if (!isLogged) return navigate("/login");
//     navigate(path);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#FFF6E9] via-[#FFF6E9] to-[#F5C45E]/10 relative antialiased">
//       <div className="fixed inset-0 opacity-[0.015] pointer-events-none">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `radial-gradient(circle at 2px 2px, #102E50 1px, transparent 0)`,
//             backgroundSize: "48px 48px",
//           }}
//         />
//       </div>

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
//                         aria-label={`slide-${i + 1}`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="relative flex items-center justify-center bg-white">
//                 <div className="w-full h-full">
//                   <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] overflow-hidden">
//                     <div
//                       className="absolute inset-0 bg-center bg-cover opacity-30 scale-110"
//                       style={{ backgroundImage: `url(${heroSlides[slideIndex]?.src || defaultImg})` }}
//                     />
//                     <img
//                       src={heroSlides[slideIndex]?.src || defaultImg}
//                       alt="hero"
//                       className="relative z-10 w-full h-full object-cover object-center"
//                       loading="lazy"
//                       onError={(e) => (e.currentTarget.src = defaultImg)}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
//         <div className="mb-10 flex items-end justify-between">
//           <div>
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102E50] tracking-tight">Explore Categories</h2>
//             <p className="mt-2 text-[#102E50]/60 text-base sm:text-lg">Find the perfect service for your needs</p>
//           </div>
//           <button
//             onClick={() => gotoLoginOr("/userDashboard")}
//             className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#BE3D2A] hover:text-[#BE3D2A]/80 transition-colors"
//           >
//             View All
//             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>

//         <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {categories.map((c, idx) => (
//             <div
//               key={c.key}
//               className="group rounded-3xl bg-white/80 backdrop-blur-sm ring-1 ring-[#102E50]/5 shadow-[0_20px_50px_rgba(16,46,80,0.08)] hover:shadow-[0_28px_64px_rgba(16,46,80,0.14)] p-6 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
//               style={{ animationDelay: `${idx * 100}ms` }}
//             >
//               <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${c.color} opacity-0`} />
//               <div className="relative z-10">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F5C45E]/20 to-[#E78B48]/20 flex items-center justify-center text-2xl shadow-lg">
//                       {c.icon}
//                     </div>
//                     <div>
//                       <h3 className="text-[#102E50] text-lg font-black">{c.name}</h3>
//                       <p className="text-[#102E50]/60 text-xs mt-0.5">{c.description}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => gotoLoginOr("/userDashboard")}
//                     className="rounded-full bg-[#E78B48]/20 hover:bg-[#E78B48] text-[#102E50] hover:text-white px-4 py-2 text-xs font-bold transition-all duration-300"
//                   >
//                     View
//                   </button>
//                 </div>

//                 <div className="mt-4">
//                   <div className="relative w-full h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden bg-[#102E50]/5 ring-1 ring-[#102E50]/5">
//                     <img
//                       src={c.image}
//                       alt={c.name}
//                       className="w-full h-full object-cover rounded-2xl"
//                       loading="lazy"
//                       onError={(e) => (e.currentTarget.src = defaultImg)}
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-4 pt-4 border-t border-[#102E50]/10 flex items-center justify-between text-xs text-[#102E50]/60">
//                   <span className="flex items-center gap-1">1.2k+ providers</span>
//                   <button onClick={() => gotoLoginOr("/userDashboard")} className="font-semibold text-[#BE3D2A] hover:underline">
//                     Explore →
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
//         <div className="mb-10">
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102E50] tracking-tight">Top Ordered Services</h2>
//           <p className="mt-2 text-[#102E50]/60 text-base sm:text-lg">Most popular choices from our community</p>
//         </div>

//         {loadingTop ? (
//           <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//             {[...Array(3)].map((_, i) => (
//               <div key={i} className="rounded-3xl bg-white/80 backdrop-blur-sm ring-1 ring-[#102E50]/5 shadow-[0_20px_50px_rgba(16,46,80,0.10)] overflow-hidden animate-pulse">
//                 <div className="h-64 bg-[#102E50]/10" />
//                 <div className="p-6">
//                   <div className="h-4 bg-[#102E50]/10 rounded w-2/3 mb-2" />
//                   <div className="h-3 bg-[#102E50]/10 rounded w-1/3" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//             {topOrders.map((p, idx) => (
//               <div
//                 key={p.product_id || idx}
//                 className="group rounded-3xl bg-white/80 backdrop-blur-sm ring-1 ring-[#102E50]/5 hover:ring-[#F5C45E] shadow-[0_20px_50px_rgba(16,46,80,0.10)] hover:shadow-[0_28px_64px_rgba(245,196,94,0.25)] overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer"
//                 style={{ animationDelay: `${idx * 100}ms` }}
//                 onClick={() =>
//                   isLogged
//                     ? navigate(`/productdatails?product_id=${p.product_id}`, { state: { product_id: p.product_id } })
//                     : navigate("/login")
//                 }
//               >
//                 <div className="relative">
//                   <MediaBox src={p.image_url || p.image} alt={p.name} ratio="aspect-[4/3]" />
//                   <div className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-[#BE3D2A] to-[#E78B48] px-4 py-2 text-white text-xs font-bold shadow-xl flex items-center gap-2">
//                     Top
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="font-black text-[#102E50] text-xl mb-3">{p.name}</h3>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-baseline gap-2">
//                       <span className="text-3xl font-black text-[#102E50]">{Number(p.price || 0)}</span>
//                       <span className="text-sm font-bold text-[#102E50]/60">JD</span>
//                     </div>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         gotoLoginOr("/userDashboard");
//                       }}
//                       className="rounded-xl bg-gradient-to-r from-[#F5C45E] to-[#E78B48] text-[#102E50] px-6 py-3 text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300"
//                     >
//                       Book Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 lg:pb-32">
//         <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-3">
//           {[
//             { label: "Active Providers", value: "10M+" },
//             { label: "Orders Completed", value: "100M+" },
//             { label: "Happy Customers", value: "50M+" },
//           ].map((stat, idx) => (
//             <div
//               key={idx}
//               className="group relative rounded-3xl bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm ring-1 ring-[#102E50]/5 shadow-[0_20px_50px_rgba(16,46,80,0.10)] hover:shadow-[0_28px_64px_rgba(16,46,80,0.16)] p-8 transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
//             >
//               <div className="relative z-10 text-center">
//                 <div className="text-5xl sm:text-6xl font-black text-[#102E50] mb-2">{stat.value}</div>
//                 <div className="text-base font-bold text-[#102E50]/70">{stat.label}</div>
//               </div>
//             </div>
//           ))}
//         </div>
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
    `https://backend-a2qq.onrender.com/api`;

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