import { Box, Container, Typography } from "@mui/material";
import data from "../data/statsSection.json";

import MembersIcon from "../../public/images/stats/member.png";
import ClubsIcon from "../../public/images/stats/club.png";
import BookingsIcon from "../../public/images/stats/event.png";
import PaymentsIcon from "../../public/images/stats/payment.png";

// Proper typing instead of `any`
type IconKey = "members" | "clubs" | "bookings" | "payments";

const iconMap: Record<IconKey, string> = {
  members: MembersIcon,
  clubs: ClubsIcon,
  bookings: BookingsIcon,
  payments: PaymentsIcon
};

const StatsSection = () => {
  return (
    <Box sx={{ backgroundColor: "background.default", py: 8 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: { xs: "wrap", md: "nowrap" },
            gap: 8
          }}
        >
          {/* LEFT SIDE */}
          <Box sx={{ maxWidth: 420 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {data.title}{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                {data.highlight}
              </Box>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {data.subtitle}
            </Typography>
          </Box>

          {/* RIGHT SIDE */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 8
            }}
          >
            {data.stats.map((item, index) => {
              const iconSrc =
                iconMap[item.icon as IconKey] || MembersIcon;

              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2
                  }}
                >
                  <Box
                    component="img"
                    src={iconSrc}
                    alt={item.label}
                    sx={{ width: 36, height: 36 }}
                  />

                  <Box>
                    <Typography variant="h6" fontWeight={700}>
                      {item.number}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {item.label}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default StatsSection;