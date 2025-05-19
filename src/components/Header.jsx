import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Header = ({ isLoggedIn, username, onLoginClick }) => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          🎨 ArtOrder
        </Typography>

        <Box>
          {isLoggedIn ? (
            <Typography variant="body1">Привет, {username}</Typography>
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
