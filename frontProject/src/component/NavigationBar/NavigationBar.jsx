"use client"
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { CountRequest } from "../../contexts/CountRequestContext";
import { Home, User, LayoutDashboard, FileText, ShoppingBag, Heart, ShoppingCart, MessageSquare, LogOut, Sparkles, Info } from "lucide-react";
import Logo from "../../assets/Logo1.png"
export default function NavigationBar({ onScroll, cartCount }) {
  console.log("asdasdasd", cartCount);
  const { value } = useContext(CountRequest);
  console.log(
    "ssssssssssssssssssssssssssssssssssssssssssssssssssssssvvvvvvvvvvvssssssssssssssssss"
  );
  console.log(value);
  console.log("asdasdasd", cartCount);

  console.log(
    "ssssssssssssssssssssssssssssssssssssssssssssssssssvvvvvvvvvvvvvvvssssssssssssssss"
  );

  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.UserInfo);
  const userRole = user?.role;
  const userId = user?.user_id;

  const getIcon = (name) => {
    const iconProps = { size: 18, strokeWidth: 2.5 };
    switch (name) {
      case "Home":
        return <Home {...iconProps} />;
        case "About":
      return <Info {...iconProps} />;
      case "My Profile":
        return <User {...iconProps} />;
      case "Dashboard":
        return <LayoutDashboard {...iconProps} />;
      case "Requests":
        return <FileText {...iconProps} />;
      case "Order":
        return <ShoppingBag {...iconProps} />;
      case "Favorite":
        return <Heart {...iconProps} />;
      case "Cart":
        return <ShoppingCart {...iconProps} />;
      case "Messages":
        return <MessageSquare {...iconProps} />;
      case "Log out":
        return <LogOut {...iconProps} />;
      default:
        return null;
    }
  };

  const navItems = [
    { name: "Home", href: "/mainDashBoard" },
     { name: "About", href: "/about" },
    {
      name: "My Profile",
      href: `/profile/${userId}`,
      position: "right",
    },
    {
      name: "Dashboard",
      href: "/providerDashboard",
      roles: ["provider"],
    },
    {
      name: "Dashboard",
      href: "/userDashboard",
      roles: ["customer"],
    },
    {
      name: "Requests",
      href: "/requestProvider",
      roles: ["provider"],
    },
    {
      name: "Order",
      href: "/orderCustomer",
      roles: ["customer"],
    },
    {
      name: "Favorite",
      href: "/favorite",
      roles: ["customer"],
    },
    {
      name: "Cart",
      href: "/cart",
      roles: ["customer"],
    },
    {
      name: "Messages",
      href: "/messages",
      roles: ["customer", "provider"],
    },
    { name: "Log out", href: "/logout", position: "right" },
  ];

  const navItem = navItems.filter(
    (item) => !item.roles || item.roles.includes(userRole)
  );

  const centerItems = navItem.filter((item) => item.position !== "right");
  const rightItems = navItem.filter((item) => item.position === "right");

  return (
    <nav className="sticky top-0 z-[1000] bg-[#102E50] border-b border-[#F5C45E]/20 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1400px] mx-auto gap-8">
        {/* Logo Section - Left */}
       <div className="flex items-center gap-4">
          <div className="relative w-[150px] h-[75px] p-[3px]">
            <img
              src={Logo}
              alt="Logo"
              className="w-full h-full object-cover origin-center"
            />
          </div>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="hidden lg:flex items-center justify-center gap-6 flex-1">
          {centerItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            const linkClasses = `relative flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-all duration-300 ${
              isActive 
                ? "text-[#F5C45E]" 
                : "text-[#FFF6E9] hover:text-[#F5C45E]"
            }`;

            return (
              <div className="relative group" key={index}>
                <Link
                  onClick={() => onScroll?.(item.section)}
                  to={item.href}
                  className={linkClasses}
                >
                  {getIcon(item.name)}
                  <span>{item.name}</span>
                  {item.name === "Cart" && cartCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                      {cartCount}
                    </span>
                  )}
                  {item.name === "ReqProvider" && value > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                      {value}
                    </span>
                  )}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F5C45E] rounded-full"></div>
                  )}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Desktop Navigation - Right */}
        <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
          {rightItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            const linkClasses = `relative flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-all duration-300 ${
              isActive 
                ? "text-[#F5C45E]" 
                : "text-[#FFF6E9] hover:text-[#F5C45E]"
            }`;

            return (
              <div className="relative group" key={index}>
                <Link
                  onClick={() => onScroll?.(item.section)}
                  to={item.href}
                  className={linkClasses}
                >
                  {getIcon(item.name)}
                  <span className="hidden xl:inline">{item.name}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F5C45E] rounded-full"></div>
                  )}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 cursor-pointer transition-all duration-300 flex-shrink-0"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="flex flex-col gap-1">
            <span
              className={`w-5 h-0.5 bg-[#F5C45E] transition-all duration-300 rounded-sm ${
                isMenuOpen
                  ? "rotate-45 translate-y-[6px]"
                  : ""
              }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-[#F5C45E] transition-all duration-300 rounded-sm ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-[#F5C45E] transition-all duration-300 rounded-sm ${
                isMenuOpen
                  ? "-rotate-45 -translate-y-[6px]"
                  : ""
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden flex flex-col bg-[#102E50] border-t border-[#F5C45E]/20 overflow-hidden transition-[max-height] duration-300 ${
          isMenuOpen ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        {navItem.map((item, index) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={index}
              to={item.href}
              className={`flex items-center gap-3 px-6 py-4 no-underline font-medium transition-all duration-300 ${
                isActive
                  ? "text-[#F5C45E] bg-[#F5C45E]/10 border-l-4 border-l-[#F5C45E]"
                  : "text-[#FFF6E9] hover:text-[#F5C45E] hover:bg-[#F5C45E]/5"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {getIcon(item.name)}
              <span className="flex-1">{item.name}</span>
              {item.name === "Cart" && cartCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              {item.name === "ReqProvider" && value > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {value}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}