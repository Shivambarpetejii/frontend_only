import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useRef } from "react";
import {useNavigate} from "react-router-dom"

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PublicIcon from "@mui/icons-material/Public";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CodeIcon from "@mui/icons-material/Code";
import CampaignIcon from "@mui/icons-material/Campaign";

import communityData from "../data/communityData.json";

const iconMap: any = {
  "Product Updates": <CampaignIcon sx={{ fontSize: 40 }} />,
  Design: <DesignServicesIcon sx={{ fontSize: 40 }} />,
  Development: <CodeIcon sx={{ fontSize: 40 }} />,
  Marketing: <TrendingUpIcon sx={{ fontSize: 40 }} />,
  Support: <SupportAgentIcon sx={{ fontSize: 40 }} />,
  General: <PublicIcon sx={{ fontSize: 40 }} />,
};

const Community = () => {
    const navigate = useNavigate();
  const {
    hero,
    members,
    categories,
    membersSectionTitle,
    categoriesSectionTitle,
    cta,
  } = communityData;

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleNavigate = () => {
    navigate("/register");
  };

  return (
    <Box>
      {/* HERO */}
      <Box
        sx={{
          backgroundImage: `url(${hero.bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: 14,
          textAlign: "center",
          color: "white",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        />

        <Container sx={{ position: "relative" }}>
          <Typography variant="h3" fontWeight={700} mb={2}>
            {hero.title}
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            {hero.subtitle}
          </Typography>
        </Container>
      </Box>

      {/* MEMBERS (Scrollable) */}
      <Container maxWidth="lg" sx={{ py: 10, position: "relative" }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" mb={6}>
          {membersSectionTitle}
        </Typography>

        {/* Arrows */}
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            left: -10,
            top: "55%",
            backgroundColor: "white",
            boxShadow: 2,
            "&:hover": { backgroundColor: "#4CAF4F", color: "white" },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <IconButton
          onClick={() => scroll("right")}
          sx={{
            position: "absolute",
            right: -10,
            top: "55%",
            backgroundColor: "white",
            boxShadow: 2,
            "&:hover": { backgroundColor: "#4CAF4F", color: "white" },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>

        {/* Scroll Container */}
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: 4,
            overflowX: "auto",
            scrollBehavior: "smooth",
            pb: 2,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {members.map((member, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 280,
                borderRadius: 4,
                textAlign: "center",
                p: 3,
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 10px 30px rgba(76,175,79,0.2)",
                },
              }}
            >
              <CardContent>
                <Avatar
                  sx={{
                    bgcolor: member.color,
                    width: 70,
                    height: 70,
                    mx: "auto",
                    mb: 2,
                    fontSize: 24,
                  }}
                >
                  {member.name.charAt(0)}
                </Avatar>

                <Typography fontWeight={700} mb={1}>
                  {member.name}
                </Typography>

                <Chip
                  label={member.role}
                  size="small"
                  sx={{
                    mb: 2,
                    backgroundColor: "rgba(76,175,79,0.1)",
                    color: "#4CAF4F",
                    fontWeight: 600,
                  }}
                />

                <Typography variant="body2">
                  {member.posts}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {member.joined}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* CATEGORIES */}
      <Box sx={{ backgroundColor: "#F9FAFB", py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={700} textAlign="center" mb={6}>
            {categoriesSectionTitle}
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {categories.map((cat, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    p: 5,
                    borderRadius: 4,
                    textAlign: "center",
                    backgroundColor: "white",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                      backgroundColor: "#4CAF4F",
                      color: "white",
                    },
                  }}
                >
                  {iconMap[cat.title]}
                  <Typography fontWeight={700} mt={2}>
                    {cat.title}
                  </Typography>
                  <Typography variant="body2">
                    {cat.posts}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box
        sx={{
          py: 10,
          textAlign: "center",
          background: "linear-gradient(135deg, #4CAF4F, #43a047)",
          color: "white",
        }}
      >
        <Container>
          <Typography variant="h4" fontWeight={700} mb={2}>
            {cta.title}
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "#4CAF4F",
              fontWeight: 700,
              px: 5,
              py: 1.5,
              borderRadius: 3,
              "&:hover": {
                backgroundColor: "#f1f1f1",
                transform: "scale(1.05)",
              },
              transition: "all 0.2s ease",
            }}
            onClick={() => handleNavigate()}
          >
            {cta.buttonText}
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Community;