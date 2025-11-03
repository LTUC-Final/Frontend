// import axios from "axios";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { setCartItem, setUserInfo } from "../../redux/userInfo/userInfo";

// const allowedDomains = new Set([
//   "gmail.com",
//   "yahoo.com",
//   "ymail.com",
//   "outlook.com",
//   "hotmail.com",
//   "live.com",
//   "icloud.com",
// ]);

// function validEmail(emailRaw) {
//   const email = String(emailRaw || "").trim().toLowerCase();
//   if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) return false;
//   const domain = email.split("@")[1] || "";
//   return allowedDomains.has(domain);
// }

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPass, setShowPass] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [fieldErrors, setFieldErrors] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const CusData = useSelector((state) => state.UserInfo);

//   function setErr(key, msg) {
//     setFieldErrors((prev) => ({ ...prev, [key]: msg }));
//   }

//   function liveValidateEmail(val) {
//     const ok = validEmail(val);
//     setErr("email", ok ? "" : "Valid email required (Gmail/Yahoo/Outlook…).");
//   }

//   function liveValidatePassword(val) {
//     setErr("password", val ? "" : "Password is required.");
//   }

//   function inputClass(hasError) {
//     return `
//       w-full pl-10 pr-3 py-3 rounded-xl
//       border ${hasError ? "border-[#BE3D2A]" : "border-transparent"}
//       bg-white/90 placeholder-[#102E50]/80 text-[#102E50] text-sm
//       outline-none ring-1 ring-[#102E50]/15 focus:ring-3 focus:ring-[#F5C45E]/30 focus:border-[#F5C45E]
//       shadow-[0_1px_8px_rgba(16,46,80,0.06)]
//       transition
//     `;
//   }

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     liveValidateEmail(email);
//     liveValidatePassword(password);

//     const hasErrors = (!validEmail(email) ? "x" : "") || (!password ? "x" : "");
//     if (hasErrors) {
//       const msgs = [];
//       if (!validEmail(email)) msgs.push("Email: Valid provider (Gmail/Yahoo/Outlook…).");
//       if (!password) msgs.push("Password: Required.");
//       Swal.fire({
//         title: "Please fix the following:",
//         html: `<ul style="text-align:left;margin:0;padding-left:18px;">${msgs
//           .map((m) => `<li>${m}</li>`)
//           .join("")}</ul>`,
//         icon: "error",
//         confirmButtonText: "OK",
//         draggable: true,
//       });
//       return;
//     }

//     try {
//       setLoading(true);
//       const port = import.meta.env.VITE_PORT;
//       const response = await axios.post(`http://localhost:${port}/api/login`, {
//         email: String(email || "").trim().toLowerCase(),
//         password,
//       });

//       dispatch(
//         setUserInfo({
//           user: response.data.user,
//           token: response.data.token,
//         })
//       );

//       const res = await axios.get(
//         `http://localhost:${port}/api/carts/products/${CusData.user.user_id}`
//       );

//       dispatch(
//         setCartItem({
//           cartItem: Number(res.data.length),
//         })
//       );

//       Swal.fire({
//         title: response?.data?.message || "Login successful",
//         icon: "success",
//         draggable: true,
//       }).then(() => navigate("/mainDashBoard"));
//     } catch (err) {
//       const data = err?.response?.data || {};
//       const msg = data?.error || data?.message || "Invalid email or password.";

//       if (data?.fields) {
//         setErr("email", data.fields.email || "");
//         setErr("password", data.fields.password || "");
//       } else {
//         if (msg.toLowerCase().includes("email")) setErr("email", "Invalid email or password.");
//         if (msg.toLowerCase().includes("password")) setErr("password", "Invalid email or password.");
//       }

//       Swal.fire({
//         title: "Sign-in failed",
//         text: msg,
//         icon: "error",
//         confirmButtonText: "OK",
//         draggable: true,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen bg-[#0f2a47] flex items-center justify-center p-3">
//       <style>{`
//         @keyframes float { 0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)}}
//         @keyframes slowspin {from{transform:rotate(0)}to{transform:rotate(360deg)}}
//         @media (prefers-reduced-motion: reduce) {
//           * { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; scroll-behavior: auto !important; }
//         }
//       `}</style>

//       <div className="pointer-events-none absolute inset-0">
//         <div
//           className="absolute -top-24 -left-24 w-[22rem] h-[22rem] rounded-full blur-xl opacity-20"
//           style={{ background: "radial-gradient(closest-side,#F5C45E66,transparent)", animation: "float 9s ease-in-out infinite" }}
//         />
//         <div
//           className="absolute -bottom-28 -right-20 w-[24rem] h-[24rem] rounded-full blur-xl opacity-16"
//           style={{ background: "radial-gradient(closest-side,#E78B4866,transparent)", animation: "float 11s ease-in-out 1s infinite" }}
//         />
//       </div>

//       <div className="relative w-full max-w-md">
//         <div className="relative rounded-2xl p-[1.5px]">
//           <div
//             className="absolute inset-0 rounded-2xl"
//             style={{
//               background:
//                 "conic-gradient(from 0deg, #F5C45E, #E78B48, #BE3D2A, #102E50, #F5C45E)",
//               animation: "slowspin 22s linear infinite",
//               filter: "blur(0.3px)",
//             }}
//           />
//           <div className="relative rounded-xl bg-[#FFF6E9]/95 backdrop-blur-md shadow-[0_12px_28px_rgba(16,46,80,0.22)]">
//             <div className="px-6 pt-6 pb-4 text-center">
//               <h1 className="text-2xl font-extrabold tracking-tight text-[#102E50]">
//                 Sign in to Bidaya
//               </h1>
//               <p className="text-base text-[#102E50]/75 mt-1">
//                 Welcome back! Please sign in to continue.
//               </p>
//             </div>

//             <form className="px-5 pb-7 space-y-4" onSubmit={handleLogin}>
//               <div>
//                 <label htmlFor="email" className="sr-only">Email</label>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-3 flex items-center text-[#102E50]/70">
//                     <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
//                       <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v.35L12 12 2 6.35V6Zm0 3.1V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9.1l-9.37 5.25a2 2 0 0 1-1.96 0Z"/>
//                     </svg>
//                   </span>
//                   <input
//                     type="email"
//                     id="email"
//                     placeholder="name@gmail.com"
//                     required
//                     className={inputClass(!!fieldErrors.email)}
//                     value={email}
//                     onChange={(e) => { setEmail(e.target.value); liveValidateEmail(e.target.value); }}
//                     onBlur={(e) => liveValidateEmail(e.target.value)}
//                   />
//                 </div>
//                 {fieldErrors.email && (
//                   <p className="text-[#BE3D2A] text-[11px] mt-1">{fieldErrors.email}</p>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="password" className="sr-only">Password</label>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-3 flex items-center text-[#102E50]/70">
//                     <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
//                       <path d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm-3 8V6a3 3 0 1 1 6 0v3Z"/>
//                     </svg>
//                   </span>
//                   <input
//                     type={showPass ? "text" : "password"}
//                     id="password"
//                     placeholder="********"
//                     required
//                     className={inputClass(!!fieldErrors.password) + " pr-12"}
//                     value={password}
//                     onChange={(e) => { setPassword(e.target.value); liveValidatePassword(e.target.value); }}
//                     onBlur={(e) => liveValidatePassword(e.target.value)}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPass((s) => !s)}
//                     className="absolute inset-y-0 right-0 px-3 flex items-center text-[#102E50]/70 hover:text-[#102E50]"
//                     aria-label={showPass ? "Hide password" : "Show password"}
//                   >
//                     {showPass ? (
//                       <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
//                         <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5Zm0 12a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z"/>
//                       </svg>
//                     ) : (
//                       <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
//                         <path d="M12 6c-5 0-9.27 3.11-11 7.5A12.9 12.9 0 0 0 5 17.7L3.3 19.4 4.7 20.8 20.8 4.7 19.4 3.3l-2 2A12.6 12.6 0 0 0 12 6Zm0 12c5 0 9.27-3.11 11-7.5a12.9 12.9 0 0 0-3.07-4.2l-2.1 2.1A7 7 0 1 1 9.6 15.73L7.8 17.5A12.5 12.5 0 0 0 12 18Z"/>
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//                 {fieldErrors.password && (
//                   <p className="text-[#BE3D2A] text-[11px] mt-1">{fieldErrors.password}</p>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3.5 rounded-xl text-lg font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_6px_16px_rgba(16,46,80,0.22)] disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24" fill="none">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"></path>
//                     </svg>
//                     <span>Please wait...</span>
//                   </>
//                 ) : (
//                   "Sign In"
//                 )}
//               </button>

//               <div className="flex items-center justify-between text-base text-[#102E50]">
//                 <Link to="/forget" className="text-[#E78B48] font-medium underline hover:text-[#BE3D2A] transition">
//                   Forgot your password?
//                 </Link>
//                 <Link to="/register" className="text-[#E78B48] font-semibold underline hover:text-[#BE3D2A] transition">
//                   Create account
//                 </Link>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }













import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { setCartItem, setUserInfo } from "../../redux/userInfo/userInfo";

const allowedDomains = new Set([
  "gmail.com",
  "yahoo.com",
  "ymail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "icloud.com",
]);

function validEmail(emailRaw) {
  const email = String(emailRaw || "").trim().toLowerCase();
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) return false;
  const domain = email.split("@")[1] || "";
  return allowedDomains.has(domain);
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function setErr(key, msg) {
    setFieldErrors((prev) => ({ ...prev, [key]: msg }));
  }

  function liveValidateEmail(val) {
    const ok = validEmail(val);
    setErr("email", ok ? "" : "Valid email required (Gmail/Yahoo/Outlook…).");
  }

  function liveValidatePassword(val) {
    setErr("password", val ? "" : "Password is required.");
  }

  function inputClass(hasError) {
    return `
      w-full pl-10 pr-3 py-3 rounded-xl
      border ${hasError ? "border-[#BE3D2A]" : "border-transparent"}
      bg-white/90 placeholder-[#102E50]/80 text-[#102E50] text-sm
      outline-none ring-1 ring-[#102E50]/15 focus:ring-3 focus:ring-[#F5C45E]/30 focus:border-[#F5C45E]
      shadow-[0_1px_8px_rgba(16,46,80,0.06)]
      transition
    `;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    liveValidateEmail(email);
    liveValidatePassword(password);

    const hasErrors = (!validEmail(email) ? "x" : "") || (!password ? "x" : "");
    if (hasErrors) {
      const msgs = [];
      if (!validEmail(email)) msgs.push("Email: Valid provider (Gmail/Yahoo/Outlook…).");
      if (!password) msgs.push("Password: Required.");
      Swal.fire({
        title: "Please fix the following:",
        html: `<ul style="text-align:left;margin:0;padding-left:18px;">${msgs
          .map((m) => `<li>${m}</li>`)
          .join("")}</ul>`,
        icon: "error",
        confirmButtonText: "OK",
        draggable: true,
      });
      return;
    }

    try {
      setLoading(true);
      const port = import.meta.env.VITE_PORT;

      // 1) Login
      const response = await axios.post(`http://localhost:${port}/api/login`, {
        email: String(email || "").trim().toLowerCase(),
        password,
      });
      const { user } = response.data;

      // خذ user و token مباشرة من نفس الريسبونس
      const { user, token } = response.data;

      // خزّنهم بالريدكس
      dispatch(setUserInfo({ user, token }));

      // 2) جيب السلة باستخدام user_id من الريسبونس + مرر التوكن بالهيدر
      const cartRes = await axios.get(
        `http://localhost:${port}/api/carts/products/${user.user_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      dispatch(
        setUserInfo({
          user: response.data.user,
          token: response.data.token,
        })
      );

      const res = await axios.get(
        `http://localhost:${port}/api/carts/products/${user.user_id}`
      );

      dispatch(
        setCartItem({
          cartItem: Number(Array.isArray(cartRes.data) ? cartRes.data.length : cartRes.data?.length || 0),
        })
      );

      Swal.fire({
        title: response?.data?.message || "Login successful",
        icon: "success",
        draggable: true,
      }).then(() => navigate("/mainDashBoard"));
    } catch (err) {
      const data = err?.response?.data || {};
      const msg = data?.error || data?.message || "Invalid email or password.";

      if (data?.fields) {
        setErr("email", data.fields.email || "");
        setErr("password", data.fields.password || "");
      } else {
        if (msg.toLowerCase().includes("email")) setErr("email", "Invalid email or password.");
        if (msg.toLowerCase().includes("password")) setErr("password", "Invalid email or password.");
      }

      Swal.fire({
        title: "Sign-in failed",
        text: msg,
        icon: "error",
        confirmButtonText: "OK",
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

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
              <h1 className="text-2xl font-extrabold tracking-tight text-[#102E50]">
                Sign in to Bidaya
              </h1>
              <p className="text-base text-[#102E50]/75 mt-1">
                Welcome back! Please sign in to continue.
              </p>
            </div>

            <form className="px-5 pb-7 space-y-4" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-[#102E50]/70">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v.35L12 12 2 6.35V6Zm0 3.1V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9.1l-9.37 5.25a2 2 0 0 1-1.96 0Z"/>
                    </svg>
                  </span>
                  <input
                    type="email"
                    id="email"
                    placeholder="name@gmail.com"
                    required
                    className={inputClass(!!fieldErrors.email)}
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); liveValidateEmail(e.target.value); }}
                    onBlur={(e) => liveValidateEmail(e.target.value)}
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-[#BE3D2A] text-[11px] mt-1">{fieldErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-[#102E50]/70">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm-3 8V6a3 3 0 1 1 6 0v3Z"/>
                    </svg>
                  </span>
                  <input
                    type={showPass ? "text" : "password"}
                    id="password"
                    placeholder="********"
                    required
                    className={inputClass(!!fieldErrors.password) + " pr-12"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); liveValidatePassword(e.target.value); }}
                    onBlur={(e) => liveValidatePassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
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
                {fieldErrors.password && (
                  <p className="text-[#BE3D2A] text-[11px] mt-1">{fieldErrors.password}</p>
                )}
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
                  "Sign In"
                )}
              </button>

              <div className="flex items-center justify-between text-base text-[#102E50]">
                <Link to="/forget" className="text-[#E78B48] font-medium underline hover:text-[#BE3D2A] transition">
                  Forgot your password?
                </Link>
                <Link to="/register" className="text-[#E78B48] font-semibold underline hover:text-[#BE3D2A] transition">
                  Create account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
