
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

export default function LiveChat() {
  const [textMessage, setTextMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const port = import.meta.env.VITE_PORT;
  const socketRef = useRef(null);
  const MessageEndRef = useRef(null);

  const { sender, reciver } = location.state || {};
useEffect(() => {
  if (!sender || !reciver) return;

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:${port}/api/getmessages`, {
        params: { senderId: sender.user_id, receiveId: reciver.user_id },
      });
      setMessages(res.data);
      console.log("Fetched messages:", res.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchMessages();

  const interval = setInterval(fetchMessages, 5000); 

  return () => clearInterval(interval); 
}, [sender, reciver]);

  useEffect(() => {
    if (!sender) return;

    socketRef.current = io("http://localhost:3001");

    socketRef.current.emit("register", sender.user_id);

    socketRef.current.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [sender]);

  const sendMessage = async () => {
    const messageData = {
      senderId: sender.user_id,
      receiveId: reciver.user_id,
      text: textMessage,
    };
    const newMessage = { ...messageData, time: new Date() };
    setMessages((prev) => [...prev, newMessage]);
    if (socketRef.current) {
      socketRef.current.emit("send-message", messageData);

      // setMessages(prev => [...prev, messageData]);
    }
    try {
      await axios.post("http://localhost:3001/api/send-messages", messageData);
      setTextMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  console.log("asdasd", messages);

  return (
    <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#FFF6E9] border border-[#F5C45E]/60 shadow-[0_18px_40px_rgba(16,46,80,0.15)]">
      <h2 className="text-sm font-semibold mb-4 text-[#FFF6E9] bg-[#102E50] px-4 py-2 rounded-xl tracking-wide shadow-[0_10px_20px_rgba(16,46,80,0.25)]">
        Chat with{" "}
        <span className="text-[#F5C45E]">
          {messages.length > 0
            ? messages[0].sender_id === sender.user_id
              ? messages[0].receiver_name
              : messages[0].sender_name
            : "Receiver"}
        </span>
      </h2>

      <div className="border border-[#F5C45E]/70 rounded-2xl p-3 h-64 overflow-y-auto mb-4 flex flex-col gap-2 bg-white/70 backdrop-blur-sm shadow-inner">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`px-3 py-2 rounded-2xl text-sm leading-relaxed shadow-[0_6px_14px_rgba(16,46,80,0.10)] ${
              msg.senderId === sender.user_id
                ? "bg-gradient-to-r from-[#BE3D2A] to-[#E78B48] text-[#FFF6E9] self-end rounded-tr-sm"
                : "bg-white text-[#102E50] border border-[#F5C45E]/60 self-start rounded-tl-sm"
            }`}
          >
            <div
              className={`text-[11px] font-semibold mb-1 ${
                msg.senderId === sender.user_id
                  ? "text-[#FFF6E9]/90"
                  : "text-[#102E50]/80"
              }`}
            >
              {msg.sender_name}
            </div>
            <div className="text-[15px]">{msg.text}</div>
            <div
              className={`text-[11px] mt-1 ${
                msg.senderId === sender.user_id
                  ? "text-[#FFF6E9]/70"
                  : "text-[#102E50]/60"
              }`}
            >
              {new Date(msg.created_at).toLocaleTimeString()}
              <div ref={MessageEndRef} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
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
