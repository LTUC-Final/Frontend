import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import SimpleNavBar from "./SimpleNavBar";

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
  const token = useSelector((state) => state.UserInfo.token);

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
      {!shouldHideNav &&
        (token ? (
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
        ) : (
          <SimpleNavBar
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
        ))}

      {/* Main content - no extra padding needed since nav is sticky */}
      <main className="flex-1">{children}</main>
    </div>
  );
}