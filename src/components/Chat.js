import React, { useState, useRef, useEffect } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import DateSeparator from './DateSeparator';
import { postMessage } from '../services/PostMessage';
import { getMessages } from '../services/messages';

function Chat({ messages: initialMessages }) {
  const [messages, setMessages] = useState(initialMessages);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async (text) => {
    try {
      const response = await postMessage(text);
      setMessages((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('送信エラー', error);
    }
  };

  const fetchMessages = async () => {
    try {
      await getMessages().then(setMessages);
    } catch (error) {
      console.error('受信エラー', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages(); // 30秒ごとに取得
    }, 30000);

    return () => clearInterval(interval); // クリーンアップ
  }, []);

  const chatRef = useRef(null);
  const user_id = Number(localStorage.getItem('user_id'));

  const parseDate = (dateString) => {
    if (typeof dateString !== 'string') return new Date(dateString);

    // すでに ISO 形式（Tを含む）ならそのまま
    if (dateString.includes('T')) return new Date(dateString);

    // "2025/05/29 5:08:18" → "2025-05-29T05:08:18"
    if (dateString.includes('/') || dateString.includes(' ')) {
      const fixed = dateString
        .replace(/\//g, '-')          // スラッシュ → ハイフン
        .replace(' ', 'T');           // 半角スペース → T（ISO準拠）
      return new Date(fixed);
    }

    // 最後の保険：そのまま試す
    return new Date(dateString);
  };
  const formatDate = (date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#E5DDD5' }}>
      {/* ヘッダー */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton edge="start" color="inherit">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            LINE風チャット
          </Typography>
          <IconButton edge="end" color="inherit">
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* チャット本体 */}
      <Box ref={chatRef} sx={{ flex: 1, overflowY: 'auto', p: 2, whiteSpace: 'pre-line' }}>
        {messages.map((msg, index) => {
          const currentDate = parseDate(msg.created_at);
          const previousDate = index > 0 ? parseDate(messages[index - 1].created_at) : null;

          const showDateSeparator =
            !previousDate || currentDate.toDateString() !== previousDate.toDateString();

          return (
            <div key={msg.id}>
              {showDateSeparator && (
                <DateSeparator date={formatDate(currentDate)} />
              )}
              <MessageBubble
                text={msg.text}
                isMe={msg.user_id === user_id}
                timestamp={msg.created_at}
                avatarUrl={msg.user.avatar_url}
              />
            </div>
          );
        })}
        <div ref={chatEndRef}></div>
      </Box>

      <MessageInput onSend={handleSend} />
    </Box>
  );
}

export default Chat;
