"use client"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"

export default function NavigationBar({ onScroll, cartCount }) {
  console.log("asdasdasd", cartCount)

  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useSelector((state) => state.UserInfo)
  const userRole = user?.role
  const userId = user?.user_id

  const navItems = [
    { name: "Home", href: "/mainDashBoard" },
    {
      name: "My Profile",
      href: `/profile/${userId}`,
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
    },
    {
      name: "Cart",
      href: "/cart",
      roles: ["customer"],
    },
    {
      name: "Messages",
      href: "/messages",
      roles: ["customer","provider"],
    },
    { name: "Log out", href: "/logout" },
  ]

  const navItem = navItems.filter((item) => !item.roles || item.roles.includes(userRole))

  return (
    <nav className="sticky top-0 z-[1000] bg-[#102E50] border-b-2 border-[#F5C45E]/20 shadow-[0_4px_20px_rgba(245,196,94,0.15)]">
      <div className="flex items-center justify-between px-8 py-4 max-w-[1200px] mx-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="relative w-[150px] h-[75px] p-[3px]">
            <img src="/images/logoM.png" alt="Logo" className="w-full h-full object-cover origin-center" />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {navItem.map((item, index) => {
            const isActive = location.pathname === item.href
            const baseClasses = `relative flex items-center px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 overflow-hidden`
            const activeClasses = `bg-gradient-to-r from-[#F5C45E] to-[#E78B48] text-[#102E50] shadow-[0_4px_12px_rgba(245,196,94,0.4)]`
            const inactiveClasses = `text-[#FFF6E9] hover:text-[#F5C45E] hover:bg-[#FFF6E9]/10 border border-[#FFF6E9]/20 hover:border-[#F5C45E]/50`
            const linkClasses = `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`

            return (
              <div className="relative group" key={index}>
                <Link onClick={() => onScroll?.(item.section)} to={item.href} className={linkClasses}>
                  <span className="relative z-[2]">{item.name}</span>
                  {item.name === "Cart" && cartCount > 0 && (
                    <span className="ml-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}

                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F5C45E] to-[#E78B48] blur-md opacity-50 -z-[1]"></div>
                  )}
                </Link>
              </div>
            )
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 bg-[#FFF6E9]/10 border border-[#F5C45E]/30 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#F5C45E]/20 hover:border-[#F5C45E]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="flex flex-col gap-1">
            <span
              className={`w-5 h-0.5 bg-[#FFF6E9] transition-all duration-300 rounded-sm ${isMenuOpen ? "rotate-45 translate-x-[5px] translate-y-[5px]" : ""
                }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-[#FFF6E9] transition-all duration-300 rounded-sm ${isMenuOpen ? "opacity-0" : ""
                }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-[#FFF6E9] transition-all duration-300 rounded-sm ${isMenuOpen ? "-rotate-45 translate-x-[7px] -translate-y-[6px]" : ""
                }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden flex flex-col bg-[#102E50]/98 backdrop-blur-lg border-t-2 border-[#F5C45E]/20 overflow-hidden transition-[max-height] duration-300 ${isMenuOpen ? "max-h-[500px]" : "max-h-0"
          }`}
      >
        {navItem.map((item, index) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={index}
              to={item.href}
              className={`block px-8 py-4 text-[#FFF6E9] no-underline font-medium transition-all duration-300 border-b border-[#FFF6E9]/10 hover:bg-[#F5C45E]/20 hover:text-[#F5C45E] hover:pl-10 hover:border-l-4 hover:border-l-[#E78B48] ${isActive
                  ? "bg-gradient-to-r from-[#F5C45E]/30 to-transparent text-[#F5C45E] pl-10 border-l-4 border-l-[#E78B48]"
                  : ""
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}