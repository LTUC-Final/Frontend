import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./component/NavigationBar/Footer/Footer";
import Layout from "./component/NavigationBar/Layout";
import NotFoundPage from "./component/notFoundPage";
import CustomerProfile from "./pages/customerProfile";
import LoginPage from "./pages/login";
import GitAllProduct from "./component/GitAllProduct";
import AddToCart from "./component/AddToCart";
import GitReviews from "./component/GitReviews";
import Logout from "./pages/logout";
import ProviderProfile from "./pages/providerProfile";

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<h1>Alquraan </h1>} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/register" element={<LoginPage />} />
          <Route path="/customerProfile" element={<CustomerProfile />} />
          <Route path="/providerProfile" element={<ProviderProfile />} />


          <Route
            path="/providerDashboard"
            element={<h1>شد حالك providerDashboard</h1>}
          />
          <Route path="/userDashboard" element={<h1>كفووو userDashboard</h1>} />
          <Route
            path="/mainDashBoard"
            element={<h1> ????????محدا اخذها هاي mainDashBoard</h1>}
          />
          <Route
            path="/favorite"
            element={<h1>اويلييييييييييييييي favorite</h1>}
          />
        <Route path="/productdatails" element={<GitReviews/>} />
        <Route path="/userDashboard" element={<GitAllProduct/>} />


          <Route path="/cart" element={<h1>Alquraan cart</h1>} />
          <Route path="/payments" element={<h1>ييييييييييييييييييييي </h1>} />
          <Route
            path="/prodactInfo/:prodactId"
            element={<h1>sssssssssssss</h1>}
          ></Route>
          <Route
            path="/requestProvider"
            element={<h1>sssssssssssss</h1>}
          ></Route>
          <Route path="/orderCustomer" element={<h1>sssssssssssss</h1>}></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </Layout>
      <Footer></Footer>
    </div>
  );
}

export default App;
