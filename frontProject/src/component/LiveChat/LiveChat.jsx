import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export default function LiveChat() {
  const [textMessage, setTextMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const user = useSelector((state) => state.UserInfo);
  const location = useLocation();
  const port = import.meta.env.VITE_PORT;
  const socketRef = useRef(null);
  const MessageEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const { sender, reciver } = location.state || {};
console.log("sadasdasd",sender);
console.log("wwqq",reciver);
  console.log(sender);

  useEffect(() => {
    if (!sender || !reciver) return;
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:${port}/api/getmessages`,
          { params: { senderId: sender.user_id || sender , receiveId: reciver.user_id || reciver } }
        );
        console.log("sadasinofoinwq",res.data);
        
        setMessages(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
    const interval = setInterval(fetchMessages, 1000);
    return () => clearInterval(interval);
  }, [sender, reciver]);

  useEffect(() => {
    if (!sender) return;
    socketRef.current = io(`http://localhost:${port}`);
    socketRef.current.emit("register", sender.user_id);
    socketRef.current.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socketRef.current?.disconnect();
  }, [sender]);

  const sendMessage = async () => {
    if (!textMessage.trim()) return;
    const messageData = {
      senderId: sender.user_id || sender ,
      receiveId:reciver.user_id || reciver,
      text: textMessage,
    };
    const newMessage = { ...messageData, time: new Date() };
    setMessages((prev) => [...prev, newMessage]);
    socketRef.current?.emit("send-message", messageData);
    try {
      await axios.post(
        `http://localhost:${port}/api/send-messages`,
        messageData
      );
      setTextMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const onEmojiClick = (emojiObject) => {
    setTextMessage((prev) => prev + emojiObject.emoji);
  };

  useEffect(() => {
    const container = messageContainerRef.current;
    if (autoScroll && container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  console.log(messages);

  return (
    <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#FFF6E9] border border-[#F5C45E]/60 shadow-[0_18px_40px_rgba(16,46,80,0.15)]">
      <h2 className="text-sm font-semibold mb-4 text-[#FFF6E9] bg-[#102E50] px-4 py-2 rounded-xl">
        Chat with{" "}
        <span className="text-[#F5C45E]">{reciver?.name || "Receiver"}</span>
      </h2>

      <div
        ref={messageContainerRef}
        className="border border-[#F5C45E]/70 rounded-2xl p-3 h-64 overflow-y-auto mb-4 flex flex-col gap-2 bg-white/70 shadow-inner"
      >
        {messages.map((msg, idx) => {
          const isSender =
            msg.senderId === sender.user_id || msg.sender_id === sender.user_id;
          return (
            <div
              key={idx}
              className={`px-3 py-2 rounded-2xl text-sm leading-relaxed max-w-[80%] ${
                isSender
                  ? "bg-gradient-to-r from-[#BE3D2A] to-[#E78B48] text-[#FFF6E9] self-end"
                  : "bg-white text-[#102E50] border border-[#F5C45E]/60 self-start"
              }`}
            >
              <div className="text-xs font-semibold mb-1">
                {isSender === msg.senderId
                  ? msg.sender_name
                  : msg.receiver_name}
              </div>
              <div className="text-[15px]">{msg.text}</div>
              <div className="text-[11px] mt-1 opacity-70 text-right">
                {new Date(msg.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={MessageEndRef} />
    </div>

    <div className="flex items-center gap-2 relative">
      <button
        onClick={() => setShowEmojiPicker((prev) => !prev)}
        className="text-2xl px-2 py-1 rounded-lg bg-white hover:bg-[#F5C45E]/20 transition"
      >
        😊
      </button>

      {showEmojiPicker && (
        <div className="absolute bottom-14 left-0 z-50">
          <EmojiPicker onEmojiClick={onEmojiClick} theme="light" />
        </div>
      )}

      <input
        className="flex-1 rounded-xl px-3 py-2 text-[#102E50] bg-white placeholder-[#102E50]/50 border border-[#F5C45E]/70 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent shadow-inner"
        placeholder="Type a message..."
        value={textMessage}
        onChange={(e) => setTextMessage(e.target.value)}
      />

      <button
        className="px-4 py-2 rounded-xl text-sm font-medium text-[#FFF6E9] bg-gradient-to-r from-[#BE3D2A] to-[#E78B48] hover:brightness-110 transition shadow-[0_12px_24px_rgba(190,61,42,0.30)] active:scale-95"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  </div>
);

}
