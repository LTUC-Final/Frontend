"use client";

import { Info, LayoutDashboard, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo1.png";

export default function SimpleNavBar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Main Dashboard",
      href: "/mainDashBoard",
      icon: <LayoutDashboard size={20} />,
    },
    { name: "About", href: "/About1", icon: <Info size={20} /> },
    { name: "Log In", href: "/login", icon: <LogOut size={20} /> },
  ];

  return (
    <nav className="sticky top-0 z-[500] bg-[#102E50] border-b border-[#F5C45E]/20 shadow-lg backdrop-blur-sm">
      {/* Container */}
      <div className="flex items-center justify-between px-6 py-3 max-w-[1400px] mx-auto">
        <div className="flex items-center">
          <Link to="/mainDashBoard">
            <div className="w-[130px] h-[65px]">
              <img
                src={Logo}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>

        <div>
          {" "}
          <div className="hidden lg:flex items-center gap-6 mr-2">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={index}
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "text-[#F5C45E] bg-[#F5C45E]/10 shadow-md"
                      : "text-[#FFF6E9] hover:text-[#F5C45E] hover:bg-[#F5C45E]/5"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 cursor-pointer transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="flex flex-col gap-1">
              <span
                className={`w-5 h-0.5 bg-[#F5C45E] transition-all duration-300 rounded-sm ${
                  isMenuOpen ? "rotate-45 translate-y-[6px]" : ""
                }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-[#F5C45E] transition-all duration-300 rounded-sm ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-[#F5C45E] transition-all duration-300 rounded-sm ${
                  isMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden flex flex-col bg-[#102E50] border-t border-[#F5C45E]/20 overflow-hidden transition-[max-height] duration-300 ${
          isMenuOpen ? "max-h-[400px]" : "max-h-0"
        }`}
      >
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={index}
              to={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-3 px-6 py-4 text-base font-medium transition-all duration-300 ${
                isActive
                  ? "text-[#F5C45E] bg-[#F5C45E]/10 border-l-4 border-l-[#F5C45E]"
                  : "text-[#FFF6E9] hover:text-[#F5C45E] hover:bg-[#F5C45E]/5"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
