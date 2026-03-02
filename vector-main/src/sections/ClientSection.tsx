import { Box, Container, Typography } from "@mui/material";
import content from "../data/client.json";

import Logo1 from "../../public/images/Logo1.png";
import Logo2 from "../../public/images/Logo2.png";
import Logo3 from "../../public/images/Logo3.png";
import Logo4 from "../../public/images/Logo4.png";
import Logo5 from "../../public/images/Logo5.png";

const logos = [Logo1, Logo2, Logo3, Logo4, Logo5, Logo2, Logo1];

const ClientsSection = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 2, sm: 4, md: 8 },
        }}
      >
        {/* Title */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 4, md: 6 },
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: { xs: "20px", md: "28px" },
            }}
          >
            {content.clients.title}
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontSize: { xs: "14px", md: "16px" },
              color: "text.secondary",
            }}
          >
            {content.clients.subtitle}
          </Typography>
        </Box>

        {/* Logos */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: { xs: "center", md: "space-between" },
            alignItems: "center",
            rowGap: 4,
          }}
        >
          {logos.map((logo, index) => (
            <Box
              key={index}
              component="img"
              src={logo}
              alt={`client-${index}`}
              sx={{
                width: { xs: 32, md: 40 },
                height: { xs: 32, md: 40 },
                opacity: 0.8,
                transition: "all 0.2s ease",
                "&:hover": {
                  opacity: 1,
                  transform: "scale(1.1)",
                },
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ClientsSection;