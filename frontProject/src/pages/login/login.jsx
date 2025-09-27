// src/pages/LoginPage.jsx
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserInfo } from "../../redux/userInfo/userInfo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    const port = import.meta.env.VITE_PORT;
    console.log(port);
    try {
      const response = await axios.post(`http://localhost:${port}/api/login`, {
        email,
        password,
      });
      console.log(response.data.user);
      // localStorage.setItem("typeOfUser", response.data.data.role);
      // localStorage.setItem("token", response.data.token);
      // dispatch(setUserInfo({ ...response.data.user }));
      dispatch(
        setUserInfo({
          user: response.data.user,
          token: response.data.token,
        })
      );
      navigate("/mainDashBoard");
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          <div className="text-left">
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@example.com"
              required
              className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="text-left">
            <label
              htmlFor="password"
              className="block mb-2 font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              required
              className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMsg && (
            <p className="text-red-500 text-sm -mt-2 text-left">{errorMsg}</p>
          )}
          <button
            type="submit"
            className="w-full p-3 bg-indigo-600 text-white text-lg font-semibold rounded-md hover:bg-indigo-700 transition-colors"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}