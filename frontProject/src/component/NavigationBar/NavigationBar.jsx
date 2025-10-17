"use client"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { LogOut, UserCircle, ShoppingCart, Heart } from "lucide-react"
import Logo from "../../assets/Bidaya.png";

export default function NavigationBar({ onScroll, cartCount }) {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useSelector((state) => state.UserInfo)
  const userRole = user?.role
  const userId = user?.user_id

  const navItems = [
    { name: "Home", href: "/mainDashBoard" },
    { name: "Dashboard", href: "/providerDashboard", roles: ["provider"] },
    { name: "Dashboard", href: "/userDashboard", roles: ["customer"] },
    { name: "Requests", href: "/requestProvider", roles: ["provider"] },
    { name: "Order", href: "/orderCustomer", roles: ["customer"] },
    { name: "Favorite", href: "/favorite", roles: ["customer"] },
    { name: "Cart", href: "/cart", roles: ["customer"] },
  ]

  const navLinks = navItems.filter((item) => !item.roles || item.roles.includes(userRole))

  return (
    <nav className="sticky top-0 z-[1000] bg-[#102E50] border-b-2 border-[#F5C45E]/20 shadow-[0_4px_20px_rgba(245,196,94,0.15)]">
      <div className="flex items-center justify-between px-4 py-4 max-w-[1200px] mx-auto">
        {/* Left: Logo */}
        <div className="flex-shrink-0 ml-[-10px]">
          <Link to="/">
            <div className="w-[150px] h-[75px] p-[3px] flex items-center">
              <img src={Logo} alt="Logo" className="w-auto h-20 object-cover" />
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links (Desktop only) */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-8">
          {navLinks.map((item, index) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={index}
                to={item.href}
                onClick={() => onScroll?.(item.section)}
                className={`relative text-[#FFF6E9] text-sm font-medium transition-all duration-300 hover:text-[#F5C45E] ${
                  isActive ? "text-[#F5C45E]" : ""
                }`}
              >
                <span
                  className={`pb-1 border-b-2 transition-all duration-300 ${
                    isActive ? "border-[#F5C45E] w-full" : "border-transparent hover:border-[#F5C45E]"
                  }`}
                >
                  {item.name === "Cart" ? (
                    <div className="flex items-center gap-1">
                      <ShoppingCart className="w-5 h-5" title="Cart" />
                      {cartCount > 0 && (
                        <span className="ml-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </div>
                  ) : item.name === "Favorite" ? (
                    <Heart className="w-5 h-5 inline-block" />
                  ) : (
                    item.name
                  )}
                </span>
              </Link>
            )
          })}
        </div>

        {/* Right: Profile & Logout Icons (Desktop only) */}
        <div className="hidden md:flex items-center gap-3 mr-[-10px]">
          <Link
            to={`/profile/${userId}`}
            title="My Profile"
            className="p-2 rounded-full hover:bg-[#FFF6E9]/10 text-[#FFF6E9] hover:text-[#F5C45E] transition-colors duration-300"
          >
            <UserCircle className="w-7 h-7" />
          </Link>
          <Link
            to="/logout"
            title="Log Out"
            className="p-2 rounded-full hover:bg-[#FFF6E9]/10 text-[#FFF6E9] hover:text-[#F5C45E] transition-colors duration-300"
          >
            <LogOut className="w-7 h-7" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 bg-[#FFF6E9]/10 border border-[#F5C45E]/30 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#F5C45E]/20 hover:border-[#F5C45E]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="flex flex-col gap-1">
            <span
              className={`w-5 h-0.5 bg-[#FFF6E9] rounded-sm transition-transform duration-300 ${
                isMenuOpen ? "rotate-45 translate-x-[5px] translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-[#FFF6E9] rounded-sm transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-[#FFF6E9] rounded-sm transition-transform duration-300 ${
                isMenuOpen ? "-rotate-45 translate-x-[7px] -translate-y-[6px]" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu (text-based for clarity) */}
      <div
        className={`md:hidden flex flex-col bg-[#102E50]/98 backdrop-blur-lg border-t-2 border-[#F5C45E]/20 overflow-hidden transition-[max-height] duration-300 ${
          isMenuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        {[...navLinks, { name: "My Profile", href: `/profile/${userId}` }, { name: "Log out", href: "/logout" }].map(
          (item, index) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={index}
                to={item.href}
                className={`block px-8 py-4 text-[#FFF6E9] font-medium transition-all duration-300 border-b border-[#FFF6E9]/10 hover:bg-[#F5C45E]/20 hover:text-[#F5C45E] hover:pl-10 hover:border-l-4 hover:border-l-[#E78B48] ${
                  isActive
                    ? "bg-gradient-to-r from-[#F5C45E]/30 to-transparent text-[#F5C45E] pl-10 border-l-4 border-l-[#E78B48]"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name === "Favorite" && <Heart className="inline w-5 h-5 mr-2" />}
                {item.name}
              </Link>
            )
          }
        )}
      </div>
    </nav>
  )
}
