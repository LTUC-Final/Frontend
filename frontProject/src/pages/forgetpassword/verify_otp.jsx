import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const p = sessionStorage.getItem("fp_phone") || "";
    setPhone(p);
    if (!p) setErr("Missing phone. Go back to Forgot Password.");
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      setErr("Enter the OTP you received.");
      return;
    }
    setErr("");
    try {
      setLoading(true);
      const port = import.meta.env.VITE_PORT;
      const res = await axios.post(`http://localhost:${port}/api/forgetpassword/verify_otp`, {
        country_code: "JO",
        phone,
        otp
      });
      const token = res?.data?.reset_token || "";
      sessionStorage.setItem("reset_token", token);
      Swal.fire({ title: "OTP verified", icon: "success", draggable: true }).then(() => navigate("/reset_password"));
    } catch (e) {
      const msg = e?.response?.data?.error || e?.response?.data?.message || "Verification failed.";
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
            <h2 className="text-3xl font-extrabold text-[#102E50]">Verify OTP</h2>
            <p className="text-sm mt-1 text-[#102E50]/70">Phone: {phone || "N/A"}</p>
          </div>
          <form className="px-8 pb-8 pt-2 flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="text-left">
              <label htmlFor="otp" className="block mb-2 font-medium text-[#102E50]">OTP Code</label>
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                required
                className={inputClass(!!err)}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\s+/g, ""))}
                placeholder="Enter the code"
              />
              {err && <p className="text-[#BE3D2A] text-xs mt-1">{err}</p>}
            </div>
            <button
              type="submit"
              disabled={loading || !phone}
              className="w-full py-3 rounded-lg text-lg font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-sm hover:shadow disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Please wait..." : "Verify"}
            </button>
            <div className="text-sm text-center text-[#102E50]">
              <Link to="/forget" className="text-[#E78B48] font-semibold underline hover:text-[#BE3D2A]">Back</Link>
            </div>
          </form>
          <div className="h-1 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
        </div>
      </div>
    </div>
  );
}
