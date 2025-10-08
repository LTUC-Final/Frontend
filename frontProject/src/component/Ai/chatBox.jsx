import { Send, X } from "lucide-react";
import { useState } from "react";
import useChat from "../../hooks/useChat";
import ChatMessage from "./chatMessage";

export default function ChatBox({ isOpen, setIsOpen }) {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState("");

  async function handleSend() {
    if (!input.trim()) return;

    let inputM = input;
    setInput("");
    await sendMessage(inputM);
    setInput("");
  }

  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[90%] sm:w-80 h-[420px] transform transition-all duration-300 z-50 ${
        isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
      }`}
    >
      <div className="bg-[#FFF6E9] rounded-2xl h-full flex flex-col shadow-2xl overflow-hidden border border-[#F5C45E]/40">
        {/* Header */}
        <div className="flex justify-between items-center p-3 bg-[#102E50] text-white">
          <h3 className="text-base font-semibold tracking-wide">Quraan AI</h3>
          <button
            className="hover:text-[#F5C45E] transition"
            onClick={() => setIsOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-[#FFF6E9]">
          {messages
            .filter((msgArr) => msgArr.role !== "system")
            .map((msg, i) => (
              <ChatMessage key={i} role={msg.role} content={msg.content} />
            ))}
        </div>

        {/* Input Area */}
        <div className="flex p-3 border-t border-[#F5C45E]/30 bg-[#FFF6E9]">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? handleSend() : null)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 text-sm border border-[#E78B48]/40 rounded-lg outline-none bg-white focus:ring-2 focus:ring-[#F5C45E] transition text-[#102E50]"
          />
          <button
            onClick={handleSend}
            className="ml-2 p-2 bg-[#102E50] hover:bg-[#F5C45E] hover:text-[#102E50] text-white rounded-lg transition font-medium shadow-md"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
