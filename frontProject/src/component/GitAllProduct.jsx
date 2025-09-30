import axios from "axios";
import { useEffect, useState } from "react";
import AddToCart from "./AddToCart";
import AddTOFav from "./AddToFav";
// import GitReviews from "./GitReviews";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function GitAllProduct() {
  const navigate = useNavigate();
  const port = import.meta.env.VITE_PORT;
  const [cards, setCards] = useState([]);
  const CusData = useSelector((state) => state.UserInfo);
  const [textSearch, setTextSearch] = useState("");
  const [selectore, setSelectore] = useState("");

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

  useEffect(() => {
    const feactData = async () => {
      try {
        let res = await axios.get(
          `http://localhost:${port}/api/ShowCardInUserDashboard`
        );
        setCards(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    feactData();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={textSearch}
          onChange={(e) => setTextSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex items-center gap-2">
          <label className="font-medium text-gray-700">Category:</label>
          <select
            value={selectore}
            onChange={(e) => setSelectore(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resultOfFilter.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4"
          >
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
              className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer"
              onClick={() => {
                navigate("/productdatails", { state: card });
              }}
            />
            <h3 className="text-lg font-semibold text-gray-800">{card.name}</h3>
            <p className="text-gray-600">
              {card.firstname} {card.lastname}
            </p>
            <p className="text-blue-600 font-bold">${card.price}</p>
            <p className="text-sm text-gray-500">{card.location}</p>

            {CusData.user.role === "customer" && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => AddTOFav(card, CusData)}
                  className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition"
                >
                  Add to Favorites
                </button>
                <button
                  onClick={() => AddToCart(card, CusData)}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                >
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
