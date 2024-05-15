import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import BotAvatar from './BotAvatar';

const botName = 'Rebot';

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  botName: botName,
  customComponents: {
   botAvatar:(props) => <BotAvatar {...props} />,
  }
}

export default config;