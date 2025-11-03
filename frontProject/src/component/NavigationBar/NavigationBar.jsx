"use client";

import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import {
  CreditCard,
  FileText,
  Heart,
  Home,
  Info,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";
import Logo from "../../assets/Logo1.png";
import { CountRequest } from "../../contexts/CountRequestContext";

export default function NavigationBar({ onScroll }) {
  const cartCount = useSelector((state) => state.UserInfo.cartItem);
  console.log("asdasdasd", cartCount);
  const { value } = useContext(CountRequest);
  const ReqCount = useSelector((state) => state.UserInfo.reqItem);

  console.log(
    "ssssssssssssssssssssssssssssssssssssssssssssssssssssssvvvvvvvvvvvssssssssssssssssss"
  );
  console.log("ReqCount", ReqCount);
  console.log("value", value);
  console.log("asdasdasd", cartCount);

  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.UserInfo);
  const userRole = user?.role;
  const userId = user?.user_id;

  const getIcon = (name, isTopNav = false) => {
    const iconProps = isTopNav
      ? { size: 22, strokeWidth: 2.5 }
      : { size: 18, strokeWidth: 2.5 };
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
      case "Payment":
        return <CreditCard {...iconProps} />;
      default:
        return null;
    }
  };

  const navItems = [
    { name: "Home", href: "/mainDashBoard" },
    { name: "About", href: "/About" },
    { name: "My Profile", href: `/profile/${userId}`, position: "right" },
    { name: "Dashboard", href: "/providerDashboard", roles: ["provider"] },
    { name: "Dashboard", href: "/userDashboard", roles: ["customer"] },
    { name: "Requests", href: "/requestProvider", roles: ["provider"] },
    { name: "Order", href: "/orderCustomer", roles: ["customer"] },
    { name: "Favorite", href: "/favorite", roles: ["customer"] },
    { name: "Cart", href: "/cart", roles: ["customer"] },
    {
      name: "Payment",
      href: "/payments",
      roles: ["customer"],
    },
    {
      name: "Payment",
      href: "/paymentsProvider",
      roles: ["provider"],
    },
    { name: "Messages", href: "/messages", roles: ["customer", "provider"] },
    { name: "Log out", href: "/logout", position: "right" },
  ];
  // const navItem = navItems
  // .filter((item) => !item.roles || item.roles.includes(userRole))
  // .filter((item) => item.name !== "Messages" && item.name !== "Requests");


  const navItem = navItems.filter(
    (item) => !item.roles || item.roles.includes(userRole)
  );

  // Left items: Dashboard, Home, About
  const leftItems = navItem.filter(
    (item) =>
      item.name === "Dashboard" || item.name === "Home" || item.name === "About" || item.name == "Messages" || item.name == "Requests" || item.name == "Cart"
  );

  // Sidebar items: Everything except Dashboard, Home, About
  const sidebarItems = navItem.filter(
    (item) =>
      item.name !== "Dashboard" && item.name !== "Home" && item.name !== "About" && item.name !== "Messages" && item.name !== "Requests" && item.name !== "Cart"
  );

  return (
    <>
      <nav className="sticky top-0 z-[500] bg-[#102E50] border-b border-[#F5C45E]/20 shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-1.5 max-w-full mx-auto">
          {/* Left Section: Logo */}
          <div className="flex items-center">
            <Link to="/mainDashBoard">
              <div className="relative w-[150px] h-[75px] p-[3px]">
                <img
                  src={Logo}
                  alt="Logo"
                  className="w-full h-full object-cover origin-center cursor-pointer"
                />
              </div>
            </Link>
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Right Section: Dashboard, Home, About */}
          <div className="hidden lg:flex items-center gap-8">
            {leftItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              const linkClasses = `relative flex items-center gap-5 px-5 py-3 text-base font-normal transition-all duration-300 rounded-lg ${isActive
                  ? "text-[#F5C45E] bg-[#F5C45E]/10 shadow-md"
                  : "text-[#FFF6E9] hover:text-[#F5C45E] hover:bg-[#F5C45E]/5 hover:shadow-md"
                } ml-4`;

              return (
                <div className="relative group" key={index}>
                  <Link
                    onClick={() => onScroll?.(item.section)}
                    to={item.href}
                    className={linkClasses}
                  >
                    {getIcon(item.name, true)}

                    {item.name !== "Messages" && item.name !=="Requests" && item.name !== "Cart"&& (<span className="flex-1">{item.name}</span>)}
                    {item.name === "Cart" && cartCount > 0 && (
               <span className="absolute -top-[2px] right-1/2 translate-x-[24px] translate-y-[4px] bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
  {cartCount}
</span>
                )}
                {item.name === "Requests" && ReqCount > 0 && (
                  <span className="absolute -top-[2px] right-1/2 translate-x-[24px] translate-y-[4px] bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {ReqCount}
                  </span>
                )}
                
                    {isActive && (
                      <div className="absolute -bottom-1 left-0 right-0 h-1 bg-[#F5C45E] rounded-full shadow-lg"></div>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Right Section: Profile Icon */}
          <div className="hidden lg:block relative ml-8">
            <div
              className="relative flex items-center justify-center w-14 h-14 cursor-pointer group"
              onMouseEnter={() => setIsSidebarOpen(true)}
              onMouseLeave={() => setIsSidebarOpen(false)}
            >
              {/* Animated gradient ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>

              {/* Inner circle */}
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#102E50] border-2 border-[#F5C45E]/30 group-hover:border-[#F5C45E] transition-all duration-300 shadow-lg">
                <User
                  size={22}
                  strokeWidth={2.5}
                  className="text-[#F5C45E] group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 cursor-pointer transition-all duration-300 flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="flex flex-col gap-1">
              <span
                className={`w-5 h-0.5 bg-[#F5C45E] transition-all duration-300 rounded-sm ${isMenuOpen ? "rotate-45 translate-y-[6px]" : ""
                  }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-[#F5C45E] transition-all duration-300 rounded-sm ${isMenuOpen ? "opacity-0" : ""
                  }`}
              ></span>
              <span
                className={`w-5 h-0.5 bg-[#F5C45E] transition-all duration-300 rounded-sm ${isMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
                  }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden flex flex-col bg-[#102E50] border-t border-[#F5C45E]/20 overflow-hidden transition-[max-height] duration-300 ${isMenuOpen ? "max-h-[600px]" : "max-h-0"
            }`}
        >
          {navItem.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={index}
                to={item.href}
                className={`flex items-center gap-3 px-6 py-4 no-underline font-medium transition-all duration-300 ${isActive
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
                {item.name === "Requests" && ReqCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {ReqCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Sidebar Navigation - Desktop Only */}
      <div
        className={`hidden lg:block fixed top-0 right-0 h-full w-72 bg-[#102E50] shadow-2xl transition-transform duration-300 z-[999] border-t-2 border-transparent ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{
          borderImage: "linear-gradient(to right, #F5C45E, #E78B48, #BE3D2A) 1",
        }}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <div className="flex flex-col h-full pt-20 pb-6">
          {/* Sidebar Items */}
          <div className="flex-1 overflow-y-auto py-6">
            {sidebarItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={index}
                  to={item.href}
                  className={`flex items-center gap-4 px-6 py-4 no-underline font-medium transition-all duration-300 relative ${isActive
                      ? "text-[#F5C45E] bg-[#F5C45E]/10"
                      : "text-[#FFF6E9] hover:text-[#F5C45E] hover:bg-[#F5C45E]/5"
                    }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {isActive && (
                    <div
                      className="absolute left-0 right-0 bottom-0 h-0.5"
                      style={{
                        background:
                          "linear-gradient(to right, #F5C45E, #E78B48, #BE3D2A)",
                      }}
                    ></div>
                  )}
                  <div className="relative">
                    {getIcon(item.name)}
                    {item.name === "Cart" && cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                        {cartCount}
                      </span>
                    )}
                    {item.name === "Requests" && ReqCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                        {ReqCount}
                      </span>
                    )}
                  </div>
                  {item.name !== "Messages" && item.name !== "Requests"&& item.name !== "Cart" &&(<span className="flex-1">{item.name}</span>)}
                  
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="hidden lg:block fixed inset-0 bg-black/20 z-[998]"
          onMouseEnter={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}

// "use client";
// import {
//   FileText,
//   Heart,
//   Home,
//   Info,
//   LayoutDashboard,
//   LogOut,
//   MessageSquare,
//   ShoppingBag,
//   ShoppingCart,
//   User,
// } from "lucide-react";
// import { useContext, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link, useLocation } from "react-router-dom";
// import Logo from "../../assets/Logo1.png";
// import { CountRequest } from "../../contexts/CountRequestContext";
// export default function NavigationBar({ onScroll }) {
//   const cartCount = useSelector((state) => state.UserInfo.cartItem);
//   console.log("asdasdasd", cartCount);
//   const { value } = useContext(CountRequest);
//   const ReqCount = useSelector((state) => state.UserInfo.reqItem);

//   console.log(
//     "ssssssssssssssssssssssssssssssssssssssssssssssssssssssvvvvvvvvvvvssssssssssssssssss"
//   );
//   console.log("value", value);
//   console.log("asdasdasd", cartCount);

//   console.log(
//     "ssssssssssssssssssssssssssssssssssssssssssssssssssvvvvvvvvvvvvvvvssssssssssssssss"
//   );

//   const location = useLocation();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { user } = useSelector((state) => state.UserInfo);
//   const userRole = user?.role;
//   const userId = user?.user_id;

//   const getIcon = (name) => {
//     const iconProps = { size: 18, strokeWidth: 2.5 };
//     switch (name) {
//       case "Home":
//         return <Home {...iconProps} />;
//       case "About":
//         return <Info {...iconProps} />;
//       case "My Profile":
//         return <User {...iconProps} />;
//       case "Dashboard":
//         return <LayoutDashboard {...iconProps} />;
//       case "Requests":
//         return <FileText {...iconProps} />;
//       case "Order":
//         return <ShoppingBag {...iconProps} />;
//       case "Favorite":
//         return <Heart {...iconProps} />;
//       case "Cart":
//         return <ShoppingCart {...iconProps} />;
//       case "Messages":
//         return <MessageSquare {...iconProps} />;
//       case "Log out":
//         return <LogOut {...iconProps} />;
//       default:
//         return null;
//     }
//   };

//   const navItems = [
//     { name: "Home", href: "/mainDashBoard" },
//     {
//       name: "My Profile",
//       href: `/profile/${userId}`,
//       position: "right",
//     },
//     {
//       name: "About",
//       href: `/About`,
//     },
//     {
//       name: "Dashboard",
//       href: "/providerDashboard",
//       roles: ["provider"],
//     },
//     {
//       name: "Dashboard",
//       href: "/userDashboard",
//       roles: ["customer"],
//     },
//     {
//       name: "Requests",
//       href: "/requestProvider",
//       roles: ["provider"],
//     },
//     {
//       name: "Order",
//       href: "/orderCustomer",
//       roles: ["customer"],
//     },
//     {
//       name: "Favorite",
//       href: "/favorite",
//       roles: ["customer"],
//     },
//     {
//       name: "Cart",
//       href: "/cart",
//       roles: ["customer"],
//     },
//     {
//       name: "Payment",
//       href: "/payments",
//       roles: ["customer"],
//     },
//     {
//       name: "Payment",
//       href: "/paymentsProvider",
//       roles: ["provider"],
//     },
//     {
//       name: "Messages",
//       href: "/messages",
//       roles: ["customer", "provider"],
//     },
//     { name: "Log out", href: "/logout", position: "right" },
//   ];

//   const navItem = navItems.filter(
//     (item) => !item.roles || item.roles.includes(userRole)
//   );

//   const centerItems = navItem.filter((item) => item.position !== "right");
//   const rightItems = navItem.filter((item) => item.position === "right");

//   return (
//     <nav className="sticky top-0 z-[1000] bg-[#102E50] border-b border-[#F5C45E]/20 shadow-lg backdrop-blur-sm">
//       <div className="flex items-center justify-between px-6 py-4 max-w-[1400px] mx-auto gap-8">
//         {/* Logo Section - Left */}
//         <div className="flex items-center gap-4">
//           <div className="relative w-[150px] h-[75px] p-[3px]">
//             <img
//               src={Logo}
//               alt="Logo"
//               className="w-full h-full object-cover origin-center"
//             />
//           </div>
//         </div>

//         {/* Desktop Navigation - Center */}
//         <div className="hidden lg:flex items-center justify-center gap-6 flex-1">
//           {centerItems.map((item, index) => {
//             const isActive = location.pathname === item.href;
//             const linkClasses = `relative flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-all duration-300 ${
//               isActive
//                 ? "text-[#F5C45E]"
//                 : "text-[#FFF6E9] hover:text-[#F5C45E]"
//             }`;

//             return (
//               <div className="relative group" key={index}>
//                 <Link
//                   onClick={() => onScroll?.(item.section)}
//                   to={item.href}
//                   className={linkClasses}
//                 >
//                   {getIcon(item.name)}
//                   <span>{item.name}</span>
//                   {item.name === "Cart" && cartCount > 0 && (
//                     <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
//                       {cartCount}
//                     </span>
//                   )}
//                   {item.name === "Requests" && ReqCount > 0 && (
//                     <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
//                       {ReqCount}
//                     </span>
//                   )}
//                   {isActive && (
//                     <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F5C45E] rounded-full"></div>
//                   )}
//                 </Link>
//               </div>
//             );
//           })}
//         </div>

//         {/* Desktop Navigation - Right */}
//         <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
//           {rightItems.map((item, index) => {
//             const isActive = location.pathname === item.href;
//             const linkClasses = `relative flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-all duration-300 ${
//               isActive
//                 ? "text-[#F5C45E]"
//                 : "text-[#FFF6E9] hover:text-[#F5C45E]"
//             }`;

//             return (
//               <div className="relative group" key={index}>
//                 <Link
//                   onClick={() => onScroll?.(item.section)}
//                   to={item.href}
//                   className={linkClasses}
//                 >
//                   {getIcon(item.name)}
//                   <span className="hidden xl:inline">{item.name}</span>
//                   {isActive && (
//                     <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F5C45E] rounded-full"></div>
//                   )}
//                 </Link>
//               </div>
//             );
//           })}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="lg:hidden flex flex-col justify-center items-center w-10 h-10 cursor-pointer transition-all duration-300 flex-shrink-0"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           <div className="flex flex-col gap-1">
//             <span
//               className={`w-5 h-0.5 bg-[#F5C45E] transition-all duration-300 rounded-sm ${
//                 isMenuOpen ? "rotate-45 translate-y-[6px]" : ""
//               }`}
//             ></span>
//             <span
//               className={`w-5 h-0.5 bg-[#F5C45E] transition-all duration-300 rounded-sm ${
//                 isMenuOpen ? "opacity-0" : ""
//               }`}
//             ></span>
//             <span
//               className={`w-5 h-0.5 bg-[#F5C45E] transition-all duration-300 rounded-sm ${
//                 isMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
//               }`}
//             ></span>
//           </div>
//         </button>
//       </div>

//       {/* Mobile Navigation */}
//       <div
//         className={`lg:hidden flex flex-col bg-[#102E50] border-t border-[#F5C45E]/20 overflow-hidden transition-[max-height] duration-300 ${
//           isMenuOpen ? "max-h-[600px]" : "max-h-0"
//         }`}
//       >
//         {navItem.map((item, index) => {
//           const isActive = location.pathname === item.href;
//           return (
//             <Link
//               key={index}
//               to={item.href}
//               className={`flex items-center gap-3 px-6 py-4 no-underline font-medium transition-all duration-300 ${
//                 isActive
//                   ? "text-[#F5C45E] bg-[#F5C45E]/10 border-l-4 border-l-[#F5C45E]"
//                   : "text-[#FFF6E9] hover:text-[#F5C45E] hover:bg-[#F5C45E]/5"
//               }`}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {getIcon(item.name)}
//               <span className="flex-1">{item.name}</span>
//               {item.name === "Cart" && cartCount > 0 && (
//                 <span className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//               {item.name === "Requests" && ReqCount > 0 && (
//                 <span className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
//                   {ReqCount}
//                 </span>
//               )}
//             </Link>
//           );
//         })}
//       </div>
//     </nav>
//   );
// }
