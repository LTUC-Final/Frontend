// "use client"

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavigationBar.css";

export default function NavigationBar({ onScroll }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const navItems = [
  //   { name: "Home", href: "/" },
  //   { name: "Profile", href: "/profile" },
  //   { name: "Dashboard", href: "/dashboard" },
  //   { name: "About", href: "/about" },
  //   { name: "Login", href: "/login" },
  // ];

  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "Profile",
      href: "/profile",
      subItems: [
        { name: "About ALmersal", href: "/profile/edit" },
        { name: "Settings", href: "/profile/settings" },
      ],
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      subItems: [
        { name: "Our Value", href: "/dashboard/OurValue", section: "OurValue" },
        { name: "Client", href: "/dashboard/Client", section: "Client" },
        { name: "Partner", href: "/dashboard/Partner", section: "Partner" },
      ],
    },
    {
      name: "About",
      href: "/about",
      subItems: [
        { name: "Owners ", href: "/about/owners", section: "Owners" },
        {
          name: "About Company ",
          href: "/about/aboutCopany",
          section: "AboutCompany",
        },
      ],
    },
    { name: "Log out", href: "/logout" },
  ];

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <div className="logo-section">
          <div className="logo-wrapper">
            <img src="/images/logoM.png" alt="Logo" className="logo-image" />
          </div>
          {/* <h1 className="logo-text">ModernApp</h1> */}
        </div>

        {/* <div className="nav-links-desktop">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`nav-link ${
                location.pathname === item.href ? "active" : ""
              }`}
            >
              <span className="nav-link-text">{item.name}</span>
              <div className="nav-link-glow"></div>
            </Link>
          ))}
        </div> */}
        <div className="nav-links-desktop">
          {navItems.map((item) => (
            <div className="nav-item-with-dropdown" key={item.name}>
              <Link
                onClick={() => onScroll?.(item.section)}
                to={item.href}
                className={`nav-link ${
                  location.pathname === item.href ? "active" : ""
                }`}
              >
                <span className="nav-link-text">{item.name}</span>
                <div className="nav-link-glow"></div>
              </Link>

              {/* Submenu if exists */}
              {item.subItems && (
                <div className="dropdown-menu">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.href}
                      className="dropdown-item"
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
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`hamburger ${isMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`nav-links-mobile ${isMenuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`nav-link-mobile ${
              location.pathname === item.href ? "active" : ""
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
