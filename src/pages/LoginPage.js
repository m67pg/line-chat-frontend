import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Avatar,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/chat');
    } catch (err) {
      console.error(err);
      setError('ログインに失敗しました');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        minHeight="100vh"
        justifyContent="center"
        bgcolor="#06c755"
        padding={2}
      >
        <Paper elevation={6} sx={{ padding: 4, borderRadius: 3, width: '100%' }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: '#06c755', mb: 1 }}>
              <LockIcon />
            </Avatar>
            <Typography variant="h5" component="h1" color="primary" fontWeight="bold">
              LINE風チャット
            </Typography>
            <Typography variant="body2" color="textSecondary">
              ログインしてください
            </Typography>
          </Box>

          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="メールアドレス"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="パスワード"
              variant="outlined"
              type="password"
              margin="normal"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: '#06c755',
                '&:hover': { backgroundColor: '#05b14e' },
              }}
            >
              ログイン
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default LoginPage;
