import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  useLoginMutation,
  useLazyGetMeQuery,
  useLogoutMutation,
} from "../api/auth";
import {
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from "../api/adminApi";
import { isLoggedIn } from "../../session";
import Column from "../components/admin/Column";
import Footer from "../components/admin/Footer";

const STATUSES = [
  "в очереди",
  "обработка",
  "печать",
  "отправка товара",
  "завершено",
];

export default function AdminPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [logout] = useLogoutMutation();
  const [getMe] = useLazyGetMeQuery();

  const { data: orders = [], refetch } = useGetAllOrdersQuery(undefined, {
    skip: !user,
  });
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const handleLogin = async () => {
    try {
      const { email, password } = form;
      await login({ email, password }).unwrap();

      const meResponse = await getMe().unwrap();
      if (!meResponse || !meResponse.is_superuser) {
        setError("Доступ запрещён: вы не администратор");
        return;
      }

      setUser(meResponse);
      setError("");

      setTimeout(() => location.reload(), 0);
    } catch (err) {
      console.log("Ошибка при логине:", err);
      setError("Ошибка входа. Проверьте данные.");
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const moveOrder = async (order, newStatus) => {
    await updateOrder({
      orderId: order.id,
      data: { order_type: order.type, status: newStatus },
    });
    refetch();
  };

  const handleDelete = async (id) => {
    if (confirm("Удалить заказ?")) {
      await deleteOrder(id);
      refetch();
    }
  };

  useEffect(() => {
    if (isLoggedIn()) {
      getMe()
        .unwrap()
        .then((data) => {
          if (data.is_superuser) {
            setUser(data);
          } else {
            setError("Доступ запрещён: вы не администратор");
          }
        })
        .catch(() => setError("Ошибка получения профиля"))
        .finally(() => setIsAuthChecking(false));
    } else {
      setIsAuthChecking(false);
    }
  }, []);

  if (isAuthChecking) {
    return (
      <Container maxWidth="sm">
        <Box mt={8}>
          <Typography variant="h6">Проверка авторизации...</Typography>
        </Box>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Box mt={8}>
          <Typography variant="h5" gutterBottom>
            Вход администратора
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="password"
            label="Пароль"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            disabled={isLoggingIn}
          >
            Войти
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <Typography>Всего заказов: {orders.length}</Typography>
        <Box sx={{ display: "flex", overflowX: "auto", gap: 2, py: 2 }}>
          {STATUSES.map((status) => (
            <Column
              key={status}
              title={status}
              orders={orders.filter((o) => o.status === status)}
              onDrop={moveOrder}
              onDelete={handleDelete}
            />
          ))}
        </Box>

        <Footer email={user.email} onLogout={handleLogout} />
      </Container>
    </DndProvider>
  );
}
