import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function useSuggestions() {
    const [decText, setDecText] = useState([])
    const CusData = useSelector((state) => state.UserInfo);

  const token = CusData.token;


    async function SuggestionsInputdesc(text) {
        console.log("text in hook", text);
        if (!text) return;

        const port = import.meta.env.VITE_PORT;

        try {
            const response = await axios.post(`https://backend-a2qq.onrender.com/api/ai`, { text }
)
            console.log(response);

            const suggestionsArray = Array.isArray(response.data.suggestion)
                ? response.data.suggestion
                : [response.data.suggestion];

                setDecText(suggestionsArray)
            return suggestionsArray || [];
        } catch (error) {
            console.log(error);

        }


    } return { decText, SuggestionsInputdesc };
}


