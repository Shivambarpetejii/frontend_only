import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  InputAdornment,
  IconButton,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const email = formData.email.trim().toLowerCase();
  const password = formData.password.trim();

  try {
    // Check email only
    const res = await axios.post(`${BASE_URL}/emails`, { email });


    console.log("Response:", res.data);

    if (res.data.length === 0) {
      setToast({
        open: true,
        message: "Email not registered ❌",
        severity: "error",
      });
      return;
    }

    const user = res.data[0];

    // Compare password manually
    if (user.password === password) {
      setToast({
        open: true,
        message: "Login Successful 🎉",
        severity: "success",
      });

      localStorage.setItem("user", JSON.stringify(user));

      setTimeout(() => navigate("/"), 1500);
    } else {
      setToast({
        open: true,
        message: "Incorrect Password ❌",
        severity: "error",
      });
    }

  } catch (error) {
    setToast({
      open: true,
      message: "Server Error ❌",
      severity: "error",
    });
  }
};

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: "#F5F5F5",
      fontSize: "14px",
      "& fieldset": { borderColor: "transparent" },
      "&:hover fieldset": { borderColor: "#4CAF4F" },
      "&.Mui-focused fieldset": {
        borderColor: "#4CAF4F",
        borderWidth: "1.5px",
      },
    },
    "& .MuiInputLabel-root": {
      fontSize: "14px",
      color: "#6C7281",
      "&.Mui-focused": { color: "#4CAF4F" },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F8F9FA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
        backgroundImage:
          "radial-gradient(circle at 80% 10%, rgba(76,175,79,0.07) 0%, transparent 50%), radial-gradient(circle at 10% 90%, rgba(76,175,79,0.05) 0%, transparent 40%)",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "16px",
            boxShadow: "0px 8px 40px rgba(0,0,0,0.08)",
            px: { xs: 3, sm: 5 },
            py: { xs: 4, sm: 5 },
          }}
        >
          {/* Heading */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, fontSize: "22px", color: "#18191F" }}
            >
              Welcome Back
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#6C7281" }}>
              Login to continue to your account
            </Typography>
          </Box>

          {/* Google Login */}
          <GoogleLogin
  onSuccess={(credentialResponse) => {
    console.log("Google Success:", credentialResponse);

    if (credentialResponse.credential) {
      setToast({
        open: true,
        message: "Google Login Successful 🎉",
        severity: "success",
      });

      // Optional: store token
      localStorage.setItem("googleUser", credentialResponse.credential);

      setTimeout(() => navigate("/"), 1500);
    } else {
      setToast({
        open: true,
        message: "Google Login Failed ❌",
        severity: "error",
      });
    }
  }}
  onError={() => {
    console.log("Google Login Failed");

    setToast({
      open: true,
      message: "Google Login Failed ❌",
      severity: "error",
    });
  }}
/>

          <Divider sx={{ my: 2 }}>
            <Typography sx={{ fontSize: "12px", color: "#9CA3AF", px: 1 }}>
              OR
            </Typography>
          </Divider>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ ...inputSx, mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={formData.password}
              onChange={handleChange}
              required
              sx={{ ...inputSx, mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      size="small"
                    >
                      {showPassword ? (
                        <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
                      ) : (
                        <VisibilityOffOutlinedIcon sx={{ fontSize: 18 }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#4CAF4F",
                borderRadius: "8px",
                py: 1.4,
                fontWeight: 600,
                textTransform: "none",
                "&:hover": { backgroundColor: "#43a047" },
              }}
            >
              Login
            </Button>
          </Box>

          {/* Footer */}
          <Typography
            sx={{ textAlign: "center", fontSize: "14px", color: "#6C7281", mt: 3 }}
          >
            Don't have an account?{" "}
            <Link
              component="button"
              onClick={() => navigate("/register")}
              sx={{ color: "#4CAF4F", fontWeight: 600 }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={toast.severity}
          variant="filled"
          onClose={() => setToast({ ...toast, open: false })}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;