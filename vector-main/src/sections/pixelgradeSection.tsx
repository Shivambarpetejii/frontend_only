import { Box, Container, Typography, Button } from "@mui/material";
import content from "../data/pixelgrade.json";
import pixelImage from "../../public/images/Frame35.png"

const PixelgradeSection = () => {
  return (
    <Box sx={{ py: 10, backgroundColor: "#fff" }}>
      <Container maxWidth="lg">
        
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 6,
            flexWrap: { xs: "wrap", md: "nowrap" }
          }}
        >
          
          {/* LEFT IMAGE */}
          <Box
            component="img"
            src={pixelImage}
            alt="Pixelgrade Illustration"
            sx={{
              width: { xs: "100%", md: "40%" },
              maxWidth: 400
            }}
          />

          {/* RIGHT CONTENT */}
          <Box sx={{ flex: 1 }}>
            
            <Typography
              variant="h4"
              fontWeight={600}
              sx={{ mb: 3 }}
            >
              {content.pixelgrade.title}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, lineHeight: 1.7 }}
            >
              {content.pixelgrade.description}
            </Typography>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#4CAF4F",
                textTransform: "none",
                px: 4,
                py: 1.2,
                borderRadius: 2,
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#43a047",
                  boxShadow: "none"
                }
              }}
            >
              {content.pixelgrade.buttonText}
            </Button>

          </Box>
        </Box>

      </Container>
    </Box>
  );
};

export default PixelgradeSection;