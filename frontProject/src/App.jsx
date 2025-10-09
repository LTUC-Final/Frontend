import { Route, Routes } from "react-router-dom";
import "./App.css";
import GitAllProduct from "./component/GitAllProduct";
import Footer from "./component/NavigationBar/Footer/Footer";
import Layout from "./component/NavigationBar/Layout";
import NotFoundPage from "./component/notFoundPage";

import LoginPage from "./pages/login/login";
// import GitReviews from "./component/GitReviews";
import CardDeatils from "./component/CardDetails";
import Logout from "./pages/login/logout";
import MainDashBoard from "./pages/mainDashBoard/mainDashBoard";
import Profile from "./pages/Profile";
import Register from "./pages/register/register";
import WishList from "./pages/wishlist/wishlist";

import OrdersManagementCustomer from "./pages/order/order";

import ProductForm from "./pages/ProviderDashBoard/providerDashboard";
import OrdersManagementProvider from "./pages/request/pageReq";
import LiveChat from "./component/LiveChat/LiveChat";
import CartPage from "./pages/cart/page";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
function App() {
  const [cart, setCart] = useState([]);
  const CusData = useSelector((state) => state.UserInfo);
  const port = import.meta.env.VITE_PORT;

  const fetchCart = async () => {
    if (!CusData?.user?.user_id) return;
    try {
      const res = await axios.get(
        `http://localhost:${port}/api/carts/products/${CusData.user.user_id}`
      );
      setCart(res.data.cards || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
    const interval = setInterval(fetchCart, 1000)

    return () => clearInterval(interval)
  }, [CusData]);
  return (
    <div>
      <Layout cartCount={cart.length} >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<h1>Alquraan </h1>} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/register" element={<Register />} />
          <Route path="/profile/:user_id" element={<Profile />} />
          <Route path="/LiveChat" element={<LiveChat />} />
          

          <Route
            path="/providerDashboard"
            element={<ProductForm></ProductForm>}
          />
          {/* <Route path="/userDashboard" element={<h1>كفووو userDashboard</h1>} /> */}
          <Route path="/mainDashBoard" element={<MainDashBoard />} />
          <Route path="/favorite" element={<WishList />} />
          <Route path="/productdatails" element={<CardDeatils />} />
          <Route path="/userDashboard" element={<GitAllProduct />} />

          <Route path="/cart" element={<CartPage cart={cart} fetchCart={fetchCart}></CartPage>} />
          <Route path="/payments" element={<h1>ييييييييييييييييييييي </h1>} />
          <Route
            path="/prodactInfo/:prodactId"
            element={<h1>sssssssssssss</h1>}
          ></Route>
          <Route
            path="/requestProvider"
            element={<OrdersManagementProvider/>}
          ></Route>
          <Route
            path="/orderCustomer"
            element={<OrdersManagementCustomer></OrdersManagementCustomer>}
          ></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </Layout>
      <Footer></Footer>
    </div>
  );
}

export default App;
