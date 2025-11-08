import axios from "axios";
import { useState } from "react";

export default function useSupportProvider() {
  const motivationalMessageProvider = `
Analysis using AI: 
As your AI assistant, I encourage you to keep improving your skills and developing your services in jordan ! 
Each effort you make helps you reach more customers, expand your income sources, and grow your professional reputation.
Continue innovating, learning, and delivering high-quality work — your dedication creates opportunities for a wider audience and strengthens your success on the platform.
`;

  const [messagesSupportProvider, setMessagesProvider] = useState([
    {
      role: "system",
      content: `
You are a helpful and professional assistant for a custom services and products platform. 
Include the following motivational message to the service provider:
${motivationalMessageProvider}
Keep output concise, positive, and encouraging.
    `,
    },
  ]);

  const port = import.meta.env.VITE_PORT;
   const CusData = useSelector((state) => state.UserInfo);

  const token = CusData.token;


  async function sendMessageSupportProvider() {
    // alert(status);

    const newMessages = [
      ...messagesSupportProvider,
      {
        role: "user",
        content: `Thank you for your continuous support of handmade businesses in Jordan!
Every order you place helps empower talented youth and honorable families, encourages skilled artisans to continue their work, and strengthens local communities.
Keep supporting them — you are an essential part of their success story!`,
      },
    ];

    setMessagesProvider(newMessages);
    console.log("llllllllllllllllll");

    console.log(messagesSupportProvider);
    console.log("llllllllllllllllll");

    try {
      // const reply = await chat(newMessages);
      console.log("111111111");

      const reply = await axios.post(
        `https://backend-a2qq.onrender.com/ai`,
        {newMessages}, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.replace(/^"|"$/g, "")}`,
              },
            }

      );
      console.log("2222222222222222");

      const replyText =
        typeof reply.data === "string"
          ? reply.data
          : JSON.stringify(reply.data, null, 2);
      console.log("3333333333333333333");

      setMessagesProvider((currentMessages) => [
        ...currentMessages,
        { role: "assistant", content: replyText },
      ]);
      console.log(
        "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssz"
      );
      console.log(messagesSupportProvider);
      console.log(
        "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssz"
      );
    } catch (error) {
      console.log(error + " oooooooooooooooooo ");
    }
  }

  return { messagesSupportProvider, sendMessageSupportProvider };
}
