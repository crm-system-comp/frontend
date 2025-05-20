import { Box, Chip, Grid, Paper, Typography } from "@mui/material";
import ImagePreview from "./ImagePreview";

const OrderCard = ({ order }) => {
  return (
    <Paper variant="outlined" sx={{ mb: 3, p: 2, borderRadius: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography component="div">
            <strong>Тип:</strong> {order.type}
          </Typography>
          <Typography component="div">
            <strong>Размер:</strong> {order.size}
          </Typography>
          <Typography component="div">
            <strong>Стиль:</strong> {order.style}
          </Typography>
          <Typography component="div">
            <strong>Количество:</strong> {order.quantity}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography component="div">
            <strong>ФИО:</strong> {order.full_name}
          </Typography>
          <Typography component="div">
            <strong>Контакт:</strong> {order.contact_info}
          </Typography>
        </Grid>
      </Grid>

      {order.images.length > 0 && (
        <Box mt={2}>
          <ImagePreview images={order.images.map((img) => img.path)} />
        </Box>
      )}

      <Typography
        sx={{ mt: 1, fontSize: "20px", textAlign: "left", fontWeight: "bold" }}
        component="div"
      >
        {order.total_price} ₽
      </Typography>

      <Typography sx={{ mt: 1, textAlign: "left" }} component="div">
        <strong>Статус:</strong>{" "}
        <Chip label={order.status} color="primary" variant="outlined" />
      </Typography>
    </Paper>
  );
};

export default OrderCard;
