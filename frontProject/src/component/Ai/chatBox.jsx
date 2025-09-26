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
      className={`fixed bottom-6 right-6 w-80 h-[400px] transform transition-all duration-300 ${
        isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
      }`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl h-full flex flex-col shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
            Quraan AI
          </h3>

          <button
            className="text-black dark:text-white hover:text-gray-600"
            onClick={() => setIsOpen(false)}
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2">
          {messages
            .filter((msgArr) => msgArr.role !== "system")
            .map((msg, i) => (
              <ChatMessage key={i} role={msg.role} content={msg.content} />
            ))}
        </div>

        {/* Input Area */}
        <div className="flex p-3 border-t border-gray-200 dark:border-gray-700">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? handleSend() : null)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md outline-none dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleSend}
            className="ml-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
