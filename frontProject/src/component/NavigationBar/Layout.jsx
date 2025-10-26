import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import NavigationBar from "./NavigationBar";

export default function Layout({ children, cartCount }) {
  const OurValue = useRef(null);
  const Client = useRef(null);
  const Partner = useRef(null);
  const Owners = useRef(null);
  const AboutCompany = useRef(null);
  const location = useLocation();

  const scrollToComponent = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const hideNavRoutes = ["/login", "/register", "/mainDashBoard"];
  const shouldHideNav = hideNavRoutes.includes(location.pathname.toLowerCase());

  const [admin, setAdmin] = useState(
    localStorage.getItem("typeOfUser") === "Admin"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setAdmin(localStorage.getItem("typeOfUser") === "Admin");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!shouldHideNav && (
        <NavigationBar
          cartCount={cartCount}
          onScroll={(section) => {
            if (section === "Partner") scrollToComponent(Partner);
            else if (section === "Client") scrollToComponent(Client);
            else if (section === "OurValue") scrollToComponent(OurValue);
            else if (section === "Owners") scrollToComponent(Owners);
            else if (section === "AboutCompany")
              scrollToComponent(AboutCompany);
          }}
        />
      )}

      {/* Main content - no extra padding needed since nav is sticky */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
