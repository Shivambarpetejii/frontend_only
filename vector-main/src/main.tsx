import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import {GoogleOAuthProvider} from "@react-oauth/google";
import App from "./App";
import theme from "./theme";

const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={client_id}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);