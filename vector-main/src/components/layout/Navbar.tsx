import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import mainlogo from "../../../public/images/mainlogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Features", path: "/features" },
    { label: "Community", path: "/community" },
    { label: "Blog", path: "/blog" },
    { label: "Pricing", path: "/pricing" },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false); // close drawer after click
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "#fff",
          borderBottom: "1px solid #eee",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 2,
            }}
          >
            {/* LEFT: Logo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                component="img"
                src={mainlogo}
                alt="logo"
                sx={{ height: 22, cursor: "pointer" }}
                onClick={() => handleNavigate("/")}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#000", cursor: "pointer" }}
                onClick={() => handleNavigate("/")}
              >
                Vector
              </Typography>
            </Box>

            {/* RIGHT SECTION (Desktop) */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 3,
              }}
            >
              <Box sx={{ display: "flex", gap: 3 }}>
                {menuItems.map((item) => (
                  <Typography
                    key={item.label}
                    onClick={() => handleNavigate(item.path)}
                    sx={{
                      cursor: "pointer",
                      color: "#333",
                      fontWeight: 500,
                      fontSize: "14px",
                      transition: "0.2s",
                      "&:hover": {
                        color: "#4CAF4F",
                      },
                    }}
                  >
                    {item.label}
                  </Typography>
                ))}
              </Box>

              <Button
                variant="contained"
                onClick={() => handleNavigate("/register")}
                sx={{
                  backgroundColor: "#4CAF4F",
                  color: "#fff",
                  borderRadius: "6px",
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  fontSize: "14px",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#43a047",
                    boxShadow: "none",
                  },
                }}
              >
                Register Now →
              </Button>
            </Box>

            {/* MOBILE MENU ICON */}
            <IconButton
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }}>
          {/* Close Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {menuItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton onClick={() => handleNavigate(item.path)}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}

            {/* Register Button inside Drawer */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigate("/register")}>
                <ListItemText
                  primary="Register Now"
                  primaryTypographyProps={{
                    sx: { color: "#4CAF4F", fontWeight: 600 },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;