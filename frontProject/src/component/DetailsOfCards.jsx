import axios from "axios";
import { useEffect, useState } from "react"
import AddTOFav from "./AddToFav";
import AddToCart from "./AddToCart";
import { data } from "react-router-dom";
import { useSelector } from "react-redux";

export default function DetailsOfCards({ Id }) {
    const port = import.meta.env.VITE_PORT;
    console.log(Id);
    const [dataCard, setDataCard] = useState("");
    const CusData = useSelector((state) => state.UserInfo)


    useEffect(() => {
        const gitdetails = async () => {
            const data = await axios.get(`http://localhost:${port}/api/DetailsOfCardInfo/${Id}`)

            console.log("this is data", data.data);

            setDataCard(data.data);
        }
        gitdetails();
    }, [])

    return (<div>
        <img src={dataCard.image}></img>
        <h3>{dataCard.name}</h3>
        <p>{dataCard.description}</p>
        <p>{dataCard.location}</p>
        <p>{dataCard.type_of_product}</p>
        <p>{dataCard.price}</p>
        <div>
            {CusData.user.role === "customer" ? (
                <div>
                    <button onClick={() => {
                        AddTOFav(card, CusData)
                    }}>addFav</button>
                    <button onClick={() => {
                        AddToCart(card, CusData)
                    }}>addcart</button></div>
            ) : (<div></div>)}

            <img src={dataCard.image}></img>
            <h3>{dataCard.firstname}{dataCard.lastname}</h3>
        </div>

    </div>)
}