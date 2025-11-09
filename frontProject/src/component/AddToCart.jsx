// import axios from "axios";
// // import { useDispatch } from "react-redux";
// // import {
// //   decrementCartItem,
// //   incrementCartItem,
// // } from "../redux/userInfo/userInfo";

// export default async function AddToCart(card, CusData) {
//   const port = import.meta.env.VITE_PORT;
//   console.log(card);
//   console.log("this is cusid ", CusData.user.user_id);
//   // const dispatch = useDispatch();
//   try {
//     const res = await axios.post(`http://localhost:${port}/api/AddCart`, {
//       customer_id: Number(CusData.user.user_id),
//       provider_id: card.provider_id,
//       product_id: card.product_id,
//       quantity: 1,
//       details_order_user: card.details_order_user,
//       price: card.price,
//     });

//     // console.log("iiaiai", res);
//     // if (res.data === "Product added to cart") {
//     //   dispatch(incrementCartItem());
//     // } else {
//     //   dispatch(decrementCartItem());
//     // }
//     alert(res.data);
//   } catch (error) {
//     console.log(error);
//   }
// }










// // useAddToCart.js
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import Swal from "sweetalert2";
// import {
//   decrementCartItem,
//   incrementCartItem,
// } from "../redux/userInfo/userInfo";

// export function useAddToCart() {
//   const dispatch = useDispatch();
//   const port = import.meta.env.VITE_PORT;

//   const AddToCart = async (card, CusData) => {
//     try {
//       const res = await axios.post(`http://localhost:${port}/api/AddCart`, {
//         customer_id: Number(CusData.user.user_id),
//         provider_id: card.provider_id,
//         product_id: card.product_id,
//         quantity: 1,
//         details_order_user: card.details_order_user,
//         price: card.price,
//       });

//       if (res.data === "Product added to cart") {
//         dispatch(incrementCartItem());
//         Swal.fire({
//           title: res.data,
//           icon: "success",
//           draggable: true,
//         });
//       } else if (
//         res.data === "You cannot delete it because it was sent to the provider"
//       ) {
//         Swal.fire({
//           title: res.data,
//           icon: "error",
//           draggable: true,
//         });
//       } else {
//         dispatch(decrementCartItem({ number: 1 }));
//         Swal.fire({
//           title: res.data,
//           icon: "error",
//           draggable: true,
//         });
//       }

//       // alert(res.data);
//     } catch (error) {
//       console.error(error);
//       alert("Error adding product to cart");
//     }
//   };

//   return { AddToCart };
// }











import axios from "axios";
import { useDispatch } from "react-redux";
import {
  decrementCartItem,
  incrementCartItem,
} from "../redux/userInfo/userInfo";

export function useAddToCart() {
  const dispatch = useDispatch();
  const port = import.meta.env.VITE_PORT;

  const AddToCart = async (card, CusData) => {
    try {
      const res = await axios.post(`http://localhost:${port}/api/AddCart`, {
        customer_id: Number(CusData.user.user_id),
        provider_id: card.provider_id,
        product_id: card.product_id,
        quantity: 1,
        details_order_user: card.details_order_user,
        price: card.price,
      });

      if (res.data === "Product added to cart") {
        dispatch(incrementCartItem());
      } else if (
        res.data === "You cannot delete it because it was sent to the provider"
      ) {
      } else {
        dispatch(decrementCartItem({ number: 1 }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { AddToCart };
}
