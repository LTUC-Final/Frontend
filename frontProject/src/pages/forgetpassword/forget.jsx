import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function normalizePhoneJordan(input) {
  if (typeof input !== "string") return null;
  let s = input.trim().replace(/\s+/g, "");
  s = s.replace(/^00/, "+");
  if (/^07\d{8}$/.test(s)) s = "+962" + s.slice(1);
  else if (/^9627\d{8}$/.test(s)) s = "+" + s;
  if (/^\+9627[7-9]\d{7}$/.test(s)) return s;
  return null;
}

export default function Forget() {
  const [phone, setPhone] = useState("+9627");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const normalized = normalizePhoneJordan(phone);
    if (!normalized) {
      setErr("Use a Jordanian mobile like +9627XXXXXXXX.");
      return;
    }
    setErr("");
    try {
      setLoading(true);
      const port = import.meta.env.VITE_PORT;
      const res = await axios.post(`http://localhost:${port}/api/forgetpassword/forgot`, {
        country_code: "JO",
        phone: normalized
      });
      Swal.fire({ title: res?.data?.message || "OTP sent", icon: "success", draggable: true }).then(() => {
        sessionStorage.setItem("fp_phone", normalized);
        navigate("/verify_otp");
      });
    } catch (e) {
      const msg = e?.response?.data?.error || e?.response?.data?.message || "Request failed.";
      Swal.fire({ title: "Failed", text: msg, icon: "error", draggable: true });
    } finally {
      setLoading(false);
    }
  }

  function inputClass(bad) {
    return `
      w-full pl-10 pr-3 p-3 rounded-lg
      border ${bad ? "border-[#BE3D2A]" : "border-gray-300"}
      text-[#102E50]
      focus:outline-none focus:border-[#F5C45E] focus:ring-2 focus:ring-[#F5C45E]/50
      transition
    `;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-[#FFF6E9] bg-[radial-gradient(1200px_600px_at_80%_-10%,#F5C45E20,transparent_60%),radial-gradient(900px_500px_at_10%_110%,#E78B4826,transparent_60%)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#F5C45E33] blur-3xl" />
        <div className="absolute -bottom-28 -left-24 w-96 h-96 rounded-full bg-[#E78B4833] blur-3xl" />
      </div>
      <div className="relative w-full max-w-md">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-[#102E50]/10 overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
          <div className="px-8 pt-8 pb-6 text-center">
            <h2 className="text-3xl font-extrabold text-[#102E50]">Forgot Password</h2>
            <p className="text-sm mt-1 text-[#102E50]/70">Enter your phone number to receive an OTP</p>
          </div>
          <form className="px-8 pb-8 pt-2 flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="text-left">
              <label htmlFor="phone" className="block mb-2 font-medium text-[#102E50]">Phone</label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#102E50]/60" fill="currentColor"><path d="M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2a1 1 0 011.1-.2c1.2.5 2.5.8 3.9.8a1 1 0 011 1V20a1 1 0 01-1 1C10.3 21 3 13.7 3 4a1 1 0 011-1h2.1a1 1 0 011 1c0 1.4.3 2.7.8 3.9.2.4.1.9-.2 1.1l-2.1 1.8z" /></svg>
                </span>
                <input
                  id="phone"
                  type="tel"
                  required
                  className={inputClass(!!err)}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+9627XXXXXXXX"
                />
              </div>
              {err && <p className="text-[#BE3D2A] text-xs mt-1">{err}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-lg font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-sm hover:shadow disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Please wait..." : "Send OTP"}
            </button>
            <p className="text-sm text-[#102E50] text-center">
              Remembered your password?{" "}
              <Link to="/login" className="text-[#E78B48] font-semibold underline hover:text-[#BE3D2A]">Login</Link>
            </p>
          </form>
          <div className="h-1 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
        </div>
      </div>
    </div>
  );
}
