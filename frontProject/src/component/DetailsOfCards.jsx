import axios from "axios";
import { useEffect, useState } from "react";
import AddTOFav from "./AddToFav";
import AddToCart from "./AddToCart";
import { useSelector } from "react-redux";

export default function DetailsOfCards({ Id }) {
  const port = import.meta.env.VITE_PORT;
  const [dataCard, setDataCard] = useState(null);
  const CusData = useSelector((state) => state.UserInfo);

  console.log(CusData);
  console.log(dataCard);
  
  

  useEffect(() => {
    const gitdetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:${port}/api/DetailsOfCardInfo/${Id}`
        );
        setDataCard(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    gitdetails();
  }, [Id, port]);

  if (!dataCard) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={dataCard.image}
          alt={dataCard.name}
          className="w-full md:w-1/2 h-80 object-cover rounded-xl shadow"
        />

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {dataCard.name}
          </h3>
          <p className="text-gray-600 mb-2">{dataCard.description}</p>
          <p className="text-sm text-gray-500 mb-1">
            Location: {dataCard.location}
          </p>
          <p className="text-sm text-gray-500 mb-1">
            Type: {dataCard.type_of_product}
          </p>
          <p className="text-xl font-semibold text-blue-600 mb-4">
            ${dataCard.price}
          </p>

          {CusData.user.role === "customer" && (
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => AddTOFav(dataCard, CusData)}
                className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition"
              >
                Add to Favorites
              </button>
              <button
                onClick={() => AddToCart(dataCard, CusData)}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 border-t pt-4">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">
          Seller Information
        </h4>
        <div className="flex items-center gap-4">
          <img
            src={dataCard.image}
            alt="seller"
            className="w-16 h-16 object-cover rounded-full border"
          />
          <p className="text-gray-700 font-medium">
            {dataCard.firstname} {dataCard.lastname}
          </p>
        </div>
      </div>
    </div>
  );
}
