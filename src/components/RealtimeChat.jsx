import { useEffect, useRef, useState, useCallback } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { supabase } from "../supabase/supabase-client";

const chatContainer = {
    marginTop: "5px",
    padding: "0px 3px",
    width: "100%",
    height: "50vh",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "black",
}

dayjs.extend(relativeTime);

export default function RealtimeChat({ data }) {
    const [messages, setMessages] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [error, setError] = useState("");
    const messagesRef = useRef(null);

    const scrollSmoothToBottom = () => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }
    
    const getInitialMessages = useCallback(async () => {
        setLoadingInitial(true);
        const { data: messages, error } = await supabase
            .from("messages")
            .select()
            .eq("game_id", data?.id);
        if (error) {
            setError(error.message);
            return;
        }
        setMessages(messages);
        setLoadingInitial(false);
    }, [data?.id]);

    useEffect(() => {
        if (data) {
            getInitialMessages();
        }
        const channel = supabase
            .channel("messages")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "messages",
                },
                () => getInitialMessages()
            )
            .subscribe();

        return () => {
            if (channel) {
                supabase.removeChannel(channel);
            }
            channel.unsubscribe();
        };
    }, [data, getInitialMessages]);

    useEffect(() => {
        scrollSmoothToBottom();
    }, [messages]);

    return (
        <div style={chatContainer} ref={messagesRef}>
            {loadingInitial && <progress></progress>}
            {error && <p>{error}</p>}
            {messages &&
                messages.map((message) => (
                    <article className="p-4" key={message.id}>
                        <h2 className="text-2xl font-bold mb-2">
                            {message.profile_username} 
                        </h2>
                        <p className="text-base">{message.content}</p>
                        <em>{dayjs().to(dayjs(message.created_at))}</em>
                    </article>
                ))}
        </div>
    );
}