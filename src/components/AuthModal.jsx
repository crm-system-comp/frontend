import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useLoginMutation, useRegisterMutation } from "../api/auth";
import { startSession } from "../../session";

const AuthModal = ({ open, onClose }) => {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      if (mode === "login") {
        await login({
          email: form.email,
          password: form.password,
        }).unwrap();
      } else {
        const user = {
          username: form.username,
          email: form.email,
          password: form.password,
          role_id: 2,
        };
        await register(user).unwrap();
        const result = await login({
          email: user.email,
          password: user.password,
        }).unwrap();
        const token = result?.access_token;
        if (token) {
          startSession({ email: user.email, accessToken: token });
        }
      }
      setError(null);
      onClose();
    } catch (err) {
      console.error(err);
      setError("Ошибка авторизации. Проверьте данные.");
    }
  };

  const switchMode = () => {
    setError(null);
    setMode(mode === "login" ? "register" : "login");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{mode === "login" ? "Вход" : "Регистрация"}</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {mode === "register" && (
          <TextField
            margin="dense"
            name="username"
            label="Имя пользователя"
            type="text"
            fullWidth
            variant="outlined"
            value={form.username}
            onChange={handleChange}
          />
        )}
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="password"
          label="Пароль"
          type="password"
          fullWidth
          variant="outlined"
          value={form.password}
          onChange={handleChange}
        />
        <Box mt={2}>
          <Typography variant="body2">
            {mode === "login" ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
            <Button onClick={switchMode} size="small">
              {mode === "login" ? "Зарегистрироваться" : "Войти"}
            </Button>
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" fullWidth>
          {mode === "login" ? "Войти" : "Зарегистрироваться"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthModal;
