import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<h1>Alquraan </h1>} />
      </Routes>
    </>
  );
}

export default App;
