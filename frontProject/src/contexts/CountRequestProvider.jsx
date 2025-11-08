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

  const apiUrl = import.meta.env.VITE_API_URL || 'https://backend-a2qq.onrender.com';
  const CusData = useSelector((state) => state.UserInfo);
  const token = CusData.token;

  useEffect(() => {
    if (role === "provider" && provider_id && token) {
      const sendRequest = async () => {
        try {
          const response = await axios.get(
            `${apiUrl}/getAllOrderProvider/${provider_id}`,
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
        } catch (error) {
          console.error("Error fetching order count:", error);
        }
      };

      sendRequest();
      const intervalId = setInterval(sendRequest, 1000 * 60); // Poll every minute
      return () => clearInterval(intervalId);
    }
  }, [provider_id, role, token, dispatch, apiUrl]);

  return (
    <CountRequest.Provider value={{ value }}>{children}</CountRequest.Provider>
  );
}
