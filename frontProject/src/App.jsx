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
import Profile from "./pages/Profile";
import Register from "./pages/register/register";
import WishList from "./pages/wishlist/wishlist";
import MainDashBoard from "./pages/mainDashBoard/mainDashBoard"

import OrdersManagementCustomer from "./pages/order/order";

import ProductForm from "./pages/ProviderDashBoard/providerDashboard";
import OrdersManagementProvider from "./pages/request/pageReq";
function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<h1>Alquraan </h1>} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/register" element={<Register />} />
          <Route path="/profile/:user_id" element={<Profile />} />

          <Route
            path="/providerDashboard"
            element={<ProductForm></ProductForm>}
          />
          {/* <Route path="/userDashboard" element={<h1>كفووو userDashboard</h1>} /> */}
          <Route
            path="/mainDashBoard"
            element={<MainDashBoard/>}
          />
          <Route
            path="/favorite"
            element={<WishList/>}
          />
          <Route path="/productdatails" element={<CardDeatils />} />
          <Route path="/userDashboard" element={<GitAllProduct />} />

          <Route
            path="/prodactInfo/:prodactId"
            element={<h1>sssssssssssss</h1>}
          ></Route>
          <Route
            path="/requestProvider"
            element={<OrdersManagementProvider></OrdersManagementProvider>}
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
