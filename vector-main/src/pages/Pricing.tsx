import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import pricingData from "../data/pricingData.json";

const Pricing = () => {
  const [yearly, setYearly] = useState(false);
  const [expanded, setExpanded] = useState<number | false>(false);
  const navigate = useNavigate();

  const { plans, faqs } = pricingData;

  const handleAccordion =
    (panel: number) =>
    (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    const handleNavigate = () => {
    navigate("/register");
  };

  return (
    <Box>
      {/* HERO */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #F8FFF8 0%, #F0FAF0 60%, #E8F5E9 100%)",
          py: 10,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Chip
            icon={<StarBorderIcon sx={{ fontSize: 14, color: "#4CAF4F" }} />}
            label="Simple, transparent pricing"
            sx={{
              backgroundColor: "rgba(76,175,79,0.1)",
              color: "#4CAF4F",
              mb: 3,
            }}
          />

          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            Choose the plan that{" "}
            <Box component="span" sx={{ color: "#4CAF4F" }}>
              fits your community
            </Box>
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Typography>Monthly</Typography>
            <Switch
              checked={yearly}
              onChange={(e) => setYearly(e.target.checked)}
            />
            <Typography>Yearly</Typography>
          </Box>
        </Container>
      </Box>

      {/* PRICING CARDS */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  border: "2px solid #4CAF4F",
                  borderRadius: 4,
                  height: "100%",
                  transition: "all 0.3s ease",
                  cursor: "pointer",

                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0px 15px 35px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <CardContent>
                  <Typography sx={{ fontWeight: 700 }}>
                    {plan.name}
                  </Typography>

                  <Typography sx={{ fontSize: 40, fontWeight: 800 }}>
                    ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </Typography>

                  <Button
                    fullWidth
                    variant={plan.buttonVariant as any}
                    sx={{ mt: 2, mb: 3 }}
                    onClick={() => handleNavigate()}
                  >
                    {plan.monthlyPrice === 0
                      ? "Get Started Free"
                      : "Start Trial"}
                  </Button>

                  {plan.features.map((feature, i) => (
                    <Box key={i} sx={{ display: "flex", gap: 1, mb: 1 }}>
                      {feature.included ? (
                        <CheckIcon
                          sx={{ fontSize: 18, color: "#4CAF4F" }}
                        />
                      ) : (
                        <CloseIcon
                          sx={{ fontSize: 18, color: "#C4C4C4" }}
                        />
                      )}
                      <Typography sx={{ fontSize: 14 }}>
                        {feature.label}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FAQ SECTION */}
      <Container maxWidth="md" sx={{ pb: 10 }}>
        <Typography
          variant="h5"
          sx={{ mb: 4, textAlign: "center", fontWeight: 700 }}
        >
          Frequently Asked Questions
        </Typography>

        {faqs.map((faq, i) => (
          <Accordion
            key={i}
            expanded={expanded === i}
            onChange={handleAccordion(i)}
            sx={{
              mb: 2,
              borderRadius: 3,
              border: "1px solid #EAEAEA",
              transition: "all 0.3s ease",

              "&:hover": {
                boxShadow: "0px 8px 25px rgba(0,0,0,0.05)",
              },

              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600 }}>
                {faq.q}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography sx={{ fontSize: 14, color: "#666" }}>
                {faq.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
};

export default Pricing;