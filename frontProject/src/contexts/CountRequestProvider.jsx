import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CountRequest } from "./CountRequestContext";

export function CountRequestProvider({ children }) {
  const [value, setValue] = useState();

  const { user } = useSelector((state) => state.UserInfo);
  const provider_id = user?.provider?.provider_id;
  const user_role = user?.provider?.role;

  const port = import.meta.env.VITE_PORT;

  useEffect(() => {
    if (user_role === "provider") {
      const sendRequest = async () => {
        try {
          const response = await axios.get(
            `http://localhost:${port}/getAllOrderProvider/${provider_id}`
          );
          setValue(response.data.ordersCount);
          localStorage.setItem("count", response.data.ordersCount);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      sendRequest();

      const intervalId = setInterval(sendRequest, 1000);

      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <CountRequest.Provider value={{ value }}>{children}</CountRequest.Provider>
  );
}
