import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState("+962");
  const [role, setRole] = useState("customer");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    if (password !== confirm) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg("Phone is required.");
      return;
    }
    try {
      setLoading(true);
      const port = import.meta.env.VITE_PORT;
      const fullPhone = phone.replace(/\s+/g, "");
      const res = await axios.post(`http://localhost:${port}/api/register`, {
        firstname,
        lastname,
        email,
        password,
        role,
        phone: fullPhone 
      });
      setSuccessMsg(res.data?.message || "Registered successfully.");
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "An error occurred. Please try again.";
      setErrorMsg(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Account</h2>
        <form className="flex flex-col gap-5" onSubmit={handleRegister}>
          <div className="text-left">
            <label htmlFor="firstname" className="block mb-2 font-medium text-gray-600">First Name</label>
            <input id="firstname" type="text" required className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="First name" />
          </div>
          <div className="text-left">
            <label htmlFor="lastname" className="block mb-2 font-medium text-gray-600">Last Name</label>
            <input id="lastname" type="text" required className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Last name" />
          </div>
          <div className="text-left">
            <label htmlFor="email" className="block mb-2 font-medium text-gray-600">Email</label>
            <input id="email" type="email" required className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@example.com" />
          </div>
          <div className="text-left">
            <label htmlFor="phone" className="block mb-2 font-medium text-gray-600">Phone</label>
            <input id="phone" type="tel" required className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+9627XXXXXXXX" />
          </div>
          <div className="text-left">
            <label htmlFor="password" className="block mb-2 font-medium text-gray-600">Password</label>
            <input id="password" type="password" required className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" />
          </div>
          <div className="text-left">
            <label htmlFor="confirm" className="block mb-2 font-medium text-gray-600">Confirm Password</label>
            <input id="confirm" type="password" required className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="********" />
          </div>
          <div className="text-left">
            <p className="mb-2 font-medium text-gray-600">Are you signing up as a Service Provider or a Customer?</p>
            <div className="flex items-center gap-6">
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="role" value="provider" checked={role === "provider"} onChange={() => setRole("provider")} />
                <span>Provide a service (Provider)</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="role" value="customer" checked={role === "customer"} onChange={() => setRole("customer")} />
                <span>Find and book services (Customer)</span>
              </label>
            </div>
          </div>
          {errorMsg && <p className="text-red-500 text-sm -mt-2 text-left">{errorMsg}</p>}
          {successMsg && <p className="text-green-600 text-sm -mt-2 text-left">{successMsg}</p>}
          <button type="submit" disabled={loading} className="w-full p-3 bg-indigo-600 text-white text-lg font-semibold rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? "Please wait..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-indigo-600 underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
