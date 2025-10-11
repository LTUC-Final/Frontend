
import axios from "axios";
import { useEffect, useState } from "react";
import AddToCart from "./AddToCart";
import AddTOFav from "./AddToFav";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactionPicker from "./reaction";
import defaultImg from "../assets/NoImage.png";

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

  console.log("asdallllllllsd",CusData);

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
    <div className="min-h-screen bg-[#FFF6E9] px-3 sm:px-4 md:px-6 py-6 md:py-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Search & Filter */}
        <div className="mb-6 sm:mb-8 bg-white/80 backdrop-blur rounded-2xl shadow-sm ring-1 ring-[#102E50]/10 p-3 sm:p-4">
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
            <input
              type="text"
              placeholder="Search by name..."
              value={textSearch}
              onChange={(e) => setTextSearch(e.target.value)}
              className="w-full md:flex-1 h-11 px-4 rounded-xl border border-[#102E50]/15 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent transition"
            />

            <div className="flex items-center gap-2 sm:gap-3">
              <label className="text-sm font-semibold text-[#102E50]">
                Category
              </label>
              <select
                value={selectore}
                onChange={(e) => setSelectore(e.target.value)}
                className="h-11 px-4 rounded-xl border border-[#102E50]/15 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent transition"
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
        </div>

        {/* Grid */}
        <div className="grid gap-3 sm:gap-4 md:gap-5 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {resultOfFilter.map((card, idx) => (
            <div
              key={idx}
              className="group rounded-xl sm:rounded-2xl bg-white shadow-sm ring-1 ring-[#102E50]/10 hover:ring-[#F5C45E] transition overflow-hidden"
            >
              {/* Image */}
              <div className="w-full aspect-[4/3] overflow-hidden bg-[#102E50]/5">
                <img
                  src={
                    card.image
                      ? card.image.startsWith("http")
                        ? card.image
                        : `http://localhost:${port}${card.image}`
                      : defaultImg
                  }
                  alt={card.name}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105 cursor-pointer"
                  onClick={() => {
                    navigate("/productdatails", { state: card });
                  }}
                />
              </div>

              {/* Body */}
              <div className="p-3 sm:p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[#102E50] text-sm sm:text-base line-clamp-1">
                      {card.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#102E50]/70 line-clamp-1">
                      {card.firstname} {card.lastname}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-md bg-[#F5C45E] text-[#102E50] text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1">
                    {card.location || "Location"}
                  </span>
                </div>

                <div className="mt-2 sm:mt-3 text-[#102E50]">
                  <span className="text-base sm:text-lg font-extrabold">
                    ${card.price}
                  </span>
                </div>

                {CusData.user.role === "customer" && (
                  <div className="mt-3 sm:mt-4 flex flex-col xs:flex-row gap-2">
                    <button
                      onClick={() => AddTOFav(card, CusData)}
                      className="w-full xs:w-auto px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl bg-[#BE3D2A] text-white text-sm sm:text-base font-semibold shadow hover:shadow-md active:scale-[0.99] transition"
                    >
                      Add to Favorites
                    </button>
                    <button
                      onClick={() => AddToCart(card, CusData)}
                      className="w-full xs:w-auto px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl bg-[#102E50] text-[#FFF6E9] text-sm sm:text-base font-semibold shadow hover:shadow-md active:scale-[0.99] transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                )}

                {/* Reaction buttons styled wrapper */}
                <div
                  className="mt-3 sm:mt-4
                    [&_button]:px-3 [&_button]:h-9 [&_button]:rounded-lg
                    [&_button]:bg-[#102E50]/5 [&_button]:text-[#102E50] [&_button]:text-sm [&_button]:font-semibold
                    [&_button]:ring-1 [&_button]:ring-[#102E50]/10
                    [&_button]:hover:bg-[#F5C45E]/20 [&_button]:hover:ring-[#F5C45E]
                    [&_button]:transition [&_button]:shadow-sm [&_button]:active:scale-[0.98]
                    [&_button]:disabled:opacity-50 [&_button]:disabled:cursor-not-allowed
                    [&_.count]:text-xs [&_.count]:text-[#102E50]/70 [&_.count]:ml-1"
                >
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

              {/* Accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


