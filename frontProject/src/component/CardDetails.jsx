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

  useEffect(() => {
    const HandelReviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:${port}/api/ReviewsProduct/${card.product_id}`
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

//   return (
//     <div className="min-h-screen bg-[#FFF6E9]">
//     <div className="max-w-5xl mx-auto p-6">
//       <DetailsOfCards Id={card.product_id} />

//       <div className="mt-10 border-b-2 border-[#F5C45E] pb-3 mb-8">
//         {/* <h2 className="text-2xl font-extrabold text-[#102E50] tracking-tight mb-1">
//           Customer Reviews
//         </h2> */}
//         <h2 className="text-2xl font-extrabold bg-gradient-to-r from-[#102E50] via-[#E78B48] to-[#F5C45E] bg-clip-text text-transparent tracking-tight mb-1 text-center">
//   Customer Reviews
// </h2>

//         <p className="text-sm text-[#102E50] font-semibold">
//           {cardRev.length} review{cardRev.length !== 1 ? "s" : ""}
//         </p>
//       </div>

//       {cardRev.length === 0 ? (
//         <p className="text-center text-[#102E50] italic bg-[#FFF6E9] py-4 px-4 rounded-lg shadow-inner mx-6 border border-dashed border-[#F5C45E]">
//           No reviews yet for this product.
//         </p>
//       ) : (
//         // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
//         <div className="flex flex-wrap justify-center gap-6 px-6">

//           {cardRev.map((review, idx) => (
//             <div
//               key={idx}
// //               className="bg-[#FFF6E9] p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col gap-4 border border-[#F5C45E]
// // "
    
// className="bg-gradient-to-br from-[#F5C45E]/20 via-[#E78B48]/20 to-[#BE3D2A]/20 
//   p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 
//   flex flex-col gap-4 border border-[#F5C45E] text-center 
//   w-64 sm:w-72 md:w-80 h-44"
//   > 
//               <div className="flex items-center gap-4">
//                 <img
//                   src={
//                     review.customer_profile_image
//                       ? review.customer_profile_image
//                       : `https://ui-avatars.com/api/?name=${review.customer_name}+${review.customerlastname}&background=random&color=fff`
//                   }
//                   onClick={() => navigate(`/profile/${review.customer_id}`)}
//                   alt={review.customer_name}
//                   className="w-16 h-16 object-cover rounded-full border-2 border-[#102E50] cursor-pointer"
//                 />
//                 <div className="flex-1">
//                   <p
//                     className="font-semibold text-[#102E50] cursor-pointer hover:underline"
//                     onClick={() => navigate(`/profile/${review.customer_id}`)}
//                   >
// {`${review.customer_name.charAt(0).toUpperCase() + review.customer_name.slice(1)} ${review.customerlastname.charAt(0).toUpperCase() + review.customerlastname.slice(1)}`}
//                   </p>
//                   <div className="flex items-center text-[#F5C45E] font-bold">
//                     <FaStar className="mr-1" />
//                     <span>{review.rating}</span>
//                   </div>
//                 </div>
//               </div>

//               <p className="text-sm text-[#102E50]">
//                 {new Date(review.created_at).toLocaleDateString()}
//               </p>
//               <p className="text-[#BE3D2A]">{review.review_text}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div> </div>
//   );


return (
  <div className="min-h-screen bg-[#FFF6E9]">
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
      <DetailsOfCards Id={card.product_id} />

      <div className="mt-8 sm:mt-10 lg:mt-12 mb-8 sm:mb-10">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#102E50] via-[#E78B48] to-[#F5C45E] bg-clip-text text-transparent tracking-tight mb-2">
            Customer Reviews
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#F5C45E]"></div>
            <p className="text-xs sm:text-sm text-[#102E50] font-semibold">
              {cardRev.length} review{cardRev.length !== 1 ? "s" : ""}
            </p>
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#F5C45E]"></div>
          </div>
        </div>

        {cardRev.length === 0 ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white/60 backdrop-blur-sm py-12 px-8 rounded-2xl shadow-sm border-2 border-dashed border-[#F5C45E]/40">
              <p className="text-center text-[#102E50]/70 italic">
                No reviews yet for this product.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 px-2 sm:px-0">
            {cardRev.map((review, idx) => (
              <div
                key={idx}
                className="group bg-white/80 backdrop-blur-sm p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#F5C45E]/30 hover:border-[#E78B48] hover:-translate-y-1"
              >
                {/* Header with profile */}
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <img
                    src={
                      review.customer_profile_image
                        ? review.customer_profile_image
                        : `https://ui-avatars.com/api/?name=${review.customer_name}+${review.customerlastname}&background=random&color=fff`
                    }
                    onClick={() => navigate(`/profile/${review.customer_id}`)}
                    alt={review.customer_name}
                    className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-full border-2 border-[#F5C45E] cursor-pointer hover:border-[#E78B48] transition-colors shadow-sm flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-semibold text-sm sm:text-base text-[#102E50] cursor-pointer hover:text-[#E78B48] transition-colors truncate"
                      onClick={() => navigate(`/profile/${review.customer_id}`)}
                    >
                      {`${review.customer_name.charAt(0).toUpperCase() + review.customer_name.slice(1)} ${review.customerlastname.charAt(0).toUpperCase() + review.customerlastname.slice(1)}`}
                    </p>
                    <div className="flex items-center gap-0.5 sm:gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-xs sm:text-sm ${
                            i < review.rating
                              ? "text-[#F5C45E]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-xs sm:text-sm font-semibold text-[#102E50]">
                        {review.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Review text */}
                <p className="text-[#102E50] text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3 sm:line-clamp-4">
                  "{review.review_text}"
                </p>

                {/* Date footer */}
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-[#F5C45E]/20">
                  <p className="text-xs text-[#102E50]/60 font-medium">
                    {new Date(review.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);
}