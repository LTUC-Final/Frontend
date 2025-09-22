import axios from "axios"
import { useEffect, useState } from "react"
import AddToCart from "./AddToCart"
import AddTOFav from "./AddToFav"
import GitReviews from "./GitReviews";
import { useNavigate } from "react-router-dom";

export default function GitAllProduct() {
    const navigate=useNavigate();
    const port = import.meta.env.VITE_PORT;
    const [cards, setCards] = useState([])

    useEffect(() => {
        const feactData = async () => {
            try {
                let res = await axios.get(`http://localhost:${port}/api/ShowCardInUserDashboard`)
                setCards(res.data)
            } catch (error) {
                console.log(error);

            }
        }

        feactData();
    }, [])
// console.log(cards);


    return (<div>

    {cards.map((card , idx)=>(
        <div key={idx}>
            <p>{card.firstname}</p>
            <p>{card.lastname}</p>
            <img src={card.image} onClick={()=>{
                navigate("/productdatails", {state:card})
            }}></img>
            <h3>{card.name}</h3>
            <p>{card.price}</p>
            <p>{card.location}</p>
            <button onClick={()=>{
                AddTOFav(card)
            }}>addFav</button>
            <button onClick={()=>{
                AddToCart(card)
            }}>addcart</button>
            {/* <button onClick={()=>{
                navigate("/productdatails", {state:card})
            }}></button> */}

        </div>
    ))}

    </div>
    )
}