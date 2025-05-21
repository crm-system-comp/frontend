import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const Footer = ({ email, onLogout }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} p={2}>
    <Typography>ArtOrderAdmin</Typography>
    <Tooltip title="Выход">
      <IconButton onClick={onLogout}>
        <AccountCircle />
        <Typography ml={1}>{email}</Typography>
        <LogoutIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  </Box>
);

export default Footer;
