// import axios from "axios";
// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// function pwdChecks(pw) {
//   const hasLen = typeof pw === "string" && pw.length >= 8 && pw.length <= 64;
//   const hasLetter = /[A-Za-z]/.test(pw || "");
//   const hasDigit = /\d/.test(pw || "");
//   const hasSymbol = /[^A-Za-z0-9]/.test(pw || "");
//   const noSpaces = !/\s/.test(pw || "");
//   return { hasLen, hasLetter, hasDigit, hasSymbol, noSpaces };
// }

// export default function ResetPassword() {
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [token, setToken] = useState("");
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errs, setErrs] = useState({ password: "", confirm: "", token: "" });
//   const passState = useMemo(() => pwdChecks(password), [password]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const t = sessionStorage.getItem("reset_token") || "";
//     const p = sessionStorage.getItem("fp_phone") || "";
//     if (t) setToken(t);
//     if (p) setPhone(p);
//   }, []);

//   function inputClass(bad) {
//     return `
//       w-full pl-10 pr-3 p-3 rounded-lg
//       border ${bad ? "border-[#BE3D2A]" : "border-gray-300"}
//       text-[#102E50]
//       focus:outline-none focus:border-[#F5C45E] focus:ring-2 focus:ring-[#F5C45E]/50
//       transition
//     `;
//   }

//   function validate() {
//     const e = { password: "", confirm: "", token: "" };
//     const c = pwdChecks(password);
//     if (!(c.hasLen && c.hasLetter && c.hasDigit && c.hasSymbol && c.noSpaces)) e.password = "8–64, include letter, number, symbol, no spaces.";
//     if (confirm !== password) e.confirm = "Passwords must match.";
//     if (!token) e.token = "Missing reset token.";
//     setErrs(e);
//     return !e.password && !e.confirm && !e.token;
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!validate()) return;
//     try {
//       setLoading(true);
//       const port = import.meta.env.VITE_PORT;
//       const res = await axios.post(`http://localhost:${port}/api/forgetpassword/reset-password`, {
//         country_code: "JO",
//         phone,
//         reset_token: token,
//         new_password: password
//       });
//       Swal.fire({ title: res?.data?.message || "Password reset successfully", icon: "success", draggable: true }).then(() => {
//         sessionStorage.removeItem("reset_token");
//         navigate("/login");
//       });
//     } catch (e) {
//       const msg = e?.response?.data?.error || e?.response?.data?.message || "Reset failed.";
//       Swal.fire({ title: "Failed", text: msg, icon: "error", draggable: true });
//     } finally {
//       setLoading(false);
//     }
//   }

//   function HintLine({ ok, text }) {
//     return (
//       <div className="flex items-center gap-2 text-xs leading-5">
//         <span className={`inline-block w-3 h-3 rounded-full ${ok ? "bg-green-500" : "bg-gray-300"}`} />
//         <span className={`${ok ? "text-green-700" : "text-[#102E50]/70"}`}>{text}</span>
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen flex items-center justify-center p-4 bg-[#FFF6E9] bg-[radial-gradient(1200px_600px_at_80%_-10%,#F5C45E20,transparent_60%),radial-gradient(900px_500px_at_10%_110%,#E78B4826,transparent_60%)]">
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#F5C45E33] blur-3xl" />
//         <div className="absolute -bottom-28 -left-24 w-96 h-96 rounded-full bg-[#E78B4833] blur-3xl" />
//       </div>
//       <div className="relative w-full max-w-md">
//         <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-[#102E50]/10 overflow-hidden">
//           <div className="h-1 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
//           <div className="px-8 pt-8 pb-6 text-center">
//             <h2 className="text-3xl font-extrabold text-[#102E50]">Reset Password</h2>
//             <p className="text-sm mt-1 text-[#102E50]/70">Set a new secure password</p>
//           </div>
//           <form className="px-8 pb-8 pt-2 flex flex-col gap-5" onSubmit={handleSubmit}>
//             <div className="text-left">
//               <label htmlFor="password" className="block mb-2 font-medium text-[#102E50]">New Password</label>
//               <input
//                 id="password"
//                 type="password"
//                 required
//                 className={inputClass(!!errs.password)}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="********"
//               />
//               <div className="mt-2 space-y-1">
//                 <HintLine ok={passState.hasLen} text="8–64 characters" />
//                 <HintLine ok={passState.hasLetter} text="Contains a letter" />
//                 <HintLine ok={passState.hasDigit} text="Contains a number" />
//                 <HintLine ok={passState.hasSymbol} text="Contains a symbol" />
//                 <HintLine ok={passState.noSpaces} text="No spaces" />
//               </div>
//               {errs.password && <p className="text-[#BE3D2A] text-xs mt-1">{errs.password}</p>}
//             </div>
//             <div className="text-left">
//               <label htmlFor="confirm" className="block mb-2 font-medium text-[#102E50]">Confirm Password</label>
//               <input
//                 id="confirm"
//                 type="password"
//                 required
//                 className={inputClass(!!errs.confirm)}
//                 value={confirm}
//                 onChange={(e) => setConfirm(e.target.value)}
//                 placeholder="********"
//               />
//               {errs.confirm && <p className="text-[#BE3D2A] text-xs mt-1">{errs.confirm}</p>}
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 rounded-lg text-lg font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-sm hover:shadow disabled:opacity-60 disabled:cursor-not-allowed"
//             >
//               {loading ? "Please wait..." : "Reset Password"}
//             </button>
//             <div className="text-sm text-center text-[#102E50]">
//               <Link to="/login" className="text-[#E78B48] font-semibold underline hover:text-[#BE3D2A]">Back to Login</Link>
//             </div>
//           </form>
//           <div className="h-1 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
//         </div>
//       </div>
//     </div>
//   );
// }





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
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errs, setErrs] = useState({ password: "", confirm: "", token: "" });
  const passState = useMemo(() => pwdChecks(password), [password]);
  const navigate = useNavigate();

  const apiBase = useMemo(() => {
    const A = import.meta.env.VITE_API;
    const P = import.meta.env.VITE_PORT;
    return A ? A.replace(/\/$/, "") : `http://localhost:${P}`;
  }, []);

  useEffect(() => {
    const t = sessionStorage.getItem("reset_token") || "";
    const p = sessionStorage.getItem("fp_phone") || "";
    if (t) setToken(t);
    if (p) setPhone(p);
  }, []);

  function inputClass(hasError) {
    return `
      w-full pl-10 pr-12 py-3 rounded-xl
      border ${hasError ? "border-[#BE3D2A]" : "border-transparent"}
      bg-white/90 placeholder-[#102E50]/80 text-[#102E50] text-sm
      outline-none ring-1 ring-[#102E50]/15 focus:ring-3 focus:ring-[#F5C45E]/30 focus:border-[#F5C45E]
      shadow-[0_1px_8px_rgba(16,46,80,0.06)]
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
      const res = await axios.post(`${apiBase}/api/forgetpassword/reset-password`, {
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
    <div className="h-screen bg-[#0f2a47] flex items-center justify-center p-3">
      <style>{`
        @keyframes float { 0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)}}
        @keyframes slowspin {from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; scroll-behavior: auto !important; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-24 -left-24 w-[22rem] h-[22rem] rounded-full blur-xl opacity-20"
          style={{ background: "radial-gradient(closest-side,#F5C45E66,transparent)", animation: "float 9s ease-in-out infinite" }}
        />
        <div
          className="absolute -bottom-28 -right-20 w-[24rem] h-[24rem] rounded-full blur-xl opacity-16"
          style={{ background: "radial-gradient(closest-side,#E78B4866,transparent)", animation: "float 11s ease-in-out 1s infinite" }}
        />
      </div>

      <div className="relative w-full max-w-md">
        <div className="relative rounded-2xl p-[1.5px]">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "conic-gradient(from 0deg, #F5C45E, #E78B48, #BE3D2A, #102E50, #F5C45E)",
              animation: "slowspin 22s linear infinite",
              filter: "blur(0.3px)",
            }}
          />
          <div className="relative rounded-xl bg-[#FFF6E9]/95 backdrop-blur-md shadow-[0_12px_28px_rgba(16,46,80,0.22)]">
            <div className="px-6 pt-6 pb-4 text-center">
              <h1 className="text-2xl font-extrabold tracking-tight text-[#102E50]">Reset Password</h1>
              <p className="text-base text-[#102E50]/75 mt-1">Set a new secure password</p>
            </div>

            <form className="px-5 pb-7 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password" className="sr-only">New Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-[#102E50]/70">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm-3 8V6a3 3 0 1 1 6 0v3Z"/>
                    </svg>
                  </span>
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    required
                    className={inputClass(!!errs.password)}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(s => !s)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-[#102E50]/70 hover:text-[#102E50]"
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? (
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5Zm0 12a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                        <path d="M12 6c-5 0-9.27 3.11-11 7.5A12.9 12.9 0 0 0 5 17.7L3.3 19.4 4.7 20.8 20.8 4.7 19.4 3.3l-2 2A12.6 12.6 0 0 0 12 6Zm0 12c5 0 9.27-3.11 11-7.5a12.9 12.9 0 0 0-3.07-4.2l-2.1 2.1A7 7 0 1 1 9.6 15.73L7.8 17.5A12.5 12.5 0 0 0 12 18Z"/>
                      </svg>
                    )}
                  </button>
                </div>
                <div className="mt-2 space-y-1">
                  <HintLine ok={passState.hasLen} text="8–64 characters" />
                  <HintLine ok={passState.hasLetter} text="Contains a letter" />
                  <HintLine ok={passState.hasDigit} text="Contains a number" />
                  <HintLine ok={passState.hasSymbol} text="Contains a symbol" />
                  <HintLine ok={passState.noSpaces} text="No spaces" />
                </div>
                {errs.password && <p className="text-[#BE3D2A] text-[11px] mt-1">{errs.password}</p>}
              </div>

              <div>
                <label htmlFor="confirm" className="sr-only">Confirm Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-[#102E50]/70">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm-3 8V6a3 3 0 1 1 6 0v3Z"/>
                    </svg>
                  </span>
                  <input
                    id="confirm"
                    type={showConfirm ? "text" : "password"}
                    required
                    className={inputClass(!!errs.confirm)}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(s => !s)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-[#102E50]/70 hover:text-[#102E50]"
                    aria-label={showConfirm ? "Hide confirm" : "Show confirm"}
                  >
                    {showConfirm ? (
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5Zm0 12a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                        <path d="M12 6c-5 0-9.27 3.11-11 7.5A12.9 12.9 0 0 0 5 17.7L3.3 19.4 4.7 20.8 20.8 4.7 19.4 3.3l-2 2A12.6 12.6 0 0 0 12 6Zm0 12c5 0 9.27-3.11 11-7.5a12.9 12.9 0 0 0-3.07-4.2l-2.1 2.1A7 7 0 1 1 9.6 15.73L7.8 17.5A12.5 12.5 0 0 0 12 18Z"/>
                      </svg>
                    )}
                  </button>
                </div>
                {errs.confirm && <p className="text-[#BE3D2A] text-[11px] mt-1">{errs.confirm}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-lg font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_6px_16px_rgba(16,46,80,0.22)] disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"></path>
                    </svg>
                    <span>Please wait...</span>
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>

              <div className="flex items-center justify-between text-base text-[#102E50]">
                <Link to="/login" className="text-[#E78B48] font-medium underline hover:text-[#BE3D2A] transition">
                  Back to login
                </Link>
                <Link to="/forget" className="text-[#E78B48] font-semibold underline hover:text-[#BE3D2A] transition">
                  Request new OTP
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
