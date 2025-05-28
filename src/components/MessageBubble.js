import React from 'react';
import { Box, Paper, Typography, Avatar } from '@mui/material';

function formatTime(timestamp) {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return '';
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function MessageBubble({ text, isMe, timestamp, avatarUrl }) {
  const timeText = formatTime(timestamp);

  if (isMe) {
    return (
      <Box display="flex" justifyContent="flex-end" mb={1.5} alignItems="flex-start">
        {/* アイコンと時間の縦ボックス */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          mr={1}
          sx={{ height: '100%', minHeight: '48px' }}
        >
          {/* アイコンはメッセージの上端に */}
          <Avatar alt="Me" src={avatarUrl} sx={{ width: 32, height: 32, mb: 0.3 }} />

          {/* 時間はメッセージの下端に揃える */}
          <Typography variant="caption" sx={{ color: '#888', fontSize: '0.75rem', mt: 'auto' }}>
            {timeText}
          </Typography>
        </Box>

        {/* メッセージ吹き出し */}
        <Paper
          elevation={0}
          sx={{
            px: 2,
            py: 1.5,
            bgcolor: '#DCF8C6',
            borderRadius: '18px 18px 2px 18px',
            wordBreak: 'break-word',
            maxWidth: '80%',
          }}
        >
          <Typography variant="body2" sx={{ fontSize: '0.95rem' }}>
            {text}
          </Typography>
        </Paper>
      </Box>
    );
  } else {
    return (
      <Box display="flex" justifyContent="flex-start" mb={1.5}>
        <Box display="flex" flexDirection="row" alignItems="flex-start" maxWidth="80%">
          <Avatar alt="User" src={avatarUrl} sx={{ width: 32, height: 32, mx: 1 }} />
          <Box display="flex" alignItems="flex-end">
            <Paper
              elevation={0}
              sx={{
                px: 2,
                py: 1.5,
                bgcolor: '#ffffff',
                borderRadius: '18px 18px 18px 2px',
                wordBreak: 'break-word',
                display: 'inline-block',
              }}
            >
              <Typography variant="body2" sx={{ fontSize: '0.95rem' }}>
                {text}
              </Typography>
            </Paper>

            <Typography
              variant="caption"
              sx={{
                color: '#888',
                fontSize: '0.75rem',
                ml: 0.8,
                alignSelf: 'flex-end',
                whiteSpace: 'nowrap',
              }}
            >
              {timeText}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default MessageBubble;
