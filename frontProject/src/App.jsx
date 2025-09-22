import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login";
import GitAllProduct from "./component/GitAllProduct";
import AddToCart from "./component/AddToCart";
import GitReviews from "./component/GitReviews";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<h1>Alquraan </h1>} />

        <Route path="/register" element={<LoginPage />} />
        <Route path="/providerProfile" element={<h1>yaaaaa mar7aba </h1>} />
        <Route path="/providerProfile" element={<h1>يا اهلا </h1>} />

        <Route path="/providerDashboard" element={<h1>شد حالك </h1>} />
        <Route path="/userDashboard" element={<GitAllProduct/>} />
        <Route path="/mainDashBoard" element={<h1>محدا اخذها هاي </h1>} />
        <Route path="/favorite" element={<AddToCart></AddToCart>} />
        <Route path="/cart" element={<h1>Alquraan </h1>} />
        <Route path="/productdatails" element={<GitReviews/>} />

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
