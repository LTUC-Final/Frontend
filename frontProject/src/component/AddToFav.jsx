import axios from "axios";

export default async function AddTOFav(card, customer_id = 7) {
    const port = import.meta.env.VITE_PORT;
    console.log(card);

    try {
        axios.post(`http://localhost:${port}/api/addfav`, {
            customer_id,
            product_id: card.product_id,
            created_at: card.created_at
        })
    } catch (error) {
        console.log(error);

    }
}