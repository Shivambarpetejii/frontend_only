import { Box, Container, Typography, Button } from "@mui/material";
import data from "../data/extra.json";
import FooterImage from "../../public/images/pana.png";

const FooterDesignSection = () => {
  return (
    <Box sx={{ backgroundColor: "#fff", py: 10 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: { xs: "wrap", md: "nowrap" },
            gap: 8
          }}
        >
          {/* LEFT IMAGE */}
          <Box
            component="img"
            src={FooterImage}
            alt="Footer Design"
            sx={{
              width: { xs: "100%", md: 400 },
              maxWidth: 450
            }}
          />

          {/* RIGHT CONTENT */}
          <Box sx={{ maxWidth: 520 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ mb: 3, lineHeight: 1.3 }}
            >
              {data.title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 4, lineHeight: 1.7 }}
            >
              {data.description}
            </Typography>

            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: 4
              }}
            >
              {data.buttonText}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FooterDesignSection;