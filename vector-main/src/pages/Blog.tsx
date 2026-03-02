import { useState, useMemo } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Avatar,
  InputAdornment,
  TextField,
  Grid,
  Divider,
  LinearProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import StarIcon from "@mui/icons-material/Star";
import blogData from "../data/blogData.json";

type Post = {
  tag: string;
  title: string;
  excerpt: string;
  author: string;
  authorInitials: string;
  authorColor: string;
  date: string;
  readTime: string;
  image: string;
};

const tagColors: Record<string, { bg: string; color: string }> = {
  Product:     { bg: "#E8F5E9", color: "#2E7D32" },
  Community:   { bg: "#E3F2FD", color: "#1565C0" },
  Design:      { bg: "#F3E5F5", color: "#6A1B9A" },
  Marketing:   { bg: "#FFF3E0", color: "#E65100" },
  Engineering: { bg: "#FCE4EC", color: "#880E4F" },
  General:     { bg: "#E0F2F1", color: "#00695C" },
};

const Blog = () => {
  const { categories, featured, posts } = blogData;

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const [toast, setToast] = useState<{
  open: boolean;
  message: string;
  severity: "success" | "error";
}>({
  open: false,
  message: "",
  severity: "success",
});

const BASE_URL = import.meta.env.VITE_API_URL;

  const filteredPosts = useMemo(() => {
    return posts.filter((post: Post) => {
      const matchesCategory = selectedCategory === "All" || post.tag === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, search]);

  const toggleBookmark = (i: number) => {
    setBookmarked((prev) =>
      prev.includes(i) ? prev.filter((b) => b !== i) : [...prev, i]
    );
  };

  const handleNewsletterSubmit = async () => {
  if (!email) {
    setToast({
      open: true,
      message: "Please enter your email",
      severity: "error",
    });
    return;
  }

  try {
    await axios.post(`${BASE_URL}/emails`, { email });

    setToast({
      open: true,
      message: "Thanks for connecting 🎉",
      severity: "success",
    });

    setEmail("");
    setSubscribed(true);
  } catch (error) {
    setToast({
      open: true,
      message: "Something went wrong ❌",
      severity: "error",
    });
  }
};

  
  // Fake trending — top 3 posts by index
  const trending = posts.slice(0, 3);

  return (
    <Box sx={{ backgroundColor: "#fff", overflowX: "hidden" }}>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          background: "linear-gradient(160deg, #F0FAF0 0%, #FAFFF8 55%, #fff 100%)",
          pt: { xs: 10, md: 14 },
          pb: { xs: 6, md: 8 },
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(76,175,79,0.1) 0%, transparent 70%)",
            top: -180,
            right: -150,
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">

            {/* Left — Heading + Search */}
            <Grid item xs={12} md={7}>
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
                  mb: 2.5,
                }}
              >
                <AutoStoriesIcon sx={{ fontSize: 13, color: "#4CAF4F" }} />
                <Typography sx={{ fontSize: 11, color: "#4CAF4F", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Nexcent Blog
                </Typography>
              </Box>

              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "34px", md: "54px" },
                  lineHeight: 1.1,
                  letterSpacing: "-1.5px",
                  color: "#18191F",
                  mb: 2,
                }}
              >
                Stories, tips &{" "}
                <Box
                  component="span"
                  sx={{
                    color: "#4CAF4F",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 3,
                      left: 0,
                      width: "100%",
                      height: 7,
                      background: "rgba(76,175,79,0.18)",
                      borderRadius: 4,
                      zIndex: -1,
                    },
                  }}
                >
                  insights
                </Box>
              </Typography>

              <Typography sx={{ fontSize: "16px", color: "#6C7281", lineHeight: 1.75, mb: 4, maxWidth: 480 }}>
                Stay up to date with the latest community building strategies,
                product updates and best practices.
              </Typography>

              {/* Search bar */}
              <TextField
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                sx={{
                  maxWidth: 460,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    fontSize: "14px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                    "& fieldset": { borderColor: "#EAEAEA" },
                    "&:hover fieldset": { borderColor: "#4CAF4F" },
                    "&.Mui-focused fieldset": { borderColor: "#4CAF4F", borderWidth: "1.5px" },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Right — Stats strip */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  background: "#fff",
                  border: "1.5px solid #F0F0F0",
                  borderRadius: "20px",
                  p: 3.5,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: "15px", color: "#18191F", mb: 2.5 }}>
                  📊 Blog at a glance
                </Typography>
                {[
                  { label: "Articles published", value: posts.length + "+", progress: 80 },
                  { label: "Monthly readers", value: "12K+", progress: 65 },
                  { label: "Community contributors", value: "40+", progress: 45 },
                ].map((stat, i) => (
                  <Box key={i} sx={{ mb: i < 2 ? 2.5 : 0 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.6 }}>
                      <Typography sx={{ fontSize: "13px", color: "#6C7281" }}>{stat.label}</Typography>
                      <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#18191F" }}>{stat.value}</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={stat.progress}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: "#F0F0F0",
                        "& .MuiLinearProgress-bar": { backgroundColor: "#4CAF4F", borderRadius: 3 },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── CATEGORY FILTER ─────────────────────────────────────────── */}
      <Box sx={{ borderBottom: "1px solid #F5F5F5", py: 2.5, position: "sticky", top: 0, backgroundColor: "#fff", zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
            <Typography sx={{ fontSize: "13px", color: "#9CA3AF", fontWeight: 600, mr: 1 }}>FILTER:</Typography>
            {categories.map((cat: string) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => setSelectedCategory(cat)}
                sx={{
                  cursor: "pointer",
                  borderRadius: "8px",
                  height: 32,
                  fontSize: "13px",
                  fontWeight: selectedCategory === cat ? 700 : 400,
                  backgroundColor: selectedCategory === cat ? "#4CAF4F" : "#F5F5F5",
                  color: selectedCategory === cat ? "#fff" : "#6C7281",
                  border: selectedCategory === cat ? "none" : "1px solid #EAEAEA",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: selectedCategory === cat ? "#43a047" : "rgba(76,175,79,0.08)",
                    color: selectedCategory === cat ? "#fff" : "#4CAF4F",
                  },
                }}
              />
            ))}
            {search && (
              <Chip
                label={`"${search}" ×`}
                onClick={() => setSearch("")}
                size="small"
                sx={{ backgroundColor: "#FFF3E0", color: "#E65100", fontWeight: 600, fontSize: "12px", cursor: "pointer" }}
              />
            )}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={5}>

          {/* ── MAIN COLUMN ─────────────────────────────────────────── */}
          <Grid item xs={12} md={8}>

            {/* Featured Post */}
            {selectedCategory === "All" && !search && (
              <Box sx={{ mb: 6 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                  <LocalFireDepartmentIcon sx={{ color: "#FF6B35", fontSize: 18 }} />
                  <Typography sx={{ fontWeight: 700, fontSize: "13px", color: "#18191F", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Featured
                  </Typography>
                </Box>

                <Card
                  elevation={0}
                  sx={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: "1.5px solid #F0F0F0",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      image={featured.image}
                      alt={featured.title}
                      sx={{ height: { xs: 220, md: 320 }, objectFit: "cover" }}
                    />
                    {/* Gradient overlay */}
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)",
                      }}
                    />
                    {/* Tag on image */}
                    <Chip
                      label={featured.tag}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        backgroundColor: tagColors[featured.tag]?.bg || "#F5F5F5",
                        color: tagColors[featured.tag]?.color || "#333",
                        fontWeight: 700,
                        fontSize: "11px",
                      }}
                    />
                    {/* Star badge */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        backgroundColor: "rgba(255,255,255,0.95)",
                        borderRadius: "20px",
                        px: 1.5,
                        py: 0.4,
                      }}
                    >
                      <StarIcon sx={{ fontSize: 13, color: "#FFB800" }} />
                      <Typography sx={{ fontSize: "11px", fontWeight: 700, color: "#18191F" }}>Editor's Pick</Typography>
                    </Box>
                    {/* Bottom text on image */}
                    <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, p: 3 }}>
                      <Typography
                        sx={{ fontWeight: 800, fontSize: { xs: "18px", md: "24px" }, color: "#fff", lineHeight: 1.3, mb: 1 }}
                      >
                        {featured.title}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar sx={{ width: 28, height: 28, backgroundColor: featured.authorColor, fontSize: "11px", fontWeight: 700 }}>
                          {featured.authorInitials}
                        </Avatar>
                        <Typography sx={{ fontSize: "12px", color: "rgba(255,255,255,0.85)" }}>
                          {featured.author} · {featured.date}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.4, ml: "auto" }}>
                          <AccessTimeIcon sx={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }} />
                          <Typography sx={{ fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>{featured.readTime}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <CardContent sx={{ px: 3, py: 2.5 }}>
                    <Typography sx={{ fontSize: "14px", color: "#6C7281", lineHeight: 1.7, mb: 2 }}>
                      {featured.excerpt}
                    </Typography>
                    <Button
                      variant="contained"
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        backgroundColor: "#4CAF4F",
                        color: "#fff",
                        borderRadius: "8px",
                        px: 3,
                        py: 1,
                        textTransform: "none",
                        fontWeight: 700,
                        fontSize: "14px",
                        boxShadow: "none",
                        "&:hover": { backgroundColor: "#43a047", boxShadow: "0 4px 16px rgba(76,175,79,0.3)" },
                      }}
                    >
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            )}

            {/* Posts Grid */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <TrendingUpIcon sx={{ color: "#4CAF4F", fontSize: 18 }} />
              <Typography sx={{ fontWeight: 700, fontSize: "13px", color: "#18191F", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {search || selectedCategory !== "All" ? `Results (${filteredPosts.length})` : "Latest Articles"}
              </Typography>
            </Box>

            {filteredPosts.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 10 }}>
                <Typography sx={{ fontSize: "40px", mb: 2 }}>🔍</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: "18px", color: "#18191F", mb: 1 }}>No articles found</Typography>
                <Typography sx={{ color: "#6C7281", fontSize: "14px" }}>Try a different search term or category.</Typography>
                <Button onClick={() => { setSearch(""); setSelectedCategory("All"); }} sx={{ mt: 2, color: "#4CAF4F", textTransform: "none", fontWeight: 600 }}>
                  Clear filters
                </Button>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {filteredPosts.map((post: Post, i: number) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Card
                      elevation={0}
                      sx={{
                        height: "100%",
                        borderRadius: "16px",
                        border: "1.5px solid #F0F0F0",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        transition: "all 0.25s ease",
                        "&:hover": {
                          borderColor: "#4CAF4F",
                          boxShadow: "0 10px 32px rgba(76,175,79,0.1)",
                          transform: "translateY(-4px)",
                          "& .post-img": { transform: "scale(1.04)" },
                        },
                      }}
                    >
                      {/* Image */}
                      <Box sx={{ overflow: "hidden", position: "relative", height: 180 }}>
                        <CardMedia
                          component="img"
                          image={post.image}
                          alt={post.title}
                          className="post-img"
                          sx={{ height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                        />
                        {/* Tag */}
                        <Chip
                          label={post.tag}
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            backgroundColor: tagColors[post.tag]?.bg || "#F5F5F5",
                            color: tagColors[post.tag]?.color || "#333",
                            fontWeight: 700,
                            fontSize: "10px",
                          }}
                        />
                        {/* Bookmark */}
                        <Box
                          onClick={() => toggleBookmark(i)}
                          sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            width: 32,
                            height: 32,
                            borderRadius: "8px",
                            backgroundColor: "rgba(255,255,255,0.92)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            "&:hover": { backgroundColor: "#fff", transform: "scale(1.1)" },
                          }}
                        >
                          {bookmarked.includes(i)
                            ? <BookmarkIcon sx={{ fontSize: 16, color: "#4CAF4F" }} />
                            : <BookmarkBorderIcon sx={{ fontSize: 16, color: "#6C7281" }} />
                          }
                        </Box>
                      </Box>

                      <CardContent sx={{ p: 2.5, flex: 1, display: "flex", flexDirection: "column" }}>
                        <Typography sx={{ fontWeight: 700, fontSize: "15px", color: "#18191F", lineHeight: 1.4, mb: 1 }}>
                          {post.title}
                        </Typography>
                        <Typography sx={{ fontSize: "13px", color: "#6C7281", lineHeight: 1.65, mb: "auto" }}>
                          {post.excerpt}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Avatar sx={{ width: 26, height: 26, backgroundColor: post.authorColor, fontSize: "10px", fontWeight: 700 }}>
                              {post.authorInitials}
                            </Avatar>
                            <Box>
                              <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#18191F", lineHeight: 1.2 }}>{post.author}</Typography>
                              <Typography sx={{ fontSize: "10px", color: "#9CA3AF" }}>{post.date}</Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                            <AccessTimeIcon sx={{ fontSize: 12, color: "#9CA3AF" }} />
                            <Typography sx={{ fontSize: "11px", color: "#9CA3AF" }}>{post.readTime}</Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>

          {/* ── SIDEBAR ──────────────────────────────────────────────── */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: "sticky", top: 80, display: "flex", flexDirection: "column", gap: 3 }}>

              {/* Trending */}
              <Box
                sx={{
                  border: "1.5px solid #F0F0F0",
                  borderRadius: "18px",
                  p: 3,
                  backgroundColor: "#FAFAFA",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                  <LocalFireDepartmentIcon sx={{ color: "#FF6B35", fontSize: 18 }} />
                  <Typography sx={{ fontWeight: 800, fontSize: "14px", color: "#18191F" }}>
                    Trending Now
                  </Typography>
                </Box>
                {trending.map((post: Post, i: number) => (
                  <Box key={i}>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start", py: 1.5, cursor: "pointer",
                      "&:hover .trend-title": { color: "#4CAF4F" } }}>
                      <Typography sx={{ fontWeight: 800, fontSize: "28px", color: "#F0F0F0", lineHeight: 1, minWidth: 30 }}>
                        {String(i + 1).padStart(2, "0")}
                      </Typography>
                      <Box>
                        <Typography className="trend-title" sx={{ fontWeight: 700, fontSize: "13px", color: "#18191F", lineHeight: 1.4, mb: 0.5, transition: "color 0.2s" }}>
                          {post.title}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <AccessTimeIcon sx={{ fontSize: 11, color: "#9CA3AF" }} />
                          <Typography sx={{ fontSize: "11px", color: "#9CA3AF" }}>{post.readTime}</Typography>
                        </Box>
                      </Box>
                    </Box>
                    {i < 2 && <Divider />}
                  </Box>
                ))}
              </Box>

              {/* Newsletter */}
              <Box
                sx={{
                  background: "linear-gradient(145deg, #18191F 0%, #2a2b33 100%)",
                  borderRadius: "18px",
                  p: 3,
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(76,175,79,0.2) 0%, transparent 70%)",
                    top: -60,
                    right: -60,
                    pointerEvents: "none",
                  },
                }}
              >
                <EmailOutlinedIcon sx={{ fontSize: 28, color: "#4CAF4F", mb: 1.5 }} />
                <Typography sx={{ fontWeight: 800, fontSize: "16px", color: "#fff", mb: 1 }}>
                  Get articles in your inbox
                </Typography>
                <Typography sx={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", mb: 2.5, lineHeight: 1.6 }}>
                  Join 5,000+ readers. No spam — unsubscribe anytime.
                </Typography>

                {subscribed ? (
                  <Box sx={{ backgroundColor: "rgba(76,175,79,0.15)", borderRadius: "10px", p: 2, textAlign: "center" }}>
                    <Typography sx={{ fontSize: "13px", color: "#4CAF4F", fontWeight: 700 }}>
                      🎉 You're subscribed!
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    <TextField
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      size="small"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "rgba(255,255,255,0.08)",
                          borderRadius: "10px",
                          fontSize: "13px",
                          color: "#fff",
                          "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                          "&:hover fieldset": { borderColor: "rgba(76,175,79,0.5)" },
                          "&.Mui-focused fieldset": { borderColor: "#4CAF4F" },
                          "& input::placeholder": { color: "rgba(255,255,255,0.4)", opacity: 1 },
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlinedIcon sx={{ fontSize: 16, color: "rgba(255,255,255,0.4)" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button
  fullWidth
  onClick={handleNewsletterSubmit}
  sx={{
    backgroundColor: "#4CAF4F",
    color: "#fff",
    borderRadius: "10px",
    py: 1.1,
    textTransform: "none",
    fontWeight: 700,
    fontSize: "14px",
    boxShadow: "0 4px 16px rgba(76,175,79,0.3)",
    "&:hover": { backgroundColor: "#43a047" },
  }}
>
  Subscribe
</Button>
                  </Box>
                )}
              </Box>

              {/* Tags cloud */}
              <Box sx={{ border: "1.5px solid #F0F0F0", borderRadius: "18px", p: 3, backgroundColor: "#FAFAFA" }}>
                <Typography sx={{ fontWeight: 800, fontSize: "14px", color: "#18191F", mb: 2 }}>
                  Browse Topics
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {categories.filter((c: string) => c !== "All").map((cat: string) => (
                    <Chip
                      key={cat}
                      label={cat}
                      onClick={() => setSelectedCategory(cat)}
                      sx={{
                        borderRadius: "8px",
                        fontSize: "12px",
                        height: 30,
                        fontWeight: 600,
                        backgroundColor: tagColors[cat]?.bg || "#F5F5F5",
                        color: tagColors[cat]?.color || "#333",
                        cursor: "pointer",
                        border: selectedCategory === cat ? `1.5px solid ${tagColors[cat]?.color || "#333"}` : "1.5px solid transparent",
                        "&:hover": { opacity: 0.85 },
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Bookmarks counter */}
              {bookmarked.length > 0 && (
                <Box
                  sx={{
                    border: "1.5px solid rgba(76,175,79,0.3)",
                    borderRadius: "18px",
                    p: 3,
                    backgroundColor: "rgba(76,175,79,0.05)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <BookmarkIcon sx={{ color: "#4CAF4F", fontSize: 22 }} />
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: "14px", color: "#18191F" }}>
                      {bookmarked.length} article{bookmarked.length > 1 ? "s" : ""} saved
                    </Typography>
                    <Typography sx={{ fontSize: "12px", color: "#6C7281" }}>
                      Bookmarks are stored locally
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>

        </Grid>
      </Container>

      {/* ── NEWSLETTER BANNER ────────────────────────────────────────── */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #4CAF4F 0%, #43a047 100%)",
          py: { xs: 8, md: 10 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.06)",
            top: -200,
            left: -100,
          },
        }}
      >
        <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
          <Typography sx={{ fontWeight: 800, fontSize: { xs: "26px", md: "36px" }, color: "#fff", letterSpacing: "-0.5px", mb: 1.5 }}>
            Never miss an article
          </Typography>
          <Typography sx={{ fontSize: "15px", color: "rgba(255,255,255,0.8)", mb: 4 }}>
            Get the best content delivered straight to your inbox, every week.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#4CAF4F",
              borderRadius: "10px",
              px: 5,
              py: 1.5,
              textTransform: "none",
              fontWeight: 800,
              fontSize: "15px",
              boxShadow: "none",
              "&:hover": { backgroundColor: "#F1F8F1" },
            }}
          >
            Subscribe for Free
          </Button>
        </Container>
      </Box>

      <Snackbar
  open={toast.open}
  autoHideDuration={3000}
  onClose={() => setToast({ ...toast, open: false })}
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
>
  <Alert
    onClose={() => setToast({ ...toast, open: false })}
    severity={toast.severity}
    variant="filled"
    sx={{ width: "100%" }}
  >
    {toast.message}
  </Alert>
</Snackbar>

    </Box>
  );
};

export default Blog;