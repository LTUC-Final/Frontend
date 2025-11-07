import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ChatBox from "../Ai/chatBox";
export default function ChatBoot() {
  const location = useLocation();
  const path = location.pathname;

  const allowedPaths = [
    "/",
    "/userDashboard",
    "/cart",
    "/profile",
    "/providerDashboard",
    "/mainDashBoard",
    "/favorite",
    "/productdatails",
    "/userDashboard",
    "/requestProvider",
    "/orderCustomer",
    "/About",
    "/messages",
    "/payments",
    "/paymentsProvider",
    "/success",
    "/cancel",
  ];

  const showChat =
    allowedPaths.includes(path) ||
    path.startsWith("/profile/") ||
    path.startsWith("/prodactInfo/") ||
    path.startsWith("/LiveChat/");

  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      {showChat && (
        <>
          <button
            onClick={() => setIsOpen(true)}
            className={`fixed bottom-8 right-8 h-16 w-16 rounded-full bg-gradient-to-br from-[#102E50] to-[#102E50]/90 text-[#F5C45E] shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(245,196,94,0.5)] hover:from-[#F5C45E] hover:to-[#E78B48] hover:text-[#102E50] z-50 ${
              isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            <MessageCircle size={24} />
          </button>

          <ChatBox isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
      )}
    </>
  );
}
