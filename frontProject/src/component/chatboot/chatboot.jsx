import { MessageCircle } from "lucide-react";
import { useState } from "react";
import ChatBox from "../Ai/chatBox";

export default function ChatBoot() {
  const showChat = [
    "/",
    "/userDashboard",
    "/cart",
    "/profile",
    "/profile/:user_id",
    "/providerDashboard",
    "/mainDashBoard",
    "/favorite",
    "/productdatails",
    "/userDashboard",
    "/prodactInfo/:prodactId",
    "/requestProvider",
    "/orderCustomer",
    "/About",
  ].includes(location.pathname);
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      {showChat && (
        <>
          <button
            onClick={() => setIsOpen(true)}
            className={`fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#102E50] text-white shadow-lg flex items-center justify-center transition-transform duration-300 hover:bg-[#F5C45E] hover:text-[#102E50] ${
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
