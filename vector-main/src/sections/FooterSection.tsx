import {
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  Snackbar,
  Alert
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import axios from "axios";
import { useState } from "react";

import data from "../data/footer.json";

const FooterSection = () => {
  const [inputData, setInputData] = useState({ email: "" });

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
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputData.email) {
      setToast({
        open: true,
        message: "Please enter your email",
        severity: "error",
      });
      return;
    }

    try {
      await axios.post("https://vector-fawn.vercel.app/emails", inputData);

      setToast({
        open: true,
        message: "Thanks for connecting 🎉",
        severity: "success",
      });

      setInputData({ email: "" });
    } catch (error) {
      setToast({
        open: true,
        message: "Something went wrong ❌",
        severity: "error",
      });
    }
  };

  return (
    <Box sx={{ backgroundColor: "#263238", color: "#fff", py: 8 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: { xs: "wrap", md: "nowrap" },
            gap: 6,
          }}
        >
          {/* LEFT SIDE */}
          <Box sx={{ maxWidth: 250 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              {data.logoText}
            </Typography>

            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              {data.copyright}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, mb: 3 }}>
              {data.rights}
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <InstagramIcon fontSize="small" />
              <TwitterIcon fontSize="small" />
              <YouTubeIcon fontSize="small" />
              <FacebookIcon fontSize="small" />
            </Box>
          </Box>

          {/* COMPANY */}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              {data.company.title}
            </Typography>

            {data.company.links.map((link, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{ opacity: 0.7, mb: 1, cursor: "pointer" }}
              >
                {link}
              </Typography>
            ))}
          </Box>

          {/* SUPPORT */}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              {data.support.title}
            </Typography>

            {data.support.links.map((link, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{ opacity: 0.7, mb: 1, cursor: "pointer" }}
              >
                {link}
              </Typography>
            ))}
          </Box>

          {/* NEWSLETTER */}
          <Box sx={{ minWidth: 250 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              {data.newsletter.title}
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex" }}
            >
              <TextField
                name="email"
                value={inputData.email}
                onChange={handleChange}
                variant="outlined"
                placeholder={data.newsletter.placeholder}
                size="small"
                sx={{
                  backgroundColor: "#37474F",
                  borderRadius: 1,
                  input: { color: "#fff" },
                  "& fieldset": { border: "none" },
                }}
                fullWidth
              />

              <IconButton type="submit" sx={{ color: "#fff" }}>
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* SINGLE Snackbar */}
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

export default FooterSection;