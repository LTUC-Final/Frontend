import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function pwdChecks(pw) {
  const hasLen = typeof pw === "string" && pw.length >= 8 && pw.length <= 64;
  const hasLetter = /[A-Za-z]/.test(pw || "");
  const hasDigit = /\d/.test(pw || "");
  const hasSymbol = /[^A-Za-z0-9]/.test(pw || "");
  const noSpaces = !/\s/.test(pw || "");
  return { hasLen, hasLetter, hasDigit, hasSymbol, noSpaces };
}

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [token, setToken] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errs, setErrs] = useState({ password: "", confirm: "", token: "" });
  const passState = useMemo(() => pwdChecks(password), [password]);
  const navigate = useNavigate();

  useEffect(() => {
    const t = sessionStorage.getItem("reset_token") || "";
    const p = sessionStorage.getItem("fp_phone") || "";
    if (t) setToken(t);
    if (p) setPhone(p);
  }, []);

  function inputClass(bad) {
    return `
      w-full pl-10 pr-3 p-3 rounded-lg
      border ${bad ? "border-[#BE3D2A]" : "border-gray-300"}
      text-[#102E50]
      focus:outline-none focus:border-[#F5C45E] focus:ring-2 focus:ring-[#F5C45E]/50
      transition
    `;
  }

  function validate() {
    const e = { password: "", confirm: "", token: "" };
    const c = pwdChecks(password);
    if (!(c.hasLen && c.hasLetter && c.hasDigit && c.hasSymbol && c.noSpaces)) e.password = "8–64, include letter, number, symbol, no spaces.";
    if (confirm !== password) e.confirm = "Passwords must match.";
    if (!token) e.token = "Missing reset token.";
    setErrs(e);
    return !e.password && !e.confirm && !e.token;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      const port = import.meta.env.VITE_PORT;
      const res = await axios.post(`http://localhost:${port}/api/forgetpassword/reset-password`, {
        country_code: "JO",
        phone,
        reset_token: token,
        new_password: password
      });
      Swal.fire({ title: res?.data?.message || "Password reset successfully", icon: "success", draggable: true }).then(() => {
        sessionStorage.removeItem("reset_token");
        navigate("/login");
      });
    } catch (e) {
      const msg = e?.response?.data?.error || e?.response?.data?.message || "Reset failed.";
      Swal.fire({ title: "Failed", text: msg, icon: "error", draggable: true });
    } finally {
      setLoading(false);
    }
  }

  function HintLine({ ok, text }) {
    return (
      <div className="flex items-center gap-2 text-xs leading-5">
        <span className={`inline-block w-3 h-3 rounded-full ${ok ? "bg-green-500" : "bg-gray-300"}`} />
        <span className={`${ok ? "text-green-700" : "text-[#102E50]/70"}`}>{text}</span>
      </div>
    );
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
            <h2 className="text-3xl font-extrabold text-[#102E50]">Reset Password</h2>
            <p className="text-sm mt-1 text-[#102E50]/70">Set a new secure password</p>
          </div>
          <form className="px-8 pb-8 pt-2 flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="text-left">
              <label htmlFor="password" className="block mb-2 font-medium text-[#102E50]">New Password</label>
              <input
                id="password"
                type="password"
                required
                className={inputClass(!!errs.password)}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
              />
              <div className="mt-2 space-y-1">
                <HintLine ok={passState.hasLen} text="8–64 characters" />
                <HintLine ok={passState.hasLetter} text="Contains a letter" />
                <HintLine ok={passState.hasDigit} text="Contains a number" />
                <HintLine ok={passState.hasSymbol} text="Contains a symbol" />
                <HintLine ok={passState.noSpaces} text="No spaces" />
              </div>
              {errs.password && <p className="text-[#BE3D2A] text-xs mt-1">{errs.password}</p>}
            </div>
            <div className="text-left">
              <label htmlFor="confirm" className="block mb-2 font-medium text-[#102E50]">Confirm Password</label>
              <input
                id="confirm"
                type="password"
                required
                className={inputClass(!!errs.confirm)}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="********"
              />
              {errs.confirm && <p className="text-[#BE3D2A] text-xs mt-1">{errs.confirm}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-lg font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-sm hover:shadow disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Please wait..." : "Reset Password"}
            </button>
            <div className="text-sm text-center text-[#102E50]">
              <Link to="/login" className="text-[#E78B48] font-semibold underline hover:text-[#BE3D2A]">Back to Login</Link>
            </div>
          </form>
          <div className="h-1 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
        </div>
      </div>
    </div>
  );
}
