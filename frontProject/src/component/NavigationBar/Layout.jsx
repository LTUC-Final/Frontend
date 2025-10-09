import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import NavigationBar from "./NavigationBar";

import OrdersManagementProvider from "../../pages/request/pageReq";

import Footer from "./Footer/Footer";


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
    <div className="min-h-screen flex flex-col">
      {!shouldHideNav && (
        <NavigationBar
          cartCount={cartCount}
          onScroll={(section) => {
            if (section === "Partner") scrollToComponent(Partner);
            else if (section === "Client") scrollToComponent(Client);
            else if (section === "OurValue") scrollToComponent(OurValue);
            else if (section === "Owners") scrollToComponent(Owners);
            else if (section === "AboutCompany") scrollToComponent(AboutCompany);
          }}
        />
      )}


      {/* Main content should take up all remaining space */}
      <main className="flex-1">
        {children}
      </main>

    
    </div>
>>>>>>> f06f3b4bd7ff86bb45e4a6f45b7e355fba427158
  );
}
