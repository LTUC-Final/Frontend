import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import DetailsOfCards from "./DetailsOfCards";

export default function GitReviews() {
    const port = import.meta.env.VITE_PORT;
    const location = useLocation();
    const card = location.state;

    const [cardRev, setCardRev] = useState([])
    console.log(card);


    useEffect(() => {
        const HandelReviews = async () => {
            try {
                const res = await axios.get(`http://localhost:${port}/api/ReviewsProduct/${card.product_id}`)
                console.log("this is res", res);

                setCardRev(res.data)

            } catch (error) {
                console.log(error);

            }
        }
        HandelReviews();
    }, [])
    console.log(cardRev);


    return (<>
        <DetailsOfCards Id={card.product_id}/>
        {cardRev && cardRev.map((card, idx) => (
            <div key={idx}>
                <p>{card.rating}</p>
                <p>{card.created_at}</p>
                <p>{card.customer_name}</p>
                <img src={card.customer_profile_image}></img>
                <p>{card.review_text}</p>
            </div>
        ))}

    </>)
}