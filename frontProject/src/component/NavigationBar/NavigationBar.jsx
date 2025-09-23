"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function NavigationBar({ onScroll }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const persisted = localStorage.getItem("persist:UserInfo");
  const { user } = useSelector((state) => state.UserInfo);
  const userRole = user?.role;
  // let userRole = null;

  // if (persisted) {
  //   try {
  //     const parsedPersist = JSON.parse(persisted);
  //     const userObj = JSON.parse(parsedPersist.user);
  //     userRole = userObj.role;
  //     console.log(userRole);
  //   } catch (err) {
  //     console.error("Failed to parse persisted user info:", err);
  //   }
  // }
  const navItems = [
    { name: "Home", href: "/mainDashBoard" },
    {
      name: "Profile",
      // href: "/profile",
      subItems: [
        { name: "ProviderProfile", href: "/providerProfile" },

        { name: "CustomerProfile", href: "/customerProfile" },
      ],
    },
    {
      name: "Dashboard",
      href: "/providerDashboard",
      // roles: ["provider"],

      // subItems: [
      //   { name: "Our Value", href: "/dashboard/OurValue", section: "OurValue" },
      //   { name: "Client", href: "/dashboard/Client", section: "Client" },
      //   { name: "Partner", href: "/dashboard/Partner", section: "Partner" },
      // ],
    },
    {
      name: "Dashboard",
      href: "/userDashboard",
      // subItems: [
      //   { name: "Our Value", href: "/dashboard/OurValue", section: "OurValue" },
      //   { name: "Client", href: "/dashboard/Client", section: "Client" },
      //   { name: "Partner", href: "/dashboard/Partner", section: "Partner" },
      // ],

      // roles: ["customer"],
    },
    {
      name: "ReqProvider",
      href: "/requestProvider",
    },
    {
      name: "Order",
      href: "/orderCustomer",
    },

    {
      name: "Favorite",
      href: "/favorite",
      // roles: ["customer"],

      // subItems: [
      //   { name: "Owners ", href: "/about/owners", section: "Owners" },
      //   {
      //     name: "About Company ",
      //     href: "/about/aboutCopany",
      //     section: "AboutCompany",
      //   },
      // ],
    },
    {
      name: "Cart",
      href: "/cart",
      // roles: ["customer"],
      // subItems: [
      //   { name: "Owners ", href: "/about/owners", section: "Owners" },
      //   {
      //     name: "About Company ",
      //     href: "/about/aboutCopany",
      //     section: "AboutCompany",
      //   },
      // ],
    },
    { name: "Log out", href: "/logout" },
  ];

  const navItem = navItems.filter(
    (item) => !item.roles || item.roles.includes(userRole)
  );
  return (
    <nav className="sticky top-0 z-[1000] bg-[#0a1931] backdrop-blur-[10px] border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between px-8 py-4 max-w-[1200px] mx-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="relative w-[150px] h-[75px] p-[3px]">
            <img
              src="/images/logoM.png"
              alt="Logo"
              className="w-full h-full object-cover animate-[spinY_5s_linear_infinite] origin-center"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItem.map((item, index) => (
            <div className="relative group" key={index}>
              <Link
                onClick={() => onScroll?.(item.section)}
                to={item.href}
                className={`
                  relative flex items-center px-6 py-3 text-white no-underline text-base font-medium 
                  rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden
                  bg-white/10 backdrop-blur-[10px] border border-white/20
                  hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(19,246,238,0.3)] 
                  hover:border-[#13f6ee] hover:text-[#13f6ee]
                  ${
                    location.pathname === item.href
                      ? "bg-gradient-to-r from-[rgba(19,246,238,0.2)] to-[rgba(0,212,255,0.2)] text-[#13f6ee] border-[#13f6ee] shadow-[0_0_20px_rgba(19,246,238,0.4)]"
                      : ""
                  }
                `}
              >
                <span className="relative z-[2]">{item.name}</span>
                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-[rgba(19,246,238,0.4)] to-transparent transition-[left] duration-500 group-hover:left-full"></div>

                {/* Active state glow effect */}
                {location.pathname === item.href && (
                  <div className="absolute -top-0.5 -left-0.5 -right-0.5 -bottom-0.5 bg-gradient-to-r from-[#13f6ee] via-[#00d4ff] to-[#13f6ee] rounded-full -z-[1] opacity-70 blur-[8px]"></div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(19,246,238,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </Link>

              {/* Dropdown Menu */}
              {item.subItems && (
                <div className="absolute left-0 hidden group-hover:block bg-[#faf9fc] backdrop-blur-[12px] border border-[rgba(226,213,235,0.15)] shadow-[0_4px_20px_rgba(0,0,0,0.2)] rounded-xl py-2 min-w-[180px] z-[999] transition-all duration-500">
                  {item.subItems.map((subItem, index) => (
                    <Link
                      key={index}
                      to={subItem.href}
                      className="block px-6 py-3 text-[rgb(68,41,117)] no-underline text-[0.95rem] transition-all duration-[0.9s] hover:bg-[rgba(101,74,163)] hover:text-white hover:pl-8"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 bg-white/10 border border-white/20 rounded-lg cursor-pointer transition-all duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="flex flex-col gap-1">
            <span
              className={`w-5 h-0.5 bg-white transition-all duration-300 rounded-sm ${
                isMenuOpen
                  ? "rotate-45 translate-x-[5px] translate-y-[5px]"
                  : ""
              }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-white transition-all duration-300 rounded-sm ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-white transition-all duration-300 rounded-sm ${
                isMenuOpen
                  ? "-rotate-45 translate-x-[7px] -translate-y-[6px]"
                  : ""
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden flex flex-col bg-[rgba(102,126,234,0.95)] backdrop-blur-[10px] border-t border-white/10 overflow-hidden transition-[max-height] duration-300 ${
          isMenuOpen ? "max-h-[300px]" : "max-h-0"
        }`}
      >
        {navItem.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className={`block px-8 py-4 text-white no-underline font-medium transition-all duration-300 border-b border-white/10 hover:bg-[rgba(19,246,238,0.2)] hover:text-[#13f6ee] hover:pl-10 ${
              location.pathname === item.href
                ? "bg-[rgba(19,246,238,0.2)] text-[#13f6ee] pl-10"
                : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
