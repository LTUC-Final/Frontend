// import axios from "axios";
// import { useEffect, useState } from "react";
// import AddToCart from "./AddToCart";
// import AddTOFav from "./AddToFav";
// // import GitReviews from "./GitReviews";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import ReactionPicker from "./reaction";

// export default function GitAllProduct() {
//   const navigate = useNavigate();
//   const port = import.meta.env.VITE_PORT;
//   const [cards, setCards] = useState([]);
//   const CusData = useSelector((state) => state.UserInfo);
//   const [textSearch, setTextSearch] = useState("");
//   const [selectore, setSelectore] = useState("");
  

//   const number = 0;

//   console.log(selectore);
//   console.log(selectore);

//   console.log(CusData);

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
//   console.log("resultOfFilter");
// console.log("asdas",number);

//   console.log(resultOfFilter);
//   console.log("resultOfFilter");

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
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Search and Filter Section */}
//       <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search by name..."
//           value={textSearch}
//           onChange={(e) => setTextSearch(e.target.value)}
//           className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />

//         <div className="flex items-center gap-2">
//           <label className="font-medium text-gray-700">Category:</label>
//           <select
//             value={selectore}
//             onChange={(e) => setSelectore(e.target.value)}
//             className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="">All</option>
//             {[...new Set(cards.map((card) => card.category_name))].map(
//               (category, idx) => (
//                 <option key={idx} value={category}>
//                   {category}
//                 </option>
//               )
//             )}
//           </select>
//         </div>
//       </div>

//       {/* Product Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {resultOfFilter.map((card, idx) => (
//           <div
//             key={idx}
//             className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4"
//           >
//             <img
//               // src={card.image}

//               src={
//                 card.image
//                   ? card.image.startsWith("http")
//                     ? card.image
//                     : `http://localhost:${port}${card.image}`
//                   : `../src/assets/cupcakes-1283247__340.jpg`
//               }
//               alt={card.name}
//               className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer"
//               onClick={() => {
//                 navigate("/productdatails", { state: card });
//               }}
//             />
//             <h3 className="text-lg font-semibold text-gray-800">{card.name}</h3>
//             <p className="text-gray-600">
//               {card.firstname} {card.lastname}
//             </p>
//             <p className="text-blue-600 font-bold">${card.price}</p>
//             <p className="text-sm text-gray-500">{card.location}</p>{" "}
//             {/* <p>ssssssss{card.reaction_counts.like}</p> */}
//             {CusData.user.role === "customer" && (
//               <div className="flex gap-3 mt-4">
//                 <button
//                   onClick={() => AddTOFav(card, CusData)}
//                   className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition"
//                 >
//                   Add to Favorites
//                 </button>
//                 <button
//                   onClick={() => AddToCart(card, CusData)}
//                   className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             )}
//             {/* <ReactionPicker
//               card={card}
//               product_id={card.product_id}
//               userId={CusData.user.user_id}
//             ></ReactionPicker> */}
//           <ReactionPicker
//               card={card}
//               product_id={card.product_id}
//               userId={CusData.user.user_id}
//               onReactionUpdate={(product_id, reactionCounts, selectedReaction) => {
//                 setCards((prevCards) =>
//                   prevCards.map((c) =>
//                     c.product_id === product_id
//                       ? {
//                           ...c,
//                           reaction_counts: reactionCounts,
//                           selectedReaction: selectedReaction,
//                         }
//                       : c
//                   )
//                 );
//               }}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }





import axios from "axios";
import { useEffect, useState } from "react";
import AddToCart from "./AddToCart";
import AddTOFav from "./AddToFav";
// import GitReviews from "./GitReviews";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactionPicker from "./reaction";

export default function GitAllProduct() {
  const navigate = useNavigate();
  const port = import.meta.env.VITE_PORT;
  const [cards, setCards] = useState([]);
  const CusData = useSelector((state) => state.UserInfo);
  const [textSearch, setTextSearch] = useState("");
  const [selectore, setSelectore] = useState("");
  

  const number = 0;

  console.log(selectore);
  console.log(selectore);

  console.log(CusData);

  console.log(cards);
  console.log(textSearch);

  const resultOfFilter = cards.filter((card) => {
    const FilterByName = card.name
      .toLowerCase()
      .includes(textSearch.toLowerCase());
    const FilterBySelete =
      !selectore ||
      card.category_name.toLowerCase() === selectore.toLowerCase();

    return FilterByName && FilterBySelete;
  });
  console.log("resultOfFilter");
console.log("asdas",number);

  console.log(resultOfFilter);
  console.log("resultOfFilter");

  useEffect(() => {
    const feactData = async () => {
      try {
        let res = await axios.get(
          `http://localhost:${port}/api/ShowCardInUserDashboard/${CusData.user.user_id}`
        );
        setCards(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    feactData();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-[radial-gradient(1200px_800px_at_20%_-10%,rgba(245,196,94,.18),transparent_55%),radial-gradient(900px_700px_at_100%_0%,rgba(231,139,72,.14),transparent_45%)] from-[#FFF6E9] to-[#FFF6E9] bg-[#FFF6E9]">
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg ring-1 ring-[#102E50]/10 p-5">
        <input
          type="text"
          placeholder="Search by name..."
          value={textSearch}
          onChange={(e) => setTextSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-3 border-2 border-[#102E50]/30 rounded-xl shadow-sm bg-[#FFF6E9] text-[#102E50] placeholder-[#102E50]/60 focus:outline-none focus:ring-4 focus:ring-[#F5C45E]/40 focus:border-[#F5C45E] transition duration-200"
        />

        <div className="flex items-center gap-2">
          <label className="font-semibold text-[#102E50]">Category:</label>
          <select
            value={selectore}
            onChange={(e) => setSelectore(e.target.value)}
            className="px-4 py-3 border-2 border-[#102E50]/30 bg-[#FFF6E9] rounded-xl text-[#102E50] font-medium focus:outline-none focus:ring-4 focus:ring-[#F5C45E]/40 focus:border-[#F5C45E] transition"
          >
            <option value="">All</option>
            {[...new Set(cards.map((card) => card.category_name))].map(
              (category, idx) => (
                <option key={idx} value={category}>
                  {category}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {resultOfFilter.map((card, idx) => (
          <div
            key={idx}
            className="group rounded-2xl bg-white shadow-sm ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] transition-all overflow-hidden"
          >
            <div className="aspect-[4/3] overflow-hidden bg-[#102E50]/5 relative">
              <img
                // src={card.image}

                src={
                  card.image
                    ? card.image.startsWith("http")
                      ? card.image
                      : `http://localhost:${port}${card.image}`
                    : `../src/assets/cupcakes-1283247__340.jpg`
                }
                alt={card.name}
                className="w-full h-full object-cover transition duration-300 group-hover:scale-105 cursor-pointer"
                onClick={() => {
                  navigate("/productdatails", { state: card });
                }}
              />
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-[#102E50]">{card.name}</h3>
              <p className="text-[#102E50]/80 font-medium">
                {card.firstname} {card.lastname}
              </p>
              <p className="text-[#E78B48] font-bold text-lg">${card.price}</p>
              <p className="text-sm text-[#102E50]/60">{card.location}</p>{" "}
              {/* <p>ssssssss{card.reaction_counts.like}</p> */}
              {CusData.user.role === "customer" && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => AddTOFav(card, CusData)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-[#BE3D2A] to-[#E78B48] text-white rounded-xl font-semibold shadow hover:shadow-lg active:scale-[0.99] transition"
                  >
                    Add to Favorites
                  </button>
                  <button
                    onClick={() => AddToCart(card, CusData)}
                    className="flex-1 px-4 py-2 bg-[#102E50] text-[#FFF6E9] rounded-xl font-semibold shadow hover:shadow-lg active:scale-[0.99] transition"
                  >
                    Add to Cart
                  </button>
                </div>
              )}
              {/* <ReactionPicker
              card={card}
              product_id={card.product_id}
              userId={CusData.user.user_id}
            ></ReactionPicker> */}
            <ReactionPicker
                card={card}
                product_id={card.product_id}
                userId={CusData.user.user_id}
                onReactionUpdate={(product_id, reactionCounts, selectedReaction) => {
                  setCards((prevCards) =>
                    prevCards.map((c) =>
                      c.product_id === product_id
                        ? {
                            ...c,
                            reaction_counts: reactionCounts,
                            selectedReaction: selectedReaction,
                          }
                        : c
                    )
                  );
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
