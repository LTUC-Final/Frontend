import axios from "axios";

export default async function AddTOFav(card, CusData) {
    const port = import.meta.env.VITE_PORT;
    console.log(card);
    
 const CusData = useSelector((state) => state.UserInfo);

  const token = CusData.token;


    try {
        const res = await axios.post(`https://backend-a2qq.onrender.com/api/addfav`, {
            customer_id: Number(CusData.user.user_id),
            product_id: card.product_id,
        }, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.replace(/^"|"$/g, "")}`,
              },
            }
);
        console.log("Backend response:", res);   

        alert(res.data);

    } catch (error) {
        console.log(error);

    }
}