// src/App.jsx
// src/App.jsx
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Footer from "./component/NavigationBar/Footer/Footer";
import Layout from "./component/NavigationBar/Layout";
import NotFoundPage from "./component/notFoundPage";

import LoginPage from "./pages/login";
import Logout from "./pages/logout";
import ProviderProfile from "./pages/providerProfile";
import CartPage from "./pages/CartPage";
import ProtectedRoute from "./component/ProtectedRoute.jsx";

import PaymentsPage from "./pages/PaymentsPage";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";

// import CustomerProfile from "./pages/customerProfile"; // إذا جاهزة عندك

function App() {
  return (
    <div>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {/* <Route path="/customerProfile" element={<CustomerProfile />} /> */}
            <Route path="/providerProfile" element={<ProviderProfile />} />
          </Route>

          {/* Other Routes */}
          <Route path="/" element={<h1>Alquraan</h1>} />
          <Route
            path="/providerDashboard"
            element={<h1>شد حالك providerDashboard</h1>}
          />
          <Route
            path="/userDashboard"
            element={<h1>كفووو userDashboard</h1>}
          />
          <Route
            path="/mainDashBoard"
            element={<h1>محدا اخذها هاي mainDashBoard</h1>}
          />
          <Route
            path="/favorite"
            element={<h1>اويلييييييييييييييي favorite</h1>}
          />
          <Route
            path="/prodactInfo/:prodactId"
            element={<h1>sssssssssssss</h1>}
          />
          <Route
            path="/requestProvider"
            element={<h1>sssssssssssss</h1>}
          />
          <Route
            path="/orderCustomer"
            element={<h1>sssssssssssss</h1>}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
      <Footer />
    </div>
  );
}

export default App;