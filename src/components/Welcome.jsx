import { Box, Typography } from "@mui/material";

const Welcome = () => {
  return (
    <Box sx={{ textAlign: "center", py: 5 }}>
      <Typography variant="h3" gutterBottom>
        Добро пожаловать в сервис обработки фотографии!
      </Typography>
      <Typography variant="h6" color="textSecondary">
        Быстро. Удобно. Надежно. Закажите прямо сейчас!
      </Typography>
    </Box>
  );
};

export default Welcome;
