import { Box, Container, Typography, Link } from "@mui/material";
import data from "../data/blogSections.json";

import Blog1 from "../../public/images/blog/blog.png";
import Blog2 from "../../public/images/blog/blog1.png";
import Blog3 from "../../public/images/blog/blog2.png";

const imageMap: any = {
    "blog1.jpg": Blog1,
    "blog2.jpg": Blog2,
    "blog3.jpg": Blog3
};

const BlogSection = () => {
    return (
        <Box sx={{ py: 10, backgroundColor: "#fff" }}>
            <Container maxWidth="lg">

                {/* Heading */}
                <Box textAlign="center" sx={{ mb: 8 }}>
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                        {data.title}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ maxWidth: 650, mx: "auto" }}
                    >
                        {data.subtitle}
                    </Typography>
                </Box>

                {/* Cards */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "1fr 1fr",
                            md: "repeat(3, 1fr)"
                        },
                        gap: 4
                    }}
                >
                    {data.blogs.map((blog, index) => (
                        <Box key={index} sx={{ position: "relative" }}>

                            {/* Image */}
                            <Box
                                component="img"
                                src={imageMap[blog.image]}
                                alt={blog.title}
                                sx={{
                                    width: "100%",
                                    borderRadius: 3
                                }}
                            />

                            {/* Overlay Card */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: -30,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    width: "85%",
                                    backgroundColor: "#F5F7FA",
                                    p: 3,
                                    borderRadius: 3,
                                    textAlign: "center",
                                    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                                    border: "1px solid",
                                    borderColor: "grey.200"
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    fontWeight={600}
                                    sx={{ mb: 2 }}
                                >
                                    {blog.title}
                                </Typography>

                                <Link
                                    href="#"
                                    underline="none"
                                    sx={{
                                        color: "primary.main",
                                        fontWeight: 600,
                                        fontSize: 14
                                    }}
                                >
                                    Readmore →
                                </Link>
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* Extra spacing because overlay is absolute */}
                <Box sx={{ height: 40 }} />

            </Container>
        </Box>
    );
};

export default BlogSection;