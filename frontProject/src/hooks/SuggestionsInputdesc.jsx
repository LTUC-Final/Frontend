import axios from "axios";
import { useState } from "react";

export default function useSuggestions() {
    const [decText, setDecText] = useState([])

    async function SuggestionsInputdesc(text) {
        console.log("text in hook", text);
        if (!text) return;

        const port = import.meta.env.VITE_PORT;

        try {
            const response = await axios.post(`http://localhost:${port}/api/ai`, { text })
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


