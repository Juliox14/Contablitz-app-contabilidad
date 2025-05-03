'use client';
import { useState } from "react";
import ChatNIFBot from "./ChatBotNIF";
import ButtonChatbot from "./ButtonChatbot";

const ChatbotLauncher = () => {
    const [abierto, setAbierto] = useState(false);

    const handleChatbot = () => {
        setAbierto((prev) => !prev);
    }

    return (
        <>
            {abierto && (
                <div className="fixed bottom-24 h-[600px] w-[400px] right-6 z-50">
                    <ChatNIFBot />
                </div>
            )}
            <ButtonChatbot onClick={handleChatbot} />
        </>
    );
};

export default ChatbotLauncher;
