import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { useGetMeQuery } from "../api/auth";
import { useGetOrdersQuery } from "../api/orders";

const STATUS_MAP = {
  "в очереди": "QUEUED",
  обработка: "PROCESSING",
  печать: "PRINTING",
  "отправка товара": "SHIPPING",
  завершено: "COMPLETED",
};

const ProfilePage = () => {
  const { data: user } = useGetMeQuery();
  const { data: orders = [] } = useGetOrdersQuery();
  const [statusFilter, setStatusFilter] = useState("");

  const filteredOrders = statusFilter
    ? orders.filter((order) => STATUS_MAP[order.status] === statusFilter)
    : orders;

  return (
    <Box p={4}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Личная информация
            </Typography>
            <Typography>Имя пользователя: {user?.username}</Typography>
            <Typography>Email: {user?.email}</Typography>
            <Typography>ID: {user?.id}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6">Мои заказы</Typography>
              <Select
                size="small"
                value={statusFilter}
                displayEmpty
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="">Все</MenuItem>
                {Object.entries(STATUS_MAP).map(([label, value]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            {filteredOrders.map((order) => (
              <Paper key={order.id} sx={{ mb: 2, p: 2 }}>
                <Typography>Тип: {order.type}</Typography>
                <Typography>Размер: {order.size}</Typography>
                <Typography>Стиль: {order.style}</Typography>
                <Typography>Количество: {order.quantity}</Typography>
                <Typography>Цена: {order.total_price} ₽</Typography>
                <Typography>Контакт: {order.contact_info}</Typography>
                <Typography>
                  Статус: <Chip label={order.status} />
                </Typography>

                <Box mt={1}>
                  {order.images.map((img) => (
                    <img
                      key={img.id}
                      src={`${img.path}`}
                      alt="Изображение"
                      style={{ maxHeight: 100, marginRight: 8 }}
                    />
                  ))}
                </Box>
              </Paper>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
