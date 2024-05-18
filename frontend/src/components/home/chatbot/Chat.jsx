import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import { FaRobot } from "react-icons/fa"; // Importando ícone de robô
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='m-5'>
      {!isOpen && (
        <button onClick={toggleChatbot} className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-full">
          <FaRobot className="text-5xl" /> {/* Ícone de robô */}
        </button>
      )}
      {isOpen && (
        <Chatbot
          config={config(toggleChatbot)}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      )}
    </div>
  );
};

export default Chat;
