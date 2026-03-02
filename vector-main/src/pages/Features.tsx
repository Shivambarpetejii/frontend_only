import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import SpeedIcon from "@mui/icons-material/Speed";
import GroupsIcon from "@mui/icons-material/Groups";
import InsightsIcon from "@mui/icons-material/Insights";
import SecurityIcon from "@mui/icons-material/Security";
import DevicesIcon from "@mui/icons-material/Devices";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import data from "../data/features.json";

import { useNavigate } from "react-router-dom";

const iconMap: Record<string, React.ReactNode> = {
  Speed: <SpeedIcon sx={{ fontSize: 28, color: "#4CAF4F" }} />,
  Groups: <GroupsIcon sx={{ fontSize: 28, color: "#4CAF4F" }} />,
  Insights: <InsightsIcon sx={{ fontSize: 28, color: "#4CAF4F" }} />,
  Security: <SecurityIcon sx={{ fontSize: 28, color: "#4CAF4F" }} />,
  Devices: <DevicesIcon sx={{ fontSize: 28, color: "#4CAF4F" }} />,
  SupportAgent: <SupportAgentIcon sx={{ fontSize: 28, color: "#4CAF4F" }} />,
};

const Features = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/register")
    }
  return (
    <Box sx={{ backgroundColor: "#fff", overflowX: "hidden" }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          background: "linear-gradient(160deg, #F0FAF0 0%, #FAFFF8 60%, #fff 100%)",
          pt: { xs: 6, md: 12 },
          pb: { xs: 3, md: 4 },
          textAlign: "center",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(76,175,79,0.12) 0%, transparent 70%)",
            top: -120,
            right: -120,
            pointerEvents: "none",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(76,175,79,0.08) 0%, transparent 70%)",
            bottom: -80,
            left: -80,
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>

          {/* Badge */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.8,
              border: "1px solid rgba(76,175,79,0.3)",
              backgroundColor: "rgba(76,175,79,0.07)",
              borderRadius: "100px",
              px: 2,
              py: 0.6,
              mb: 3,
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 13, color: "#4CAF4F" }} />
            <Typography sx={{ fontSize: 12, color: "#4CAF4F", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {data.hero.badge}
            </Typography>
          </Box>

          {/* Heading */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "32px", sm: "44px", md: "58px" },
              lineHeight: 1.1,
              color: "#18191F",
              letterSpacing: "-1.5px",
              mb: 2.5,
            }}
          >
            {data.hero.title}{" "}
            <Box
              component="span"
              sx={{
                color: "#4CAF4F",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 4,
                  left: 0,
                  width: "100%",
                  height: "6px",
                  background: "rgba(76,175,79,0.2)",
                  borderRadius: "4px",
                  zIndex: -1,
                },
              }}
            >
              {data.hero.highlight}
            </Box>
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              fontSize: { xs: "15px", md: "17px" },
              color: "#6C7281",
              maxWidth: 520,
              mx: "auto",
              lineHeight: 1.75,
              mb: 5,
            }}
          >
            {data.hero.description}
          </Typography>

          {/* CTAs */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: "#4CAF4F",
                color: "#fff",
                borderRadius: "10px",
                px: 4,
                py: 1.5,
                fontSize: "15px",
                fontWeight: 700,
                textTransform: "none",
                boxShadow: "0 8px 24px rgba(76,175,79,0.3)",
                "&:hover": {
                  backgroundColor: "#43a047",
                  boxShadow: "0 12px 32px rgba(76,175,79,0.4)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.2s ease",
              }}
              onClick={() => handleNavigate()}
            >
              {data.hero.cta}
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#E0E0E0",
                color: "#18191F",
                borderRadius: "10px",
                px: 4,
                py: 1.5,
                fontSize: "15px",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  borderColor: "#4CAF4F",
                  backgroundColor: "rgba(76,175,79,0.04)",
                },
              }}
              onClick={() => handleNavigate()}
            >
              See how it works
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ── FEATURES GRID ────────────────────────────────────────────── */}
      <Container
  maxWidth={false}
  sx={{
    maxWidth: "1200px",
    mx: "auto",
    py: { xs: 8, md: 14 },
  }}
>

        {/* Section header */}
        <Box sx={{ textAlign: "center",}}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: "26px", md: "36px" },
              color: "#18191F",
              letterSpacing: "-0.5px",
              mb: 1.5,
            }}
          >
            {data.section.title}
          </Typography>
          <Typography sx={{ color: "#6C7281", fontSize: "15px", maxWidth: 460, mx: "auto" }}>
            {data.section.subtitle}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {data.features.map((f, i) => (
            <Grid item xs={6} key={i}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: "18px",
                  border: "1.5px solid #F0F0F0",
                  backgroundColor: "#FAFAFA",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    borderColor: "#4CAF4F",
                    backgroundColor: "#fff",
                    boxShadow: "0 12px 40px rgba(76,175,79,0.1)",
                    transform: "translateY(-6px)",
                    "& .feature-icon-box": {
                      backgroundColor: "#4CAF4F",
                      "& .MuiSvgIcon-root": { color: "#fff !important" },
                    },
                    "& .arrow-hint": {
                      opacity: 1,
                      transform: "translateX(0px)",
                    },
                  },
                }}
              >
                <CardContent sx={{ p: 3.5, height: "100%", display: "flex", flexDirection: "column" }}>

                  {/* Icon box */}
                  <Box
                    className="feature-icon-box"
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "14px",
                      backgroundColor: "rgba(76,175,79,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2.5,
                      transition: "all 0.25s ease",
                    }}
                  >
                    {iconMap[f.icon]}
                  </Box>

                  {/* Title */}
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "#18191F",
                      mb: 1,
                      letterSpacing: "-0.2px",
                    }}
                  >
                    {f.title}
                  </Typography>

                  {/* Desc */}
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#6C7281",
                      lineHeight: 1.7,
                      flex: 1,
                    }}
                  >
                    {f.desc}
                  </Typography>

                  {/* Animated arrow hint */}
                  <Box
                    className="arrow-hint"
                    sx={{
                      mt: 2.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      opacity: 0,
                      transform: "translateX(-6px)",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#4CAF4F" }}>
                      Learn more
                    </Typography>
                    <ArrowForwardIcon sx={{ fontSize: 14, color: "#4CAF4F" }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ── HIGHLIGHTS ───────────────────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          backgroundColor: "#18191F",
          py: { xs: 8, md: 10 },
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(76,175,79,0.15) 0%, transparent 65%)",
            top: -250,
            right: -150,
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>

          {/* Section label */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.8,
                border: "1px solid rgba(76,175,79,0.3)",
                backgroundColor: "rgba(76,175,79,0.07)",
                borderRadius: "100px",
                px: 2,
                py: 0.6,
                mb: 2,
              }}
            >
              <Typography sx={{ fontSize: 11, color: "#4CAF4F", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                What's included
              </Typography>
            </Box>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "24px", md: "32px" },
                color: "#fff",
                letterSpacing: "-0.5px",
              }}
            >
              Everything included, nothing hidden
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {data.highlights.map((item, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 2,
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backgroundColor: "rgba(255,255,255,0.04)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "rgba(76,175,79,0.1)",
                      borderColor: "rgba(76,175,79,0.35)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "8px",
                      backgroundColor: "rgba(76,175,79,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircleOutlineIcon sx={{ color: "#4CAF4F", fontSize: 17 }} />
                  </Box>
                  <Typography sx={{ fontSize: "14px", color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
                    {item}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

    </Box>
  );
};

export default Features;