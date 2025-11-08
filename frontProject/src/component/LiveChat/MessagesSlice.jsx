import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MessagesSlice() {
  const user = useSelector((state) => state.UserInfo);
  const [Messages, setMessages] = useState([]);
  const port = import.meta.env.VITE_PORT;
  const navigate = useNavigate();
 const CusData = useSelector((state) => state.UserInfo);

  const token = CusData.token;

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`https://backend-a2qq.onrender.com/api/Messages`, {
          params: { userId: user.user.user_id },
           
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.replace(/^"|"$/g, "")}`,
              },
           

        });
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [port, user.user.user_id]);

  return (
    <div className="flex flex-col gap-2 p-4 max-h-[80vh] overflow-y-auto">
      {Messages.map((msg) => {
        const isUserSender = msg.sender_id === user.user.user_id;
        const chatSender = user.user;
        const chatReciver = isUserSender
          ? { user_id: msg.receiver_id, name: msg.receiver_name }
          : { user_id: msg.sender_id, name: msg.sender_name };

        return (
          <div
            key={msg.message_id}
            onClick={() =>
              navigate(`/LiveChat/${chatReciver.user_id}`, {
                state: { sender: chatSender, reciver: chatReciver },
              })
            }
            className="flex items-center p-3 rounded-lg hover:bg-gray-200 cursor-pointer"
          >
            
            <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold mr-3">
              {chatReciver.name?.charAt(0)}
            </div>

            
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">
                  {chatReciver.name}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-gray-600 text-sm truncate">{msg.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
