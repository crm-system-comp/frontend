import { Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetMeQuery, useLogoutMutation } from "../api/auth";
import { useGetOrdersQuery } from "../api/orders";
import { endSession } from "../../session";
import ProfileInfo from "../components/ProfileInfo";
import OrdersSection from "../components/OrderSection";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { data: user } = useGetMeQuery();
  const { data: orders = [] } = useGetOrdersQuery();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout();
      endSession();
      navigate("/");
    } catch (err) {
      console.error("Ошибка при выходе:", err);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={2}
      >
        <Button variant="contained" onClick={() => navigate(-1)}>
          Назад
        </Button>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Выйти
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <ProfileInfo user={user} />
        </Grid>
        <Grid item xs={12} md={8}>
          <OrdersSection orders={orders} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
