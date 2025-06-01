import React, { useEffect, useState } from 'react';
import { getMessages } from '../services/messages';
import Chat from '../components/Chat';

function ChatPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
      getMessages().then(setMessages);
  }, []);

  return <Chat messages={messages} />;
}

export default ChatPage;