// src/component/NavigationBar/Layout.jsx
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import NavigationBar from "./NavigationBar";

export default function Layout({ children }) {
  const OurValue = useRef(null);
  const Client = useRef(null);
  const Partner = useRef(null);
  const Owners = useRef(null);
  const AboutCompany = useRef(null);
  const scrollToComponent = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  const location = useLocation();

  const hideNavRoutes = ["/login", "/register", "/mainDashBoard"];

  const shouldHideNav = hideNavRoutes.includes(location.pathname.toLowerCase());
  const [admin, setAdmin] = useState(
    localStorage.getItem("typeOfUser") === "Admin"
  );

  useEffect(() => {
    // Whenever typeOfUser changes in localStorage, update the state
    const handleStorageChange = () => {
      setAdmin(localStorage.getItem("typeOfUser") === "Admin");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <>
      {!shouldHideNav && (
        <NavigationBar
          onScroll={(section) => {
            if (section === "Partner") scrollToComponent(Partner);
            else if (section === "Client") scrollToComponent(Client);
            else if (section === "OurValue ") scrollToComponent(OurValue);
            else if (section === "Owners") scrollToComponent(Owners);
            else if (section === "AboutCompany ")
              scrollToComponent(AboutCompany);
          }}
        ></NavigationBar>
      )}
      {children}
      {/* <Footer /> */}
    </>
  );
}