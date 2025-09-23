import axios from "axios"
import { useEffect, useState } from "react"
import AddToCart from "./AddToCart"
import AddTOFav from "./AddToFav"
import GitReviews from "./GitReviews";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function GitAllProduct() {
    const navigate = useNavigate();
    const port = import.meta.env.VITE_PORT;
    const [cards, setCards] = useState([])
    const CusData = useSelector((state) => state.UserInfo)
    console.log("this is info ", CusData.user.user_id);
    const [textSearch, setTextSearch] = useState("");
    const [selectore, setSelectore] = useState("");

    console.log(selectore);
    console.log(selectore);
    


    console.log(CusData);

    console.log(cards);
    console.log(textSearch);


    const resultOfFilter = cards.filter((card) => {
        const FilterByName = card.name.toLowerCase().includes(textSearch.toLowerCase())
        const FilterBySelete = !selectore || card.category_name.toLowerCase() === selectore.toLowerCase();

        return FilterByName && FilterBySelete
    })
    console.log("filterd", resultOfFilter);



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
    // const finalResultCard = !textSearch ? cards : resultOfFilter;


    return (<div>


        <div>
            <input type="text" placeholder="Enter Name" value={textSearch} onChange={(e) => {
                setTextSearch(e.target.value)
            }} />
        </div>
        <div>
            <label>Choose a category</label>
            <select value={selectore} onChange={(e) => setSelectore(e.target.value)}>
                <option value="">All</option> 
                {[...new Set(cards.map(card => card.category_name))].map((category, idx) => (
                    <option key={idx} value={category}>
                        {category}
                    </option>
                ))}
            </select>


        </div>



        {
            resultOfFilter.map((card, idx) => (
                <div key={idx}>
                    <p>{card.firstname}</p>
                    <p>{card.lastname}</p>
                    <img src={card.image} onClick={() => {
                        navigate("/productdatails", { state: card })
                    }}></img>
                    <h3>{card.name}</h3>
                    <p>{card.price}</p>
                    <p>{card.location}</p>
                    {CusData.user.role === "customer" ? (
                        <div>
                            <button onClick={() => {
                                AddTOFav(card, CusData)
                            }}>addFav</button>
                            <button onClick={() => {
                                AddToCart(card, CusData)
                            }}>addcart</button></div>
                    ) : (<div></div>)}


                </div>
            ))
        }

    </div >
    )
}