import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./component/NavigationBar/Layout";
import NotFoundPage from "./component/notFoundPage";
import LoginPage from "./pages/login";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<h1>Alquraan </h1>} />

          <Route path="/register" element={<LoginPage />} />
          <Route path="/providerProfile" element={<h1>yaaaaa mar7aba </h1>} />
          <Route path="/providerProfile" element={<h1>يا اهلا </h1>} />

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
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
