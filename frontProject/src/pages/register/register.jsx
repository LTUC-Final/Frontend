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
    setErr(key, ok ? "" : "Only English letters (3–40), allow space/'/ -.");
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
      if (!(pc.hasLen && pc.hasLetter && pc.hasDigit && pc.hasSymbol && c.noSpaces))
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

      const res = await axios.post(`https://backend-a2qq.onrender.com/api/register`, {
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
      w-full pl-10 pr-3 py-3 rounded-xl
      border ${hasError ? "border-[#BE3D2A]" : "border-transparent"}
      bg-white/90 placeholder-[#102E50]/80 text-[#102E50] text-sm
      outline-none ring-1 ring-[#102E50]/15 focus:ring-3 focus:ring-[#F5C45E]/30 focus:border-[#F5C45E]
      shadow-[0_1px_8px_rgba(16,46,80,0.06)]
      transition
    `;
  }

  const passScore =
    (passState.hasLen ? 1 : 0) +
    (passState.hasLetter ? 1 : 0) +
    (passState.hasDigit ? 1 : 0) +
    (passState.hasSymbol ? 1 : 0) +
    (passState.noSpaces ? 1 : 0);
  const passPercent = (passScore / 5) * 100;

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
            <div className="px-6 pt-6 pb-3 text-center">
              <h1 className="text-2xl font-extrabold tracking-tight text-[#102E50]">
                Create your Bidaya account
              </h1>
              <p className="text-sm text-[#102E50]/75 mt-1">
                Join <span className="font-semibold">Bidaya</span> to find services or offer yours
              </p>
            </div>

            <form onSubmit={handleRegister} className="px-5 pb-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstname" className="sr-only">First Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-[#102E50]/70">
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                        <path d="M12 12a5 5 1 1 0-5-5 5 5 0 0 0 5 5Zm-8 9a8 8 0 1 1 16 0v1H4Z"/>
                      </svg>
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
                  {fieldErrors.firstname && <p className="text-[#BE3D2A] text-[11px] mt-1">{fieldErrors.firstname}</p>}
                </div>

                <div>
                  <label htmlFor="lastname" className="sr-only">Last Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-[#102E50]/70">
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                        <path d="M12 12a5 5 1 1 0-5-5 5 5 0 0 0 5 5Zm-8 9a8 8 0 1 1 16 0v1H4Z"/>
                      </svg>
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
                  {fieldErrors.lastname && <p className="text-[#BE3D2A] text-[11px] mt-1">{fieldErrors.lastname}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-[#102E50]/70">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v.35L12 12 2 6.35V6Zm0 3.1V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9.1l-9.37 5.25a2 2 0 0 1-1.96 0Z"/>
                    </svg>
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
                {fieldErrors.email && <p className="text-[#BE3D2A] text-[11px] mt-1">{fieldErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="sr-only">Phone</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-[#102E50]/70">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1.1-.2c1.2.5 2.5.8 3.9.8a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.3 21 3 13.7 3 4a1 1 0 0 1 1-1h2.1a1 1 0 0 1 1 1c0 1.4.3 2.7.8 3.9.2.4.1.9-.2 1.1Z"/>
                    </svg>
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
                {fieldErrors.phone && <p className="text-[#BE3D2A] text-[11px] mt-1">{fieldErrors.phone}</p>}
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
                    id="password"
                    type="password"
                    required
                    className={inputClass(!!fieldErrors.password)}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); liveValidatePassword(e.target.value); }}
                    onBlur={(e) => liveValidatePassword(e.target.value)}
                    placeholder="Password (8–64, letter, number, symbol)"
                  />
                </div>

                {password && (
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="h-1.5 w-full bg-[#102E50]/10 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all"
                        style={{
                          width: `${passPercent}%`,
                          background: "linear-gradient(90deg,#F5C45E,#E78B48,#BE3D2A)",
                          borderRadius: "999px",
                        }}
                      />
                    </div>
                    <span className="text-[11px] text-[#102E50]/80 min-w-[50px] text-right">
                      {passScore <= 2 ? "Weak" : passScore <= 4 ? "Good" : "Strong"}
                    </span>
                  </div>
                )}

                {fieldErrors.password && <p className="text-[#BE3D2A] text-[11px] mt-1">{fieldErrors.password}</p>}
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
                    type="password"
                    required
                    className={inputClass(!!fieldErrors.confirm)}
                    value={confirm}
                    onChange={(e) => { setConfirm(e.target.value); liveValidateConfirm(e.target.value); }}
                    onBlur={(e) => liveValidateConfirm(e.target.value)}
                    placeholder="Confirm password"
                  />
                </div>
                {fieldErrors.confirm && <p className="text-[#BE3D2A] text-[11px] mt-1">{fieldErrors.confirm}</p>}
              </div>

              <fieldset className="space-y-2" aria-label="Select role">
                <legend className="text-sm font-medium text-[#102E50]">How do you plan to use Bidaya?</legend>
                <div className="grid grid-cols-2 gap-3 items-stretch">
                  <label className="relative cursor-pointer group h-full">
                    <input
                      type="radio"
                      name="role"
                      value="provider"
                      checked={role === "provider"}
                      onChange={() => setRole("provider")}
                      className="peer sr-only"
                    />
                    <div className="
                      h-full min-h-[84px]
                      rounded-xl p-2 bg-white/90 border border-[#102E50]/15 shadow-sm
                      transition-all group-hover:shadow group-hover:-translate-y-0.5
                      peer-checked:border-[#F5C45E] peer-checked:ring-3 peer-checked:ring-[#F5C45E]/25
                      focus-within:ring-3 focus-within:ring-[#F5C45E]/25
                      flex items-center gap-2
                    ">
                      <div className="absolute top-2 right-2 hidden peer-checked:block">
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#102E50] text-[#FFF6E9]">
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                            <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>
                          </svg>
                        </span>
                      </div>
                      <div className="h-7 w-7 rounded-lg bg-[#FFF6E9] flex items-center justify-center shadow-[inset_0_0_0_1px_rgba(16,46,80,0.08)]">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#102E50]" fill="currentColor">
                          <path d="M12 12a4 4 1 1 0-4-4 4 4 0 0 0 4 4Zm-7 8a7 7 0 1 1 14 0v1H5Z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[#102E50]">Provider</h3>
                        <p className="text-[11px] text-[#102E50]/70">Offer services or products</p>
                      </div>
                    </div>
                  </label>

                  <label className="relative cursor-pointer group h-full">
                    <input
                      type="radio"
                      name="role"
                      value="customer"
                      checked={role === "customer"}
                      onChange={() => setRole("customer")}
                      className="peer sr-only"
                    />
                    <div className="
                      h-full min-h-[84px]
                      rounded-xl p-2 bg-white/90 border border-[#102E50]/15 shadow-sm
                      transition-all group-hover:shadow group-hover:-translate-y-0.5
                      peer-checked:border-[#F5C45E] peer-checked:ring-3 peer-checked:ring-[#F5C45E]/25
                      focus-within:ring-3 focus-within:ring-[#F5C45E]/25
                      flex items-center gap-2
                    ">
                      <div className="absolute top-2 right-2 hidden peer-checked:block">
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#102E50] text-[#FFF6E9]">
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                            <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>
                          </svg>
                        </span>
                      </div>
                      <div className="h-7 w-7 rounded-lg bg-[#FFF6E9] flex items-center justify-center shadow-[inset_0_0_0_1px_rgba(16,46,80,0.08)]">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#102E50]" fill="currentColor">
                          <path d="M7 6h14l-1.5 9.1A2 2 0 0 1 17.5 17H9.3a2 2 0 0 1-2-1.6L6 4H2" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[#102E50]">Customer</h3>
                        <p className="text-[11px] text-[#102E50]/70">Find services & shop</p>
                      </div>
                    </div>
                  </label>
                </div>
              </fieldset>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-base font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_6px_16px_rgba(16,46,80,0.22)] disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"></path>
                    </svg>
                    <span>Please wait...</span>
                  </>
                ) : (
                  "Register"
                )}
              </button>

              <p className="text-sm text-[#102E50] text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-[#E78B48] font-semibold underline hover:text-[#BE3D2A]">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}