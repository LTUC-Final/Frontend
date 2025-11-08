import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import DetailsOfCards from "./DetailsOfCards";

export default function CardDeatils() {
  const port = import.meta.env.VITE_PORT;
  const location = useLocation();
  const card = location.state;
  const [cardRev, setCardRev] = useState([]);
  const navigate = useNavigate();

   const CusData = useSelector((state) => state.UserInfo);

  const token = CusData.token;


  useEffect(() => {
    const HandelReviews = async () => {
      try {
        const res = await axios.get(
          `https://backend-a2qq.onrender.com/api/ReviewsProduct/${card.product_id}`

        );
        setCardRev(res.data);
        console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
        console.log(res.data);

        console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
      } catch (error) {
        console.log(error);
      }
    };
    HandelReviews();
  }, [card.product_id, port]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <DetailsOfCards Id={card.product_id} />

      <div className="mt-10 border-b-2 border-[#F5C45E] pb-3 mb-8">
        <h2 className="text-2xl font-extrabold text-[#102E50] tracking-tight mb-1">
          Customer Reviews
        </h2>
        <p className="text-sm text-[#102E50] font-semibold">
          {cardRev.length} review{cardRev.length !== 1 ? "s" : ""}
        </p>
      </div>

      {cardRev.length === 0 ? (
        <p className="text-center text-[#102E50] italic bg-[#FFF6E9] py-4 px-4 rounded-lg shadow-inner mx-6 border border-dashed border-[#F5C45E]">
          No reviews yet for this product.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {cardRev.map((review, idx) => (
            <div
              key={idx}
              className="bg-[#FFF6E9] p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col gap-4 border border-[#F5C45E]
"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    review.customer_profile_image
                      ? review.customer_profile_image
                      : `https://ui-avatars.com/api/?name=${review.customer_name}+${review.customerlastname}&background=random&color=fff`
                  }
                  onClick={() => navigate(`/profile/${review.customer_id}`)}
                  alt={review.customer_name}
                  className="w-16 h-16 object-cover rounded-full border-2 border-[#102E50] cursor-pointer"
                />
                <div className="flex-1">
                  <p
                    className="font-semibold text-[#102E50] cursor-pointer hover:underline"
                    onClick={() => navigate(`/profile/${review.customer_id}`)}
                  >
{`${review.customer_name.charAt(0).toUpperCase() + review.customer_name.slice(1)} ${review.customerlastname.charAt(0).toUpperCase() + review.customerlastname.slice(1)}`}
                  </p>
                  <div className="flex items-center text-[#F5C45E] font-bold">
                    <FaStar className="mr-1" />
                    <span>{review.rating}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#102E50]">
                {new Date(review.created_at).toLocaleDateString()}
              </p>
              <p className="text-[#BE3D2A]">{review.review_text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
