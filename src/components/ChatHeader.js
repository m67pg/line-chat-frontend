import React, { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Menu, MenuItem,
  Dialog, DialogTitle, DialogActions, Button, Snackbar, Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { logout } from '../services/logout';

function ChatHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleLogoutConfirmed = async () => {
    try {
      setConfirmOpen(false);

      await logout();

      window.location.href = '/';
    } catch (error) {
      console.error('ログアウトエラー', error);
    }
  };

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton edge="start" color="inherit">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            LINE風チャット
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleLogoutClick}>ログアウト</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* ログアウト確認ダイアログ */}
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>ログアウトしてもよろしいですか？</DialogTitle>
        <DialogActions>
          <Button onClick={handleConfirmClose}>キャンセル</Button>
          <Button onClick={handleLogoutConfirmed} color="error">ログアウト</Button>
        </DialogActions>
      </Dialog>

      {/* ログアウト通知スナックバー */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          ログアウトしました
        </Alert>
      </Snackbar>
    </>
  );
}

export default ChatHeader;
