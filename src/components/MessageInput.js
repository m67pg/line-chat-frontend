import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function MessageInput({ onSend }) {
  const [text, setText] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // 改行
        return;
      } else {
        // Enterのみ → 送信
        e.preventDefault(); // デフォルトの改行を防ぐ
        handleSendClick();
      }
    }
  };

  const handleSendClick = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <Box display="flex" p={1} bgcolor="#F0F0F0" borderTop={1}>
      <TextField
        multiline
        fullWidth
        minRows={1}
        maxRows={4}
        placeholder="メッセージを入力（Shift + Enterで改行）"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        variant="outlined"
        size="small"
        sx={{ backgroundColor: 'white', borderRadius: 2 }}
      />
      <IconButton color="primary" onClick={handleSendClick}>
        <SendIcon />
      </IconButton>
    </Box>
  );
}

export default MessageInput;
