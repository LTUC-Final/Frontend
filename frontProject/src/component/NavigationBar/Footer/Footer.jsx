import { Building, Mail, Phone } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer({ showExtraLinks }) {
  return (
    <div className="bg-gradient-to-br from-[#4335A7] via-[#4335A7] to-[#80C4E9] text-[#FFF6E9] py-12 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Animated background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF7F3E] opacity-10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#80C4E9] opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Top gradient stripe with animation */}
      <div className="w-full h-1 bg-gradient-to-r from-[#FF7F3E] via-[#80C4E9] to-[#FFF6E9] mb-8 animate-jordan-border shadow-lg"></div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative z-10">
        {/* Column 1: Logo & Description */}
        <div className="flex flex-col gap-6">
          <img
            src="/images/logoM.png"
            alt="Logo"
            className="w-44 hover:scale-105 transition-transform duration-300 drop-shadow-lg"
          />
          <p className="text-[#FFF6E9] text-sm leading-relaxed border-l-4 border-[#80C4E9] pl-4 hover:border-[#FF7F3E] transition-colors duration-300">
            We are a platform dedicated to empowering skilled professionals and artisans to showcase their products and
            services effectively, while connecting customers directly with providers.
          </p>
        </div>

        {/* Column 2: Services */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-[#FF7F3E] border-b-2 border-[#FF7F3E] pb-2 inline-block">
            Services
          </h2>
          <ul className="flex flex-col gap-3 text-[#FFF6E9] mt-4">
            <li>
              <Link
                to="#"
                className="flex items-center gap-2 hover:text-[#80C4E9] hover:translate-x-2 transition-all duration-300 group"
              >
                <span className="text-[#FF7F3E] font-bold group-hover:scale-125 transition-transform">»»</span>
                Service Overview
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center gap-2 hover:text-[#80C4E9] hover:translate-x-2 transition-all duration-300 group"
              >
                <span className="text-[#FF7F3E] font-bold group-hover:scale-125 transition-transform">»»</span>
                OMARs
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-[#80C4E9] border-b-2 border-[#80C4E9] pb-2 inline-block">
            Quick Links
          </h2>
          <ul className="flex flex-col gap-3 text-[#FFF6E9] mt-4">
            {["Home", "About Us", "Solutions", "Contact"].map((link) => (
              <li key={link}>
                <Link
                  to="#"
                  className="flex items-center gap-2 hover:text-[#FF7F3E] hover:translate-x-2 transition-all duration-300 group"
                >
                  <span className="text-[#80C4E9] font-bold group-hover:scale-125 transition-transform">»»</span>
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-[#FFF6E9] border-b-2 border-[#FFF6E9] pb-2 inline-block">
            Contact
          </h2>
          <ul className="flex flex-col gap-3 text-[#FFF6E9] mt-4">
            <li className="flex items-center gap-2 hover:text-[#80C4E9] transition-colors duration-300">
              <Phone className="w-4 h-4 text-[#FF7F3E]" /> +96200000000
            </li>
            <li className="flex items-center gap-2 hover:text-[#80C4E9] transition-colors duration-300">
              <Mail className="w-4 h-4 text-[#FF7F3E]" /> info@bidayamart.com
            </li>
            <li className="flex items-center gap-2 hover:text-[#80C4E9] transition-colors duration-300">
              <Building className="w-4 h-4 text-[#80C4E9]" /> Amman, Jordan
            </li>
          </ul>
        </div>
      </div>

      {/* Conditional Extra Links Section */}
      {showExtraLinks && (
        <div className="mt-8 max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-center gap-4 relative z-10">
          <p className="text-sm text-[#FFF6E9]/80 bg-[#4335A7]/50 px-4 py-2 rounded-lg backdrop-blur-sm">
            Some extra links or info for special users
          </p>
        </div>
      )}

      {/* Bottom stripe and copyright */}
      <div className="w-full h-1 bg-gradient-to-r from-[#FF7F3E] via-[#80C4E9] to-[#FFF6E9] mt-8 animate-jordan-border shadow-lg"></div>
      <div className="mt-4 max-w-7xl mx-auto text-center text-sm text-[#FFF6E9] relative z-10">
        © 2025 BidayaMart. All Rights Reserved.
      </div>
    </div>
  )
}
