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
  Alert
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {GoogleLogin} from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const BASE_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
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

const handleLogin = () => {
    navigate('/login')
}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password: string) => {
  // Min 8 chars, 1 letter, 1 number, 1 special char
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}\-_=+]).{8,}$/;

  return regex.test(password);
};

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validatePassword(formData.password)) {
    setPasswordError(
      "Minimum 8 characters, include letter, number & special character."
    );
    return; // Stop submission
  } else {
    setPasswordError("");
  }

  try {
    await axios.post(`${BASE_URL}/users`, formData);

    setToast({
      open: true,
      message: "User Registered Successfully 🎉",
      severity: "success",
    });

    setFormData({ name: "", email: "", password: "" });

  } catch (error) {
    setToast({
      open: true,
      message: "Registration Failed ❌",
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
    "& .MuiInputAdornment-root .MuiSvgIcon-root": {
      fontSize: "20px",
      color: "#9CA3AF",
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
        // Subtle background pattern
        backgroundImage:
          "radial-gradient(circle at 80% 10%, rgba(76,175,79,0.07) 0%, transparent 50%), radial-gradient(circle at 10% 90%, rgba(76,175,79,0.05) 0%, transparent 40%)",
      }}
    >
      <Container maxWidth="sm">
        {/* Card */}
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "16px",
            boxShadow: "0px 8px 40px rgba(0,0,0,0.08)",
            px: { xs: 3, sm: 5 },
            py: { xs: 4, sm: 5 },
          }}
        >
          {/* Logo / Brand */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: "12px",
                backgroundColor: "rgba(76,175,79,0.1)",
                mb: 2,
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: "#4CAF4F",
                  display: "block",
                }}
              />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontSize: "22px",
                color: "#18191F",
                mb: 0.5,
              }}
            >
              Create your account
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#6C7281" }}>
              Join thousands of community members today
            </Typography>
          </Box>

          {/* Google Sign Up */}
          <GoogleLogin
  onSuccess={async (credentialResponse) => {
    try {
      if (!credentialResponse.credential) return;

      // Decode Google JWT
      const decoded: any = jwtDecode(credentialResponse.credential);

      const googleUser = {
        name: decoded.name,
        email: decoded.email,
        password: "google-auth", // dummy password
      };

      // Check if user already exists
      const res = await axios.get(
        `https://vector-fawn.vercel.app/users?email=${googleUser.email}`
      );

      if (res.data.length === 0) {
        // If not exists → save to db.json
        await axios.post("https://vector-fawn.vercel.app/users", googleUser);
      }

      setToast({
        open: true,
        message: "Google Login Successful 🎉",
        severity: "success",
      });

      // Redirect after login
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      setToast({
        open: true,
        message: "Google Login Failed ❌",
        severity: "error",
      });
    }
  }}
  onError={() => {
    setToast({
      open: true,
      message: "Google Login Failed ❌",
      severity: "error",
    });
  }}
/>

          {/* Divider */}
          <Divider sx={{ mb: 2.5 }}>
            <Typography sx={{ fontSize: "12px", color: "#9CA3AF", px: 1 }}>
              OR
            </Typography>
          </Divider>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              name="name"
              fullWidth
              margin="none"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
              sx={{ ...inputSx, mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Email Address"
              name="email"
              type="email"
              fullWidth
              margin="none"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
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
              margin="none"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Min. 8 characters"
               error={Boolean(passwordError)}
              helperText={passwordError}
              sx={{ ...inputSx, mb: 1 }}
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
                      edge="end"
                      size="small"
                    >
                      {showPassword ? (
                        <VisibilityOutlinedIcon sx={{ fontSize: 18, color: "#9CA3AF" }} />
                      ) : (
                        <VisibilityOffOutlinedIcon sx={{ fontSize: 18, color: "#9CA3AF" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Password hint */}
            <Typography sx={{ fontSize: "12px", color: "#9CA3AF", mb: 3 }}>
              Use 8 or more characters with a mix of letters, numbers & symbols
            </Typography>

            {/* Terms */}
            <Typography sx={{ fontSize: "13px", color: "#6C7281", mb: 2.5 }}>
              By creating an account, you agree to our{" "}
              <Link
                href="#"
                underline="hover"
                sx={{ color: "#4CAF4F", fontWeight: 500 }}
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                underline="hover"
                sx={{ color: "#4CAF4F", fontWeight: 500 }}
              >
                Privacy Policy
              </Link>
              .
            </Typography>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#4CAF4F",
                color: "#fff",
                borderRadius: "8px",
                py: 1.4,
                fontSize: "15px",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#43a047",
                  boxShadow: "0px 4px 16px rgba(76,175,79,0.35)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Create Account
            </Button>
          </Box>

          {/* Footer */}
          <Typography
            sx={{ textAlign: "center", fontSize: "14px", color: "#6C7281", mt: 3 }}
          >
            Already have an account?{" "}
            <Link
              component="button"
              onClick={() => handleLogin()}
              underline="hover"
              sx={{
                color: "#4CAF4F",
                fontWeight: 600,
                cursor: "pointer",
                background: "none",
                border: "none",
                fontSize: "14px",
              }}
            >
              Log in
            </Link>
          </Typography>
        </Box>
      </Container>

      <Snackbar
  open={toast.open}
  autoHideDuration={3000}
  onClose={() => setToast({ ...toast, open: false })}
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
>
  <Alert
    onClose={() => setToast({ ...toast, open: false })}
    severity={toast.severity}
    variant="filled"
    sx={{ width: "100%" }}
  >
    {toast.message}
  </Alert>
</Snackbar>
    </Box>
  );
};

export default Register;