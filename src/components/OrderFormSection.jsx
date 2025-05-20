import { Box, Typography, Paper } from "@mui/material";
import OrderForm from "./OrderForm";
import { useGetMeQuery } from "../api/auth";

const OrderFormSection = ({ onAuthRequired }) => {
  const { data: user } = useGetMeQuery();

  return (
    <Box id="order-section" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
        <OrderForm user={user} onAuthRequired={onAuthRequired} />
      </Paper>
    </Box>
  );
};

export default OrderFormSection;
