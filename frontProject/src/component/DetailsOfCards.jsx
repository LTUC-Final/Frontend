import axios from "axios";
import { Heart, MapPin, ShoppingCart, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import defaultImg from "../assets//NoImage.png";

import { useAddToCart } from "./AddToCart";
import AddTOFav from "./AddToFav";

export default function DetailsOfCards({ Id }) {
  const port = import.meta.env.VITE_PORT;
  const [dataCard, setDataCard] = useState(null);
  const CusData = useSelector((state) => state.UserInfo);
  const navigate = useNavigate();
  const { AddToCart } = useAddToCart();

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
      <div className="flex justify-center items-center h-screen bg-[#FFF6E9]">
        <p className="text-[#102E50] text-lg animate-pulse">
          Loading product details...
        </p>
      </div>
    );
  }
  console.log("img", dataCard);

  return (
<div className="max-w-3xl mx-auto px-3 py-4 mt-6">
<div className="rounded-xl shadow-xl overflow-hidden border-[3px] border-[#102E50]/80 bg-[#FFF6E9] transition-all duration-500">
        <div
          className="h-2 w-full"
          style={{
            background:
              "linear-gradient(90deg, #F5C45E 0%, #E78B48 50%, #BE3D2A 100%)",
          }}
        />

<div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 sm:p-5">
          <div className="relative w-full md:w-1/2">
            <img
              // src={dataCard.image|| defaultImg}
              src={
                dataCard.image
                  
                    ? dataCard.image
                  : "../src/assets/NoImage.png"
              }
              alt={dataCard.name}
              className="w-full h-[250px] sm:h-[300px] md:h-80 object-cover rounded-2xl border-[3px] border-[#E78B48] shadow-lg transition-transform duration-500 hover:scale-105"
            />
            {/* Price Tag */}
            <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full shadow-md bg-[#F5C45E] text-[#102E50] font-semibold text-sm">
              ${dataCard.price}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 text-[#102E50] font-['Quicksand',sans-serif]">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 leading-tight">
              {dataCard.name}
            </h2>

            <p className="text-sm sm:text-base text-[#102E50] leading-relaxed mb-4">
              {dataCard.description}
            </p>

            {/* Icons Info */}
            <div className="space-y-2 text-sm text-[#3f4c5c] mb-4">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#E78B48]" />
                <span>{dataCard.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={16} className="text-[#E78B48]" />
                <span>{dataCard.type_of_product}</span>
              </div>
            </div>

            {/* Buttons */}
            {CusData.user.role === "customer" && (
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                  onClick={() => AddTOFav(dataCard, CusData)}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-[#BE3D2A] text-white rounded-xl hover:bg-[#a53020] shadow-md transition-transform duration-300 hover:scale-105"
                >
                  <Heart className="w-5 h-5" />
        
                </button>

                <button
                  onClick={() => AddToCart(dataCard, CusData)}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-[#102E50] text-white rounded-xl hover:bg-[#0b223c] shadow-md transition-transform duration-300 hover:scale-105"
                >
                  <ShoppingCart className="w-5 h-5" />
                
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Seller Info */}
        <div className="px-4 sm:px-6 md:px-8 pb-6 border-t border-[#F5C45E] pt-5">
          <h3 className="text-lg sm:text-xl font-semibold text-[#102E50] mb-4">
            Seller Information
          </h3>

          <div className="flex items-center gap-4 sm:gap-6">
            <img
              src={
                dataCard.profile_image
                  ? dataCard.profile_image
                      : `https://ui-avatars.com/api/?name=${dataCard.customer_name}+${dataCard.customerlastname}&background=random&color=fff`
              }
              alt="seller"
              onClick={() => navigate(`/profile/${dataCard.user_id}`)}
              className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-full border-4 border-[#F5C45E] cursor-pointer hover:scale-110 transition-transform duration-300"
            />
            <div
              onClick={() => navigate(`/profile/${dataCard.user_id}`)}
              className="cursor-pointer"
            >
              <p className="text-base sm:text-lg font-medium hover:text-[#E78B48] transition-colors">
                {/* {dataCard.firstname} {dataCard.lastname} */}

                {`${
                  dataCard.firstname.charAt(0).toUpperCase() +
                  dataCard.firstname.slice(1)
                } ${
                  dataCard.lastname.charAt(0).toUpperCase() +
                  dataCard.lastname.slice(1)
                }`}
              </p>
              <p className="text-sm text-[#3f4c5c]">Verified Seller</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}