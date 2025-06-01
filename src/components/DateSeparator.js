import { Typography, Box } from '@mui/material';

function DateSeparator({ date }) {
  return (
    <Box sx={{ textAlign: 'center', my: 2 }}>
      <Typography variant="caption" color="text.secondary" sx={{ backgroundColor: '#fff', px: 2, py: 0.5, borderRadius: 1, display: 'inline-block' }}>
        {date}
      </Typography>
    </Box>
  );
}

export default DateSeparator;
