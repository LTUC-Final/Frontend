import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login";
import CustomerProfile from "./pages/customerProfile";
import ProviderProfile from "./pages/providerProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<h1>Alquraan </h1>} />

        <Route path="/register" element={<LoginPage />} />
        <Route path="/customerProfile" element={<CustomerProfile/>} />
        <Route path="/providerProfile" element={<ProviderProfile/>} />

        <Route path="/providerDashboard" element={<h1>شد حالك </h1>} />
        <Route path="/userDashboard" element={<h1>كفووو </h1>} />
        <Route path="/mainDashBoard" element={<h1>محدا اخذها هاي </h1>} />
        <Route path="/favorite" element={<h1>اويلييييييييييييييي </h1>} />
        <Route path="/cart" element={<h1>Alquraan </h1>} />
        <Route path="/payments" element={<h1>ييييييييييييييييييييي </h1>} />
        <Route
          path="/prodactInfo/:prodactId"
          element={<h1>sssssssssssss</h1>}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
