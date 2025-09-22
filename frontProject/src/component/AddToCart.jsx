import axios from "axios"
import { useEffect } from "react"

export default async function AddToCart(card , customer_id=7) {
    const port = import.meta.env.VITE_PORT;
    console.log(card);
    try {
        axios.post(`http://localhost:${port}/api/AddCart`, {
            customer_id,
            provider_id: card.provider_id,
            product_id: card.product_id,
            quantity: card.quantity,
            details_order_user:card.details_order_user,
            created_at: card.created_at,
            price: card.price
        })
        alert("this product added")
    } catch (error) {
        console.log(error);

    }



}