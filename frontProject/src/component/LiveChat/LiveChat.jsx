// import axios from "axios";
// import EmojiPicker from "emoji-picker-react";
// import { useEffect, useRef, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";

// export default function LiveChat() {
//   const [textMessage, setTextMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const user = useSelector((state) => state.UserInfo);
//   const location = useLocation();
//   const port = import.meta.env.VITE_PORT;
//   const socketRef = useRef(null);
//   const MessageEndRef = useRef(null);
//   const messageContainerRef = useRef(null);
//   const [autoScroll, setAutoScroll] = useState(true);
//   const { sender, reciver } = location.state || {};
// console.log("sadasdasd",sender);
// console.log("wwqq",reciver);
// console.log("hello omar ");

//   useEffect(() => {
//     if (!sender || !reciver) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:${port}/api/getmessages`,
//           { params: { senderId: sender.user_id || sender , receiveId: reciver.user_id || reciver } }
//         );
//         console.log("sadasinofoinwq",res.data);
        
//         setMessages(res.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 1000);
//     return () => clearInterval(interval);
//   }, [sender, reciver]);

//   useEffect(() => {
//     if (!sender) return;
//     socketRef.current = io(`http://localhost:${port}`);
//     socketRef.current.emit("register", sender.user_id);
//     socketRef.current.on("receive_message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });
//     return () => socketRef.current?.disconnect();
//   }, [sender]);

//   const sendMessage = async () => {
//     if (!textMessage.trim()) return;
//     const messageData = {
//       senderId: sender.user_id || sender ,
//       receiveId:reciver.user_id || reciver,
//       text: textMessage,
//     };
//     const newMessage = { ...messageData, time: new Date() };
//     setMessages((prev) => [...prev, newMessage]);
//     socketRef.current?.emit("send-message", messageData);
//     try {
//       await axios.post(
//         `http://localhost:${port}/api/send-messages`,
//         messageData
//       );
//       setTextMessage("");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const onEmojiClick = (emojiObject) => {
//     setTextMessage((prev) => prev + emojiObject.emoji);
//   };

//   useEffect(() => {
//     const container = messageContainerRef.current;
//     if (autoScroll && container) {
//       container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
//     }
//   }, [messages]);

//   console.log(messages);

//   return (
//     <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#FFF6E9] border border-[#F5C45E]/60 shadow-[0_18px_40px_rgba(16,46,80,0.15)]">
//       <h2 className="text-sm font-semibold mb-4 text-[#FFF6E9] bg-[#102E50] px-4 py-2 rounded-xl">
//         Chat with{" "}
//         <span className="text-[#F5C45E]">{reciver?.name ||(reciver?.firstname && reciver?.lastname ? `${reciver.firstname} ${reciver.lastname}` : null)|| "Receiver"}</span>
//       </h2>

//       <div
//         ref={messageContainerRef}
//         className="border border-[#F5C45E]/70 rounded-2xl p-3 h-64 overflow-y-auto mb-4 flex flex-col gap-2 bg-white/70 shadow-inner"
//       >
//         {messages.map((msg, idx) => {
//           const isSender =
//             msg.senderId === sender.user_id || msg.sender_id === sender.user_id;
//           return (
//             <div
//               key={idx}
//               className={`px-3 py-2 rounded-2xl text-sm leading-relaxed max-w-[80%] ${
//                 isSender
//                   ? "bg-gradient-to-r from-[#BE3D2A] to-[#E78B48] text-[#FFF6E9] self-end"
//                   : "bg-white text-[#102E50] border border-[#F5C45E]/60 self-start"
//               }`}
//             >
//               <div className="text-xs font-semibold mb-1">
//                 {isSender === msg.senderId
//                   ? msg.sender_name
//                   : msg.receiver_name}
//               </div>
//               <div className="text-[15px]">{msg.text}</div>
//               <div className="text-[11px] mt-1 opacity-70 text-right">
//                 {new Date(msg.created_at).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </div>
//             </div>
//         );
//       })}
//       <div ref={MessageEndRef} />
//     </div>

//     <div className="flex items-center gap-2 relative">
//       <button
//         onClick={() => setShowEmojiPicker((prev) => !prev)}
//         className="text-2xl px-2 py-1 rounded-lg bg-white hover:bg-[#F5C45E]/20 transition"
//       >
//         😊
//       </button>

//       {showEmojiPicker && (
//         <div className="absolute bottom-14 left-0 z-50">
//           <EmojiPicker onEmojiClick={onEmojiClick} theme="light" />
//         </div>
//       )}

//       <input
//         className="flex-1 rounded-xl px-3 py-2 text-[#102E50] bg-white placeholder-[#102E50]/50 border border-[#F5C45E]/70 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent shadow-inner"
//         placeholder="Type a message..."
//         value={textMessage}
//         onChange={(e) => setTextMessage(e.target.value)}
//       />

//       <button
//         className="px-4 py-2 rounded-xl text-sm font-medium text-[#FFF6E9] bg-gradient-to-r from-[#BE3D2A] to-[#E78B48] hover:brightness-110 transition shadow-[0_12px_24px_rgba(190,61,42,0.30)] active:scale-95"
//         onClick={sendMessage}
//       >
//         Send
//       </button>
//     </div>
//   </div>
// );
// }








// import axios from "axios";
// import EmojiPicker from "emoji-picker-react";
// import { useEffect, useRef, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";

// export default function LiveChat() {
//   const [textMessage, setTextMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const user = useSelector((state) => state.UserInfo);
//   const location = useLocation();
//   const port = import.meta.env.VITE_PORT;
//   const socketRef = useRef(null);
//   const messageContainerRef = useRef(null);
//   const [autoScroll, setAutoScroll] = useState(true);
//   const [showJumpBtn, setShowJumpBtn] = useState(false);
//   const { sender, reciver } = location.state || {};

//   useEffect(() => {
//     if (!sender || !reciver) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`http://localhost:${port}/api/getmessages`, {
//           params: { senderId: sender.user_id || sender, receiveId: reciver.user_id || reciver }
//         });
//         setMessages(res.data);
//       } catch (_) {}
//     };
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 1000);
//     return () => clearInterval(interval);
//   }, [sender, reciver, port]);

//   useEffect(() => {
//     if (!sender) return;
//     socketRef.current = io(`http://localhost:${port}`);
//     socketRef.current.emit("register", sender.user_id);
//     socketRef.current.on("receive_message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });
//     return () => socketRef.current?.disconnect();
//   }, [sender, port]);

//   const sendMessage = async () => {
//     if (!textMessage.trim()) return;
//     const messageData = {
//       senderId: sender.user_id || sender,
//       receiveId: reciver.user_id || reciver,
//       text: textMessage
//     };
//     const newMessage = { ...messageData, time: new Date() };
//     setMessages((prev) => [...prev, newMessage]);
//     socketRef.current?.emit("send-message", messageData);
//     try {
//       await axios.post(`http://localhost:${port}/api/send-messages`, messageData);
//       setTextMessage("");
//     } catch (_) {}
//   };

//   const onEmojiClick = (emojiObject) => {
//     setTextMessage((prev) => prev + emojiObject.emoji);
//   };

//   useEffect(() => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     if (autoScroll) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//   }, [messages, autoScroll]);

//   const handleScroll = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
//     setAutoScroll(nearBottom);
//     setShowJumpBtn(!nearBottom && messages.length > 0);
//   };

//   const jumpToBottom = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//     setAutoScroll(true);
//     setShowJumpBtn(false);
//   };

//   const receiverName =
//     reciver?.name ||
//     (reciver?.firstname && reciver?.lastname ? `${reciver.firstname} ${reciver.lastname}` : "Receiver");
//   const receiverInitial = (receiverName || "R").toString().charAt(0).toUpperCase();

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] text-[#102E50]">
//       <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6">
//         <div className="rounded-[1.25rem] p-[1px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//           <div className="rounded-[1.2rem] bg-white">
//             <div className="flex items-center justify-between px-4 sm:px-5 py-3">
//               <div className="flex items-center gap-3">
//                 <div className="w-11 h-11 rounded-full bg-[#102E50] text-[#FFF6E9] grid place-items-center font-extrabold">
//                   {receiverInitial}
//                 </div>
//                 <div className="min-w-0">
//                   <h2 className="text-sm sm:text-base font-extrabold text-[#102E50] truncate">{receiverName}</h2>
//                   <div className="text-[11px] text-[#102E50]/70">Live chat</div>
//                 </div>
//               </div>
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white ring-1 ring-[#102E50]/10 text-[11px] text-[#102E50]">
//                 <span className="w-1.5 h-1.5 rounded-full bg-[#F5C45E]" />
//                 Secure
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           ref={messageContainerRef}
//           onScroll={handleScroll}
//           aria-live="polite"
//           className="relative mt-3 h-[64vh] overflow-y-auto rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_18px_40px_rgba(16,46,80,0.08)] p-3 sm:p-4"
//         >
//           {messages.length === 0 ? (
//             <div className="h-full grid place-items-center">
//               <div className="text-center">
//                 <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-3xl text-white font-bold">
//                   💬
//                 </div>
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white ring-1 ring-[#102E50]/10 text-[#102E50]">
//                   No messages yet
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-2">
//               {messages.map((msg, idx) => {
//                 const sId = sender?.user_id || sender;
//                 const isSender = msg.senderId === sId || msg.sender_id === sId;
//                 return (
//                   <div key={idx} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
//                     <div
//                       className={`max-w-[80%] sm:max-w-[72%] break-words rounded-2xl px-3 py-2 text-sm leading-relaxed ${
//                         isSender
//                           ? "bg-gradient-to-r from-[#BE3D2A] to-[#E78B48] text-[#FFF6E9] shadow-[0_10px_22px_rgba(190,61,42,0.25)]"
//                           : "bg-[#FFF6E9] text-[#102E50] ring-1 ring-[#F5C45E]/60"
//                       }`}
//                     >
//                       <div className="text-[15px]">{msg.text}</div>
//                       <div
//                         className={`mt-1 text-[11px] text-right ${
//                           isSender ? "text-[#FFF6E9]/90" : "text-[#102E50]/70"
//                         }`}
//                       >
//                         {new Date(msg.created_at || msg.time).toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit"
//                         })}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {showJumpBtn && (
//             <button
//               onClick={jumpToBottom}
//               className="absolute right-3 bottom-3 h-10 px-3 rounded-xl text-xs font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_10px_20px_rgba(16,46,80,0.25)]"
//             >
//               Scroll to latest
//             </button>
//           )}
//         </div>

//         <div className="mt-3 flex items-center gap-2">
//           <div className="relative">
//             <button
//               onClick={() => setShowEmojiPicker((prev) => !prev)}
//               className="grid h-10 w-10 place-items-center rounded-xl bg-white ring-1 ring-[#102E50]/10 text-xl text-[#102E50] hover:ring-[#F5C45E] transition shadow-[0_6px_14px_rgba(16,46,80,0.10)] active:scale-95"
//             >
//               😊
//             </button>
//             {showEmojiPicker && (
//               <div className="absolute bottom-12 left-0 z-50">
//                 <EmojiPicker onEmojiClick={onEmojiClick} theme="light" />
//               </div>
//             )}
//           </div>

//           <input
//             className="flex-1 rounded-xl px-3 py-2 text-[#102E50] bg-white placeholder-[#102E50]/50 border border-[#F5C45E]/70 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent shadow-inner"
//             placeholder="Type a message..."
//             value={textMessage}
//             onChange={(e) => setTextMessage(e.target.value)}
//           />

//           <button
//             onClick={sendMessage}
//             disabled={!textMessage.trim()}
//             className="h-10 px-5 rounded-xl text-sm font-semibold text-[#FFF6E9] bg-[#102E50] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_12px_24px_rgba(16,46,80,0.25)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }








// import axios from "axios";
// import EmojiPicker from "emoji-picker-react";
// import { useEffect, useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";

// export default function LiveChat() {
//   const [textMessage, setTextMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const user = useSelector((state) => state.UserInfo);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const port = import.meta.env.VITE_PORT;
//   const socketRef = useRef(null);
//   const messageContainerRef = useRef(null);
//   const [autoScroll, setAutoScroll] = useState(true);
//   const [showJumpBtn, setShowJumpBtn] = useState(false);
//   const { sender, reciver } = location.state || {};

//   useEffect(() => {
//     if (!sender || !reciver) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`http://localhost:${port}/api/getmessages`, {
//           params: { senderId: sender.user_id || sender, receiveId: reciver.user_id || reciver }
//         });
//         setMessages(res.data);
//       } catch (_) {}
//     };
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 1000);
//     return () => clearInterval(interval);
//   }, [sender, reciver, port]);

//   useEffect(() => {
//     if (!sender) return;
//     socketRef.current = io(`http://localhost:${port}`);
//     socketRef.current.emit("register", sender.user_id || sender);
//     socketRef.current.on("receive_message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });
//     return () => socketRef.current?.disconnect();
//   }, [sender, port]);

//   const sendMessage = async () => {
//     if (!textMessage.trim()) return;
//     const messageData = {
//       senderId: sender?.user_id || sender,
//       receiveId: reciver?.user_id || reciver,
//       text: textMessage
//     };
//     const newMessage = { ...messageData, time: new Date() };
//     setMessages((prev) => [...prev, newMessage]);
//     socketRef.current?.emit("send-message", messageData);
//     try {
//       await axios.post(`http://localhost:${port}/api/send-messages`, messageData);
//       setTextMessage("");
//     } catch (_) {}
//   };

//   const onEmojiClick = (emojiObject) => {
//     setTextMessage((prev) => prev + emojiObject.emoji);
//   };

//   useEffect(() => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     if (autoScroll) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//   }, [messages, autoScroll]);

//   const handleScroll = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
//     setAutoScroll(nearBottom);
//     setShowJumpBtn(!nearBottom && messages.length > 0);
//   };

//   const jumpToBottom = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//     setAutoScroll(true);
//     setShowJumpBtn(false);
//   };

//   const receiverName =
//     reciver?.name ||
//     (reciver?.firstname && reciver?.lastname ? `${reciver.firstname} ${reciver.lastname}` : "Receiver");
//   const receiverInitial = (receiverName || "R").toString().charAt(0).toUpperCase();

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] text-[#102E50]">
//       <div className="mx-auto max-w-2xl px-4 sm:px-6 py-4 sm:py-6">
//         <div className="rounded-[1.25rem] p-[1px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//           <div className="rounded-[1.2rem] bg-white">
//             <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3">
//               <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                 <button
//                   onClick={() => navigate(-1)}
//                   className="grid place-items-center w-9 h-9 rounded-xl bg-[#FFF6E9] ring-1 ring-[#102E50]/10 text-[#102E50] hover:bg-[#F5C45E]/20 transition active:scale-95"
//                   aria-label="Back"
//                 >
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                     <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </button>
//                 <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#102E50] text-[#FFF6E9] grid place-items-center font-extrabold">
//                   {receiverInitial}
//                 </div>
//                 <div className="min-w-0">
//                   <h2 className="text-sm sm:text-base font-extrabold text-[#102E50] truncate">{receiverName}</h2>
//                   <div className="text-[11px] text-[#102E50]/70">Live chat</div>
//                 </div>
//               </div>
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white ring-1 ring-[#102E50]/10 text-[11px] text-[#102E50]">
//                 <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
//                 Online
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           ref={messageContainerRef}
//           onScroll={handleScroll}
//           aria-live="polite"
//           className="relative mt-3 h-[64vh] sm:h-[68vh] overflow-y-auto rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_18px_40px_rgba(16,46,80,0.08)] p-3 sm:p-4"
//         >
//           {messages.length === 0 ? (
//             <div className="h-full grid place-items-center">
//               <div className="text-center">
//                 <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-3xl text-white font-bold">
//                   💬
//                 </div>
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white ring-1 ring-[#102E50]/10 text-[#102E50]">
//                   No messages yet
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-2">
//               {messages.map((msg, idx) => {
//                 const sId = sender?.user_id || sender;
//                 const isSender = msg.senderId === sId || msg.sender_id === sId;
//                 return (
//                   <div key={idx} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
//                     <div
//                       className={`max-w-[80%] sm:max-w-[72%] break-words rounded-2xl px-3 py-2 text-sm leading-relaxed ${
//                         isSender
//                           ? "bg-gradient-to-r from-[#BE3D2A] to-[#E78B48] text-[#FFF6E9] shadow-[0_10px_22px_rgba(190,61,42,0.25)]"
//                           : "bg-[#FFF6E9] text-[#102E50] ring-1 ring-[#F5C45E]/60"
//                       }`}
//                     >
//                       <div className="text-[15px]">{msg.text}</div>
//                       <div
//                         className={`mt-1 text-[11px] text-right ${
//                           isSender ? "text-[#FFF6E9]/90" : "text-[#102E50]/70"
//                         }`}
//                       >
//                         {new Date(msg.created_at || msg.time).toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit"
//                         })}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {showJumpBtn && (
//             <button
//               onClick={jumpToBottom}
//               className="absolute right-3 bottom-3 h-10 px-3 rounded-xl text-xs font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_10px_20px_rgba(16,46,80,0.25)]"
//             >
//               Scroll to latest
//             </button>
//           )}
//         </div>

//         <div className="mt-3 flex items-center gap-2">
//           <div className="relative">
//             <button
//               onClick={() => setShowEmojiPicker((prev) => !prev)}
//               className="grid h-10 w-10 place-items-center rounded-xl bg-white ring-1 ring-[#102E50]/10 text-xl text-[#102E50] hover:ring-[#F5C45E] transition shadow-[0_6px_14px_rgba(16,46,80,0.10)] active:scale-95"
//               aria-label="Emoji"
//             >
//               😊
//             </button>
//             {showEmojiPicker && (
//               <div className="absolute bottom-12 left-0 z-50">
//                 <EmojiPicker onEmojiClick={onEmojiClick} theme="light" />
//               </div>
//             )}
//           </div>

//           <input
//             className="flex-1 rounded-xl px-3 py-2 text-[#102E50] bg-white placeholder-[#102E50]/50 border border-[#F5C45E]/70 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent shadow-inner"
//             placeholder="Type a message..."
//             value={textMessage}
//             onChange={(e) => setTextMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && textMessage.trim()) sendMessage();
//             }}
//           />

//           <button
//             onClick={sendMessage}
//             disabled={!textMessage.trim()}
//             className="h-10 px-5 rounded-xl text-sm font-semibold text-[#FFF6E9] bg-[#102E50] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_12px_24px_rgba(16,46,80,0.25)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }













// import axios from "axios";
// import EmojiPicker from "emoji-picker-react";
// import { useEffect, useRef, useState, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";

// export default function LiveChat() {
//   const [textMessage, setTextMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showJumpBtn, setShowJumpBtn] = useState(false);
//   const [expanded, setExpanded] = useState(false);

//   const user = useSelector((s) => s.UserInfo);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const socketRef = useRef(null);
//   const messageContainerRef = useRef(null);
//   const nearBottomRef = useRef(true);
//   const lastOwnSendRef = useRef(false);

//   const { sender, reciver } = location.state || {};
//   const senderId = sender?.user_id || sender;
//   const receiverId = reciver?.user_id || reciver;

//   useEffect(() => {
//     if (!sender || !reciver) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`${apiBase}/api/getmessages`, {
//           params: { senderId, receiveId: receiverId }
//         });
//         setMessages(res.data || []);
//       } catch {}
//     };
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 1000);
//     return () => clearInterval(interval);
//   }, [apiBase, sender, reciver, senderId, receiverId]);

//   useEffect(() => {
//     if (!senderId) return;
//     socketRef.current = io(`http://localhost:${port}`);
//     socketRef.current.emit("register", senderId);
//     socketRef.current.on("receive_message", (msg) => setMessages((p) => [...p, msg]));
//     return () => socketRef.current?.disconnect();
//   }, [port, senderId]);

//   useEffect(() => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const stick = nearBottomRef.current || lastOwnSendRef.current;
//     if (stick) {
//       el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//       setShowJumpBtn(false);
//     } else {
//       setShowJumpBtn(true);
//     }
//     if (lastOwnSendRef.current) lastOwnSendRef.current = false;
//   }, [messages]);

//   const handleScroll = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
//     nearBottomRef.current = nearBottom;
//     setShowJumpBtn(!nearBottom && messages.length > 0);
//   };

//   const jumpToBottom = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//     nearBottomRef.current = true;
//     setShowJumpBtn(false);
//   };

//   const sendMessage = async () => {
//     if (!textMessage.trim() || !senderId || !receiverId) return;
//     const data = { senderId, receiveId: receiverId, text: textMessage };
//     lastOwnSendRef.current = true;
//     setMessages((p) => [...p, { ...data, time: new Date() }]);
//     try {
//       await axios.post(`${apiBase}/api/send-messages`, data);
//       setTextMessage("");
//     } catch {}
//     socketRef.current?.emit("send-message", data);
//   };

//   const onEmojiClick = (emojiObject) => setTextMessage((v) => v + emojiObject.emoji);

//   const receiverName =
//     reciver?.name ||
//     (reciver?.firstname && reciver?.lastname ? `${reciver.firstname} ${reciver.lastname}` : "Receiver");
//   const receiverInitial = (receiverName || "R").toString().charAt(0).toUpperCase();

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] text-[#102E50]">
//       <div className={[expanded ? "max-w-6xl" : "max-w-2xl", "mx-auto px-4 sm:px-6 py-4 sm:py-6"].join(" ")}>
//         <div className="rounded-[1.25rem] p-[1px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//           <div className="rounded-[1.2rem] bg-white">
//             <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3">
//               <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                 <button
//                   onClick={() => navigate(-1)}
//                   className="grid place-items-center w-9 h-9 rounded-xl bg-[#FFF6E9] ring-1 ring-[#102E50]/10 text-[#102E50] hover:bg-[#F5C45E]/20 transition active:scale-95"
//                   aria-label="Back"
//                 >
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                     <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </button>

//                 <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#102E50] text-[#FFF6E9] grid place-items-center font-extrabold">
//                   {receiverInitial}
//                 </div>
//                 <div className="min-w-0">
//                   <h2 className="text-sm sm:text-base font-extrabold text-[#102E50] truncate">
//                     {receiverName}
//                   </h2>
//                   <div className="text-[11px] text-[#102E50]/70">Live chat</div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setExpanded((v) => !v)}
//                   className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white ring-1 ring-[#102E50]/10 text-[11px] text-[#102E50] hover:bg-[#F5C45E]/10 transition"
//                 >
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     {expanded ? (
//                       <path d="M9 3H3v6M3 3l7 7M15 21h6v-6m0 6l-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     ) : (
//                       <path d="M21 9V3h-6M21 3L14 10M3 15v6h6M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     )}
//                   </svg>
//                   {expanded ? "Collapse" : "Expand"}
//                 </button>

//                 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white ring-1 ring-[#102E50]/10 text-[11px] text-[#102E50]">
//                   <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
//                   Online
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           ref={messageContainerRef}
//           onScroll={handleScroll}
//           aria-live="polite"
//           className={[
//             "relative mt-3 overflow-y-auto rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_18px_40px_rgba(16,46,80,0.08)] p-3 sm:p-4",
//             expanded ? "h-[84vh]" : "h-[68vh]"
//           ].join(" ")}
//         >
//           {messages.length === 0 ? (
//             <div className="h-full grid place-items-center">
//               <div className="text-center">
//                 <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-3xl text-white font-bold">
//                   💬
//                 </div>
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white ring-1 ring-[#102E50]/10 text-[#102E50]">
//                   No messages yet
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-2">
//               {messages.map((msg, idx) => {
//                 const isSender = msg.senderId === senderId || msg.sender_id === senderId;
//                 return (
//                   <div key={idx} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
//                     <div
//                       className={`max-w-[80%] sm:max-w-[72%] break-words rounded-2xl px-3 py-2 text-sm leading-relaxed ${
//                         isSender
//                           ? "bg-gradient-to-r from-[#BE3D2A] to-[#E78B48] text-[#FFF6E9] shadow-[0_10px_22px_rgba(190,61,42,0.25)]"
//                           : "bg-[#FFF6E9] text-[#102E50] ring-1 ring-[#F5C45E]/60"
//                       }`}
//                     >
//                       <div className="text-[15px]">{msg.text}</div>
//                       <div
//                         className={`mt-1 text-[11px] text-right ${
//                           isSender ? "text-[#FFF6E9]/90" : "text-[#102E50]/70"
//                         }`}
//                       >
//                         {new Date(msg.created_at || msg.time).toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit"
//                         })}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {showJumpBtn && (
//             <button
//               onClick={jumpToBottom}
//               className="absolute right-3 bottom-3 h-10 px-3 rounded-xl text-xs font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_10px_20px_rgba(16,46,80,0.25)]"
//             >
//               Scroll to latest
//             </button>
//           )}
//         </div>

//         <div className="mt-3 flex items-center gap-2">
//           <div className="relative">
//             <button
//               onClick={() => setShowEmojiPicker((v) => !v)}
//               className="grid h-10 w-10 place-items-center rounded-xl bg-white ring-1 ring-[#102E50]/10 text-xl text-[#102E50] hover:ring-[#F5C45E] transition shadow-[0_6px_14px_rgba(16,46,80,0.10)] active:scale-95"
//               aria-label="Emoji"
//             >
//               😊
//             </button>
//             {showEmojiPicker && (
//               <div className="absolute bottom-12 left-0 z-50">
//                 <EmojiPicker onEmojiClick={onEmojiClick} theme="light" />
//               </div>
//             )}
//           </div>

//           <input
//             className="flex-1 rounded-xl px-3 py-2 text-[#102E50] bg-white placeholder-[#102E50]/50 border border-[#F5C45E]/70 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent shadow-inner"
//             placeholder="Type a message..."
//             value={textMessage}
//             onChange={(e) => setTextMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && textMessage.trim()) sendMessage();
//             }}
//           />

//           <button
//             onClick={sendMessage}
//             disabled={!textMessage.trim()}
//             className="h-10 px-5 rounded-xl text-sm font-semibold text-[#FFF6E9] bg-[#102E50] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_12px_24px_rgba(16,46,80,0.25)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }









// import axios from "axios";
// import EmojiPicker from "emoji-picker-react";
// import { useEffect, useRef, useState, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";

// export default function LiveChat() {
//   const [textMessage, setTextMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showJumpBtn, setShowJumpBtn] = useState(false);
//   const [expanded, setExpanded] = useState(false);

//   const user = useSelector((s) => s.UserInfo);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const socketRef = useRef(null);
//   const messageContainerRef = useRef(null);
//   const nearBottomRef = useRef(true);
//   const lastOwnSendRef = useRef(false);

//   const { sender, reciver } = location.state || {};
//   const senderId = sender?.user_id || sender;
//   const receiverId = reciver?.user_id || reciver;

//   const currentUserName =
//     user?.user?.name ||
//     (user?.user?.firstname && user?.user?.lastname
//       ? `${user.user.firstname} ${user.user.lastname}`
//       : user?.user?.username || "You");

//   const receiverName =
//     reciver?.name ||
//     (reciver?.firstname && reciver?.lastname ? `${reciver.firstname} ${reciver.lastname}` : "Receiver");
//   const receiverInitial = (receiverName || "R").toString().charAt(0).toUpperCase();

//   useEffect(() => {
//     if (!sender || !reciver) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`${apiBase}/api/getmessages`, {
//           params: { senderId, receiveId: receiverId }
//         });
//         setMessages(res.data || []);
//       } catch {}
//     };
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 1000);
//     return () => clearInterval(interval);
//   }, [apiBase, sender, reciver, senderId, receiverId]);

//   useEffect(() => {
//     if (!senderId) return;
//     socketRef.current = io(`http://localhost:${port}`);
//     socketRef.current.emit("register", senderId);
//     socketRef.current.on("receive_message", (msg) => setMessages((p) => [...p, msg]));
//     return () => socketRef.current?.disconnect();
//   }, [port, senderId]);

//   useEffect(() => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const stick = nearBottomRef.current || lastOwnSendRef.current;
//     if (stick) {
//       el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//       setShowJumpBtn(false);
//     } else {
//       setShowJumpBtn(true);
//     }
//     if (lastOwnSendRef.current) lastOwnSendRef.current = false;
//   }, [messages]);

//   const handleScroll = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
//     nearBottomRef.current = nearBottom;
//     setShowJumpBtn(!nearBottom && messages.length > 0);
//   };

//   const jumpToBottom = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//     nearBottomRef.current = true;
//     setShowJumpBtn(false);
//   };

//   const sendMessage = async () => {
//     if (!textMessage.trim() || !senderId || !receiverId) return;
//     const data = { senderId, receiveId: receiverId, text: textMessage };
//     lastOwnSendRef.current = true;
//     setMessages((p) => [...p, { ...data, time: new Date() }]);
//     try {
//       await axios.post(`${apiBase}/api/send-messages`, data);
//       setTextMessage("");
//     } catch {}
//     socketRef.current?.emit("send-message", data);
//   };

//   const onEmojiClick = (emojiObject) => setTextMessage((v) => v + emojiObject.emoji);

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] text-[#102E50]">
//       <div className={[expanded ? "max-w-6xl" : "max-w-2xl", "mx-auto px-4 sm:px-6 py-4 sm:py-6"].join(" ")}>
//         <div className="rounded-[1.25rem] p-[1px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//           <div className="rounded-[1.2rem] bg-white">
//             <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3">
//               <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                 <button
//                   onClick={() => navigate(-1)}
//                   className="grid place-items-center w-9 h-9 rounded-xl bg-[#FFF6E9] ring-1 ring-[#102E50]/10 text-[#102E50] hover:bg-[#F5C45E]/20 transition active:scale-95"
//                   aria-label="Back"
//                 >
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                     <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </button>

//                 <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#102E50] text-[#FFF6E9] grid place-items-center font-extrabold">
//                   {receiverInitial}
//                 </div>
//                 <div className="min-w-0">
//                   <h2 className="text-sm sm:text-base font-extrabold text-[#102E50] truncate">
//                     {receiverName}
//                   </h2>
//                   <div className="text-[11px] text-[#102E50]/70">Live chat</div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setExpanded((v) => !v)}
//                   className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white ring-1 ring-[#102E50]/10 text-[11px] text-[#102E50] hover:bg-[#F5C45E]/10 transition"
//                 >
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     {expanded ? (
//                       <path d="M9 3H3v6M3 3l7 7M15 21h6v-6m0 6l-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     ) : (
//                       <path d="M21 9V3h-6M21 3L14 10M3 15v6h6M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     )}
//                   </svg>
//                   {expanded ? "Collapse" : "Expand"}
//                 </button>

//                 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white ring-1 ring-[#102E50]/10 text-[11px] text-[#102E50]">
//                   <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
//                   Online
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           ref={messageContainerRef}
//           onScroll={handleScroll}
//           aria-live="polite"
//           className={[
//             "relative mt-3 overflow-y-auto rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_18px_40px_rgba(16,46,80,0.08)] p-3 sm:p-4",
//             expanded ? "h-[84vh]" : "h-[68vh]"
//           ].join(" ")}
//         >
//           {messages.length === 0 ? (
//             <div className="h-full grid place-items-center">
//               <div className="text-center">
//                 <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-3xl text-white font-bold">
//                   💬
//                 </div>
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white ring-1 ring-[#102E50]/10 text-[#102E50]">
//                   No messages yet
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-2">
//               {messages.map((msg, idx) => {
//                 const isSender =
//                   msg.senderId === senderId ||
//                   msg.sender_id === senderId;

//                 const displayName = isSender
//                   ? (msg.sender_name || currentUserName || "You")
//                   : (msg.receiver_name || receiverName || "Receiver");

//                 return (
//                   <div key={idx} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
//                     <div
//                       className={`max-w-[80%] sm:max-w-[72%] break-words rounded-2xl px-3 py-2 text-sm leading-relaxed ${
//                         isSender
//                           ? "bg-gradient-to-r from-[#BE3D2A] to-[#E78B48] text-[#FFF6E9] shadow-[0_10px_22px_rgba(190,61,42,0.25)]"
//                           : "bg-[#FFF6E9] text-[#102E50] ring-1 ring-[#F5C45E]/60"
//                       }`}
//                     >
//                       <div className={`text-[11px] font-semibold mb-0.5 ${isSender ? "text-[#FFF6E9]/95" : "text-[#102E50]/80"}`}>
//                         {displayName}
//                       </div>
//                       <div className="text-[15px]">{msg.text}</div>
//                       <div
//                         className={`mt-1 text-[11px] text-right ${
//                           isSender ? "text-[#FFF6E9]/90" : "text-[#102E50]/70"
//                         }`}
//                       >
//                         {new Date(msg.created_at || msg.time).toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit"
//                         })}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {showJumpBtn && (
//             <button
//               onClick={jumpToBottom}
//               className="absolute right-3 bottom-3 h-10 px-3 rounded-xl text-xs font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_10px_20px_rgba(16,46,80,0.25)]"
//             >
//               Scroll to latest
//             </button>
//           )}
//         </div>

//         <div className="mt-3 flex items-center gap-2">
//           <div className="relative">
//             <button
//               onClick={() => setShowEmojiPicker((v) => !v)}
//               className="grid h-10 w-10 place-items-center rounded-xl bg-white ring-1 ring-[#102E50]/10 text-xl text-[#102E50] hover:ring-[#F5C45E] transition shadow-[0_6px_14px_rgba(16,46,80,0.10)] active:scale-95"
//               aria-label="Emoji"
//             >
//               😊
//             </button>
//             {showEmojiPicker && (
//               <div className="absolute bottom-12 left-0 z-50">
//                 <EmojiPicker onEmojiClick={onEmojiClick} theme="light" />
//               </div>
//             )}
//           </div>

//           <input
//             className="flex-1 rounded-xl px-3 py-2 text-[#102E50] bg-white placeholder-[#102E50]/50 border border-[#F5C45E]/70 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent shadow-inner"
//             placeholder="Type a message..."
//             value={textMessage}
//             onChange={(e) => setTextMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && textMessage.trim()) sendMessage();
//             }}
//           />

//           <button
//             onClick={sendMessage}
//             disabled={!textMessage.trim()}
//             className="h-10 px-5 rounded-xl text-sm font-semibold text-[#FFF6E9] bg-[#102E50] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_12px_24px_rgba(16,46,80,0.25)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }






// import axios from "axios";
// import EmojiPicker from "emoji-picker-react";
// import { useEffect, useRef, useState, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";

// export default function LiveChat() {
//   const [textMessage, setTextMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showJumpBtn, setShowJumpBtn] = useState(false);
//   const [expanded, setExpanded] = useState(false);

//   const user = useSelector((s) => s.UserInfo);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const socketRef = useRef(null);
//   const messageContainerRef = useRef(null);
//   const nearBottomRef = useRef(true);
//   const lastOwnSendRef = useRef(false);

//   const { sender, reciver } = location.state || {};
//   const senderId = sender?.user_id || sender;
//   const receiverId = reciver?.user_id || reciver;

//   const currentUserName =
//     user?.user?.name ||
//     (user?.user?.firstname && user?.user?.lastname
//       ? `${user.user.firstname} ${user.user.lastname}`
//       : user?.user?.username || "You");

//   const receiverName =
//     reciver?.name ||
//     (reciver?.firstname && reciver?.lastname ? `${reciver.firstname} ${reciver.lastname}` : "Receiver");
//   const receiverInitial = (receiverName || "R").toString().charAt(0).toUpperCase();

//   useEffect(() => {
//     if (!sender || !reciver) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`${apiBase}/api/getmessages`, {
//           params: { senderId, receiveId: receiverId }
//         });
//         setMessages(res.data || []);
//       } catch {}
//     };
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 1000);
//     return () => clearInterval(interval);
//   }, [apiBase, sender, reciver, senderId, receiverId]);

//   useEffect(() => {
//     if (!senderId) return;
//     socketRef.current = io(`http://localhost:${port}`);
//     socketRef.current.emit("register", senderId);
//     socketRef.current.on("receive_message", (msg) => setMessages((p) => [...p, msg]));
//     return () => socketRef.current?.disconnect();
//   }, [port, senderId]);

//   useEffect(() => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const stick = nearBottomRef.current || lastOwnSendRef.current;
//     if (stick) {
//       el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//       setShowJumpBtn(false);
//     } else {
//       setShowJumpBtn(true);
//     }
//     if (lastOwnSendRef.current) lastOwnSendRef.current = false;
//   }, [messages]);

//   const handleScroll = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
//     nearBottomRef.current = nearBottom;
//     setShowJumpBtn(!nearBottom && messages.length > 0);
//   };

//   const jumpToBottom = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//     nearBottomRef.current = true;
//     setShowJumpBtn(false);
//   };

//   const sendMessage = async () => {
//     if (!textMessage.trim() || !senderId || !receiverId) return;
//     const data = { senderId, receiveId: receiverId, text: textMessage };
//     lastOwnSendRef.current = true;
//     setMessages((p) => [...p, { ...data, time: new Date() }]);
//     try {
//       await axios.post(`${apiBase}/api/send-messages`, data);
//       setTextMessage("");
//     } catch {}
//     socketRef.current?.emit("send-message", data);
//   };

//   const onEmojiClick = (emojiObject) => setTextMessage((v) => v + emojiObject.emoji);

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] text-[#102E50]">
//       <div className={[expanded ? "max-w-6xl" : "max-w-2xl", "mx-auto px-4 sm:px-6 py-4 sm:py-6"].join(" ")}>
//         <div className="rounded-[1.25rem] p-[1px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//           <div className="rounded-[1.2rem] bg-white">
//             <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3">
//               <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                 <button
//                   onClick={() => navigate(-1)}
//                   className="grid place-items-center w-9 h-9 rounded-xl bg-[#FFF6E9] ring-1 ring-[#102E50]/10 text-[#102E50] hover:bg-[#F5C45E]/20 transition active:scale-95"
//                   aria-label="Back"
//                 >
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                     <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </button>

//                 <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#102E50] text-[#FFF6E9] grid place-items-center font-extrabold">
//                   {receiverInitial}
//                 </div>
//                 <div className="min-w-0">
//                   <h2 className="text-sm sm:text-base font-extrabold text-[#102E50] truncate">
//                     {receiverName}
//                   </h2>
//                   <div className="text-[11px] text-[#102E50]/70">Live chat</div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setExpanded((v) => !v)}
//                   className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white ring-1 ring-[#102E50]/10 text-[11px] text-[#102E50] hover:bg-[#F5C45E]/10 transition"
//                 >
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     {expanded ? (
//                       <path d="M9 3H3v6M3 3l7 7M15 21h6v-6m0 6l-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     ) : (
//                       <path d="M21 9V3h-6M21 3L14 10M3 15v6h6M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     )}
//                   </svg>
//                   {expanded ? "Collapse" : "Expand"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           ref={messageContainerRef}
//           onScroll={handleScroll}
//           aria-live="polite"
//           className={[
//             "relative mt-3 overflow-y-auto rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_18px_40px_rgba(16,46,80,0.08)] p-3 sm:p-4",
//             expanded ? "h-[84vh]" : "h-[68vh]"
//           ].join(" ")}
//         >
//           {messages.length === 0 ? (
//             <div className="h-full grid place-items-center">
//               <div className="text-center">
//                 <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-3xl text-white font-bold">
//                   💬
//                 </div>
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white ring-1 ring-[#102E50]/10 text-[#102E50]">
//                   No messages yet
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-2.5">
//               {messages.map((msg, idx) => {
//                 const isSender =
//                   msg.senderId === senderId || msg.sender_id === senderId;

//                 const displayName = isSender
//                   ? (msg.sender_name || currentUserName || "You")
//                   : (msg.receiver_name || receiverName || "Receiver");

//                 const timeStr = new Date(msg.created_at || msg.time).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit"
//                 });

//                 return (
//                   <div key={idx} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
//                     <div
//                       className={`max-w-[80%] sm:max-w-[72%] break-words rounded-2xl px-3.5 py-2.5 leading-relaxed ${
//                         isSender
//                           ? "bg-gradient-to-r from-[#C85B44] to-[#E9945F] text-[#FFF6E9] shadow-[0_10px_20px_rgba(190,61,42,0.20)]"
//                           : "bg-[#FFF6E9] text-[#102E50] ring-1 ring-[#F5C45E]/50"
//                       }`}
//                     >
//                       {/* الاسم */}
//                       <div
//                         className={`text-[13px] font-semibold ${
//                           isSender ? "text-[#FFF6E9]/80" : "text-[#102E50]/80"
//                         }`}
//                       >
//                         {displayName}
//                       </div>

//                       {/* الرسالة */}
//                       <div
//                         className={`text-[15px] mt-0.5 ${
//                           isSender ? "text-[#FFF6E9]" : "text-[#102E50]"
//                         }`}
//                       >
//                         {msg.text}
//                       </div>

//                       {/* الوقت */}
//                       <div
//                         className={`mt-1.5 text-[11px] text-right ${
//                           isSender ? "text-[#FFF6E9]/70" : "text-[#102E50]/60"
//                         }`}
//                       >
//                         {timeStr}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {showJumpBtn && (
//             <button
//               onClick={jumpToBottom}
//               className="absolute right-3 bottom-3 h-10 px-3 rounded-xl text-xs font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_10px_20px_rgba(16,46,80,0.25)]"
//             >
//               Scroll to latest
//             </button>
//           )}
//         </div>

//         <div className="mt-3 flex items-center gap-2">
//           <div className="relative">
//             <button
//               onClick={() => setShowEmojiPicker((v) => !v)}
//               className="grid h-10 w-10 place-items-center rounded-xl bg-white ring-1 ring-[#102E50]/10 text-xl text-[#102E50] hover:ring-[#F5C45E] transition shadow-[0_6px_14px_rgba(16,46,80,0.10)] active:scale-95"
//               aria-label="Emoji"
//             >
//               😊
//             </button>
//             {showEmojiPicker && (
//               <div className="absolute bottom-12 left-0 z-50">
//                 <EmojiPicker onEmojiClick={onEmojiClick} theme="light" />
//               </div>
//             )}
//           </div>

//           <input
//             className="flex-1 rounded-xl px-3 py-2 text-[#102E50] bg-white placeholder-[#102E50]/50 border border-[#F5C45E]/70 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent shadow-inner"
//             placeholder="Type a message..."
//             value={textMessage}
//             onChange={(e) => setTextMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && textMessage.trim()) sendMessage();
//             }}
//           />

//           <button
//             onClick={sendMessage}
//             disabled={!textMessage.trim()}
//             className="h-10 px-5 rounded-xl text-sm font-semibold text-[#FFF6E9] bg-[#102E50] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_12px_24px_rgba(16,46,80,0.25)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }









// import axios from "axios";
// import EmojiPicker from "emoji-picker-react";
// import { useEffect, useRef, useState, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";

// export default function LiveChat() {
//   const [textMessage, setTextMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showJumpBtn, setShowJumpBtn] = useState(false);
//   const [expanded, setExpanded] = useState(false);

//   const user = useSelector((s) => s.UserInfo);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const socketRef = useRef(null);
//   const messageContainerRef = useRef(null);
//   const nearBottomRef = useRef(true);
//   const lastOwnSendRef = useRef(false);

//   const { sender, reciver } = location.state || {};
//   const senderId = sender?.user_id || sender;
//   const receiverId = reciver?.user_id || reciver;

//   const currentUserName =
//     user?.user?.name ||
//     (user?.user?.firstname && user?.user?.lastname
//       ? `${user.user.firstname} ${user.user.lastname}`
//       : user?.user?.username || "You");

//   const receiverName =
//     reciver?.name ||
//     (reciver?.firstname && reciver?.lastname ? `${reciver.firstname} ${reciver.lastname}` : "Receiver");
//   const receiverInitial = (receiverName || "R").toString().charAt(0).toUpperCase();

//   useEffect(() => {
//     if (!sender || !reciver) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`${apiBase}/api/getmessages`, {
//           params: { senderId, receiveId: receiverId }
//         });
//         setMessages(res.data || []);
//       } catch {}
//     };
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 1000);
//     return () => clearInterval(interval);
//   }, [apiBase, sender, reciver, senderId, receiverId]);

//   useEffect(() => {
//     if (!senderId) return;
//     socketRef.current = io(`http://localhost:${port}`);
//     socketRef.current.emit("register", senderId);
//     socketRef.current.on("receive_message", (msg) => setMessages((p) => [...p, msg]));
//     return () => socketRef.current?.disconnect();
//   }, [port, senderId]);

//   useEffect(() => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const stick = nearBottomRef.current || lastOwnSendRef.current;
//     if (stick) {
//       el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//       setShowJumpBtn(false);
//     } else {
//       setShowJumpBtn(true);
//     }
//     if (lastOwnSendRef.current) lastOwnSendRef.current = false;
//   }, [messages]);

//   const handleScroll = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
//     nearBottomRef.current = nearBottom;
//     setShowJumpBtn(!nearBottom && messages.length > 0);
//   };

//   const jumpToBottom = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//     nearBottomRef.current = true;
//     setShowJumpBtn(false);
//   };

//   const sendMessage = async () => {
//     if (!textMessage.trim() || !senderId || !receiverId) return;
//     const data = { senderId, receiveId: receiverId, text: textMessage };
//     lastOwnSendRef.current = true;
//     setMessages((p) => [...p, { ...data, time: new Date() }]);
//     try {
//       await axios.post(`${apiBase}/api/send-messages`, data);
//       setTextMessage("");
//     } catch {}
//     socketRef.current?.emit("send-message", data);
//   };

//   const onEmojiClick = (emojiObject) => setTextMessage((v) => v + emojiObject.emoji);

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] text-[#102E50]">
//       <div className={[expanded ? "max-w-6xl" : "max-w-2xl", "mx-auto px-4 sm:px-6 py-4 sm:py-6"].join(" ")}>
//         <div className="rounded-[1.25rem] p-[1px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//           <div className="rounded-[1.2rem] bg-white">
//             <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3">
//               <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                 <button
//                   onClick={() => navigate(-1)}
//                   className="grid place-items-center w-9 h-9 rounded-xl bg-[#FFF6E9] ring-1 ring-[#102E50]/10 text-[#102E50] hover:bg-[#F5C45E]/20 transition active:scale-95"
//                   aria-label="Back"
//                 >
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                     <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </button>

//                 <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#102E50] text-[#FFF6E9] grid place-items-center font-extrabold">
//                   {receiverInitial}
//                 </div>
//                 <div className="min-w-0">
//                   <h2 className="text-sm sm:text-base font-extrabold text-[#102E50] truncate">
//                     {receiverName}
//                   </h2>
//                   <div className="text-[11px] text-[#102E50]/70">Live chat</div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setExpanded((v) => !v)}
//                   className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white ring-1 ring-[#102E50]/10 text-[11px] text-[#102E50] hover:bg-[#F5C45E]/10 transition"
//                 >
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     {expanded ? (
//                       <path d="M9 3H3v6M3 3l7 7M15 21h6v-6m0 6l-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     ) : (
//                       <path d="M21 9V3h-6M21 3L14 10M3 15v6h6M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     )}
//                   </svg>
//                   {expanded ? "Collapse" : "Expand"}
//                 </button>

//                 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white ring-1 ring-[#102E50]/10 text-[11px] text-[#102E50]">
//                   <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]" />
//                   Online
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           ref={messageContainerRef}
//           onScroll={handleScroll}
//           aria-live="polite"
//           className={[
//             "relative mt-3 overflow-y-auto rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_18px_40px_rgba(16,46,80,0.08)] p-3 sm:p-4",
//             expanded ? "h-[84vh]" : "h-[68vh]"
//           ].join(" ")}
//         >
//           {messages.length === 0 ? (
//             <div className="h-full grid place-items-center">
//               <div className="text-center">
//                 <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-3xl text-white font-bold">
//                   💬
//                 </div>
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white ring-1 ring-[#102E50]/10 text-[#102E50]">
//                   No messages yet
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-2">
//               {messages.map((msg, idx) => {
//                 const isSender =
//                   msg.senderId === senderId ||
//                   msg.sender_id === senderId;

//                 const displayName = isSender
//                   ? (msg.sender_name || currentUserName || "You")
//                   : (msg.receiver_name || receiverName || "Receiver");

//                 return (
//                   <div key={idx} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
//                     <div
//                       className={`max-w-[80%] sm:max-w-[72%] break-words rounded-2xl px-3 py-2 text-sm leading-relaxed ${
//                         isSender
//                           ? "bg-gradient-to-r from-[#BE3D2A] to-[#E78B48] text-[#FFF6E9] shadow-[0_10px_22px_rgba(190,61,42,0.25)]"
//                           : "bg-[#FFF6E9] text-[#102E50] ring-1 ring-[#F5C45E]/60"
//                       }`}
//                     >
//                       <div className={`text-[11px] font-semibold mb-0.5 ${isSender ? "text-[#FFF6E9]/95" : "text-[#102E50]/80"}`}>
//                         {displayName}
//                       </div>
//                       <div className="text-[15px]">{msg.text}</div>
//                       <div
//                         className={`mt-1 text-[11px] text-right ${
//                           isSender ? "text-[#FFF6E9]/90" : "text-[#102E50]/70"
//                         }`}
//                       >
//                         {new Date(msg.created_at || msg.time).toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit"
//                         })}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {showJumpBtn && (
//             <button
//               onClick={jumpToBottom}
//               className="absolute right-3 bottom-3 h-10 px-3 rounded-xl text-xs font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_10px_20px_rgba(16,46,80,0.25)]"
//             >
//               Scroll to latest
//             </button>
//           )}
//         </div>

//         <div className="mt-3 flex items-center gap-2">
//           <div className="relative">
//             <button
//               onClick={() => setShowEmojiPicker((v) => !v)}
//               className="grid h-10 w-10 place-items-center rounded-xl bg-white ring-1 ring-[#102E50]/10 text-xl text-[#102E50] hover:ring-[#F5C45E] transition shadow-[0_6px_14px_rgba(16,46,80,0.10)] active:scale-95"
//               aria-label="Emoji"
//             >
//               😊
//             </button>
//             {showEmojiPicker && (
//               <div className="absolute bottom-12 left-0 z-50">
//                 <EmojiPicker onEmojiClick={onEmojiClick} theme="light" />
//               </div>
//             )}
//           </div>

//           <input
//             className="flex-1 rounded-xl px-3 py-2 text-[#102E50] bg-white placeholder-[#102E50]/50 border border-[#F5C45E]/70 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent shadow-inner"
//             placeholder="Type a message..."
//             value={textMessage}
//             onChange={(e) => setTextMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && textMessage.trim()) sendMessage();
//             }}
//           />

//           <button
//             onClick={sendMessage}
//             disabled={!textMessage.trim()}
//             className="h-10 px-5 rounded-xl text-sm font-semibold text-[#FFF6E9] bg-[#102E50] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_12px_24px_rgba(16,46,80,0.25)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// } 










// import axios from "axios";
// import EmojiPicker from "emoji-picker-react";
// import { useEffect, useRef, useState, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";

// export default function LiveChat() {
//   const [textMessage, setTextMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showJumpBtn, setShowJumpBtn] = useState(false);
//   const [expanded, setExpanded] = useState(false);

//   const user = useSelector((s) => s.UserInfo);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const socketRef = useRef(null);
//   const messageContainerRef = useRef(null);
//   const nearBottomRef = useRef(true);
//   const lastOwnSendRef = useRef(false);

//   const { sender, reciver } = location.state || {};
//   const senderId = sender?.user_id || sender;
//   const receiverId = reciver?.user_id || reciver;

//   const currentUserName =
//     user?.user?.name ||
//     (user?.user?.firstname && user?.user?.lastname
//       ? `${user.user.firstname} ${user.user.lastname}`
//       : user?.user?.username || "You");

//   const receiverName =
//     reciver?.name ||
//     (reciver?.firstname && reciver?.lastname ? `${reciver.firstname} ${reciver.lastname}` : "Receiver");
//   const receiverInitial = (receiverName || "R").toString().charAt(0).toUpperCase();

//   useEffect(() => {
//     if (!sender || !reciver) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`${apiBase}/api/getmessages`, {
//           params: { senderId, receiveId: receiverId }
//         });
//         setMessages(res.data || []);
//       } catch {}
//     };
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 1000);
//     return () => clearInterval(interval);
//   }, [apiBase, sender, reciver, senderId, receiverId]);

//   useEffect(() => {
//     if (!senderId) return;
//     socketRef.current = io(`http://localhost:${port}`);
//     socketRef.current.emit("register", senderId);
//     socketRef.current.on("receive_message", (msg) => setMessages((p) => [...p, msg]));
//     return () => socketRef.current?.disconnect();
//   }, [port, senderId]);

//   useEffect(() => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const stick = nearBottomRef.current || lastOwnSendRef.current;
//     if (stick) {
//       el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//       setShowJumpBtn(false);
//     } else {
//       setShowJumpBtn(true);
//     }
//     if (lastOwnSendRef.current) lastOwnSendRef.current = false;
//   }, [messages]);

//   const handleScroll = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
//     nearBottomRef.current = nearBottom;
//     setShowJumpBtn(!nearBottom && messages.length > 0);
//   };

//   const jumpToBottom = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//     nearBottomRef.current = true;
//     setShowJumpBtn(false);
//   };

//   const sendMessage = async () => {
//     if (!textMessage.trim() || !senderId || !receiverId) return;
//     const data = { senderId, receiveId: receiverId, text: textMessage };
//     lastOwnSendRef.current = true;
//     setMessages((p) => [...p, { ...data, time: new Date() }]);
//     try {
//       await axios.post(`${apiBase}/api/send-messages`, data);
//       setTextMessage("");
//     } catch {}
//     socketRef.current?.emit("send-message", data);
//   };

//   const onEmojiClick = (emojiObject) => setTextMessage((v) => v + emojiObject.emoji);

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] text-[#102E50]">
//       <div className={[expanded ? "max-w-6xl" : "max-w-2xl", "mx-auto px-4 sm:px-6 py-4 sm:py-6"].join(" ")}>
//         <div className="rounded-[1.25rem] p-[1px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//           <div className="rounded-[1.2rem] bg-white">
//             <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3">
//               <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                 <button
//                   onClick={() => navigate(-1)}
//                   className="grid place-items-center w-9 h-9 rounded-xl bg-[#FFF6E9] ring-1 ring-[#102E50]/10 text-[#102E50] hover:bg-[#F5C45E]/20 transition active:scale-95"
//                   aria-label="Back"
//                 >
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                     <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </button>

//                 <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#102E50] text-[#FFF6E9] grid place-items-center font-extrabold">
//                   {receiverInitial}
//                 </div>
//                 <div className="min-w-0">
//                   <h2 className="text-sm sm:text-base font-extrabold text-[#102E50] truncate">
//                     {receiverName}
//                   </h2>
//                   <div className="text-[11px] text-[#102E50]/70">Live chat</div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setExpanded((v) => !v)}
//                   className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white ring-1 ring-[#102E50]/10 text-[11px] text-[#102E50] hover:bg-[#F5C45E]/10 transition"
//                 >
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     {expanded ? (
//                       <path d="M9 3H3v6M3 3l7 7M15 21h6v-6m0 6l-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     ) : (
//                       <path d="M21 9V3h-6M21 3L14 10M3 15v6h6M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     )}
//                   </svg>
//                   {expanded ? "Collapse" : "Expand"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           ref={messageContainerRef}
//           onScroll={handleScroll}
//           aria-live="polite"
//           className={[
//             "relative mt-3 overflow-y-auto rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_18px_40px_rgba(16,46,80,0.08)] p-3 sm:p-4",
//             expanded ? "h-[84vh]" : "h-[68vh]"
//           ].join(" ")}
//         >
//           {messages.length === 0 ? (
//             <div className="h-full grid place-items-center">
//               <div className="text-center">
//                 <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-3xl text-white font-bold">
//                   💬
//                 </div>
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white ring-1 ring-[#102E50]/10 text-[#102E50]">
//                   No messages yet
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {messages.map((msg, idx) => {
//                 const isSender = msg.senderId === senderId || msg.sender_id === senderId;

//                 const rawSenderName = msg.sender_name;
//                 const fallbackSender = isSender ? (currentUserName || "You") : receiverName;
//                 const displayName = rawSenderName || fallbackSender;

//                 const timeStr = new Date(msg.created_at || msg.time).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit"
//                 });

//                 return (
//                   <div key={idx} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
//                     <div
//                       className={`max-w-[80%] sm:max-w-[72%] break-words rounded-2xl px-3.5 py-2.5 leading-relaxed backdrop-blur-[0.5px]
//                       ${isSender
//                         ? "bg-gradient-to-br from-[#0E2744] to-[#102E50] text-[#FFF6E9] ring-1 ring-white/10 shadow-[0_10px_24px_rgba(16,46,80,0.25)]"
//                         : "bg-[#FFF6E9] text-[#102E50] ring-1 ring-[#102E50]/12 shadow-[0_6px_16px_rgba(16,46,80,0.10)]"}
//                       `}
//                     >
//                       <span
//                         className={`inline-block px-2 py-0.5 rounded-md text-[12px] font-semibold mb-1
//                         ${isSender
//                           ? "bg-white/10 ring-1 ring-white/20 text-white/90"
//                           : "bg-[#102E50]/5 ring-1 ring-[#102E50]/15 text-[#102E50]/80"}
//                         `}
//                       >
//                         {displayName}
//                       </span>

//                       <div className={`text-[15px] tracking-[0.1px] ${isSender ? "text-[#FFF6E9]" : "text-[#102E50]"}`}>
//                         {msg.text}
//                       </div>

//                       <div className={`mt-1.5 text-[11px] text-right ${isSender ? "text-white/60" : "text-[#102E50]/55"}`}>
//                         {timeStr}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {showJumpBtn && (
//             <button
//               onClick={jumpToBottom}
//               className="absolute right-3 bottom-3 h-10 px-3 rounded-xl text-xs font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_10px_20px_rgba(16,46,80,0.25)]"
//             >
//               Scroll to latest
//             </button>
//           )}
//         </div>

//         <div className="mt-3 flex items-center gap-2">
//           <div className="relative">
//             <button
//               onClick={() => setShowEmojiPicker((v) => !v)}
//               className="grid h-10 w-10 place-items-center rounded-xl bg-white ring-1 ring-[#102E50]/10 text-xl text-[#102E50] hover:ring-[#F5C45E] transition shadow-[0_6px_14px_rgba(16,46,80,0.10)] active:scale-95"
//               aria-label="Emoji"
//             >
//               😊
//             </button>
//             {showEmojiPicker && (
//               <div className="absolute bottom-12 left-0 z-50">
//                 <EmojiPicker onEmojiClick={onEmojiClick} theme="light" />
//               </div>
//             )}
//           </div>

//           <input
//             className="flex-1 rounded-xl px-3 py-2 text-[#102E50] bg-white placeholder-[#102E50]/50 border border-[#F5C45E]/70 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent shadow-inner"
//             placeholder="Type a message..."
//             value={textMessage}
//             onChange={(e) => setTextMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && textMessage.trim()) sendMessage();
//             }}
//           />

//           <button
//             onClick={sendMessage}
//             disabled={!textMessage.trim()}
//             className="h-10 px-5 rounded-xl text-sm font-semibold text-[#FFF6E9] bg-[#102E50] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_12px_24px_rgba(16,46,80,0.25)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }





"use client";
// live chat

// import axios from "axios";
// import EmojiPicker from "emoji-picker-react";
// import { useEffect, useRef, useState, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";

// export default function LiveChat() {
//   const [textMessage, setTextMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showJumpBtn, setShowJumpBtn] = useState(false);
//   const [expanded, setExpanded] = useState(false);

//   const user = useSelector((s) => s.UserInfo);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const socketRef = useRef(null);
//   const messageContainerRef = useRef(null);
//   const nearBottomRef = useRef(true);
//   const lastOwnSendRef = useRef(false);

//   const { sender, reciver } = location.state || {};
//   const senderId = sender?.user_id || sender;
//   const receiverId = reciver?.user_id || reciver;

//   const currentUserName =
//     user?.user?.name ||
//     (user?.user?.firstname && user?.user?.lastname
//       ? `${user.user.firstname} ${user.user.lastname}`
//       : user?.user?.username || "You");

//   const receiverName =
//     reciver?.name ||
//     (reciver?.firstname && reciver?.lastname
//       ? `${reciver.firstname} ${reciver.lastname}`
//       : "Receiver");
//   const receiverInitial = (receiverName || "R").toString().charAt(0).toUpperCase();

//   useEffect(() => {
//     if (!sender || !reciver) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`${apiBase}/api/getmessages`, {
//           params: { senderId, receiveId: receiverId },
//         });
//         setMessages(res.data || []);
//       } catch {}
//     };
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 1000);
//     return () => clearInterval(interval);
//   }, [apiBase, sender, reciver, senderId, receiverId]);

//   useEffect(() => {
//     if (!senderId) return;
//     socketRef.current = io(`http://localhost:${port}`);
//     socketRef.current.emit("register", senderId);
//     socketRef.current.on("receive_message", (msg) => setMessages((p) => [...p, msg]));
//     return () => socketRef.current?.disconnect();
//   }, [port, senderId]);

//   useEffect(() => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const stick = nearBottomRef.current || lastOwnSendRef.current;
//     if (stick) {
//       el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//       setShowJumpBtn(false);
//     } else {
//       setShowJumpBtn(true);
//     }
//     if (lastOwnSendRef.current) lastOwnSendRef.current = false;
//   }, [messages]);

//   const handleScroll = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
//     nearBottomRef.current = nearBottom;
//     setShowJumpBtn(!nearBottom && messages.length > 0);
//   };

//   const jumpToBottom = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//     nearBottomRef.current = true;
//     setShowJumpBtn(false);
//   };

//   const sendMessage = async () => {
//     if (!textMessage.trim() || !senderId || !receiverId) return;
//     const data = { senderId, receiveId: receiverId, text: textMessage };
//     lastOwnSendRef.current = true;
//     setMessages((p) => [...p, { ...data, time: new Date() }]);
//     try {
//       await axios.post(`${apiBase}/api/send-messages`, data);
//       setTextMessage("");
//     } catch {}
//     socketRef.current?.emit("send-message", data);
//   };

//   const onEmojiClick = (emojiObject) => setTextMessage((v) => v + emojiObject.emoji);

//   return (
//     <div className="min-h-screen bg-[#FFF6E9] text-[#102E50]">
//       <div
//         className={[
//           expanded ? "max-w-6xl" : "max-w-2xl",
//           "mx-auto px-4 sm:px-6 py-4 sm:py-6",
//         ].join(" ")}
//       >
//         <div className="rounded-[1.25rem] p-[1px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//           <div className="rounded-[1.2rem] bg-white">
//             <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3">
//               <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                 {/* السهم تم حذفه نهائياً */}
//                 <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#102E50] text-[#FFF6E9] grid place-items-center font-extrabold">
//                   {receiverInitial}
//                 </div>
//                 <div className="min-w-0">
//                   <h2 className="text-sm sm:text-base font-extrabold text-[#102E50] truncate">
//                     {receiverName}
//                   </h2>
//                   <div className="text-[11px] text-[#102E50]/70">Live chat</div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setExpanded((v) => !v)}
//                   className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white ring-1 ring-[#102E50]/10 text-[11px] text-[#102E50] hover:bg-[#F5C45E]/10 transition"
//                 >
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     {expanded ? (
//                       <path
//                         d="M9 3H3v6M3 3l7 7M15 21h6v-6m0 6l-7-7"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     ) : (
//                       <path
//                         d="M21 9V3h-6M21 3L14 10M3 15v6h6M3 21l7-7"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     )}
//                   </svg>
//                   {expanded ? "Collapse" : "Expand"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           ref={messageContainerRef}
//           onScroll={handleScroll}
//           aria-live="polite"
//           className={[
//             "relative mt-3 overflow-y-auto rounded-2xl bg-white ring-1 ring-[#102E50]/10 shadow-[0_18px_40px_rgba(16,46,80,0.08)] p-3 sm:p-4",
//             expanded ? "h-[84vh]" : "h-[68vh]",
//           ].join(" ")}
//         >
//           {messages.length === 0 ? (
//             <div className="h-full grid place-items-center">
//               <div className="text-center">
//                 <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-3xl text-white font-bold">
//                   💬
//                 </div>
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white ring-1 ring-[#102E50]/10 text-[#102E50]">
//                   No messages yet
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {messages.map((msg, idx) => {
//                 const isSender = msg.senderId === senderId || msg.sender_id === senderId;

//                 const rawSenderName = msg.sender_name;
//                 const fallbackSender = isSender
//                   ? currentUserName || "You"
//                   : receiverName;
//                 const displayName = rawSenderName || fallbackSender;

//                 const timeStr = new Date(msg.created_at || msg.time).toLocaleTimeString(
//                   [],
//                   {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   }
//                 );

//                 return (
//                   <div
//                     key={idx}
//                     className={`flex ${isSender ? "justify-end" : "justify-start"}`}
//                   >
//                     <div
//                       className={`max-w-[80%] sm:max-w-[72%] break-words rounded-2xl px-3.5 py-2.5 leading-relaxed backdrop-blur-[0.5px]
//                       ${isSender
//                         ? "bg-[#FFF6E9] text-[#102E50] ring-1 ring-[#102E50]/12 shadow-[0_6px_16px_rgba(16,46,80,0.10)]"
//                         : "bg-gradient-to-br from-[#0E2744] to-[#102E50] text-[#FFF6E9] ring-1 ring-white/10 shadow-[0_10px_24px_rgba(16,46,80,0.25)]"}
//                       `}
//                     >
//                       <span
//                         className={`inline-block px-2 py-0.5 rounded-md text-[12px] font-semibold mb-1
//                         ${isSender
//                           ? "bg-[#102E50]/5 ring-1 ring-[#102E50]/15 text-[#102E50]/80"
//                           : "bg-white/10 ring-1 ring-white/20 text-white/90"}
//                         `}
//                       >
//                         {displayName}
//                       </span>

//                       <div
//                         className={`text-[15px] tracking-[0.1px] ${
//                           isSender ? "text-[#102E50]" : "text-[#FFF6E9]"
//                         }`}
//                       >
//                         {msg.text}
//                       </div>

//                       <div
//                         className={`mt-1.5 text-[11px] text-right ${
//                           isSender ? "text-[#102E50]/55" : "text-white/60"
//                         }`}
//                       >
//                         {timeStr}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {showJumpBtn && (
//             <button
//               onClick={jumpToBottom}
//               className="absolute right-3 bottom-3 h-10 px-3 rounded-xl text-xs font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_10px_20px_rgba(16,46,80,0.25)]"
//             >
//               Scroll to latest
//             </button>
//           )}
//         </div>

//         <div className="mt-3 flex items-center gap-2">
//           <div className="relative">
//             <button
//               onClick={() => setShowEmojiPicker((v) => !v)}
//               className="grid h-10 w-10 place-items-center rounded-xl bg-white ring-1 ring-[#102E50]/10 text-xl text-[#102E50] hover:ring-[#F5C45E] transition shadow-[0_6px_14px_rgba(16,46,80,0.10)] active:scale-95"
//               aria-label="Emoji"
//             >
//               😊
//             </button>
//             {showEmojiPicker && (
//               <div className="absolute bottom-12 left-0 z-50">
//                 <EmojiPicker onEmojiClick={onEmojiClick} theme="light" />
//               </div>
//             )}
//           </div>

//           <input
//             className="flex-1 rounded-xl px-3 py-2 text-[#102E50] bg-white placeholder-[#102E50]/50 border border-[#F5C45E]/70 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent shadow-inner"
//             placeholder="Type a message..."
//             value={textMessage}
//             onChange={(e) => setTextMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && textMessage.trim()) sendMessage();
//             }}
//           />

//           <button
//             onClick={sendMessage}
//             disabled={!textMessage.trim()}
//             className="h-10 px-5 rounded-xl text-sm font-semibold text-[#FFF6E9] bg-[#102E50] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_12px_24px_rgba(16,46,80,0.25)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }






"live chat 1";

// import axios from "axios";
// import EmojiPicker from "emoji-picker-react";
// import { useEffect, useRef, useState, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";

// export default function LiveChat() {
//   const [textMessage, setTextMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showJumpBtn, setShowJumpBtn] = useState(false);
//   const [expanded, setExpanded] = useState(false);

//   const user = useSelector((s) => s.UserInfo);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const socketRef = useRef(null);
//   const messageContainerRef = useRef(null);
//   const nearBottomRef = useRef(true);
//   const lastOwnSendRef = useRef(false);

//   const { sender, reciver } = location.state || {};
//   const senderId = sender?.user_id || sender;
//   const receiverId = reciver?.user_id || reciver;

//   const currentUserName =
//     user?.user?.name ||
//     (user?.user?.firstname && user?.user?.lastname
//       ? `${user.user.firstname} ${user.user.lastname}`
//       : user?.user?.username || "You");

//   const receiverName =
//     reciver?.name ||
//     (reciver?.firstname && reciver?.lastname
//       ? `${reciver.firstname} ${reciver.lastname}`
//       : "Receiver");
//   const receiverInitial = (receiverName || "R").toString().charAt(0).toUpperCase();

//   useEffect(() => {
//     if (!sender || !reciver) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`${apiBase}/api/getmessages`, {
//           params: { senderId, receiveId: receiverId },
//         });
//         setMessages(res.data || []);
//       } catch {}
//     };
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 1000);
//     return () => clearInterval(interval);
//   }, [apiBase, sender, reciver, senderId, receiverId]);

//   useEffect(() => {
//     if (!senderId) return;
//     socketRef.current = io(`http://localhost:${port}`);
//     socketRef.current.emit("register", senderId);
//     socketRef.current.on("receive_message", (msg) => setMessages((p) => [...p, msg]));
//     return () => socketRef.current?.disconnect();
//   }, [port, senderId]);

//   useEffect(() => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const stick = nearBottomRef.current || lastOwnSendRef.current;
//     if (stick) {
//       el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//       setShowJumpBtn(false);
//     } else {
//       setShowJumpBtn(true);
//     }
//     if (lastOwnSendRef.current) lastOwnSendRef.current = false;
//   }, [messages]);

//   const handleScroll = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
//     nearBottomRef.current = nearBottom;
//     setShowJumpBtn(!nearBottom && messages.length > 0);
//   };

//   const jumpToBottom = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//     nearBottomRef.current = true;
//     setShowJumpBtn(false);
//   };

//   const sendMessage = async () => {
//     if (!textMessage.trim() || !senderId || !receiverId) return;
//     const data = { senderId, receiveId: receiverId, text: textMessage };
//     lastOwnSendRef.current = true;
//     setMessages((p) => [...p, { ...data, time: new Date() }]);
//     try {
//       await axios.post(`${apiBase}/api/send-messages`, data);
//       setTextMessage("");
//     } catch {}
//     socketRef.current?.emit("send-message", data);
//   };

//   const onEmojiClick = (emojiObject) => setTextMessage((v) => v + emojiObject.emoji);

//   return (
//     <div className="min-h-screen bg-[#FFF2DD] text-[#102E50]">
//       <div className={[expanded ? "max-w-6xl" : "max-w-2xl", "mx-auto px-4 sm:px-6 py-4 sm:py-6"].join(" ")}>
//         <div className="rounded-[1.25rem] p-[1px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//           <div className="rounded-[1.2rem] bg-[#FFF7EB]">
//             <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3">
//               <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                 <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#102E50] text-[#FFF6E9] grid place-items-center font-extrabold">
//                   {receiverInitial}
//                 </div>
//                 <div className="min-w-0">
//                   <h2 className="text-sm sm:text-base font-extrabold text-[#102E50] truncate">
//                     {receiverName}
//                   </h2>
//                   <div className="text-[11px] text-[#102E50]/70">Live chat</div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setExpanded((v) => !v)}
//                   className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFFDF6] ring-1 ring-[#102E50]/10 text-[11px] text-[#102E50] hover:bg-[#F5C45E]/10 transition"
//                 >
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     {expanded ? (
//                       <path
//                         d="M9 3H3v6M3 3l7 7M15 21h6v-6m0 6l-7-7"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     ) : (
//                       <path
//                         d="M21 9V3h-6M21 3L14 10M3 15v6h6M3 21l7-7"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     )}
//                   </svg>
//                   {expanded ? "Collapse" : "Expand"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           ref={messageContainerRef}
//           onScroll={handleScroll}
//           aria-live="polite"
//           className={[
//             "relative mt-3 overflow-y-auto rounded-2xl bg-[#FFF7EB] ring-1 ring-[#102E50]/10 shadow-[0_18px_40px_rgba(16,46,80,0.08)] p-3 sm:p-4",
//             expanded ? "h-[84vh]" : "h-[68vh]",
//           ].join(" ")}
//         >
//           {messages.length === 0 ? (
//             <div className="h-full grid place-items-center">
//               <div className="text-center">
//                 <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-3xl text-white font-bold">
//                   💬
//                 </div>
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FFFDF6] ring-1 ring-[#102E50]/10 text-[#102E50]">
//                   No messages yet
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {messages.map((msg, idx) => {
//                 const isSender = msg.senderId === senderId || msg.sender_id === senderId;
//                 const rawSenderName = msg.sender_name;
//                 const fallbackSender = isSender ? currentUserName || "You" : receiverName;
//                 const nameForRight = receiverName;
//                 const displayName = isSender ? nameForRight : rawSenderName || fallbackSender;
//                 const timeStr = new Date(msg.created_at || msg.time).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 });

//                 return (
//                   <div key={idx} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
//                     <div
//                       className={`max-w-[80%] sm:max-w-[72%] break-words rounded-2xl px-3.5 py-2.5 leading-relaxed backdrop-blur-[0.5px]
//                       ${isSender
//                         ? "bg-[#FFF3E0] text-[#102E50] ring-1 ring-[#102E50]/12 shadow-[0_6px_16px_rgba(16,46,80,0.10)]"
//                         : "bg-gradient-to-br from-[#0E2744] to-[#102E50] text-[#FFF6E9] ring-1 ring-white/10 shadow-[0_10px_24px_rgba(16,46,80,0.25)]"}
//                       `}
//                     >
//                       <span
//                         className={`inline-block px-2.5 py-1 rounded-md text-[12px] font-semibold mb-1 tracking-wide
//                         ${isSender
//                           ? "bg-[#102E50]/6 ring-1 ring-[#102E50]/15 text-[#102E50]/85"
//                           : "bg-white/10 ring-1 ring-white/20 text-white/90"}
//                         `}
//                       >
//                         {displayName}
//                       </span>

//                       <div
//                         className={`text-[15px] tracking-[0.1px] ${
//                           isSender ? "text-[#102E50]" : "text-[#FFF6E9]"
//                         }`}
//                       >
//                         {msg.text}
//                       </div>

//                       <div
//                         className={`mt-1.5 text-right ${
//                           isSender ? "text-[#102E50]/90" : "text-white/95"
//                         } text-[12.5px] font-semibold`}
//                       >
//                         {timeStr}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {showJumpBtn && (
//             <button
//               onClick={jumpToBottom}
//               className="absolute right-3 bottom-3 h-10 px-3 rounded-xl text-xs font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_10px_20px_rgba(16,46,80,0.25)]"
//             >
//               Scroll to latest
//             </button>
//           )}
//         </div>

//         <div className="mt-3 flex items-center gap-2">
//           <div className="relative">
//             <button
//               onClick={() => setShowEmojiPicker((v) => !v)}
//               className="grid h-10 w-10 place-items-center rounded-full bg-[#FFFDF6] ring-1 ring-[#102E50]/10 text-xl text-[#102E50] hover:ring-[#F5C45E] transition shadow-[0_6px_14px_rgba(16,46,80,0.10)] active:scale-95"
//               aria-label="Emoji"
//             >
//               😄
//             </button>
//             {showEmojiPicker && (
//               <div className="absolute bottom-12 left-0 z-50">
//                 <EmojiPicker onEmojiClick={onEmojiClick} theme="light" />
//               </div>
//             )}
//           </div>

//           <input
//             className="flex-1 rounded-xl px-3 py-2 text-[#102E50] bg-[#FFF9F0] placeholder-[#102E50]/60 border border-[#F5C45E]/60 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent shadow-inner"
//             placeholder="Type a message..."
//             value={textMessage}
//             onChange={(e) => setTextMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && textMessage.trim()) sendMessage();
//             }}
//           />

//           <button
//             onClick={sendMessage}
//             disabled={!textMessage.trim()}
//             className="h-10 px-5 rounded-xl text-sm font-semibold text-[#FFF6E9] bg-[#102E50] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_12px_24px_rgba(16,46,80,0.25)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


" فيه اسم واحد بس  live chat 2";

// import axios from "axios";
// import EmojiPicker from "emoji-picker-react";
// import { useEffect, useRef, useState, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";

// export default function LiveChat() {
//   const [textMessage, setTextMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showJumpBtn, setShowJumpBtn] = useState(false);
//   const [expanded, setExpanded] = useState(false);

//   const user = useSelector((s) => s.UserInfo);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const socketRef = useRef(null);
//   const messageContainerRef = useRef(null);
//   const nearBottomRef = useRef(true);
//   const lastOwnSendRef = useRef(false);

//   const { sender, reciver } = location.state || {};
//   const senderId = sender?.user_id || sender;
//   const receiverId = reciver?.user_id || reciver;

//   const currentUserName =
//     user?.user?.name ||
//     (user?.user?.firstname && user?.user?.lastname
//       ? `${user.user.firstname} ${user.user.lastname}`
//       : user?.user?.username || "You");

//   const receiverName =
//     reciver?.name ||
//     (reciver?.firstname && reciver?.lastname
//       ? `${reciver.firstname} ${reciver.lastname}`
//       : "Receiver");
//   const receiverInitial = (receiverName || "R").toString().charAt(0).toUpperCase();

//   useEffect(() => {
//     if (!sender || !reciver) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`${apiBase}/api/getmessages`, {
//           params: { senderId, receiveId: receiverId },
//         });
//         setMessages(res.data || []);
//       } catch {}
//     };
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 1000);
//     return () => clearInterval(interval);
//   }, [apiBase, sender, reciver, senderId, receiverId]);

//   useEffect(() => {
//     if (!senderId) return;
//     socketRef.current = io(`http://localhost:${port}`);
//     socketRef.current.emit("register", senderId);
//     socketRef.current.on("receive_message", (msg) => setMessages((p) => [...p, msg]));
//     return () => socketRef.current?.disconnect();
//   }, [port, senderId]);

//   useEffect(() => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const stick = nearBottomRef.current || lastOwnSendRef.current;
//     if (stick) {
//       el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//       setShowJumpBtn(false);
//     } else {
//       setShowJumpBtn(true);
//     }
//     if (lastOwnSendRef.current) lastOwnSendRef.current = false;
//   }, [messages]);

//   const handleScroll = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
//     nearBottomRef.current = nearBottom;
//     setShowJumpBtn(!nearBottom && messages.length > 0);
//   };

//   const jumpToBottom = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//     nearBottomRef.current = true;
//     setShowJumpBtn(false);
//   };

//   const sendMessage = async () => {
//     if (!textMessage.trim() || !senderId || !receiverId) return;
//     const data = { senderId, receiveId: receiverId, text: textMessage };
//     lastOwnSendRef.current = true;
//     setMessages((p) => [...p, { ...data, time: new Date() }]);
//     try {
//       await axios.post(`${apiBase}/api/send-messages`, data);
//       setTextMessage("");
//     } catch {}
//     socketRef.current?.emit("send-message", data);
//   };

//   const onEmojiClick = (emojiObject) => setTextMessage((v) => v + emojiObject.emoji);

//   return (
//     <div className="min-h-screen bg-[#FFF3E4] text-[#102E50]">
//       <div className={[expanded ? "max-w-6xl" : "max-w-2xl", "mx-auto px-4 sm:px-6 py-4 sm:py-6"].join(" ")}>
//         <div className="rounded-[1.25rem] p-[1px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//           <div className="rounded-[1.2rem] bg-[#FFF8EE]">
//             <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3">
//               <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                 <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#102E50] text-[#FFF6E9] grid place-items-center font-extrabold">
//                   {receiverInitial}
//                 </div>
//                 <div className="min-w-0">
//                   <h2 className="text-sm sm:text-base font-extrabold text-[#102E50] truncate">
//                     {receiverName}
//                   </h2>
//                   <div className="text-[11px] text-[#102E50]/70">Live chat</div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setExpanded((v) => !v)}
//                   className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFFDF6] ring-1 ring-[#102E50]/10 text-[11px] text-[#102E50] hover:bg-[#F5C45E]/10 transition"
//                 >
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     {expanded ? (
//                       <path
//                         d="M9 3H3v6M3 3l7 7M15 21h6v-6m0 6l-7-7"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     ) : (
//                       <path
//                         d="M21 9V3h-6M21 3L14 10M3 15v6h6M3 21l7-7"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     )}
//                   </svg>
//                   {expanded ? "Collapse" : "Expand"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           ref={messageContainerRef}
//           onScroll={handleScroll}
//           aria-live="polite"
//           className={[
//             "relative mt-3 overflow-y-auto rounded-2xl bg-[#FFF8EE] ring-1 ring-[#102E50]/10 shadow-[0_18px_40px_rgba(16,46,80,0.08)] p-3 sm:p-4",
//             expanded ? "h-[84vh]" : "h-[68vh]",
//           ].join(" ")}
//         >
//           {messages.length === 0 ? (
//             <div className="h-full grid place-items-center">
//               <div className="text-center">
//                 <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-3xl text-white font-bold">
//                   💬
//                 </div>
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FFFDF6] ring-1 ring-[#102E50]/10 text-[#102E50]">
//                   No messages yet
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {messages.map((msg, idx) => {
//                 const isSender = msg.senderId === senderId || msg.sender_id === senderId;
//                 const timeStr = new Date(msg.created_at || msg.time).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 });

//                 return (
//                   <div key={idx} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
//                     <div
//                       className={`max-w-[80%] sm:max-w-[72%] break-words rounded-2xl px-3.5 py-2.5 leading-relaxed 
//                       ${isSender
//                         ? "bg-[#FFF3E0] text-[#102E50] ring-1 ring-[#102E50]/12 shadow-[0_6px_16px_rgba(16,46,80,0.10)]"
//                         : "bg-gradient-to-br from-[#0E2744] to-[#102E50] text-[#FFF6E9] ring-1 ring-white/10 shadow-[0_10px_24px_rgba(16,46,80,0.25)]"}
//                       `}
//                     >
//                       {!isSender && (
//                         <div className="text-[13px] font-semibold text-[#F5C45E] mb-1">
//                           {receiverName}
//                         </div>
//                       )}

//                       <div
//                         className={`text-[15px] tracking-[0.1px] ${
//                           isSender ? "text-[#102E50]" : "text-[#FFF6E9]"
//                         }`}
//                       >
//                         {msg.text}
//                       </div>

//                       <div
//                         className={`mt-1.5 text-right text-[12.5px] font-semibold ${
//                           isSender ? "text-[#102E50]/90" : "text-white/95"
//                         }`}
//                       >
//                         {timeStr}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {showJumpBtn && (
//             <button
//               onClick={jumpToBottom}
//               className="absolute right-3 bottom-3 h-10 px-3 rounded-xl text-xs font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_10px_20px_rgba(16,46,80,0.25)]"
//             >
//               Scroll to latest
//             </button>
//           )}
//         </div>

//         <div className="mt-3 flex items-center gap-2">
//           <div className="relative">
//             <button
//               onClick={() => setShowEmojiPicker((v) => !v)}
//               className="grid h-10 w-10 place-items-center rounded-full bg-[#FFFDF6] ring-1 ring-[#102E50]/10 text-xl text-[#102E50] hover:ring-[#F5C45E] transition shadow-[0_6px_14px_rgba(16,46,80,0.10)] active:scale-95"
//             >
//               😎
//             </button>
//             {showEmojiPicker && (
//               <div className="absolute bottom-12 left-0 z-50">
//                 <EmojiPicker onEmojiClick={onEmojiClick} theme="light" />
//               </div>
//             )}
//           </div>

//           <input
//             className="flex-1 rounded-xl px-3 py-2 text-[#102E50] bg-[#FFF9F0] placeholder-[#102E50]/60 border border-[#F5C45E]/60 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent shadow-inner"
//             placeholder="Type a message..."
//             value={textMessage}
//             onChange={(e) => setTextMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && textMessage.trim()) sendMessage();
//             }}
//           />

//           <button
//             onClick={sendMessage}
//             disabled={!textMessage.trim()}
//             className="h-10 px-5 rounded-xl text-sm font-semibold text-[#FFF6E9] bg-[#102E50] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_12px_24px_rgba(16,46,80,0.25)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



"live chat 3 // فيه اسمين";

// import axios from "axios";
// import EmojiPicker from "emoji-picker-react";
// import { useEffect, useRef, useState, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";

// export default function LiveChat() {
//   const [textMessage, setTextMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showJumpBtn, setShowJumpBtn] = useState(false);
//   const [expanded, setExpanded] = useState(false);

//   const user = useSelector((s) => s.UserInfo);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const socketRef = useRef(null);
//   const messageContainerRef = useRef(null);
//   const nearBottomRef = useRef(true);
//   const lastOwnSendRef = useRef(false);

//   const { sender, reciver } = location.state || {};
//   const senderId = sender?.user_id || sender;
//   const receiverId = reciver?.user_id || reciver;

//   const currentUserName =
//     user?.user?.name ||
//     (user?.user?.firstname && user?.user?.lastname
//       ? `${user.user.firstname} ${user.user.lastname}`
//       : user?.user?.username || "You");

//   const receiverName =
//     reciver?.name ||
//     (reciver?.firstname && reciver?.lastname
//       ? `${reciver.firstname} ${reciver.lastname}`
//       : "Receiver");
//   const receiverInitial = (receiverName || "R").toString().charAt(0).toUpperCase();

//   useEffect(() => {
//     if (!sender || !reciver) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`${apiBase}/api/getmessages`, {
//           params: { senderId, receiveId: receiverId },
//         });
//         setMessages(res.data || []);
//       } catch {}
//     };
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 1000);
//     return () => clearInterval(interval);
//   }, [apiBase, sender, reciver, senderId, receiverId]);

//   useEffect(() => {
//     if (!senderId) return;
//     socketRef.current = io(`http://localhost:${port}`);
//     socketRef.current.emit("register", senderId);
//     socketRef.current.on("receive_message", (msg) => setMessages((p) => [...p, msg]));
//     return () => socketRef.current?.disconnect();
//   }, [port, senderId]);

//   useEffect(() => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const stick = nearBottomRef.current || lastOwnSendRef.current;
//     if (stick) {
//       el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//       setShowJumpBtn(false);
//     } else {
//       setShowJumpBtn(true);
//     }
//     if (lastOwnSendRef.current) lastOwnSendRef.current = false;
//   }, [messages]);

//   const handleScroll = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
//     nearBottomRef.current = nearBottom;
//     setShowJumpBtn(!nearBottom && messages.length > 0);
//   };

//   const jumpToBottom = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//     nearBottomRef.current = true;
//     setShowJumpBtn(false);
//   };

//   const sendMessage = async () => {
//     if (!textMessage.trim() || !senderId || !receiverId) return;
//     const data = { senderId, receiveId: receiverId, text: textMessage };
//     lastOwnSendRef.current = true;
//     setMessages((p) => [...p, { ...data, time: new Date() }]);
//     try {
//       await axios.post(`${apiBase}/api/send-messages`, data);
//       setTextMessage("");
//     } catch {}
//     socketRef.current?.emit("send-message", data);
//   };

//   const onEmojiClick = (emojiObject) => setTextMessage((v) => v + emojiObject.emoji);

//   return (
//     <div className="min-h-screen bg-[#FFF3E4] text-[#102E50]">
//       <div className={[expanded ? "max-w-6xl" : "max-w-2xl", "mx-auto px-4 sm:px-6 py-4 sm:py-6"].join(" ")}>
//         <div className="rounded-[1.25rem] p-[1px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//           <div className="rounded-[1.2rem] bg-[#FFF8EE]">
//             <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3">
//               <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                 <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#102E50] text-[#FFF6E9] grid place-items-center font-extrabold">
//                   {receiverInitial}
//                 </div>
//                 <div className="min-w-0">
//                   <h2 className="text-sm sm:text-base font-extrabold text-[#102E50] truncate">
//                     {receiverName}
//                   </h2>
//                   <div className="text-[11px] text-[#102E50]/70">Live chat</div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setExpanded((v) => !v)}
//                   className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFFDF6] ring-1 ring-[#102E50]/10 text-[11px] text-[#102E50] hover:bg-[#F5C45E]/10 transition"
//                 >
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     {expanded ? (
//                       <path
//                         d="M9 3H3v6M3 3l7 7M15 21h6v-6m0 6l-7-7"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     ) : (
//                       <path
//                         d="M21 9V3h-6M21 3L14 10M3 15v6h6M3 21l7-7"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     )}
//                   </svg>
//                   {expanded ? "Collapse" : "Expand"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           ref={messageContainerRef}
//           onScroll={handleScroll}
//           aria-live="polite"
//           className={[
//             "relative mt-3 overflow-y-auto rounded-2xl bg-[#FFF8EE] ring-1 ring-[#102E50]/10 shadow-[0_18px_40px_rgba(16,46,80,0.08)] p-3 sm:p-4",
//             expanded ? "h-[84vh]" : "h-[68vh]",
//           ].join(" ")}
//         >
//           {messages.length === 0 ? (
//             <div className="h-full grid place-items-center">
//               <div className="text-center">
//                 <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-3xl text-white font-bold">
//                   💬
//                 </div>
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FFFDF6] ring-1 ring-[#102E50]/10 text-[#102E50]">
//                   No messages yet
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {messages.map((msg, idx) => {
//                 const isSender = msg.senderId === senderId || msg.sender_id === senderId;
//                 const timeStr = new Date(msg.created_at || msg.time).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 });

//                 return (
//                   <div key={idx} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
//                     <div
//                       className={`max-w-[80%] sm:max-w-[72%] break-words rounded-2xl px-3.5 py-2.5 leading-relaxed 
//                       ${isSender
//                         ? "bg-[#FFF3E0] text-[#102E50] ring-1 ring-[#102E50]/12 shadow-[0_6px_16px_rgba(16,46,80,0.10)]"
//                         : "bg-gradient-to-br from-[#0E2744] to-[#102E50] text-[#FFF6E9] ring-1 ring-white/10 shadow-[0_10px_24px_rgba(16,46,80,0.25)]"}
//                       `}
//                     >
//                       {!isSender && (
//                         <div className="text-[13px] font-semibold text-[#F5C45E] mb-1">
//                           {receiverName}
//                         </div>
//                       )}

//                       <div
//                         className={`text-[15px] tracking-[0.1px] ${
//                           isSender ? "text-[#102E50]" : "text-[#FFF6E9]"
//                         }`}
//                       >
//                         {msg.text}
//                       </div>

//                       <div
//                         className={`mt-1.5 text-right text-[12.5px] font-semibold ${
//                           isSender ? "text-[#102E50]/90" : "text-white/95"
//                         }`}
//                       >
//                         {timeStr}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {showJumpBtn && (
//             <button
//               onClick={jumpToBottom}
//               className="absolute right-3 bottom-3 h-10 px-3 rounded-xl text-xs font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_10px_20px_rgba(16,46,80,0.25)]"
//             >
//               Scroll to latest
//             </button>
//           )}
//         </div>

//         <div className="mt-3 flex items-center gap-2">
//           <div className="relative">
//             <button
//               onClick={() => setShowEmojiPicker((v) => !v)}
//               className="grid h-10 w-10 place-items-center rounded-full bg-[#FFFDF6] ring-1 ring-[#102E50]/10 text-xl text-[#102E50] hover:ring-[#F5C45E] transition shadow-[0_6px_14px_rgba(16,46,80,0.10)] active:scale-95"
//               aria-label="Emoji"
//             >
//               😎
//             </button>
//             {showEmojiPicker && (
//               <div className="absolute bottom-12 left-0 z-50">
//                 <EmojiPicker onEmojiClick={onEmojiClick} theme="light" />
//               </div>
//             )}
//           </div>

//           <input
//             className="flex-1 rounded-xl px-3 py-2 text-[#102E50] bg-[#FFF9F0] placeholder-[#102E50]/60 border border-[#F5C45E]/60 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent shadow-inner"
//             placeholder="Type a message..."
//             value={textMessage}
//             onChange={(e) => setTextMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && textMessage.trim()) sendMessage();
//             }}
//           />

//           <button
//             onClick={sendMessage}
//             disabled={!textMessage.trim()}
//             className="h-10 px-5 rounded-xl text-sm font-semibold text-[#FFF6E9] bg-[#102E50] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_12px_24px_rgba(16,46,80,0.25)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




"live chat 3 //  فيه اسمين / وفيه تعديل احجام الخطوط " ;

// import axios from "axios";
// import EmojiPicker from "emoji-picker-react";
// import { useEffect, useRef, useState, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";

// export default function LiveChat() {
//   const [textMessage, setTextMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showJumpBtn, setShowJumpBtn] = useState(false);
//   const [expanded, setExpanded] = useState(false);
//   const [fontSize, setFontSize] = useState("md");

//   const user = useSelector((s) => s.UserInfo);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const socketRef = useRef(null);
//   const messageContainerRef = useRef(null);
//   const nearBottomRef = useRef(true);
//   const lastOwnSendRef = useRef(false);

//   const { sender, reciver } = location.state || {};
//   const senderId = sender?.user_id || sender;
//   const receiverId = reciver?.user_id || reciver;

//   const currentUserName =
//     user?.user?.name ||
//     (user?.user?.firstname && user?.user?.lastname
//       ? `${user.user.firstname} ${user.user.lastname}`
//       : user?.user?.username || "You");

//   const receiverName =
//     reciver?.name ||
//     (reciver?.firstname && reciver?.lastname
//       ? `${reciver.firstname} ${reciver.lastname}`
//       : "Receiver");
//   const receiverInitial = (receiverName || "R").toString().charAt(0).toUpperCase();

//   const sizeClass =
//     fontSize === "sm"
//       ? "text-[14px]"
//       : fontSize === "lg"
//       ? "text-[17px]"
//       : "text-[15px]";

//   useEffect(() => {
//     if (!sender || !reciver) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`${apiBase}/api/getmessages`, {
//           params: { senderId, receiveId: receiverId },
//         });
//         setMessages(res.data || []);
//       } catch {}
//     };
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 1000);
//     return () => clearInterval(interval);
//   }, [apiBase, sender, reciver, senderId, receiverId]);

//   useEffect(() => {
//     if (!senderId) return;
//     socketRef.current = io(`http://localhost:${port}`);
//     socketRef.current.emit("register", senderId);
//     socketRef.current.on("receive_message", (msg) => setMessages((p) => [...p, msg]));
//     return () => socketRef.current?.disconnect();
//   }, [port, senderId]);

//   useEffect(() => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const stick = nearBottomRef.current || lastOwnSendRef.current;
//     if (stick) {
//       el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//       setShowJumpBtn(false);
//     } else {
//       setShowJumpBtn(true);
//     }
//     if (lastOwnSendRef.current) lastOwnSendRef.current = false;
//   }, [messages]);

//   const handleScroll = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
//     nearBottomRef.current = nearBottom;
//     setShowJumpBtn(!nearBottom && messages.length > 0);
//   };

//   const jumpToBottom = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//     nearBottomRef.current = true;
//     setShowJumpBtn(false);
//   };

//   const sendMessage = async () => {
//     if (!textMessage.trim() || !senderId || !receiverId) return;
//     const data = { senderId, receiveId: receiverId, text: textMessage };
//     lastOwnSendRef.current = true;
//     setMessages((p) => [...p, { ...data, time: new Date() }]);
//     try {
//       await axios.post(`${apiBase}/api/send-messages`, data);
//       setTextMessage("");
//     } catch {}
//     socketRef.current?.emit("send-message", data);
//   };

//   const onEmojiClick = (emojiObject) => setTextMessage((v) => v + emojiObject.emoji);

//   return (
//     <div className="min-h-screen bg-[#FFF3E4] text-[#102E50]">
//       <div className={[expanded ? "max-w-6xl" : "max-w-2xl", "mx-auto px-4 sm:px-6 py-4 sm:py-6"].join(" ")}>
//         <div className="rounded-[1.25rem] p-[1px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//           <div className="rounded-[1.2rem] bg-[#FFF8EE] ring-1 ring-[#F5C45E]/60">
//             <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3">
//               <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                 <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#102E50] text-[#FFF6E9] grid place-items-center font-extrabold">
//                   {receiverInitial}
//                 </div>
//                 <div className="min-w-0">
//                   <h2 className="text-sm sm:text-base font-extrabold text-[#102E50] truncate">
//                     {receiverName}
//                   </h2>
//                   <div className="text-[11px] text-[#102E50]/70">Live chat</div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="flex items-center overflow-hidden rounded-xl ring-1 ring-[#F5C45E]/60 bg-[#FFFDF6]">
//                   <button
//                     onClick={() => setFontSize("sm")}
//                     className={`px-2.5 py-1 text-[12px] ${fontSize === "sm" ? "bg-[#F5C45E]/20 font-bold" : ""}`}
//                   >
//                     A
//                   </button>
//                   <button
//                     onClick={() => setFontSize("md")}
//                     className={`px-2.5 py-1 text-[14px] ${fontSize === "md" ? "bg-[#F5C45E]/20 font-bold" : ""}`}
//                   >
//                     A
//                   </button>
//                   <button
//                     onClick={() => setFontSize("lg")}
//                     className={`px-2.5 py-1 text-[16px] ${fontSize === "lg" ? "bg-[#F5C45E]/20 font-bold" : ""}`}
//                   >
//                     A
//                   </button>
//                 </div>
//                 <button
//                   onClick={() => setExpanded((v) => !v)}
//                   className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFFDF6] ring-1 ring-[#F5C45E]/60 text-[11px] text-[#102E50] hover:bg-[#F5C45E]/10 transition"
//                 >
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     {expanded ? (
//                       <path
//                         d="M9 3H3v6M3 3l7 7M15 21h6v-6m0 6l-7-7"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     ) : (
//                       <path
//                         d="M21 9V3h-6M21 3L14 10M3 15v6h6M3 21l7-7"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     )}
//                   </svg>
//                   {expanded ? "Collapse" : "Expand"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           ref={messageContainerRef}
//           onScroll={handleScroll}
//           aria-live="polite"
//           className={[
//             "relative mt-3 overflow-y-auto rounded-2xl bg-[#FFF8EE] ring-1 ring-[#102E50]/10 shadow-[0_18px_40px_rgba(16,46,80,0.08)] p-3 sm:p-4",
//             expanded ? "h-[84vh]" : "h-[68vh]",
//           ].join(" ")}
//         >
//           {messages.length === 0 ? (
//             <div className="h-full grid place-items-center">
//               <div className="text-center">
//                 <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-3xl text-white font-bold">
//                   💬
//                 </div>
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FFFDF6] ring-1 ring-[#102E50]/10 text-[#102E50]">
//                   No messages yet
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {messages.map((msg, idx) => {
//                 const isSender = msg.senderId === senderId || msg.sender_id === senderId;
//                 const rawSender = msg.sender_name;
//                 const senderDisplay = rawSender || currentUserName || "You";
//                 const timeStr = new Date(msg.created_at || msg.time).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 });

//                 return (
//                   <div key={idx} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
//                     <div
//                       className={`max-w-[80%] sm:max-w-[72%] break-words rounded-2xl px-3.5 py-2.5 leading-relaxed
//                       ${isSender
//                         ? "bg-[#FFF3E0] text-[#102E50] ring-1 ring-[#102E50]/12 shadow-[0_6px_16px_rgba(16,46,80,0.10)]"
//                         : "bg-gradient-to-br from-[#0E2744] to-[#102E50] text-[#FFF6E9] ring-1 ring-white/10 shadow-[0_10px_24px_rgba(16,46,80,0.25)]"}
//                       `}
//                     >
//                       <div className="flex items-center justify-between mb-1">
//                         <span
//                           className={`inline-block px-2.5 py-1 rounded-md text-[12px] font-semibold tracking-wide
//                           ${isSender ? "bg-[#F5C45E]/15 ring-1 ring-[#F5C45E]/30 text-[#0F2B48]" : "bg-[#F5C45E]/15 ring-1 ring-[#F5C45E]/30 text-white"}
//                           `}
//                         >
//                           {isSender ? senderDisplay : receiverName}
//                         </span>
//                         <span className={`${isSender ? "text-[#0F2B48]" : "text-white"} text-[13px] font-bold`}>
//                           {timeStr}
//                         </span>
//                       </div>

//                       <div
//                         className={`${sizeClass} tracking-[0.1px] ${
//                           isSender ? "text-[#102E50]" : "text-[#FFF6E9]"
//                         }`}
//                       >
//                         {msg.text}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {showJumpBtn && (
//             <button
//               onClick={jumpToBottom}
//               className="absolute right-3 bottom-3 h-10 px-3 rounded-xl text-xs font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_10px_20px_rgba(16,46,80,0.25)]"
//             >
//               Scroll to latest
//             </button>
//           )}
//         </div>

//         <div className="mt-3 flex items-center gap-2">
//           <div className="relative">
//             <button
//               onClick={() => setShowEmojiPicker((v) => !v)}
//               className="grid h-10 w-10 place-items-center rounded-full bg-[#FFFDF6] ring-1 ring-[#F5C45E]/60 text-xl text-[#102E50] hover:ring-[#F5C45E] transition shadow-[0_6px_14px_rgba(16,46,80,0.10)] active:scale-95"
//             >
//               😎
//             </button>
//             {showEmojiPicker && (
//               <div className="absolute bottom-12 left-0 z-50">
//                 <EmojiPicker onEmojiClick={onEmojiClick} theme="light" />
//               </div>
//             )}
//           </div>

//           <input
//             className="flex-1 rounded-xl px-3 py-2 text-[#102E50] bg-[#FFF9F0] placeholder-[#102E50]/60 border border-[#F5C45E]/70 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent shadow-inner"
//             placeholder="Type a message..."
//             value={textMessage}
//             onChange={(e) => setTextMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && textMessage.trim()) sendMessage();
//             }}
//           />

//           <button
//             onClick={sendMessage}
//             disabled={!textMessage.trim()}
//             className="h-10 px-5 rounded-xl text-sm font-semibold text-[#FFF6E9] bg-[#102E50] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_12px_24px_rgba(16,46,80,0.25)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }








"live chat 3 //  فيه اسمين / وفيه تعديل احجام الخطوط " ;

// import axios from "axios";
// import EmojiPicker from "emoji-picker-react";
// import { useEffect, useRef, useState, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";

// export default function LiveChat() {
//   const [textMessage, setTextMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showJumpBtn, setShowJumpBtn] = useState(false);
//   const [expanded, setExpanded] = useState(false);
//   const [fontSize, setFontSize] = useState("md");

//   const user = useSelector((s) => s.UserInfo);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const socketRef = useRef(null);
//   const messageContainerRef = useRef(null);
//   const nearBottomRef = useRef(true);
//   const lastOwnSendRef = useRef(false);

//   const { sender, reciver } = location.state || {};
//   const senderId = sender?.user_id || sender;
//   const receiverId = reciver?.user_id || reciver;

//   const currentUserName =
//     user?.user?.name ||
//     (user?.user?.firstname && user?.user?.lastname
//       ? `${user.user.firstname} ${user.user.lastname}`
//       : user?.user?.username || "You");

//   const receiverName =
//     reciver?.name ||
//     (reciver?.firstname && reciver?.lastname
//       ? `${reciver.firstname} ${reciver.lastname}`
//       : "Receiver");
//   const receiverInitial = (receiverName || "R").toString().charAt(0).toUpperCase();

//   const sizeClass =
//     fontSize === "sm"
//       ? "text-[14px]"
//       : fontSize === "lg"
//       ? "text-[17px]"
//       : "text-[15px]";

//   useEffect(() => {
//     if (!sender || !reciver) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`${apiBase}/api/getmessages`, {
//           params: { senderId, receiveId: receiverId },
//         });
//         setMessages(res.data || []);
//       } catch {}
//     };
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 1000);
//     return () => clearInterval(interval);
//   }, [apiBase, sender, reciver, senderId, receiverId]);

//   useEffect(() => {
//     if (!senderId) return;
//     socketRef.current = io(`http://localhost:${port}`);
//     socketRef.current.emit("register", senderId);
//     socketRef.current.on("receive_message", (msg) => setMessages((p) => [...p, msg]));
//     return () => socketRef.current?.disconnect();
//   }, [port, senderId]);

//   useEffect(() => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const stick = nearBottomRef.current || lastOwnSendRef.current;
//     if (stick) {
//       el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//       setShowJumpBtn(false);
//     } else {
//       setShowJumpBtn(true);
//     }
//     if (lastOwnSendRef.current) lastOwnSendRef.current = false;
//   }, [messages]);

//   const handleScroll = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
//     nearBottomRef.current = nearBottom;
//     setShowJumpBtn(!nearBottom && messages.length > 0);
//   };

//   const jumpToBottom = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//     nearBottomRef.current = true;
//     setShowJumpBtn(false);
//   };

//   const sendMessage = async () => {
//     if (!textMessage.trim() || !senderId || !receiverId) return;
//     const data = { senderId, receiveId: receiverId, text: textMessage };
//     lastOwnSendRef.current = true;
//     setMessages((p) => [...p, { ...data, time: new Date() }]);
//     try {
//       await axios.post(`${apiBase}/api/send-messages`, data);
//       setTextMessage("");
//     } catch {}
//     socketRef.current?.emit("send-message", data);
//   };

//   const onEmojiClick = (emojiObject) => setTextMessage((v) => v + emojiObject.emoji);

//   return (
//     <div className="min-h-screen bg-[#FFF3E4] text-[#102E50]">
//       <div className={[expanded ? "max-w-6xl" : "max-w-2xl", "mx-auto px-4 sm:px-6 py-4 sm:py-6"].join(" ")}>
//         <div className="rounded-[1.25rem] p-[1px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//           <div className="rounded-[1.2rem] bg-[#FFF8EE] ring-1 ring-[#F5C45E]/60">
//             <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3">
//               <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                 <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#102E50] text-[#FFF6E9] grid place-items-center font-extrabold">
//                   {receiverInitial}
//                 </div>
//                 <div className="min-w-0">
//                   <h2 className="text-sm sm:text-base font-extrabold text-[#102E50] truncate">
//                     {receiverName}
//                   </h2>
//                   <div className="text-[11px] text-[#102E50]/70">Live chat</div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="flex items-center overflow-hidden rounded-xl ring-1 ring-[#F5C45E]/60 bg-[#FFFDF6]">
//                   <button
//                     onClick={() => setFontSize("sm")}
//                     className={`px-2.5 py-1 text-[12px] ${fontSize === "sm" ? "bg-[#F5C45E]/20 font-bold" : ""}`}
//                   >
//                     A
//                   </button>
//                   <button
//                     onClick={() => setFontSize("md")}
//                     className={`px-2.5 py-1 text-[14px] ${fontSize === "md" ? "bg-[#F5C45E]/20 font-bold" : ""}`}
//                   >
//                     A
//                   </button>
//                   <button
//                     onClick={() => setFontSize("lg")}
//                     className={`px-2.5 py-1 text-[16px] ${fontSize === "lg" ? "bg-[#F5C45E]/20 font-bold" : ""}`}
//                   >
//                     A
//                   </button>
//                 </div>
//                 <button
//                   onClick={() => setExpanded((v) => !v)}
//                   className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFFDF6] ring-1 ring-[#F5C45E]/60 text-[11px] text-[#102E50] hover:bg-[#F5C45E]/10 transition"
//                 >
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     {expanded ? (
//                       <path
//                         d="M9 3H3v6M3 3l7 7M15 21h6v-6m0 6l-7-7"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     ) : (
//                       <path
//                         d="M21 9V3h-6M21 3L14 10M3 15v6h6M3 21l7-7"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     )}
//                   </svg>
//                   {expanded ? "Collapse" : "Expand"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           ref={messageContainerRef}
//           onScroll={handleScroll}
//           aria-live="polite"
//           className={[
//             "relative mt-3 overflow-y-auto rounded-2xl bg-[#FFF8EE] ring-1 ring-[#102E50]/10 shadow-[0_18px_40px_rgba(16,46,80,0.08)] p-3 sm:p-4",
//             expanded ? "h-[84vh]" : "h-[68vh]",
//           ].join(" ")}
//         >
//           {messages.length === 0 ? (
//             <div className="h-full grid place-items-center">
//               <div className="text-center">
//                 <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-3xl text-white font-bold">
//                   💬
//                 </div>
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FFFDF6] ring-1 ring-[#102E50]/10 text-[#102E50]">
//                   No messages yet
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {messages.map((msg, idx) => {
//                 const isSender = msg.senderId === senderId || msg.sender_id === senderId;
//                 const rawSender = msg.sender_name;
//                 const senderDisplay = rawSender || currentUserName || "You";
//                 const timeStr = new Date(msg.created_at || msg.time).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 });

//                 return (
//                   <div key={idx} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
//                     <div
//                       className={`max-w-[80%] sm:max-w-[72%] break-words rounded-2xl px-3.5 py-2.5 leading-relaxed
//                       ${
//                         isSender
//                           ? "bg-[#F3E2C5] text-[#102E50] ring-1 ring-[#102E50]/12 shadow-[0_6px_16px_rgba(16,46,80,0.10)]"
//                           : "bg-gradient-to-br from-[#0E2744] to-[#102E50] text-[#FFF6E9] ring-1 ring-white/10 shadow-[0_10px_24px_rgba(16,46,80,0.25)]"
//                       }`}
//                     >
//                       <div
//                         className={`text-[13px] font-semibold text-[#F5C45E] mb-1 ${
//                           isSender ? "text-right" : "text-left"
//                         }`}
//                       >
//                         {isSender ? senderDisplay : receiverName}
//                       </div>

//                       <div
//                         className={`${sizeClass} tracking-[0.1px] ${
//                           isSender ? "text-[#102E50]" : "text-[#FFF6E9]"
//                         }`}
//                       >
//                         {msg.text}
//                       </div>

//                       <div
//                         className={`mt-1.5 text-[13px] font-semibold ${
//                           isSender ? "text-[#0E2744]/80 text-right" : "text-white/90 text-left"
//                         }`}
//                       >
//                         {timeStr}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {showJumpBtn && (
//             <button
//               onClick={jumpToBottom}
//               className="absolute right-3 bottom-3 h-10 px-3 rounded-xl text-xs font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_10px_20px_rgba(16,46,80,0.25)]"
//             >
//               Scroll to latest
//             </button>
//           )}
//         </div>

//         <div className="mt-3 flex items-center gap-2">
//           <div className="relative">
//             <button
//               onClick={() => setShowEmojiPicker((v) => !v)}
//               className="grid h-10 w-10 place-items-center rounded-full bg-[#FFFDF6] ring-1 ring-[#F5C45E]/60 text-xl text-[#102E50] hover:ring-[#F5C45E] transition shadow-[0_6px_14px_rgba(16,46,80,0.10)] active:scale-95"
//             >
//               😎
//             </button>
//             {showEmojiPicker && (
//               <div className="absolute bottom-12 left-0 z-50">
//                 <EmojiPicker onEmojiClick={onEmojiClick} theme="light" />
//               </div>
//             )}
//           </div>

//           <input
//             className="flex-1 rounded-xl px-3 py-2 text-[#102E50] bg-[#FFF9F0] placeholder-[#102E50]/60 border border-[#F5C45E]/70 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent shadow-inner"
//             placeholder="Type a message..."
//             value={textMessage}
//             onChange={(e) => setTextMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && textMessage.trim()) sendMessage();
//             }}
//           />

//           <button
//             onClick={sendMessage}
//             disabled={!textMessage.trim()}
//             className="h-10 px-5 rounded-xl text-sm font-semibold text-[#FFF6E9] bg-[#102E50] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_12px_24px_rgba(16,46,80,0.25)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }











// import axios from "axios";
// import EmojiPicker from "emoji-picker-react";
// import { useEffect, useRef, useState, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";

// export default function LiveChat() {
//   const [textMessage, setTextMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showJumpBtn, setShowJumpBtn] = useState(false);
//   const [expanded, setExpanded] = useState(false);
//   const [fontSize, setFontSize] = useState("md");

//   const user = useSelector((s) => s.UserInfo);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const socketRef = useRef(null);
//   const messageContainerRef = useRef(null);
//   const nearBottomRef = useRef(true);
//   const lastOwnSendRef = useRef(false);

//   const { sender, reciver } = location.state || {};
//   const senderId = sender?.user_id || sender;
//   const receiverId = reciver?.user_id || reciver;

//   const currentUserName =
//     user?.user?.name ||
//     (user?.user?.firstname && user?.user?.lastname
//       ? `${user.user.firstname} ${user.user.lastname}`
//       : user?.user?.username || "You");

//   const receiverName =
//     reciver?.name ||
//     (reciver?.firstname && reciver?.lastname
//       ? `${reciver.firstname} ${reciver.lastname}`
//       : "Receiver");
//   const receiverInitial = (receiverName || "R").toString().charAt(0).toUpperCase();

//   const sizeClass =
//     fontSize === "sm"
//       ? "text-[14px]"
//       : fontSize === "lg"
//       ? "text-[17px]"
//       : "text-[15px]";

//   useEffect(() => {
//     if (!sender || !reciver) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`${apiBase}/api/getmessages`, {
//           params: { senderId, receiveId: receiverId },
//         });
//         setMessages(res.data || []);
//       } catch {}
//     };
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 1000);
//     return () => clearInterval(interval);
//   }, [apiBase, sender, reciver, senderId, receiverId]);

//   useEffect(() => {
//     if (!senderId) return;
//     socketRef.current = io(`http://localhost:${port}`);
//     socketRef.current.emit("register", senderId);
//     socketRef.current.on("receive_message", (msg) => setMessages((p) => [...p, msg]));
//     return () => socketRef.current?.disconnect();
//   }, [port, senderId]);

//   useEffect(() => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const stick = nearBottomRef.current || lastOwnSendRef.current;
//     if (stick) {
//       el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//       setShowJumpBtn(false);
//     } else {
//       setShowJumpBtn(true);
//     }
//     if (lastOwnSendRef.current) lastOwnSendRef.current = false;
//   }, [messages]);

//   const handleScroll = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
//     nearBottomRef.current = nearBottom;
//     setShowJumpBtn(!nearBottom && messages.length > 0);
//   };

//   const jumpToBottom = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//     nearBottomRef.current = true;
//     setShowJumpBtn(false);
//   };

//   const sendMessage = async () => {
//     if (!textMessage.trim() || !senderId || !receiverId) return;
//     const data = { senderId, receiveId: receiverId, text: textMessage };
//     lastOwnSendRef.current = true;
//     setMessages((p) => [...p, { ...data, time: new Date() }]);
//     try {
//       await axios.post(`${apiBase}/api/send-messages`, data);
//       setTextMessage("");
//     } catch {}
//     socketRef.current?.emit("send-message", data);
//   };

//   const onEmojiClick = (emojiObject) => setTextMessage((v) => v + emojiObject.emoji);

//   return (
//     <div className="min-h-screen bg-[#FFF3E4] text-[#102E50]">
//       <div className={[expanded ? "max-w-6xl" : "max-w-2xl", "mx-auto px-4 sm:px-6 py-4 sm:py-6"].join(" ")}>
//         <div className="rounded-[1.25rem] p-[1px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//           <div className="rounded-[1.2rem] bg-[#FFF8EE] ring-1 ring-[#F5C45E]/60">
//             <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3">
//               <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                 <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#102E50] text-[#FFF6E9] grid place-items-center font-extrabold">
//                   {receiverInitial}
//                 </div>
//                 <div className="min-w-0">
//                   <h2 className="text-sm sm:text-base font-extrabold text-[#102E50] truncate">
//                     {receiverName}
//                   </h2>
//                   <div className="text-[11px] text-[#102E50]/70">Live chat</div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="flex items-center overflow-hidden rounded-xl ring-1 ring-[#F5C45E]/60 bg-[#FFFDF6]">
//                   <button
//                     onClick={() => setFontSize("sm")}
//                     className={`px-2.5 py-1 text-[12px] ${fontSize === "sm" ? "bg-[#F5C45E]/20 font-bold" : ""}`}
//                   >
//                     A
//                   </button>
//                   <button
//                     onClick={() => setFontSize("md")}
//                     className={`px-2.5 py-1 text-[14px] ${fontSize === "md" ? "bg-[#F5C45E]/20 font-bold" : ""}`}
//                   >
//                     A
//                   </button>
//                   <button
//                     onClick={() => setFontSize("lg")}
//                     className={`px-2.5 py-1 text-[16px] ${fontSize === "lg" ? "bg-[#F5C45E]/20 font-bold" : ""}`}
//                   >
//                     A
//                   </button>
//                 </div>
//                 <button
//                   onClick={() => setExpanded((v) => !v)}
//                   className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFFDF6] ring-1 ring-[#F5C45E]/60 text-[11px] text-[#102E50] hover:bg-[#F5C45E]/10 transition"
//                 >
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     {expanded ? (
//                       <path
//                         d="M9 3H3v6M3 3l7 7M15 21h6v-6m0 6l-7-7"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     ) : (
//                       <path
//                         d="M21 9V3h-6M21 3L14 10M3 15v6h6M3 21l7-7"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     )}
//                   </svg>
//                   {expanded ? "Collapse" : "Expand"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           ref={messageContainerRef}
//           onScroll={handleScroll}
//           aria-live="polite"
//           className={[
//             "relative mt-3 overflow-y-auto rounded-2xl bg-[#FFF8EE] ring-1 ring-[#102E50]/10 shadow-[0_18px_40px_rgba(16,46,80,0.08)] p-3 sm:p-4",
//             expanded ? "h-[84vh]" : "h-[68vh]",
//           ].join(" ")}
//         >
//           {messages.length === 0 ? (
//             <div className="h-full grid place-items-center">
//               <div className="text-center">
//                 <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-3xl text-white font-bold">
//                   💬
//                 </div>
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FFFDF6] ring-1 ring-[#102E50]/10 text-[#102E50]">
//                   No messages yet
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {messages.map((msg, idx) => {
//                 const isSender = msg.senderId === senderId || msg.sender_id === senderId;
//                 const rawSender = msg.sender_name;
//                 const senderDisplay = rawSender || currentUserName || "You";
//                 const timeStr = new Date(msg.created_at || msg.time).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 });

//                 return (
//                   <div key={idx} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
//                     <div
//                       className={`max-w-[80%] sm:max-w-[72%] break-words rounded-2xl px-3.5 py-2.5 leading-relaxed
//                       ${
//                         isSender
//                           ? "bg-[#F7EBD6] text-[#102E50] ring-1 ring-[#102E50]/12 shadow-[0_6px_16px_rgba(16,46,80,0.10)]"
//                           : "bg-gradient-to-br from-[#0E2744] to-[#102E50] text-[#FFF6E9] ring-1 ring-white/10 shadow-[0_10px_24px_rgba(16,46,80,0.25)]"
//                       }`}
//                     >
//                       <div
//                         className={`mb-1 ${isSender ? "text-right" : "text-left"}`}
//                       >
//                         <span className="inline-block px-2 py-0.5 rounded-md bg-[#F5C45E]/15 text-[#F5C45E] font-extrabold text-[13px] leading-none">
//                           {isSender ? senderDisplay : receiverName}
//                         </span>
//                       </div>

//                       <div
//                         className={`${sizeClass} tracking-[0.1px] ${
//                           isSender ? "text-[#102E50]" : "text-[#FFF6E9]"
//                         }`}
//                       >
//                         {msg.text}
//                       </div>

//                       <div
//                         className={`mt-1.5 text-[14px] font-bold ${
//                           isSender ? "text-[#0E2744]/90 text-left" : "text-white/90 text-right"
//                         }`}
//                       >
//                         {timeStr}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {showJumpBtn && (
//             <button
//               onClick={jumpToBottom}
//               className="absolute right-3 bottom-3 h-10 px-3 rounded-xl text-xs font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_10px_20px_rgba(16,46,80,0.25)]"
//             >
//               Scroll to latest
//             </button>
//           )}
//         </div>

//         <div className="mt-3 flex items-center gap-2">
//           <div className="relative">
//             <button
//               onClick={() => setShowEmojiPicker((v) => !v)}
//               className="grid h-10 w-10 place-items-center rounded-full bg-[#FFFDF6] ring-1 ring-[#F5C45E]/60 text-xl text-[#102E50] hover:ring-[#F5C45E] transition shadow-[0_6px_14px_rgba(16,46,80,0.10)] active:scale-95"
//             >
//               😎
//             </button>
//             {showEmojiPicker && (
//               <div className="absolute bottom-12 left-0 z-50">
//                 <EmojiPicker onEmojiClick={onEmojiClick} theme="light" />
//               </div>
//             )}
//           </div>

//           <input
//             className="flex-1 rounded-xl px-3 py-2 text-[#102E50] bg-[#FFF9F0] placeholder-[#102E50]/60 border border-[#F5C45E]/70 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent shadow-inner"
//             placeholder="Type a message..."
//             value={textMessage}
//             onChange={(e) => setTextMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && textMessage.trim()) sendMessage();
//             }}
//           />

//           <button
//             onClick={sendMessage}
//             disabled={!textMessage.trim()}
//             className="h-10 px-5 rounded-xl text-sm font-semibold text-[#FFF6E9] bg-[#102E50] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_12px_24px_rgba(16,46,80,0.25)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }





"live chat 3 //  فيه اسمين / وفيه تعديل احجام الخطوط " ;







// import axios from "axios";
// import EmojiPicker from "emoji-picker-react";
// import { useEffect, useRef, useState, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";

// export default function LiveChat() {
//   const [textMessage, setTextMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showJumpBtn, setShowJumpBtn] = useState(false);
//   const [expanded, setExpanded] = useState(false);
//   const [fontSize, setFontSize] = useState("md");

//   const user = useSelector((s) => s.UserInfo);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const socketRef = useRef(null);
//   const messageContainerRef = useRef(null);
//   const nearBottomRef = useRef(true);
//   const lastOwnSendRef = useRef(false);

//   const { sender, reciver } = location.state || {};
//   const senderId = sender?.user_id || sender;
//   const receiverId = reciver?.user_id || reciver;

//   const currentUserName =
//     user?.user?.name ||
//     (user?.user?.firstname && user?.user?.lastname
//       ? `${user.user.firstname} ${user.user.lastname}`
//       : user?.user?.username || "You");

//   const receiverName =
//     reciver?.name ||
//     (reciver?.firstname && reciver?.lastname
//       ? `${reciver.firstname} ${reciver.lastname}`
//       : "Receiver");
//   const receiverInitial = (receiverName || "R").toString().charAt(0).toUpperCase();

//   const sizeClass =
//     fontSize === "sm"
//       ? "text-[14px]"
//       : fontSize === "lg"
//       ? "text-[17px]"
//       : "text-[15px]";

//   useEffect(() => {
//     if (!sender || !reciver) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`${apiBase}/api/getmessages`, {
//           params: { senderId, receiveId: receiverId },
//         });
//         setMessages(res.data || []);
//       } catch {}
//     };
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 1000);
//     return () => clearInterval(interval);
//   }, [apiBase, sender, reciver, senderId, receiverId]);

//   useEffect(() => {
//     if (!senderId) return;
//     socketRef.current = io(`http://localhost:${port}`);
//     socketRef.current.emit("register", senderId);
//     socketRef.current.on("receive_message", (msg) => setMessages((p) => [...p, msg]));
//     return () => socketRef.current?.disconnect();
//   }, [port, senderId]);

//   useEffect(() => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const stick = nearBottomRef.current || lastOwnSendRef.current;
//     if (stick) {
//       el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//       setShowJumpBtn(false);
//     } else {
//       setShowJumpBtn(true);
//     }
//     if (lastOwnSendRef.current) lastOwnSendRef.current = false;
//   }, [messages]);

//   const handleScroll = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
//     nearBottomRef.current = nearBottom;
//     setShowJumpBtn(!nearBottom && messages.length > 0);
//   };

//   const jumpToBottom = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//     nearBottomRef.current = true;
//     setShowJumpBtn(false);
//   };

//   const sendMessage = async () => {
//     if (!textMessage.trim() || !senderId || !receiverId) return;
//     const data = { senderId, receiveId: receiverId, text: textMessage };
//     lastOwnSendRef.current = true;
//     setMessages((p) => [...p, { ...data, time: new Date() }]);
//     try {
//       await axios.post(`${apiBase}/api/send-messages`, data);
//       setTextMessage("");
//     } catch {}
//     socketRef.current?.emit("send-message", data);
//   };

//   const onEmojiClick = (emojiObject) => setTextMessage((v) => v + emojiObject.emoji);

//   return (
//     <div className="min-h-screen bg-[#FFF3E4] text-[#102E50]">
//       <div className={[expanded ? "max-w-6xl" : "max-w-2xl", "mx-auto px-4 sm:px-6 py-4 sm:py-6"].join(" ")}>
//         <div className="rounded-[1.25rem] p-[1px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//           <div className="rounded-[1.2rem] bg-[#FFF8EE] ring-1 ring-[#F5C45E]/60">
//             <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3">
//               <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                 <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#102E50] text-[#FFF6E9] grid place-items-center font-extrabold">
//                   {receiverInitial}
//                 </div>
//                 <div className="min-w-0">
//                   <h2 className="text-sm sm:text-base font-extrabold text-[#102E50] truncate">
//                     {receiverName}
//                   </h2>
//                   <div className="text-[11px] text-[#102E50]/70">Live chat</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           ref={messageContainerRef}
//           onScroll={handleScroll}
//           className={[
//             "relative mt-3 overflow-y-auto rounded-2xl bg-[#FFF8EE] ring-1 ring-[#102E50]/10 shadow-[0_18px_40px_rgba(16,46,80,0.08)] p-3 sm:p-4",
//             expanded ? "h-[84vh]" : "h-[68vh]",
//           ].join(" ")}
//         >
//           {messages.length === 0 ? (
//             <div className="h-full grid place-items-center">
//               <div className="text-center">
//                 <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-3xl text-white font-bold">
//                   💬
//                 </div>
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FFFDF6] ring-1 ring-[#102E50]/10 text-[#102E50]">
//                   No messages yet
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {messages.map((msg, idx) => {
//                 const isSender = msg.senderId === senderId || msg.sender_id === senderId;
//                 const senderDisplay = msg.sender_name || currentUserName || "You";
//                 const timeStr = new Date(msg.created_at || msg.time).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 });

//                 return (
//                   <div key={idx} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
//                     <div
//                       className={`max-w-[80%] sm:max-w-[72%] break-words rounded-2xl px-3.5 py-2.5 leading-relaxed ${
//                         isSender
//                           ? "bg-[#F7EBD6] text-[#102E50] ring-1 ring-[#102E50]/12 shadow-[0_6px_16px_rgba(16,46,80,0.10)]"
//                           : "bg-gradient-to-br from-[#0E2744] to-[#102E50] text-[#FFF6E9] ring-1 ring-white/10 shadow-[0_10px_24px_rgba(16,46,80,0.25)]"
//                       }`}
//                     >
//                       <div className={`${isSender ? "text-right" : "text-left"} mb-1`}>
//                         {isSender ? (
//                           <div className="flex justify-end">
//                             <span className="inline-block px-2 py-0.5 rounded-md bg-[#102E50]/15 text-[#102E50]/90 font-extrabold text-[13px] leading-none">
//                               {senderDisplay}
//                             </span>
//                           </div>
//                         ) : (
//                           <div className="flex justify-start">
//                             <span className="inline-block px-2 py-0.5 rounded-md bg-[#F5C45E]/15 text-[#F5C45E] font-extrabold text-[13px] leading-none">
//                               {receiverName}
//                             </span>
//                           </div>
//                         )}
//                       </div>

//                       <div className={`${sizeClass} tracking-[0.1px] ${isSender ? "text-[#102E50]" : "text-[#FFF6E9]"}`}>
//                         {msg.text}
//                       </div>

//                       <div className={`mt-1.5 text-[14px] font-bold ${isSender ? "text-[#0E2744]/90 text-left" : "text-white/90 text-right"}`}>
//                         {timeStr}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         <div className="mt-3 flex items-center gap-2">
//           <div className="relative">
//             <button
//               onClick={() => setShowEmojiPicker((v) => !v)}
//               className="grid h-10 w-10 place-items-center rounded-full bg-[#FFFDF6] ring-1 ring-[#F5C45E]/60 text-xl text-[#102E50] hover:ring-[#F5C45E] transition shadow-[0_6px_14px_rgba(16,46,80,0.10)] active:scale-95"
//             >
//               😎
//             </button>
//             {showEmojiPicker && (
//               <div className="absolute bottom-12 left-0 z-50">
//                 <EmojiPicker onEmojiClick={onEmojiClick} theme="light" />
//               </div>
//             )}
//           </div>

//           <input
//             className="flex-1 rounded-xl px-3 py-2 text-[#102E50] bg-[#FFF9F0] placeholder-[#102E50]/60 border border-[#F5C45E]/70 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent shadow-inner"
//             placeholder="Type a message..."
//             value={textMessage}
//             onChange={(e) => setTextMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && textMessage.trim()) sendMessage();
//             }}
//           />

//           <button
//             onClick={sendMessage}
//             disabled={!textMessage.trim()}
//             className="h-10 px-5 rounded-xl text-sm font-semibold text-[#FFF6E9] bg-[#102E50] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_12px_24px_rgba(16,46,80,0.25)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }





"live chat 3 //  فيه اسمين / وفيه تعديل احجام الخطوط " ;




// import axios from "axios";
// import EmojiPicker from "emoji-picker-react";
// import { useEffect, useRef, useState, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";

// export default function LiveChat() {
//   const [textMessage, setTextMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showJumpBtn, setShowJumpBtn] = useState(false);
//   const [expanded, setExpanded] = useState(false);
//   const [fontSize, setFontSize] = useState("md");

//   const user = useSelector((s) => s.UserInfo);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const socketRef = useRef(null);
//   const messageContainerRef = useRef(null);
//   const nearBottomRef = useRef(true);
//   const lastOwnSendRef = useRef(false);

//   const { sender, reciver } = location.state || {};
//   const senderId = sender?.user_id || sender;
//   const receiverId = reciver?.user_id || reciver;

//   const currentUserName =
//     user?.user?.name ||
//     (user?.user?.firstname && user?.user?.lastname
//       ? `${user.user.firstname} ${user.user.lastname}`
//       : user?.user?.username || "You");

//   const receiverName =
//     reciver?.name ||
//     (reciver?.firstname && reciver?.lastname
//       ? `${reciver.firstname} ${reciver.lastname}`
//       : "Receiver");
//   const receiverInitial = (receiverName || "R").toString().charAt(0).toUpperCase();

//   const sizeClass =
//     fontSize === "sm"
//       ? "text-[14px]"
//       : fontSize === "lg"
//       ? "text-[17px]"
//       : "text-[15px]";

//   useEffect(() => {
//     if (!sender || !reciver) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`${apiBase}/api/getmessages`, {
//           params: { senderId, receiveId: receiverId },
//         });
//         setMessages(res.data || []);
//       } catch {}
//     };
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 1000);
//     return () => clearInterval(interval);
//   }, [apiBase, sender, reciver, senderId, receiverId]);

//   useEffect(() => {
//     if (!senderId) return;
//     socketRef.current = io(`http://localhost:${port}`);
//     socketRef.current.emit("register", senderId);
//     socketRef.current.on("receive_message", (msg) => setMessages((p) => [...p, msg]));
//     return () => socketRef.current?.disconnect();
//   }, [port, senderId]);

//   useEffect(() => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const stick = nearBottomRef.current || lastOwnSendRef.current;
//     if (stick) {
//       el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//       setShowJumpBtn(false);
//     } else {
//       setShowJumpBtn(true);
//     }
//     if (lastOwnSendRef.current) lastOwnSendRef.current = false;
//   }, [messages]);

//   const handleScroll = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
//     nearBottomRef.current = nearBottom;
//     setShowJumpBtn(!nearBottom && messages.length > 0);
//   };

//   const jumpToBottom = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//     nearBottomRef.current = true;
//     setShowJumpBtn(false);
//   };

//   const sendMessage = async () => {
//     if (!textMessage.trim() || !senderId || !receiverId) return;
//     const data = { senderId, receiveId: receiverId, text: textMessage };
//     lastOwnSendRef.current = true;
//     setMessages((p) => [...p, { ...data, time: new Date() }]);
//     try {
//       await axios.post(`${apiBase}/api/send-messages`, data);
//       setTextMessage("");
//     } catch {}
//     socketRef.current?.emit("send-message", data);
//   };

//   const onEmojiClick = (emojiObject) => setTextMessage((v) => v + emojiObject.emoji);

//   return (
//     <div className="min-h-screen bg-[#FFF3E4] text-[#102E50]">
//       <div className={[expanded ? "max-w-6xl" : "max-w-2xl", "mx-auto px-4 sm:px-6 py-4 sm:py-6"].join(" ")}>
//         <div className="rounded-[1.25rem] p-[1px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//           <div className="rounded-[1.2rem] bg-[#FFF8EE] ring-1 ring-[#F5C45E]/60">
//             <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3">
//               <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                 <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#102E50] text-[#FFF6E9] grid place-items-center font-extrabold">
//                   {receiverInitial}
//                 </div>
//                 <div className="min-w-0">
//                   <h2 className="text-sm sm:text-base font-extrabold text-[#102E50] truncate">
//                     {receiverName}
//                   </h2>
//                   <div className="text-[11px] text-[#102E50]/70">Live chat</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           ref={messageContainerRef}
//           onScroll={handleScroll}
//           className={[
//             "relative mt-3 overflow-y-auto rounded-2xl bg-[#FFF8EE] ring-1 ring-[#102E50]/10 shadow-[0_18px_40px_rgba(16,46,80,0.08)] p-3 sm:p-4",
//             expanded ? "h-[84vh]" : "h-[68vh]",
//           ].join(" ")}
//         >
//           {messages.length === 0 ? (
//             <div className="h-full grid place-items-center">
//               <div className="text-center">
//                 <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-3xl text-white font-bold">
//                   💬
//                 </div>
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FFFDF6] ring-1 ring-[#102E50]/10 text-[#102E50]">
//                   No messages yet
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {messages.map((msg, idx) => {
//                 const isSender = msg.senderId === senderId || msg.sender_id === senderId;
//                 const senderDisplay = msg.sender_name || currentUserName || "You";
//                 const timeStr = new Date(msg.created_at || msg.time).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 });

//                 return (
//                   <div key={idx} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
//                     <div
//                       className={`max-w-[80%] sm:max-w-[72%] break-words rounded-2xl px-3.5 py-2.5 leading-relaxed ${
//                         isSender
//                           ? "bg-[#F7EBD6] text-[#102E50] ring-1 ring-[#102E50]/12 shadow-[0_6px_16px_rgba(16,46,80,0.10)]"
//                           : "bg-gradient-to-br from-[#0E2744] to-[#102E50] text-[#FFF6E9] ring-1 ring-white/10 shadow-[0_10px_24px_rgba(16,46,80,0.25)]"
//                       }`}
//                     >
//                       <div className={`${isSender ? "text-right" : "text-left"} mt-[2px]`}>
//                         {isSender ? (
//                           <div className="flex justify-end">
//                             <span className="inline-block px-2 py-0.5 rounded-md bg-[#102E50]/15 text-[#102E50]/90 font-extrabold text-[13px] leading-none">
//                               {senderDisplay}
//                             </span>
//                           </div>
//                         ) : (
//                           <div className="flex justify-start">
//                             <span className="inline-block px-2 py-0.5 rounded-md bg-[#F5C45E]/15 text-[#F5C45E] font-extrabold text-[13px] leading-none">
//                               {receiverName}
//                             </span>
//                           </div>
//                         )}
//                       </div>

//                       <div className={`${sizeClass} tracking-[0.1px] mt-[2px] ${isSender ? "text-[#102E50]" : "text-[#FFF6E9]"}`}>
//                         {msg.text}
//                       </div>

//                       <div className={`mt-1.5 text-[14px] font-bold ${isSender ? "text-[#0E2744]/90 text-left" : "text-white/90 text-right"}`}>
//                         {timeStr}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         <div className="mt-3 flex items-center gap-2">
//           <div className="relative">
//             <button
//               onClick={() => setShowEmojiPicker((v) => !v)}
//               className="grid h-10 w-10 place-items-center rounded-full bg-[#FFFDF6] ring-1 ring-[#F5C45E]/60 text-xl text-[#102E50] hover:ring-[#F5C45E] transition shadow-[0_6px_14px_rgba(16,46,80,0.10)] active:scale-95"
//             >
//               😎
//             </button>
//             {showEmojiPicker && (
//               <div className="absolute bottom-12 left-0 z-50">
//                 <EmojiPicker onEmojiClick={onEmojiClick} theme="light" />
//               </div>
//             )}
//           </div>

//           <input
//             className="flex-1 rounded-xl px-3 py-2 text-[#102E50] bg-[#FFF9F0] placeholder-[#102E50]/60 border border-[#F5C45E]/70 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent shadow-inner"
//             placeholder="Type a message..."
//             value={textMessage}
//             onChange={(e) => setTextMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && textMessage.trim()) sendMessage();
//             }}
//           />

//           <button
//             onClick={sendMessage}
//             disabled={!textMessage.trim()}
//             className="h-10 px-5 rounded-xl text-sm font-semibold text-[#FFF6E9] bg-[#102E50] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_12px_24px_rgba(16,46,80,0.25)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }









// import axios from "axios";
// import EmojiPicker from "emoji-picker-react";
// import { useEffect, useRef, useState, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";

// export default function LiveChat() {
//   const [textMessage, setTextMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showJumpBtn, setShowJumpBtn] = useState(false);
//   const [expanded, setExpanded] = useState(false);
//   const [fontSize, setFontSize] = useState("md");

//   const user = useSelector((s) => s.UserInfo);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const socketRef = useRef(null);
//   const messageContainerRef = useRef(null);
//   const nearBottomRef = useRef(true);
//   const lastOwnSendRef = useRef(false);

//   const { sender, reciver } = location.state || {};
//   const senderId = sender?.user_id || sender;
//   const receiverId = reciver?.user_id || reciver;

//   const currentUserName =
//     user?.user?.name ||
//     (user?.user?.firstname && user?.user?.lastname
//       ? `${user.user.firstname} ${user.user.lastname}`
//       : user?.user?.username || "You");

//   const receiverName =
//     reciver?.name ||
//     (reciver?.firstname && reciver?.lastname
//       ? `${reciver.firstname} ${reciver.lastname}`
//       : "Receiver");
//   const receiverInitial = (receiverName || "R").toString().charAt(0).toUpperCase();

//   const sizeClass =
//     fontSize === "sm"
//       ? "text-[14px]"
//       : fontSize === "lg"
//       ? "text-[17px]"
//       : "text-[15px]";

//   useEffect(() => {
//     if (!sender || !reciver) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`${apiBase}/api/getmessages`, {
//           params: { senderId, receiveId: receiverId },
//         });
//         setMessages(res.data || []);
//       } catch {}
//     };
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 1000);
//     return () => clearInterval(interval);
//   }, [apiBase, sender, reciver, senderId, receiverId]);

//   useEffect(() => {
//     if (!senderId) return;
//     socketRef.current = io(`http://localhost:${port}`);
//     socketRef.current.emit("register", senderId);
//     socketRef.current.on("receive_message", (msg) => setMessages((p) => [...p, msg]));
//     return () => socketRef.current?.disconnect();
//   }, [port, senderId]);

//   useEffect(() => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const stick = nearBottomRef.current || lastOwnSendRef.current;
//     if (stick) {
//       el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//       setShowJumpBtn(false);
//     } else {
//       setShowJumpBtn(true);
//     }
//     if (lastOwnSendRef.current) lastOwnSendRef.current = false;
//   }, [messages]);

//   const handleScroll = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
//     nearBottomRef.current = nearBottom;
//     setShowJumpBtn(!nearBottom && messages.length > 0);
//   };

//   const jumpToBottom = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//     nearBottomRef.current = true;
//     setShowJumpBtn(false);
//   };

//   const sendMessage = async () => {
//     if (!textMessage.trim() || !senderId || !receiverId) return;
//     const data = { senderId, receiveId: receiverId, text: textMessage };
//     lastOwnSendRef.current = true;
//     setMessages((p) => [...p, { ...data, time: new Date() }]);
//     try {
//       await axios.post(`${apiBase}/api/send-messages`, data);
//       setTextMessage("");
//     } catch {}
//     socketRef.current?.emit("send-message", data);
//   };

//   const onEmojiClick = (emojiObject) => setTextMessage((v) => v + emojiObject.emoji);

//   return (
//     <div className="min-h-screen bg-[#FFF3E4] text-[#102E50]">
//       <div className={[expanded ? "max-w-6xl" : "max-w-2xl", "mx-auto px-4 sm:px-6 py-4 sm:py-6"].join(" ")}>
//         <div className="rounded-[1.25rem] p-[1px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//           <div className="rounded-[1.2rem] bg-[#FFF8EE] ring-1 ring-[#F5C45E]/60">
//             <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3">
//               <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                 <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#102E50] text-[#FFF6E9] grid place-items-center font-extrabold">
//                   {receiverInitial}
//                 </div>
//                 <div className="min-w-0">
//                   <h2 className="text-sm sm:text-base font-extrabold text-[#102E50] truncate">
//                     {receiverName}
//                   </h2>
//                   <div className="text-[11px] text-[#102E50]/70">Live chat</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           ref={messageContainerRef}
//           onScroll={handleScroll}
//           aria-live="polite"
//           className={[
//             "relative mt-3 overflow-y-auto rounded-2xl bg-[#FFF8EE] ring-1 ring-[#102E50]/10 shadow-[0_18px_40px_rgba(16,46,80,0.08)] p-3 sm:p-4",
//             expanded ? "h-[84vh]" : "h-[68vh]",
//           ].join(" ")}
//         >
//           {messages.length === 0 ? (
//             <div className="h-full grid place-items-center">
//               <div className="text-center">
//                 <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-3xl text-white font-bold">
//                   💬
//                 </div>
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FFFDF6] ring-1 ring-[#102E50]/10 text-[#102E50]">
//                   No messages yet
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {messages.map((msg, idx) => {
//                 const isSender = msg.senderId === senderId || msg.sender_id === senderId;
//                 const rawSender = msg.sender_name;
//                 const senderDisplay = rawSender || currentUserName || "You";
//                 const timeStr = new Date(msg.created_at || msg.time).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 });

//                 return (
//                   <div key={idx} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
//                     <div
//                       className={`max-w-[80%] sm:max-w-[72%] break-words rounded-2xl px-3.5 pt-1 pb-2.5 leading-relaxed
//                       ${
//                         isSender
//                           ? "bg-[#F7EBD6] text-[#102E50] ring-1 ring-[#102E50]/12 shadow-[0_6px_16px_rgba(16,46,80,0.10)]"
//                           : "bg-gradient-to-br from-[#0E2744] to-[#102E50] text-[#FFF6E9] ring-1 ring-white/10 shadow-[0_10px_24px_rgba(16,46,80,0.25)]"
//                       }`}
//                     >
//                       <div className={`${isSender ? "text-right" : "text-left"}`}>
//                         {isSender ? (
//                           <span className="inline-block px-2 py-0.5 rounded-md bg-[#102E50]/15 text-[#102E50]/90 font-extrabold text-[13px] leading-none">
//                             {senderDisplay}
//                           </span>
//                         ) : (
//                           <span className="inline-block px-2 py-0.5 rounded-md bg-[#F5C45E]/15 text-[#F5C45E] font-extrabold text-[13px] leading-none">
//                             {receiverName}
//                           </span>
//                         )}
//                       </div>

//                       <div
//                         className={`${sizeClass} tracking-[0.1px] ${
//                           isSender ? "text-[#102E50]" : "text-[#FFF6E9]"
//                         }`}
//                       >
//                         {msg.text}
//                       </div>

//                       <div
//                         className={`mt-1.5 text-[14px] font-bold ${
//                           isSender ? "text-[#0E2744]/90 text-left" : "text-white/90 text-right"
//                         }`}
//                       >
//                         {timeStr}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {showJumpBtn && (
//             <button
//               onClick={jumpToBottom}
//               className="absolute right-3 bottom-3 h-10 px-3 rounded-xl text-xs font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_10px_20px_rgba(16,46,80,0.25)]"
//             >
//               Scroll to latest
//             </button>
//           )}
//         </div>

//         <div className="mt-3 flex items-center gap-2">
//           <div className="relative">
//             <button
//               onClick={() => setShowEmojiPicker((v) => !v)}
//               className="grid h-10 w-10 place-items-center rounded-full bg-[#FFFDF6] ring-1 ring-[#F5C45E]/60 text-xl text-[#102E50] hover:ring-[#F5C45E] transition shadow-[0_6px_14px_rgba(16,46,80,0.10)] active:scale-95"
//             >
//               😎
//             </button>
//             {showEmojiPicker && (
//               <div className="absolute bottom-12 left-0 z-50">
//                 <EmojiPicker onEmojiClick={onEmojiClick} theme="light" />
//               </div>
//             )}
//           </div>

//           <input
//             className="flex-1 rounded-xl px-3 py-2 text-[#102E50] bg-[#FFF9F0] placeholder-[#102E50]/60 border border-[#F5C45E]/70 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent shadow-inner"
//             placeholder="Type a message..."
//             value={textMessage}
//             onChange={(e) => setTextMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && textMessage.trim()) sendMessage();
//             }}
//           />

//           <button
//             onClick={sendMessage}
//             disabled={!textMessage.trim()}
//             className="h-10 px-5 rounded-xl text-sm font-semibold text-[#FFF6E9] bg-[#102E50] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_12px_24px_rgba(16,46,80,0.25)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }













// import axios from "axios";
// import EmojiPicker from "emoji-picker-react";
// import { useEffect, useRef, useState, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { io } from "socket.io-client";

// export default function LiveChat() {
//   const [textMessage, setTextMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [showJumpBtn, setShowJumpBtn] = useState(false);
//   const [expanded, setExpanded] = useState(false);
//   const [fontSize, setFontSize] = useState("md");

//   const user = useSelector((s) => s.UserInfo);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const port = import.meta.env.VITE_PORT;
//   const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

//   const socketRef = useRef(null);
//   const messageContainerRef = useRef(null);
//   const nearBottomRef = useRef(true);
//   const lastOwnSendRef = useRef(false);

//   const { sender, reciver } = location.state || {};
//   const senderId = sender?.user_id || sender;
//   const receiverId = reciver?.user_id || reciver;

//   const currentUserName =
//     user?.user?.name ||
//     (user?.user?.firstname && user?.user?.lastname
//       ? `${user.user.firstname} ${user.user.lastname}`
//       : user?.user?.username || "You");

//   const receiverName =
//     reciver?.name ||
//     (reciver?.firstname && reciver?.lastname
//       ? `${reciver.firstname} ${reciver.lastname}`
//       : "Receiver");
//   const receiverInitial = (receiverName || "R").toString().charAt(0).toUpperCase();

//   const sizeClass =
//     fontSize === "sm"
//       ? "text-[14px]"
//       : fontSize === "lg"
//       ? "text-[17px]"
//       : "text-[15px]";

//   useEffect(() => {
//     if (!sender || !reciver) return;
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`${apiBase}/api/getmessages`, {
//           params: { senderId, receiveId: receiverId },
//         });
//         setMessages(res.data || []);
//       } catch {}
//     };
//     fetchMessages();
//     const interval = setInterval(fetchMessages, 1000);
//     return () => clearInterval(interval);
//   }, [apiBase, sender, reciver, senderId, receiverId]);

//   useEffect(() => {
//     if (!senderId) return;
//     socketRef.current = io(`http://localhost:${port}`);
//     socketRef.current.emit("register", senderId);
//     socketRef.current.on("receive_message", (msg) => setMessages((p) => [...p, msg]));
//     return () => socketRef.current?.disconnect();
//   }, [port, senderId]);

//   useEffect(() => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const stick = nearBottomRef.current || lastOwnSendRef.current;
//     if (stick) {
//       el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//       setShowJumpBtn(false);
//     } else {
//       setShowJumpBtn(true);
//     }
//     if (lastOwnSendRef.current) lastOwnSendRef.current = false;
//   }, [messages]);

//   const handleScroll = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
//     nearBottomRef.current = nearBottom;
//     setShowJumpBtn(!nearBottom && messages.length > 0);
//   };

//   const jumpToBottom = () => {
//     const el = messageContainerRef.current;
//     if (!el) return;
//     el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
//     nearBottomRef.current = true;
//     setShowJumpBtn(false);
//   };

//   const sendMessage = async () => {
//     if (!textMessage.trim() || !senderId || !receiverId) return;
//     const data = { senderId, receiveId: receiverId, text: textMessage };
//     lastOwnSendRef.current = true;
//     setMessages((p) => [...p, { ...data, time: new Date() }]);
//     try {
//       await axios.post(`${apiBase}/api/send-messages`, data);
//       setTextMessage("");
//     } catch {}
//     socketRef.current?.emit("send-message", data);
//   };

//   const onEmojiClick = (emojiObject) => setTextMessage((v) => v + emojiObject.emoji);

//   return (
//     <div className="min-h-screen bg-[#faead8] text-[#102E50]">
//       <div className={[expanded ? "max-w-6xl" : "max-w-2xl", "mx-auto px-4 sm:px-6 py-4 sm:py-6"].join(" ")}>
//         <div className="rounded-[1.25rem] p-[1px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
//           <div className="rounded-[1.2rem] bg-[#FFF8EE] ring-1 ring-[#F5C45E]/60">
//             <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3">
//               <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                 <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#102E50] text-[#FFF6E9] grid place-items-center font-extrabold">
//                   {receiverInitial}
//                 </div>
//                 <div className="min-w-0">
//                   <h2 className="text-sm sm:text-base font-extrabold text-[#102E50] truncate">
//                     {receiverName}
//                   </h2>
//                   <div className="text-[11px] text-[#102E50]/70">Live chat</div>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2 sm:gap-3">
//                 <div className="flex items-center rounded-2xl bg-[#FFFDF6] ring-1 ring-[#F5C45E]/70 p-1 shadow-[0_6px_14px_rgba(16,46,80,0.08)]">
//                   <button
//                     onClick={() => setFontSize("sm")}
//                     className={`px-3 py-1.5 rounded-xl text-[12px] tracking-wide transition ${
//                       fontSize === "sm"
//                         ? "bg-[#F5C45E] text-[#102E50] font-extrabold shadow-[0_6px_12px_rgba(245,196,94,0.45)]"
//                         : "text-[#102E50]/85 hover:bg-[#F5C45E]/20"
//                     }`}
//                   >
//                     A
//                   </button>
//                   <button
//                     onClick={() => setFontSize("md")}
//                     className={`px-3 py-1.5 rounded-xl text-[14px] tracking-wide transition ${
//                       fontSize === "md"
//                         ? "bg-[#F5C45E] text-[#102E50] font-extrabold shadow-[0_6px_12px_rgba(245,196,94,0.45)]"
//                         : "text-[#102E50]/85 hover:bg-[#F5C45E]/20"
//                     }`}
//                   >
//                     A
//                   </button>
//                   <button
//                     onClick={() => setFontSize("lg")}
//                     className={`px-3 py-1.5 rounded-xl text-[16px] tracking-wide transition ${
//                       fontSize === "lg"
//                         ? "bg-[#F5C45E] text-[#102E50] font-extrabold shadow-[0_6px_12px_rgba(245,196,94,0.45)]"
//                         : "text-[#102E50]/85 hover:bg-[#F5C45E]/20"
//                     }`}
//                   >
//                     A
//                   </button>
//                 </div>

//                 <button
//                   onClick={() => setExpanded((v) => !v)}
//                   className={`h-9 px-3 rounded-xl text-xs font-semibold transition shadow-[0_8px_16px_rgba(16,46,80,0.18)] ring-1 ${
//                     expanded
//                       ? "bg-[#F5C45E] text-[#102E50] ring-[#F5C45E]/70 hover:bg-[#F5C45E]/90"
//                       : "bg-[#102E50] text-[#FFF6E9] ring-[#102E50]/20 hover:bg-[#0E2744]"
//                   }`}
//                 >
//                   {expanded ? "⤢ Full" : "⤡ Compact"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div
//           ref={messageContainerRef}
//           onScroll={handleScroll}
//           aria-live="polite"
//           className={[
//             "relative mt-3 overflow-y-auto rounded-2xl bg-[#FFF8EE] ring-1 ring-[#102E50]/10 shadow-[0_18px_40px_rgba(16,46,80,0.08)] p-3 sm:p-4",
//             expanded ? "h-[84vh]" : "h-[68vh]",
//           ].join(" ")}
//         >
//           {messages.length === 0 ? (
//             <div className="h-full grid place-items-center">
//               <div className="text-center">
//                 <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-3xl text-white font-bold">
//                   💬
//                 </div>
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FFFDF6] ring-1 ring-[#102E50]/10 text-[#102E50]">
//                   No messages yet
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {messages.map((msg, idx) => {
//                 const isSender = msg.senderId === senderId || msg.sender_id === senderId;
//                 const rawSender = msg.sender_name;
//                 const senderDisplay = rawSender || currentUserName || "You";
//                 const timeStr = new Date(msg.created_at || msg.time).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 });

//                 return (
//                   <div key={idx} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
//                     <div
//                       className={`max-w-[80%] sm:max-w-[72%] break-words rounded-2xl px-3.5 pt-1 pb-2.5 leading-relaxed
//                       ${
//                         isSender
//                           ? "bg-[#F7EBD6] text-[#102E50] ring-1 ring-[#102E50]/12 shadow-[0_6px_16px_rgba(16,46,80,0.10)]"
//                           : "bg-gradient-to-br from-[#0E2744] to-[#102E50] text-[#FFF6E9] ring-1 ring-white/10 shadow-[0_10px_24px_rgba(16,46,80,0.25)]"
//                       }`}
//                     >
//                       <div className={`${isSender ? "text-right" : "text-left"}`}>
//                         {isSender ? (
//                           <span className="inline-block px-2 py-0.5 rounded-md bg-[#102E50]/15 text-[#102E50]/90 font-extrabold text-[13px] leading-none">
//                             {senderDisplay}
//                           </span>
//                         ) : (
//                           <span className="inline-block px-2 py-0.5 rounded-md bg-[#F5C45E]/15 text-[#F5C45E] font-extrabold text-[13px] leading-none">
//                             {receiverName}
//                           </span>
//                         )}
//                       </div>

//                       <div
//                         className={`${sizeClass} tracking-[0.1px] ${
//                           isSender ? "text-[#102E50]" : "text-[#FFF6E9]"
//                         }`}
//                       >
//                         {msg.text}
//                       </div>

//                       <div
//                         className={`mt-1.5 text-[14px] font-bold ${
//                           isSender ? "text-[#0E2744]/90 text-right" : "text-white/90 text-right"
//                         }`}
//                       >
//                         {timeStr}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {showJumpBtn && (
//             <button
//               onClick={jumpToBottom}
//               className="absolute right-3 bottom-3 h-10 px-3 rounded-xl text-xs font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_10px_20px_rgba(16,46,80,0.25)]"
//             >
//               Scroll to latest
//             </button>
//           )}
//         </div>

//         <div className="mt-3 flex items-center gap-2">
//           <div className="relative">
//             <button
//               onClick={() => setShowEmojiPicker((v) => !v)}
//               className="grid h-10 w-10 place-items-center rounded-full bg-[#FFFDF6] ring-1 ring-[#F5C45E]/60 text-xl text-[#102E50] hover:ring-[#F5C45E] transition shadow-[0_6px_14px_rgba(16,46,80,0.10)] active:scale-95"
//             >
//               😎
//             </button>
//             {showEmojiPicker && (
//               <div className="absolute bottom-12 left-0 z-50">
//                 <EmojiPicker onEmojiClick={onEmojiClick} theme="light" />
//               </div>
//             )}
//           </div>

//           <input
//             className="flex-1 rounded-xl px-3 py-2 text-[#102E50] bg-[#FFF9F0] placeholder-[#102E50]/60 border border-[#F5C45E]/70 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent shadow-inner"
//             placeholder="Type a message..."
//             value={textMessage}
//             onChange={(e) => setTextMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && textMessage.trim()) sendMessage();
//             }}
//           />

//           <button
//             onClick={sendMessage}
//             disabled={!textMessage.trim()}
//             className="h-10 px-5 rounded-xl text-sm font-semibold text-[#FFF6E9] bg-[#102E50] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_12px_24px_rgba(16,46,80,0.25)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }













import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export default function LiveChat() {
  const [textMessage, setTextMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showJumpBtn, setShowJumpBtn] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [fontSize, setFontSize] = useState("md");

  const user = useSelector((s) => s.UserInfo);
  const location = useLocation();
  const navigate = useNavigate();

  const port = import.meta.env.VITE_PORT;
  const apiBase = useMemo(() => `http://localhost:${port}`, [port]);

  const socketRef = useRef(null);
  const messageContainerRef = useRef(null);
  const nearBottomRef = useRef(true);
  const lastOwnSendRef = useRef(false);

  const { sender, reciver } = location.state || {};
  const senderId = sender?.user_id || sender;
  const receiverId = reciver?.user_id || reciver;

  const currentUserName =
    user?.user?.name ||
    (user?.user?.firstname && user?.user?.lastname
      ? `${user.user.firstname} ${user.user.lastname}`
      : user?.user?.username || "You");

  const receiverName =
    reciver?.name ||
    (reciver?.firstname && reciver?.lastname
      ? `${reciver.firstname} ${reciver.lastname}`
      : "Receiver");
  const receiverInitial = (receiverName || "R").toString().charAt(0).toUpperCase();

  const sizeClass =
    fontSize === "sm"
      ? "text-[14px]"
      : fontSize === "lg"
      ? "text-[17px]"
      : "text-[15px]";

  useEffect(() => {
    if (!sender || !reciver) return;
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${apiBase}/api/getmessages`, {
          params: { senderId, receiveId: receiverId },
        });
        setMessages(res.data || []);
      } catch {}
    };
    fetchMessages();
    const interval = setInterval(fetchMessages, 1000);
    return () => clearInterval(interval);
  }, [apiBase, sender, reciver, senderId, receiverId]);

  useEffect(() => {
    if (!senderId) return;
    socketRef.current = io(`http://localhost:${port}`);
    socketRef.current.emit("register", senderId);
    socketRef.current.on("receive_message", (msg) => setMessages((p) => [...p, msg]));
    return () => socketRef.current?.disconnect();
  }, [port, senderId]);

  useEffect(() => {
    const el = messageContainerRef.current;
    if (!el) return;
    const stick = nearBottomRef.current || lastOwnSendRef.current;
    if (stick) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      setShowJumpBtn(false);
    } else {
      setShowJumpBtn(true);
    }
    if (lastOwnSendRef.current) lastOwnSendRef.current = false;
  }, [messages]);

  const handleScroll = () => {
    const el = messageContainerRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
    nearBottomRef.current = nearBottom;
    setShowJumpBtn(!nearBottom && messages.length > 0);
  };

  const jumpToBottom = () => {
    const el = messageContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    nearBottomRef.current = true;
    setShowJumpBtn(false);
  };

  const sendMessage = async () => {
    if (!textMessage.trim() || !senderId || !receiverId) return;
    const data = { senderId, receiveId: receiverId, text: textMessage };
    lastOwnSendRef.current = true;
    setMessages((p) => [...p, { ...data, time: new Date() }]);
    try {
      await axios.post(`${apiBase}/api/send-messages`, data);
      setTextMessage("");
    } catch {}
    socketRef.current?.emit("send-message", data);
  };

  const onEmojiClick = (emojiObject) => setTextMessage((v) => v + emojiObject.emoji);

  return (
    <div className="min-h-screen bg-[#faead8] text-[#102E50]">
      <div className={[expanded ? "max-w-6xl" : "max-w-2xl", "mx-auto px-4 sm:px-6 py-4 sm:py-6"].join(" ")}>
        <div className="rounded-[1.25rem] p-[1px] bg-gradient-to-r from-[#F5C45E] via-[#E78B48] to-[#BE3D2A]">
          <div className="rounded-[1.2rem] bg-[#FFF8EE] ring-1 ring-[#F5C45E]/60">
            <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#102E50] text-[#FFF6E9] grid place-items-center font-extrabold">
                  {receiverInitial}
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm sm:text-base font-extrabold text-[#102E50] truncate">
                    {receiverName}
                  </h2>
                  <div className="text-[11px] text-[#102E50]/70">Live chat</div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center rounded-2xl bg-[#FFFDF6] ring-1 ring-[#F5C45E]/70 p-1 shadow-[0_6px_14px_rgba(16,46,80,0.08)]">
                  <button
                    onClick={() => setFontSize("sm")}
                    className={`px-3 py-1.5 rounded-xl text-[12px] tracking-wide transition ${
                      fontSize === "sm"
                        ? "bg-[#F5C45E] text-[#102E50] font-extrabold shadow-[0_6px_12px_rgba(245,196,94,0.45)]"
                        : "text-[#102E50]/85 hover:bg-[#F5C45E]/20"
                    }`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize("md")}
                    className={`px-3 py-1.5 rounded-xl text-[14px] tracking-wide transition ${
                      fontSize === "md"
                        ? "bg-[#F5C45E] text-[#102E50] font-extrabold shadow-[0_6px_12px_rgba(245,196,94,0.45)]"
                        : "text-[#102E50]/85 hover:bg-[#F5C45E]/20"
                    }`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize("lg")}
                    className={`px-3 py-1.5 rounded-xl text-[16px] tracking-wide transition ${
                      fontSize === "lg"
                        ? "bg-[#F5C45E] text-[#102E50] font-extrabold shadow-[0_6px_12px_rgba(245,196,94,0.45)]"
                        : "text-[#102E50]/85 hover:bg-[#F5C45E]/20"
                    }`}
                  >
                    A
                  </button>
                </div>

                <button
                  onClick={() => setExpanded((v) => !v)}
                  className={`h-9 px-3 rounded-xl text-xs font-semibold transition shadow-[0_8px_16px_rgba(16,46,80,0.18)] ring-1 ${
                    expanded
                      ? "bg-[#F5C45E] text-[#102E50] ring-[#F5C45E]/70 hover:bg-[#F5C45E]/90"
                      : "bg-[#102E50] text-[#FFF6E9] ring-[#102E50]/20 hover:bg-[#0E2744]"
                  }`}
                >
                  {expanded ? "⤢ Full" : "⤡ Compact"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={messageContainerRef}
          onScroll={handleScroll}
          aria-live="polite"
          className={[
            "relative mt-3 overflow-y-auto rounded-2xl bg-[#FFF8EE] ring-1 ring-[#102E50]/10 shadow-[0_18px_40px_rgba(16,46,80,0.08)] p-3 sm:p-4",
            expanded ? "h-[84vh]" : "h-[68vh]",
          ].join(" ")}
        >
          {messages.length === 0 ? (
            <div className="h-full grid place-items-center">
              <div className="text-center">
                <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#F5C45E] via-[#E78B48] to-[#BE3D2A] text-3xl text-white font-bold">
                  💬
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FFFDF6] ring-1 ring-[#102E50]/10 text-[#102E50]">
                  No messages yet
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {messages.map((msg, idx) => {
                const isSender = msg.senderId === senderId || msg.sender_id === senderId;
                const rawSender = msg.sender_name;
                const senderDisplay = rawSender || currentUserName || "You";
                const timeStr = new Date(msg.created_at || msg.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div key={idx} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] sm:max-w-[72%] break-words rounded-2xl px-3.5 pt-1 pb-2.5
                      ${isSender
                          ? "bg-[#F7EBD6] text-[#102E50] ring-1 ring-[#102E50]/12 shadow-[0_6px_16px_rgba(16,46,80,0.10)]"
                          : "bg-gradient-to-br from-[#0E2744] to-[#102E50] text-[#FFF6E9] ring-1 ring-white/10 shadow-[0_10px_24px_rgba(16,46,80,0.25)]"
                      }`}
                    >
                      <div className={`${isSender ? "text-right" : "text-left"}`}>
                        {isSender ? (
                          <span className="inline-block px-2 py-0.5 rounded-md bg-[#102E50]/15 text-[#102E50]/90 font-extrabold text-[13px] leading-none">
                            {senderDisplay}
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 rounded-md bg-[#F5C45E]/15 text-[#F5C45E] font-extrabold text-[13px] leading-none">
                            {receiverName}
                          </span>
                        )}
                      </div>

                      <div
                        dir="auto"
                        className={`${sizeClass} leading-[1.7] tracking-[0.1px] whitespace-pre-wrap selection:bg-[#F5C45E]/30 ${
                          isSender ? "text-[#051322]" : "text-[#FFFDF6]"
                        }`}
                      >
                        {msg.text}
                      </div>

                      <div
                        className={`mt-1.5 text-[12px] font-medium ${
                          isSender ? "text-[#0E2744]/95 text-lift" : "text-[#F5C45E] text-right"
                        }`}
                      >
                        {timeStr}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {showJumpBtn && (
            <button
              onClick={jumpToBottom}
              className="absolute right-3 bottom-3 h-10 px-3 rounded-xl text-xs font-semibold bg-[#102E50] text-[#FFF6E9] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_10px_20px_rgba(16,46,80,0.25)]"
            >
              Scroll to latest
            </button>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowEmojiPicker((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full bg-[#FFFDF6] ring-1 ring-[#F5C45E]/60 text-xl text-[#102E50] hover:ring-[#F5C45E] transition shadow-[0_6px_14px_rgba(16,46,80,0.10)] active:scale-95"
            >
              😎
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-12 left-0 z-50">
                <EmojiPicker onEmojiClick={onEmojiClick} theme="light" />
              </div>
            )}
          </div>

          <input
            className="flex-1 rounded-xl px-3 py-2 text-[#102E50] bg-[#FFF9F0] placeholder-[#102E50]/60 border border-[#F5C45E]/70 focus:outline-none focus:ring-2 focus:ring-[#F5C45E] focus:border-transparent shadow-inner"
            placeholder="Type a message..."
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && textMessage.trim()) sendMessage();
            }}
          />

          <button
            onClick={sendMessage}
            disabled={!textMessage.trim()}
            className="h-10 px-5 rounded-xl text-sm font-semibold text-[#FFF6E9] bg-[#102E50] hover:bg-[#F5C45E] hover:text-[#102E50] transition shadow-[0_12px_24px_rgba(16,46,80,0.25)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
