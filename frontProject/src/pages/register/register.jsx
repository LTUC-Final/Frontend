import axios from "axios";
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const allowedDomains = new Set([
  "gmail.com",
  "yahoo.com",
  "ymail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "icloud.com",
]);

function squeezeSpaces(s = "") {
  return s.replace(/\s+/g, " ").trim();
}

function validName(name) {
  const n = squeezeSpaces(name);
  if (n.length < 3 || n.length > 40) return false;
  if (!/^[A-Za-z][A-Za-z' -]*[A-Za-z]$/.test(n)) return false;
  if (/--|''|\s\s/.test(n)) return false;
  if (/^[-']|[-']$/.test(n)) return false;
  return true;
}

function validEmail(emailRaw) {
  const email = String(emailRaw || "").trim().toLowerCase();
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) return false;
  const domain = email.split("@")[1] || "";
  return allowedDomains.has(domain);
}

function normalizePhoneJordan(input) {
  if (typeof input !== "string") return null;
  let s = input.trim().replace(/\s+/g, "");
  s = s.replace(/^00/, "+");
  if (/^07\d{8}$/.test(s)) s = "+962" + s.slice(1);
  else if (/^9627\d{8}$/.test(s)) s = "+" + s;
  if (/^\+9627[7-9]\d{7}$/.test(s)) return s;
  return null;
}

function pwdChecks(pw) {
  const hasLen = typeof pw === "string" && pw.length >= 8 && pw.length <= 64;
  const hasLetter = /[A-Za-z]/.test(pw || "");
  const hasDigit = /\d/.test(pw || "");
  const hasSymbol = /[^A-Za-z0-9]/.test(pw || "");
  const noSpaces = !/\s/.test(pw || "");
  return { hasLen, hasLetter, hasDigit, hasSymbol, noSpaces };
}

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState("+9627");
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const navigate = useNavigate();
  const passState = useMemo(() => pwdChecks(password), [password]);

  function setErr(key, msg) {
    setFieldErrors((prev) => ({ ...prev, [key]: msg }));
  }

  function liveValidateName(key, val) {
    const ok = validName(val);
    setErr(key, ok ? "" : "Only English letters (3–40), allow space/'/-.");
  }

  function liveValidateEmail(val) {
    const ok = validEmail(val);
    setErr("email", ok ? "" : "Valid email required (Gmail/Yahoo/Outlook…).");
  }

  function liveValidatePhone(val) {
    const normalized = normalizePhoneJordan(val);
    setErr("phone", normalized ? "" : "Use a Jordanian mobile like +9627XXXXXXXX.");
  }

  function liveValidatePassword(val) {
    const { hasLen, hasLetter, hasDigit, hasSymbol, noSpaces } = pwdChecks(val);
    const ok = hasLen && hasLetter && hasDigit && hasSymbol && noSpaces;
    setErr("password", ok ? "" : "8–64, include letter, number, symbol, no spaces.");
  }

  function liveValidateConfirm(val) {
    setErr("confirm", val === password ? "" : "Passwords must match.");
  }

  async function handleRegister(e) {
    e.preventDefault();

    liveValidateName("firstname", firstname);
    liveValidateName("lastname", lastname);
    liveValidateEmail(email);
    liveValidatePhone(phone);
    liveValidatePassword(password);
    liveValidateConfirm(confirm);

    const hasErrors = Object.values({
      ...fieldErrors,
      firstname: validName(firstname) ? "" : "x",
      lastname: validName(lastname) ? "" : "x",
      email: validEmail(email) ? "" : "x",
      phone: normalizePhoneJordan(phone) ? "" : "x",
      password:
        (() => {
          const c = pwdChecks(password);
          return c.hasLen && c.hasLetter && c.hasDigit && c.hasSymbol && c.noSpaces ? "" : "x";
        })(),
      confirm: confirm === password ? "" : "x",
    }).some((v) => v);

    if (hasErrors) {
      const msgs = [];
      if (!validName(firstname)) msgs.push("First name: English letters only (3–40).");
      if (!validName(lastname)) msgs.push("Last name: English letters only (3–40).");
      if (!validEmail(email)) msgs.push("Email: Valid provider (Gmail/Yahoo/Outlook…).");
      if (!normalizePhoneJordan(phone)) msgs.push("Phone: Jordanian mobile like +9627XXXXXXXX.");
      const pc = pwdChecks(password);
      if (!(pc.hasLen && pc.hasLetter && pc.hasDigit && pc.hasSymbol && pc.noSpaces))
        msgs.push("Password: 8–64, include letter, number, symbol, no spaces.");
      if (confirm !== password) msgs.push("Confirm: Passwords must match.");

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
      const normalizedPhone = normalizePhoneJordan(phone);

      const res = await axios.post(`http://localhost:${port}/api/register`, {
        firstname: squeezeSpaces(firstname),
        lastname: squeezeSpaces(lastname),
        email: String(email || "").trim().toLowerCase(),
        password,
        role,
        phone: normalizedPhone,
      });

      Swal.fire({
        title: res?.data?.message || "Registered successfully.",
        icon: "success",
        draggable: true,
      }).then(() => navigate("/login"));
    } catch (err) {
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "An error occurred. Please try again.";

      if (message.includes("Email")) setErr("email", message);
      if (message.includes("Phone")) setErr("phone", message);

      Swal.fire({
        title: "Registration failed",
        text: message,
        icon: "error",
        confirmButtonText: "OK",
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  function inputClass(hasError) {
    return `
      w-full pl-10 pr-3 p-3 rounded-lg
      border ${hasError ? "border-[#BE3D2A]" : "border-gray-300"}
      text-[#102E50]
      focus:outline-none focus:border-[#F5C45E] focus:ring-2 focus:ring-[#F5C45E]/50
      transition
    `;
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
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-[#102E50]/10 overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
          <div className="px-8 pt-8 pb-6 text-center">
            <h2 className="text-3xl font-extrabold text-[#102E50]">Create Account</h2>
            <p className="text-sm mt-1 text-[#102E50]/70">Join us and start booking or offering services</p>
          </div>

          <form className="px-8 pb-8 pt-2 flex flex-col gap-5" onSubmit={handleRegister}>
            <div className="text-left">
              <label htmlFor="firstname" className="block mb-2 font-medium text-[#102E50]">First Name</label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#102E50]/60" fill="currentColor"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-8 9a8 8 0 1116 0v1H4v-1z" /></svg>
                </span>
                <input
                  id="firstname"
                  type="text"
                  required
                  className={inputClass(!!fieldErrors.firstname)}
                  value={firstname}
                  onChange={(e) => { setFirstname(e.target.value); liveValidateName("firstname", e.target.value); }}
                  onBlur={(e) => liveValidateName("firstname", e.target.value)}
                  placeholder="First name"
                />
              </div>
              {fieldErrors.firstname && <p className="text-[#BE3D2A] text-xs mt-1">{fieldErrors.firstname}</p>}
            </div>

            <div className="text-left">
              <label htmlFor="lastname" className="block mb-2 font-medium text-[#102E50]">Last Name</label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#102E50]/60" fill="currentColor"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-8 9a8 8 0 1116 0v1H4v-1z" /></svg>
                </span>
                <input
                  id="lastname"
                  type="text"
                  required
                  className={inputClass(!!fieldErrors.lastname)}
                  value={lastname}
                  onChange={(e) => { setLastname(e.target.value); liveValidateName("lastname", e.target.value); }}
                  onBlur={(e) => liveValidateName("lastname", e.target.value)}
                  placeholder="Last name"
                />
              </div>
              {fieldErrors.lastname && <p className="text-[#BE3D2A] text-xs mt-1">{fieldErrors.lastname}</p>}
            </div>

            <div className="text-left">
              <label htmlFor="email" className="block mb-2 font-medium text-[#102E50]">Email</label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#102E50]/60" fill="currentColor"><path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v.35ل-10 5.6L2 6.35V6zm0 3.09V18a2 2 0 002 2h16a2 2 0 002-2V9.09ل-9.37 5.25a2 2 0 01-1.96 0L2 9.09z" /></svg>
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  className={inputClass(!!fieldErrors.email)}
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); liveValidateEmail(e.target.value); }}
                  onBlur={(e) => liveValidateEmail(e.target.value)}
                  placeholder="name@gmail.com"
                />
              </div>
              {fieldErrors.email && <p className="text-[#BE3D2A] text-xs mt-1">{fieldErrors.email}</p>}
            </div>

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
                  className={inputClass(!!fieldErrors.phone)}
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); liveValidatePhone(e.target.value); }}
                  onBlur={(e) => liveValidatePhone(e.target.value)}
                  placeholder="+9627XXXXXXXX"
                />
              </div>
              {fieldErrors.phone && <p className="text-[#BE3D2A] text-xs mt-1">{fieldErrors.phone}</p>}
            </div>

            <div className="text-left">
              <label htmlFor="password" className="block mb-2 font-medium text-[#102E50]">Password</label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#102E50]/60" fill="currentColor"><path d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm-3 8V6a3 3 0 116 0v3H9z" /></svg>
                </span>
                <input
                  id="password"
                  type="password"
                  required
                  className={inputClass(!!fieldErrors.password)}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); liveValidatePassword(e.target.value); }}
                  onBlur={(e) => liveValidatePassword(e.target.value)}
                  placeholder="********"
                />
              </div>
              <div className="mt-2 space-y-1">
                <HintLine ok={passState.hasLen} text="8–64 characters" />
                <HintLine ok={passState.hasLetter} text="Contains a letter" />
                <HintLine ok={passState.hasDigit} text="Contains a number" />
                <HintLine ok={passState.hasSymbol} text="Contains a symbol" />
                <HintLine ok={passState.noSpaces} text="No spaces" />
              </div>
              {fieldErrors.password && <p className="text-[#BE3D2A] text-xs mt-1">{fieldErrors.password}</p>}
            </div>

            <div className="text-left">
              <label htmlFor="confirm" className="block mb-2 font-medium text-[#102E50]">Confirm Password</label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#102E50]/60" fill="currentColor"><path d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm-3 8	V6a3 3 0 116 0v3H9z" /></svg>
                </span>
                <input
                  id="confirm"
                  type="password"
                  required
                  className={inputClass(!!fieldErrors.confirm)}
                  value={confirm}
                  onChange={(e) => { setConfirm(e.target.value); liveValidateConfirm(e.target.value); }}
                  onBlur={(e) => liveValidateConfirm(e.target.value)}
                  placeholder="********"
                />
              </div>
              {fieldErrors.confirm && <p className="text-[#BE3D2A] text-xs mt-1">{fieldErrors.confirm}</p>}
            </div>

            <div className="text-left">
              <p className="mb-2 font-medium text-[#102E50]">Are you signing up as a Service Provider or a Customer?</p>
              <div className="flex items-center gap-6">
                <label className="inline-flex items-center gap-2 text-[#102E50]">
                  <input
                    type="radio"
                    name="role"
                    value="provider"
                    checked={role === "provider"}
                    onChange={() => setRole("provider")}
                  />
                  <span>Provide a service (Provider)</span>
                </label>
                <label className="inline-flex items-center gap-2 text-[#102E50]">
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={role === "customer"}
                    onChange={() => setRole("customer")}
                  />
                  <span>Find and book services (Customer)</span>
                </label>
              </div>
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
              {loading ? "Please wait..." : "Register"}
            </button>

            <p className="text-sm text-[#102E50] text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-[#E78B48] font-semibold underline hover:text-[#BE3D2A]">
                Login
              </Link>
            </p>
          </form>

          <div className="h-1 w-full bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]" />
        </div>
      </div>
    </div>
  );
}
