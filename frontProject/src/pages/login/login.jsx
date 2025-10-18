import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const email = String(emailRaw || "")
    .trim()
    .toLowerCase();
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email))
    return false;
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
      w-full p-3 rounded-lg
      border ${hasError ? "border-[#BE3D2A]" : "border-gray-300"}
      text-[#102E50]
      focus:outline-none focus:border-[#F5C45E] focus:ring-2 focus:ring-[#F5C45E]/50
      transition
    `;
  }
  const CusData = useSelector((state) => state.UserInfo);

  const handleLogin = async (e) => {
    e.preventDefault();
    liveValidateEmail(email);
    liveValidatePassword(password);

    const hasErrors = (!validEmail(email) ? "x" : "") || (!password ? "x" : "");

    if (hasErrors) {
      const msgs = [];
      if (!validEmail(email))
        msgs.push("Email: Valid provider (Gmail/Yahoo/Outlook…).");
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
      const response = await axios.post(`http://localhost:${port}/api/login`, {
        email: String(email || "")
          .trim()
          .toLowerCase(),
        password,
      });

      dispatch(
        setUserInfo({
          user: response.data.user,
          token: response.data.token,
        })
      );

      const res = await axios.get(
        `http://localhost:${port}/api/carts/products/${CusData.user.user_id}`
      );

      dispatch(
        setCartItem({
          cartItem: Number(res.data.length),
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
        if (msg.toLowerCase().includes("email"))
          setErr("email", "Invalid email or password.");
        if (msg.toLowerCase().includes("password"))
          setErr("password", "Invalid email or password.");
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
    <div
      className="
        relative min-h-screen flex items-center justify-center p-4
        bg-[#FFF6E9]
        bg-[radial-gradient(1200px_600px_at_80%_-10%,#F5C45E20,transparent_60%),radial-gradient(900px_500px_at_10%_110%,#E78B4826,transparent_60%)]
      "
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#F5C45E33] blur-3xl" />
        <div className="absolute -bottom-28 -left-24 w-96 h-96 rounded-full bg-[#E78B4833] blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div
          className="
            bg-white/90 backdrop-blur rounded-2xl shadow-xl
            border border-[#102E50]/10 overflow-hidden
          "
        >
          <div className="h-1 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />

          <div className="px-8 pt-8 pb-6 text-center">
            <h2 className="text-3xl font-extrabold text-[#102E50]">Login</h2>
            <p className="text-sm mt-1 text-[#102E50]/70">
              Welcome back! Please sign in to continue.
            </p>
          </div>

          <form
            className="px-8 pb-8 pt-2 flex flex-col gap-5"
            onSubmit={handleLogin}
          >
            <div className="text-left">
              <label
                htmlFor="email"
                className="block mb-2 font-medium text-[#102E50]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="name@gmail.com"
                required
                className={inputClass(!!fieldErrors.email)}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  liveValidateEmail(e.target.value);
                }}
                onBlur={(e) => liveValidateEmail(e.target.value)}
              />
              {fieldErrors.email && (
                <p className="text-[#BE3D2A] text-xs mt-1">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div className="text-left">
              <label
                htmlFor="password"
                className="block mb-2 font-medium text-[#102E50]"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  id="password"
                  placeholder="********"
                  required
                  className={inputClass(!!fieldErrors.password) + " pr-12"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    liveValidatePassword(e.target.value);
                  }}
                  onBlur={(e) => liveValidatePassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-[#102E50]/70 hover:text-[#102E50]"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      fill="currentColor"
                    >
                      <path d="M2 5.27L3.28 4l16.97 16.97-1.27 1.27-2.1-2.1A10.66 10.66 0 0112 20C6.5 20 2.05 16.38 1 12c.35-1.38 1.1-2.73 2.14-3.9L2 5.27zM12 6c5.5 0 9.95 3.62 11 8a9.73 9.73 0 01-3.61 5.4ل-1.45-1.45A7.8 7.8 0 0020.9 14C19.93 10.6 16.32 8 12 8a7.8 7.8 0 00-3.95 1.06L6.6 6.61A9.7 9.7 0 0112 6z" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      fill="currentColor"
                    >
                      <path d="M12 6c-5.5 0-9.95 3.62-11 8 1.05 4.38 5.5 8 11 8s9.95-3.62 11-8c-1.05-4.38-5.5-8-11-8zm0 13a5 5 0 110-10 5 5 0 010 10zm0-2.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    </svg>
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-[#BE3D2A] text-xs mt-1">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-3 rounded-lg text-lg font-semibold
                bg-[#102E50] text-[#FFF6E9]
                hover:bg-[#F5C45E] hover:text-[#102E50]
                transition shadow-sm hover:shadow
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {loading ? "Please wait..." : "Sign In"}
            </button>

            <div className="flex items-center justify-between text-sm">
              <Link
                to="/forget"
                className="text-[#E78B48] font-medium underline hover:text-[#BE3D2A] transition"
              >
                Forgot your password?
              </Link>
              <Link
                to="/register"
                className="text-[#E78B48] font-semibold underline hover:text-[#BE3D2A] transition"
              >
                Register
              </Link>
            </div>
          </form>

          <div className="h-1 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
        </div>
      </div>
    </div>
  );
}
