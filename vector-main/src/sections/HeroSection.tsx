import { Box, Typography, Button, Container } from "@mui/material";
import content from "../data/home.json";
import heroImage from "../../public/images/hero.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/register");
  }
  return (
    <Box
      sx={{
        bgcolor: "#f5f7fa",
        py: { xs: 6, md: 10 }, // responsive padding
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // stack on mobile
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 6, md: 8 },
            textAlign: { xs: "center", md: "left" }, // center text on mobile
          }}
        >
          {/* LEFT */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              maxWidth: 560,
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "28px", sm: "34px", md: "44px" },
                lineHeight: 1.2,
              }}
            >
              {content.hero.title}{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                {content.hero.highlight}
              </Box>
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                fontSize: { xs: "14px", md: "16px" },
                maxWidth: 500,
              }}
            >
              {content.hero.subtitle}
            </Typography>

            <Button
              variant="contained"
              sx={{
                width: "fit-content",
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                py: 1.2,
              }}
              onClick={() => handleNavigate()}
            >
              {content.hero.buttonText}
            </Button>
          </Box>

          {/* RIGHT */}
          <Box
            component="img"
            src={heroImage}
            alt="hero"
            sx={{
              width: { xs: "100%", sm: 320, md: 372 },
              height: "auto",
              maxWidth: 400,
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;