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

  const userId = user?.user_id;
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
      name: "My Profile",
      href: `/profile/${userId}`,
    },
    // {
    //   name: "Profile",
    //   // href: "/profile",
    //   subItems: [
    //     { name: "ProviderProfile", href: "/providerProfile" },

    //     { name: "CustomerProfile", href: "/customerProfile" },
    //   ],
    // },
    {
      name: "Dashboard",
      href: "/providerDashboard",
      roles: ["provider"],

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

      roles: ["customer"],
    },
    {
      name: "ReqProvider",
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
      roles: ["customer"],
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
    <nav className="sticky top-0 z-[1000] bg-[#102E50] border-b-[1px] border-[#0f2b44] shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
      <div className="flex items-center justify-between px-8 py-4 max-w-[1200px] mx-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="relative w-[150px] h-[75px] p-[3px]">
            <img
              src="/images/logoM.png"
              alt="Logo"
              className="w-full h-full object-cover origin-center"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItem.map((item, index) => {
            const isActive = location.pathname === item.href;
            const baseClasses = `relative flex items-center px-6 py-3 text-base font-medium rounded-full transition-all duration-300 overflow-hidden`;
            const activeClasses = `bg-[#F5C45E] text-[#FFF6E9] border-transparent shadow-lg`;
            const inactiveClasses = `text-[#FFF6E9] hover:text-[#F5C45E] hover:bg-[#102E50]/30 border border-transparent`;
            const linkClasses = `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;

            return (
              <div className="relative group" key={index}>
                <Link
                  onClick={() => onScroll?.(item.section)}
                  to={item.href}
                  className={linkClasses}
                >
                  <span className="relative z-[2]">{item.name}</span>

                  {/* preserved child elements (kept structure, made non-visual) */}
                  <div className="absolute top-0 -left-full w-full h-full transition-[left] duration-500 pointer-events-none opacity-0"></div>

                  {/* active state kept via parent classes (no layered glow) */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full -z-[1] opacity-0"></div>
                  )}

                  {/* hover overlay (kept but invisible; visual handled by parent classes) */}
                  <div className="absolute inset-0 opacity-0 pointer-events-none"></div>
                </Link>

              
              
              </div>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 bg-white/10 border border-white/20 rounded-lg cursor-pointer transition-all duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="flex flex-col gap-1">
            <span
              className={`w-5 h-0.5 bg-[#FFF6E9] transition-all duration-300 rounded-sm ${
                isMenuOpen ? "rotate-45 translate-x-[5px] translate-y-[5px]" : ""
              }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-[#FFF6E9] transition-all duration-300 rounded-sm ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-[#FFF6E9] transition-all duration-300 rounded-sm ${
                isMenuOpen ? "-rotate-45 translate-x-[7px] -translate-y-[6px]" : ""
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
        {navItem.map((item, index) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={index}
              to={item.href}
              className={`block px-8 py-4 text-white no-underline font-medium transition-all duration-300 border-b border-white/10 hover:bg-[rgba(19,246,238,0.2)] hover:text-[#13f6ee] hover:pl-10 ${
                isActive
                  ? "bg-[rgba(245,196,94,0.9)] text-[#FFF6E9] pl-10"
                  : "text-[#FFF6E9]"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
