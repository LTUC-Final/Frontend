// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import defaultImg from "../assets/NoImage.png";
// import AddTOFav from "./AddToFav";
// import ReactionPicker from "./reaction";
// import { useAddToCart } from "./AddToCart";

// export default function GitAllProduct() {
//   const navigate = useNavigate();
//   const port = import.meta.env.VITE_PORT;
//   const [cards, setCards] = useState([]);
//   const CusData = useSelector((state) => state.UserInfo);
//   const [textSearch, setTextSearch] = useState("");
//   const [selectore, setSelectore] = useState("");
//   const { AddToCart } = useAddToCart();
//   const number = 0;

//   console.log(selectore);
//   console.log(selectore);

//   console.log("asdallllllllsd", CusData);

//   console.log(cards);
//   console.log(textSearch);

//   const resultOfFilter = cards.filter((card) => {
//     const FilterByName = card.name
//       .toLowerCase()
//       .includes(textSearch.toLowerCase());
//     const FilterBySelete =
//       !selectore ||
//       card.category_name.toLowerCase() === selectore.toLowerCase();
//     return FilterByName && FilterBySelete;
//   });

//   useEffect(() => {
//     const feactData = async () => {
//       try {
//         let res = await axios.get(
//           `http://localhost:${port}/api/ShowCardInUserDashboard/${CusData.user.user_id}`
//         );
//         setCards(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     feactData();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] px-3 sm:px-4 md:px-6 py-6 md:py-8">
//       <div className="mx-auto w-full max-w-7xl">
//         {/* Search & Filter */}
//         <div className="mb-6 sm:mb-8 bg-white/80 backdrop-blur rounded-2xl shadow-sm ring-1 ring-[#102E50]/10 p-3 sm:p-4">
//           <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
//             <input
//               type="text"
//               placeholder="Search by name..."
//               value={textSearch}
//               onChange={(e) => setTextSearch(e.target.value)}
//               className="w-full md:flex-1 h-11 px-4 rounded-xl border border-[#102E50]/15 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent transition"
//             />

//             <div className="flex items-center gap-2 sm:gap-3">
//               <label className="text-sm font-semibold text-[#102E50]">
//                 Category
//               </label>
//               <select
//                 value={selectore}
//                 onChange={(e) => setSelectore(e.target.value)}
//                 className="h-11 px-4 rounded-xl border border-[#102E50]/15 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent transition"
//               >
//                 <option value="">All</option>
//                 {[...new Set(cards.map((card) => card.category_name))].map(
//                   (category, idx) => (
//                     <option key={idx} value={category}>
//                       {category}
//                     </option>
//                   )
//                 )}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Grid */}
//         <div className="grid gap-3 sm:gap-4 md:gap-5 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {resultOfFilter.map((card, idx) => (
//             <div
//               key={idx}
//               className="group rounded-xl sm:rounded-2xl bg-white shadow-sm ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] transition overflow-hidden"
//             >
//               {/* Image */}
//               <div className="w-full aspect-[4/3] overflow-hidden bg-[#102E50]/5">
//                 <img
//                   src={
//                     card.image
//                       ? card.image.startsWith("http")
//                         ? card.image
//                         : `http://localhost:${port}${card.image}`
//                       : defaultImg
//                   }
//                   alt={card.name}
//                   className="w-full h-full object-cover transition duration-300 group-hover:scale-105 cursor-pointer"
//                   onClick={() => {
//                     navigate("/productdatails", { state: card });
//                   }}
//                 />
//               </div>

//               {/* Body */}
//               <div className="p-3 sm:p-4">
//                 <div className="flex items-start justify-between gap-2">
//                   <div className="min-w-0">
//                     <h3 className="font-semibold text-[#102E50] text-sm sm:text-base line-clamp-1">
//                       {card.name}
//                     </h3>
//                     <p className="text-xs sm:text-sm text-[#102E50]/70 line-clamp-1">
//                       {card.firstname} {card.lastname}
//                     </p>
//                   </div>
//                   <span className="shrink-0 rounded-md bg-[#F5C45E] text-[#102E50] text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1">
//                     {card.location || "Location"}
//                   </span>
//                 </div>

//                 <div className="mt-2 sm:mt-3 text-[#102E50]">
//                   <span className="text-base sm:text-lg font-extrabold">
//                     ${card.price}
//                   </span>
//                 </div>

//                 {CusData.user.role === "customer" && (
//                   <div className="mt-3 sm:mt-4 flex flex-col xs:flex-row gap-2">
//                     <button
//                       onClick={() => AddTOFav(card, CusData)}
//                       className="w-full xs:w-auto px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl bg-[#BE3D2A] text-white text-sm sm:text-base font-semibold shadow hover:shadow-md active:scale-[0.99] transition"
//                     >
//                       Add to Favorites
//                     </button>
//                     <button
//                       onClick={() => AddToCart(card, CusData)}
//                       className="w-full xs:w-auto px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl bg-[#102E50] text-[#FFF6E9] text-sm sm:text-base font-semibold shadow hover:shadow-md active:scale-[0.99] transition"
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 )}

//                 {/* Reaction buttons styled wrapper */}
//                 <div
//                   className="mt-3 sm:mt-4
//                     [&_button]:px-3 [&_button]:h-9 [&_button]:rounded-lg
//                     [&_button]:bg-[#102E50]/5 [&_button]:text-[#102E50] [&_button]:text-sm [&_button]:font-semibold
//                     [&_button]:ring-1 [&_button]:ring-[#102E50]/10
//                     [&_button]:hover:bg-[#F5C45E]/20 [&_button]:hover:ring-[#F5C45E]
//                     [&_button]:transition [&_button]:shadow-sm [&_button]:active:scale-[0.98]
//                     [&_button]:disabled:opacity-50 [&_button]:disabled:cursor-not-allowed
//                     [&_.count]:text-xs [&_.count]:text-[#102E50]/70 [&_.count]:ml-1"
//                 >
//                   <ReactionPicker
//                     card={card}
//                     product_id={card.product_id}
//                     userId={CusData.user.user_id}
//                     onReactionUpdate={(
//                       product_id,
//                       reactionCounts,
//                       selectedReaction
//                     ) => {
//                       setCards((prevCards) =>
//                         prevCards.map((c) =>
//                           c.product_id === product_id
//                             ? {
//                                 ...c,
//                                 reaction_counts: reactionCounts,
//                                 selectedReaction: selectedReaction,
//                               }
//                             : c
//                         )
//                       );
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Accent bar */}
//               <div className="h-1 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }










import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import defaultImg from "../assets/NoImage.png";
import AddTOFav from "./AddToFav";
import ReactionPicker from "./reaction";
import { useAddToCart } from "./AddToCart";

export default function GitAllProduct() {
  const navigate = useNavigate();
  const { AddToCart } = useAddToCart();
  const CusData = useSelector((s) => s.UserInfo);
  const uid = CusData?.user?.user_id;
  const role = CusData?.user?.role;

  const port = import.meta.env.VITE_PORT;
  const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [textSearch, setTextSearch] = useState("");
  const [selectore, setSelectore] = useState("");

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

  const categories = useMemo(
    () => [...new Set(cards.map((c) => c?.category_name).filter(Boolean))],
    [cards]
  );

  const toImg = (img) => (img ? (String(img).startsWith("http") ? img : `${apiBase}${img}`) : defaultImg);

  const filtered = cards.filter((card) => {
    const byName = (card?.name || "").toLowerCase().includes(textSearch.toLowerCase());
    const byCat = !selectore || (card?.category_name || "").toLowerCase() === String(selectore).toLowerCase();
    return byName && byCat;
  });

  const field =
    "h-12 px-4 rounded-2xl bg-white/95 text-[#0f2a47] placeholder-[#0f2a47]/60 text-sm outline-none ring-1 ring-[#0f2a47]/15 focus:ring-2 focus:ring-[#F5C45E] transition";

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0b1f37_0%,#0f2a47_45%,#0b1f37_100%)] text-[#0f2a47]">
      <style>{`
        @keyframes orbit {from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @media (prefers-reduced-motion: reduce){*{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important}}
      `}</style>

      <div className="relative">
        <div className="absolute -top-32 -left-24 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-30 pointer-events-none" style={{ background: "conic-gradient(from 0deg,#F5C45E22,#E78B4822,#BE3D2A22,#102E5022,#F5C45E22)", animation: "orbit 40s linear infinite" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        <div className="rounded-[1.6rem] p-[1.2px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
          <div className="rounded-[1.6rem] bg-white/95 backdrop-blur-md">
            <div className="p-4 sm:p-6 flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                <div className="flex-1 relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-[#0f2a47]/60">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L19 20.49 20.49 19 15.5 14ZM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"/></svg>
                  </span>
                  <input value={textSearch} onChange={(e) => setTextSearch(e.target.value)} placeholder="Search services or providers" className={`${field} w-full pl-10`} />
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-sm font-semibold">Category</span>
                  <select value={selectore} onChange={(e) => setSelectore(e.target.value)} className={`${field}`}>
                    <option value="">All</option>
                    {categories.map((cat, i) => (
                      <option key={i} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
                <button onClick={() => setSelectore("")} className={`px-4 h-10 rounded-xl text-sm font-semibold ring-1 transition ${selectore === "" ? "bg-[#102E50] text-[#FFF6E9] ring-transparent" : "bg-white text-[#0f2a47] ring-[#0f2a47]/15 hover:ring-[#F5C45E]"}`}>All</button>
                {categories.map((cat) => (
                  <button key={cat} onClick={() => setSelectore(cat)} className={`px-4 h-10 rounded-xl text-sm font-semibold ring-1 transition ${selectore === cat ? "bg-[#102E50] text-[#FFF6E9] ring-transparent" : "bg-white text-[#0f2a47] ring-[#0f2a47]/15 hover:ring-[#F5C45E]"}`}>{cat}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="mt-8 grid gap-5 sm:gap-6 lg:gap-7 grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-3xl overflow-hidden bg-white shadow-[0_10px_30px_rgba(10,30,53,0.18)] ring-1 ring-[#0f2a47]/10 animate-pulse">
                <div className="w-full aspect-[4/3] bg-[#0f2a47]/10" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-2/3 bg-[#0f2a47]/10 rounded" />
                  <div className="h-4 w-1/2 bg-[#0f2a47]/10 rounded" />
                  <div className="h-10 w-full bg-[#0f2a47]/10 rounded-2xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:gap-6 lg:gap-7 grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {filtered.map((card, i) => (
              <div key={i} className="group rounded-3xl overflow-hidden bg-white shadow-[0_10px_30px_rgba(10,30,53,0.18)] ring-1 ring-[#0f2a47]/10 hover:ring-[#F5C45E] transition">
                <div className="relative w-full aspect-[4/3] bg-[#0f2a47]/5">
                  <img src={toImg(card?.image)} alt={card?.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-105 cursor-pointer" onClick={() => navigate("/productdatails", { state: card })} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    {role === "customer" && (
                      <>
                        <button onClick={() => AddTOFav(card, CusData)} className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur text-[#BE3D2A] ring-1 ring-[#BE3D2A]/20 hover:bg-[#BE3D2A] hover:text-white transition grid place-items-center" title="Favorite">
                          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 21s-6.72-4.32-9.33-7.38A5.5 5.5 0 0 1 12 5.24a5.5 5.5 0 0 1 9.33 8.38C18.72 16.68 12 21 12 21Z" /></svg>
                        </button>
                        <button onClick={() => AddToCart(card, CusData)} className="w-10 h-10 rounded-2xl bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition grid place-items-center" title="Add to Cart">
                          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M6.2 6l.52 2H20a1 1 0 0 1 .96 1.27l-1.8 6A2 2 0 0 1 17.25 17H8a2 2 0 0 1-1.94-1.52L4.1 6.84A1 1 0 0 1 5.07 6h1.13ZM7 20a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 .001 3.999A2 2 0 0 0 17 20Z" /></svg>
                        </button>
                      </>
                    )}
                  </div>
                  <div className="absolute left-4 right-4 bottom-3 flex items-center justify-between">
                    <div className="max-w-[72%]">
                      <h3 className="text-white font-extrabold text-lg leading-tight line-clamp-1">{card?.name}</h3>
                      <p className="text-white/85 text-xs line-clamp-1">{card?.firstname} {card?.lastname}</p>
                    </div>
                    <span className="shrink-0 rounded-xl bg-[#F5C45E] text-[#102E50] text-[10px] sm:text-xs font-extrabold px-2.5 py-1">{card?.location || "Location"}</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-[#0f2a47]">${card?.price}</span>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-[#0f2a47]/5 text-[#0f2a47] ring-1 ring-[#0f2a47]/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F5C45E]" />
                      {card?.category_name}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <button onClick={() => navigate("/productdatails", { state: card })} className="col-span-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-white text-[#0f2a47] font-semibold text-sm ring-1 ring-[#0f2a47]/15 hover:ring-[#F5C45E] transition">
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 6a6 6 0 0 1 6 6 6 6 0 1 1-6-6Zm0-2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm1 5h-2v5h5v-2h-3V9Z"/></svg>
                      Details
                    </button>
                    {role === "customer" && (
                      <>
                        <button onClick={() => AddTOFav(card, CusData)} className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-white text-[#BE3D2A] font-semibold text-sm ring-1 ring-[#BE3D2A]/30 hover:bg-[#BE3D2A] hover:text-white transition">
                          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 21s-6.72-4.32-9.33-7.38A5.5 5.5 0 0 1 12 5.24a5.5 5.5 0 0 1 9.33 8.38C18.72 16.68 12 21 12 21Z" /></svg>
                          Favorite
                        </button>
                        <button onClick={() => AddToCart(card, CusData)} className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-[#102E50] text-[#FFF6E9] font-semibold text-sm hover:bg-[#F5C45E] hover:text-[#102E50] transition">
                          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M6.2 6l.52 2H20a1 1 0 0 1 .96 1.27l-1.8 6A2 2 0 0 1 17.25 17H8a2 2 0 0 1-1.94-1.52L4.1 6.84A1 1 0 0 1 5.07 6h1.13ZM7 20a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 .001 3.999A2 2 0 0 0 17 20Z" /></svg>
                          Cart
                        </button>
                      </>
                    )}
                  </div>

                  <div className="mt-4 rounded-2xl ring-1 ring-[#0f2a47]/10 bg-[#0f2a47]/5 p-2.5">
                    <div className="text-[11px] font-semibold text-[#0f2a47]/70 mb-2 px-1">Reactions</div>
                    <div className="[&_button]:px-3 [&_button]:h-9 [&_button]:rounded-xl [&_button]:bg-white [&_button]:text-[#0f2a47] [&_button]:text-sm [&_button]:font-semibold [&_button]:ring-1 [&_button]:ring-[#0f2a47]/10 [&_button]:hover:bg-[#F5C45E]/15 [&_button]:hover:ring-[#F5C45E] [&_button]:transition [&_button]:shadow-sm [&_.count]:text-xs [&_.count]:text-[#0f2a47]/70 flex flex-wrap gap-2">
                      <ReactionPicker
                        card={card}
                        product_id={card?.product_id}
                        userId={uid}
                        onReactionUpdate={(product_id, reactionCounts, selectedReaction) => {
                          setCards((prev) =>
                            prev.map((c) =>
                              c.product_id === product_id ? { ...c, reaction_counts: reactionCounts, selectedReaction } : c
                            )
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="h-1 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center text-white/90 mt-14">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-[#F5C45E] animate-pulse" />
              No results. Try another search or category.
            </div>
          </div>
        )}

        <div className="mt-10 text-center">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-[#0f2a47] ring-1 ring-[#0f2a47]/10 hover:ring-[#F5C45E] transition">
            <span className="w-2 h-2 rounded-full bg-[#F5C45E] animate-pulse" />
            Back to top
          </button>
        </div>
      </div>
    </div>
  );
}

