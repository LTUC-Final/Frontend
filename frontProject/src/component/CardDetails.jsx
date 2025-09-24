import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DetailsOfCards from "./DetailsOfCards";

export default function CardDeatils() {
    const port = import.meta.env.VITE_PORT;
    const location = useLocation();
    const card = location.state;
    console.log(location);
    const [cardRev, setCardRev] = useState([]);
    const navigate=useNavigate();

    console.log("cus", cardRev);


    useEffect(() => {
        const HandelReviews = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:${port}/api/ReviewsProduct/${card.product_id}`
                );
                setCardRev(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        HandelReviews();
    }, [card.product_id, port]);
    console.log(card);
    return (
        <div className="max-w-5xl mx-auto p-6">
            <DetailsOfCards Id={card.product_id} />

            <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h3>

                {cardRev.length === 0 ? (
                    <p className="text-gray-600">No reviews yet for this product.</p>
                ) : (
                    <div className="space-y-6">
                        {cardRev.map((review, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row gap-4"
                            >
                                <img
                                    src={review.customer_profile_image}
                                    onClick={() => navigate(`/profile/${review.customer_id}/${review.role}`)}
                                    alt={review.customer_name}
                                    className="w-16 h-16 object-cover rounded-full border"
                                />

                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-semibold text-gray-700"
                                        onClick={() => navigate(`/profile/${review.customer_id}/${review.role}`)}
                                        >
                                            {review.customer_name}
                                        </p>
                                        <p className="text-yellow-500 font-bold">{review.rating} ★</p>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-2">
                                        {new Date(review.created_at).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-600">{review.review_text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
