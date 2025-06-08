import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ClearIcon from '@mui/icons-material/Clear';

function MessageInput({ onSend }) {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const interimTextRef = useRef(''); // 中間結果を一時的に保持するRef

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.warn('お使いのブラウザはWeb Speech APIをサポートしていません。Chromeの使用を推奨します。');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = true; // 連続認識を有効にする
    recognition.interimResults = true; // 中間結果を有効にする
    recognition.lang = 'ja-JP';

    recognition.onresult = (event) => {
      let currentInterimTranscript = '';
      let currentFinalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        if (result.isFinal) {
          currentFinalTranscript += result[0].transcript;
        } else {
          currentInterimTranscript += result[0].transcript;
        }
      }

      // 最終結果が得られたら、既存のテキストに追記する (改行なし)
      if (currentFinalTranscript) {
        setText((prevText) => prevText + currentFinalTranscript);
        interimTextRef.current = ''; // 最終結果が確定したので、中間結果はクリア
      } else {
        // 最終結果がない場合（中間結果のみの場合）、一時的に保持
        interimTextRef.current = currentInterimTranscript;
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log('Speech recognition ended.');
      // 認識が自動終了した場合でも、まだ確定していない中間結果があれば、それも確定させる
      if (interimTextRef.current) {
        setText((prevText) => prevText + interimTextRef.current); // ここを修正
        interimTextRef.current = '';
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      interimTextRef.current = ''; // エラー時もクリア
      alert(`音声認識エラー: ${event.error}. マイクへのアクセスを許可しているか確認してください。`);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Shift + Enter で改行
        return;
      } else {
        // Enterのみ → 送信
        e.preventDefault();
        handleSendClick();
      }
    }
  };

  const handleSendClick = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
  };

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        interimTextRef.current = ''; 
        try {
          recognitionRef.current.start();
          setIsListening(true);
          console.log('Speech recognition started.');
        } catch (e) {
          console.error('Error starting speech recognition:', e);
          alert('音声認識の開始に失敗しました。既に認識中か、ブラウザのマイク許可を確認してください。');
          setIsListening(false);
        }
      }
    }
  };

  const handleClearText = () => {
    setText('');
    interimTextRef.current = '';
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
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
        value={text + interimTextRef.current}
        onChange={(e) => {
          setText(e.target.value);
          interimTextRef.current = '';
        }}
        onKeyDown={handleKeyDown}
        variant="outlined"
        size="small"
        sx={{ backgroundColor: 'white', borderRadius: 2 }}
      />
      <IconButton color="primary" onClick={handleSendClick} sx={{ marginLeft: 1 }}>
        <SendIcon />
      </IconButton>
      <IconButton color="secondary" onClick={handleClearText} sx={{ marginLeft: 1 }}>
        <ClearIcon />
      </IconButton>
      <IconButton color="primary" onClick={toggleListening} sx={{ marginLeft: 1 }}>
        {isListening ? <MicOffIcon /> : <MicIcon />}
      </IconButton>
    </Box>
  );
}

export default MessageInput;