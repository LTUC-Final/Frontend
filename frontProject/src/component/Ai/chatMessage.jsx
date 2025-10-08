export default function ChatMessage({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`flex mb-2 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white"
        }`}
      >
        {content}
      </div>
    </div>
  );
}



