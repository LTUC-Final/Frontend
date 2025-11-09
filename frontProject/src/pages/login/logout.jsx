import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearCartItem,
  clearUser,
  setCartItem,
} from "../../redux/userInfo/userInfo";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("persist:UserInfo");
    // dispatch(setUserInfo({ user: null, token: null }));
    dispatch(setCartItem({ cartItem: 0 }));
    dispatch(clearUser());
    dispatch(clearCartItem());
    navigate("/login", { replace: true });
  }, [navigate]);

  return null;
}