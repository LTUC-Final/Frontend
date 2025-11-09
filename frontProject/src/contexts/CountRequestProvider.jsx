// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { CountRequest } from "./CountRequestContext";

// export function CountRequestProvider({ children }) {
//   const [value, setValue] = useState(null);

//   const { user } = useSelector((state) => state.UserInfo);
//   const provider_id = user?.provider?.provider_id;
//   const role = user?.role;
//   console.log("ssssssfffffffffffffffffffffffffffffffffffffffffffffffffff");
//   console.log(role);
//   console.log("ssssssfffffffffffffffffffffffffffffffffffffffffffffffffff");

//   const port = import.meta.env.VITE_PORT;
//   const persistedData = JSON.parse(localStorage.getItem("persist:UserInfo"));
//   const CusData = useSelector((state) => state.UserInfo);

//   const token = CusData.token;
//   useEffect(() => {
//     if (role === "provider" && provider_id) {
//       const sendRequest = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:${port}/getAllOrderProvider/${provider_id}`,
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token.replace(/^"|"$/g, "")}`,
//               },
//             }
//           );
//           setValue(response.data.ordersCount);
//           localStorage.setItem("count", response.data.ordersCount);
//         } catch (error) {
//           console.error("Error:", error);
//         }
//       };

//       sendRequest();

//       const intervalId = setInterval(sendRequest, 1000*60);

//       return () => clearInterval(intervalId);
//     }
//   }, []);

//   return (
//     <CountRequest.Provider value={{ value }}>{children}</CountRequest.Provider>
//   );
// }
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReqItem } from "../redux/userInfo/userInfo";
import { CountRequest } from "./CountRequestContext";

export function CountRequestProvider({ children }) {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.UserInfo);
  const provider_id = user?.provider?.provider_id;
  const role = user?.role;
  console.log("ssssssfffffffffffffffffffffffffffffffffffffffffffffffffff");
  console.log(role);
  console.log("ssssssfffffffffffffffffffffffffffffffffffffffffffffffffff");

  const port = import.meta.env.VITE_PORT;
  const persistedData = JSON.parse(localStorage.getItem("persist:UserInfo"));
  const CusData = useSelector((state) => state.UserInfo);

  const token = CusData.token;

  useEffect(() => {
    if (role === "provider" && provider_id && token) {
      const sendRequest = async () => {
        try {
          const response = await axios.get(
            `https://backend-a2qq.onrender.com/getAllOrderProvider/${provider_id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.replace(/^"|"$/g, "")}`,
              },
            }
          );
          setValue(response.data.ordersCount);
          dispatch(
            setReqItem({
              reqItem: Number(response.data.ordersCount),
            })
          );
          localStorage.setItem("count", response.data.ordersCount);
          // console.log(
          //   "ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
          // );
          // console.log(
          //   "ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
          // );
          // console.log(
          //   "ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
          // );
          // console.log(response.data.ordersCount);

          // console.log(
          //   "ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
          // );
          // console.log(
          //   "ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
          // );
          // console.log(
          //   "ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
          // );
        } catch (error) {
          console.error("Error:", error);
        }
      };

      sendRequest();

      const intervalId = setInterval(sendRequest, 1000);

      return () => clearInterval(intervalId);
    }
  }, [provider_id, role, token, dispatch]);

  return (
    <CountRequest.Provider value={{ value }}>{children}</CountRequest.Provider>
  );
}