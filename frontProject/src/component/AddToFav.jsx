import axios from "axios";

export default async function AddTOFav(card, CusData) {
    const port = import.meta.env.VITE_PORT;
    console.log(card);

    try {
        axios.post(`http://localhost:${port}/api/addfav`, {
            customer_id:  Number(CusData.user.user_id),
            product_id: card.product_id,
        })
    } catch (error) {
        console.log(error);

    }
}