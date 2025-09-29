import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

export default function LiveChat() {
    const [textMessage, setTextMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const location = useLocation();
    const port = import.meta.env.VITE_PORT;
    const socketRef = useRef(null);

    const { sender, reciver } = location.state || {};

    useEffect(() => {
        if (!sender || !reciver) return;

        const fetchMessages = async () => {
            try {
                const res = await axios.get(`http://localhost:${port}/api/getmessages`, {
                    params: { senderId: sender.user_id, receiveId: reciver.user_id }
                });
                setMessages(res.data);
                console.log("rees", res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMessages();
    }, [textMessage]);

    useEffect(() => {
        if (!sender) return;

        socketRef.current = io("http://localhost:3001");

        socketRef.current.emit("register", sender.user_id);

        socketRef.current.on("receive_message", (msg) => {
            setMessages(prev => [...prev, msg]);
        });

        return () => { if (socketRef.current) { socketRef.current.disconnect() } }
    }, [sender]);

    const sendMessage = async () => {
        const messageData = {
            senderId: sender.user_id,
            receiveId: reciver.user_id,
            text: textMessage,

        };
        const newMessage = { ...messageData, time: new Date() }
        setMessages((prev)=>[...prev , newMessage])
        if (socketRef.current) {
            socketRef.current.emit("send-message", messageData);

            // setMessages(prev => [...prev, messageData]);
        }
        try {
            await axios.post("http://localhost:3001/api/send-messages",messageData );
            setTextMessage("");
        } catch (error) {
            console.log(error);

        }

    };

    console.log("asdasd", messages);

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-black">
                Chat with {messages.length > 0
                    ? (messages[0].sender_id === sender.user_id
                        ? messages[0].receiver_name
                        : messages[0].sender_name)
                    : "Receiver"}
            </h2>

            <div className="border border-gray-300 rounded-md p-3 h-64 overflow-y-auto mb-4 flex flex-col gap-2">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`p-2 rounded-lg text-black ${msg.senderId === sender.user_id ? "bg-blue-100 self-end" : "bg-gray-100 self-start"
                            }`}
                    >
                        <div className="text-sm font-semibold mb-1">{msg.sender_name}</div>
                        <div className="text-base">{msg.text}</div>
                        <div className="text-xs text-gray-500 mt-1">
                            {new Date(msg.created_at).toLocaleTimeString()}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-2">
                <input
                    className="flex-1 border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Type a message..."
                    value={textMessage}
                    onChange={(e) => setTextMessage(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>


    );
}
