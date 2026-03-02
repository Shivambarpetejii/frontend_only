import { Box, Container, Typography, Card, CardContent } from "@mui/material";
import content from "../data/community.json";

import MembershipIcon from "../../public/images/icons/Icon.png";
import NationalIcon from "../../public/images/icons/Icon1.png";
import ClubsIcon from "../../public/images/icons/Icon2.png";

const icons = [MembershipIcon, NationalIcon, ClubsIcon];

const CommunitySection = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          px: { xs: 2, sm: 3, md: 4 }, // responsive side padding
        }}
      >
        {/* Section Title */}
        <Box textAlign="center" mb={{ xs: 4, md: 6 }}>
          <Typography
            variant="h4"
            fontWeight={600}
            sx={{
              whiteSpace: "pre-line",
              fontSize: { xs: "22px", md: "32px" }, // responsive text
            }}
          >
            {content.community.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            {content.community.subtitle}
          </Typography>
        </Box>

        {/* Cards */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // stack on mobile
            gap: 4,
          }}
        >
          {content.community.cards.map((card, index) => (
            <Card
              key={index}
              elevation={0}
              sx={{
                flex: 1,
                textAlign: "center",
                p: 4,
                borderRadius: 3,
                boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent>
                <Box
                  component="img"
                  src={icons[index]}
                  alt={card.title}
                  sx={{
                    width: 50,
                    height: 50,
                    mb: 2,
                  }}
                />

                <Typography
                  variant="h6"
                  fontWeight={600}
                  gutterBottom
                >
                  {card.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default CommunitySection;