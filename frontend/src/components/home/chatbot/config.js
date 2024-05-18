import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "./BotAvatar";
import { AiOutlineClose } from "react-icons/ai"; // Importando ícone de fechar

const botName = "Rebot";

const config = (onClose) => ({
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  botName: botName,
  customComponents: {
    botAvatar: (props) => <BotAvatar {...props} />,
    header: () => (
      <div className="bg-sky-800 text-white px-4 py-1 flex items-center justify-between">
        Conversa com o Rebot
        <AiOutlineClose className="text-2xl cursor-pointer" onClick={onClose} /> {/* Ícone de fechar */}
      </div>
    ),
  },
});

export default config;
