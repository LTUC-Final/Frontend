import axios from "axios";
import { useState } from "react";

export default function useSupport() {
  //   const [messages, setmessages] = useState([
  //     {
  //       role: "system",
  //       content: `
  // You are a helpful assistant.
  // Your task:
  // - Count how many orders fall under each status (awaiting_approval, pending, completed, rejected).
  // - For each status, also calculate the total quantity and the total amount.
  // - If a status does not exist, return 0 for count, quantity, and amount.
  // - Always start the message with: "Analysis using AI:".
  // - End with a motivational summary that encourages the user based on the results (example: "You completed 5 orders successfully! Keep up the great work.").
  // - Keep the output concise and positive.
  //     `,
  //     },
  //   ]);
 const motivationalMessage = `
Analysis using AI: 
As your AI assistant, I encourage you to continue supporting handmade businesses in Jordan!
Every order you place helps empower talented youth and honorable families, encourages skilled artisans to continue their work, and strengthens local communities.
By supporting them, you are making a real difference and contributing to their success story!
`;

const [messagesSuport, setMessages] = useState([
  {
    role: "system",
    content: `
You are a helpful assistant.
Include the following motivational message to the customer:
${motivationalMessage}  
Keep output concise, positive, and friendly.
    `,
  },
]);


  const port = import.meta.env.VITE_PORT;
   const CusData = useSelector((state) => state.UserInfo);

  const token = CusData.token;


  async function sendMessageSupport() {
    // alert(status);

    const newMessages = [
      ...messagesSuport,
      {
        role: "user",
        content: `Thank you for your continuous support of handmade businesses in Jordan!
Every order you place helps empower talented youth and honorable families, encourages skilled artisans to continue their work, and strengthens local communities.
Keep supporting them — you are an essential part of their success story!`,
      },
    ];

    setMessages(newMessages);
    console.log("llllllllllllllllll");

    console.log(messagesSuport);
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

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "assistant", content: replyText },
      ]);
      console.log(
        "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssz"
      );
      console.log(messagesSuport);
      console.log(
        "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssz"
      );
    } catch (error) {
      console.log(error + " oooooooooooooooooo ");
    }
  }

  return { messagesSuport, sendMessageSupport };
}
