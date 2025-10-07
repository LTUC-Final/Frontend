import axios from "axios";

export default async function AddToCart(card, CusData) {
  const port = import.meta.env.VITE_PORT;
  console.log(card);
  console.log("this is cusid ", CusData.user.user_id);

  try {
   await axios.post(`http://localhost:${port}/api/AddCart`, {
      customer_id: Number(CusData.user.user_id),
      provider_id: card.provider_id,
      product_id: card.product_id,
      quantity: 1,
      details_order_user: card.details_order_user,
      price: card.price,
    });
  } catch (error) {
    console.log(error);
  }
}
