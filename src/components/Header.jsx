import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn, username, onLoginClick }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          🎨 ArtOrder
        </Typography>

        <Box>
          {isLoggedIn ? (
            <Button color="inherit" onClick={() => navigate("/profile")}>
              Привет, {username}
            </Button>
          ) : (
            <Button color="primary" variant="outlined" onClick={onLoginClick}>
              Войти
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
