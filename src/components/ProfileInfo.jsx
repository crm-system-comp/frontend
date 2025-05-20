import { Paper, Typography, Divider } from "@mui/material";

const ProfileInfo = ({ user }) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom component="div">
        Личная информация
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography gutterBottom component="div">
        <strong>Имя пользователя:</strong> {user?.username}
      </Typography>
      <Typography gutterBottom component="div">
        <strong>Email:</strong> {user?.email}
      </Typography>
      <Typography gutterBottom component="div">
        <strong>ID:</strong> {user?.id}
      </Typography>
    </Paper>
  );
};

export default ProfileInfo;
