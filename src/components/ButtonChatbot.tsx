'use client';
import Image from "next/image";
import botonChat from "../../public/botonChat.png";

const ButtonChatbot = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 p-0 border-none bg-transparent hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer"
      aria-label="Abrir chatbot"
    >
      <Image
        src={botonChat}
        alt="Abrir Chatbot"
        width={60}
        height={60}
        priority
      />
    </button>
  );
};

export default ButtonChatbot;
