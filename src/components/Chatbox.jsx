import { useContext } from "react";
import { supabase } from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import RealtimeChat from "./RealtimeChat";

export default function Chatbox({ data }) {
    const { session } = useContext(SessionContext);

    const handleMessageSubmit = async (event) => {
    event.preventDefault();
    const inputMessage = event.currentTarget;
    const { message } = Object.fromEntries(new FormData(inputMessage));

    if (typeof message === "string" && message.trim().length !== 0) {
        const userId = session?.user?.id;
        const username = session?.user?.user_metadata?.username || "Anonimo";

        if (!userId) {
        console.warn("ID utente non trovato");
        return;
        }

        const { error } = await supabase
        .from("messages")
        .insert([
            {
            profile_id: userId, // ✅ CORRETTO
            profile_username: username,
            game_id: data.id,
            content: message,
            },
        ])
        .select();

        if (error) {
        console.log("Errore nell’invio:", error);
        } else {
        inputMessage.reset();
        }
    }
    };

    return (
    <>
        <h4>Chat</h4>
        <div>
        <RealtimeChat data={data && data} />
        </div>
        <div>
        <form className="mt-4" onSubmit={handleMessageSubmit}>
            <fieldset role="group">
            <input
                type="text"
                name="message"
                className="p-2 mx-4 border border-white rounded-md"
                placeholder="Scrivi un messaggio"
            />
            <button
                className="hover:text-gray-400 transition mx-4 cursor-pointer"
                type="submit"
            >
                Invia
            </button>
            </fieldset>
        </form>
        </div>
    </>
    );
}
