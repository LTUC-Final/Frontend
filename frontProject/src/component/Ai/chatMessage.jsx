export default function ChatMessage({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`flex mb-2 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
          isUser
            ? "bg-[#E78B48] text-white rounded-br-none shadow-sm"
            : "bg-white text-[#102E50] border border-[#BE3D2A]/40 rounded-bl-none shadow-sm"
        }`}
      >
        {content}
      </div>
    </div>
  );
} 