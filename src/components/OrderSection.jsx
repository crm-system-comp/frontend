import { Box, Paper, Select, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import OrderCard from "./OrderCard";

const STATUS_MAP = {
  "в очереди": "QUEUED",
  обработка: "PROCESSING",
  печать: "PRINTING",
  "отправка товара": "SHIPPING",
  завершено: "COMPLETED",
};

const OrdersSection = ({ orders }) => {
  const [statusFilter, setStatusFilter] = useState("");

  const filteredOrders = statusFilter
    ? orders.filter((order) => STATUS_MAP[order.status] === statusFilter)
    : orders;

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="h6" component="div">Мои заказы</Typography>
        <Select
          size="small"
          value={statusFilter}
          displayEmpty
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">Все</MenuItem>
          {Object.entries(STATUS_MAP).map(([label, value]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {filteredOrders.length === 0 ? (
        <Typography textAlign="center" color="text.secondary" component="div">
          Заказов нет
        </Typography>
      ) : (
        filteredOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))
      )}
    </Paper>
  );
};

export default OrdersSection;
