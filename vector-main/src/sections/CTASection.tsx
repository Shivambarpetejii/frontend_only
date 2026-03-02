import { Box, Container, Typography, Button } from "@mui/material";
import data from "../data/ctaSection.json";

const CTASection = () => {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        py: 10,
        textAlign: "center"
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            mb: 4,
            lineHeight: 1.3
          }}
        >
          {data.title}
        </Typography>

        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 4,
            py: 1.2
          }}
        >
          {data.buttonText} →
        </Button>
      </Container>
    </Box>
  );
};

export default CTASection;