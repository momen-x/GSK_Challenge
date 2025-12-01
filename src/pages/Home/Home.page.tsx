import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Chip,
  Stack,
  Paper,
} from "@mui/material";
import { Email, GitHub, LinkedIn, Phone, Code } from "@mui/icons-material";
const Home = () => {
  return (
    <Box>
      <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
        <Container maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              bgcolor: "white",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid>
                <Typography
                  variant="h3"
                  component="h1"
                  gutterBottom
                  fontWeight="bold"
                >
                  Hi, I'm Mo'men
                </Typography>

                <Typography variant="h5" color="primary" gutterBottom>
                  <Code sx={{ mr: 1, verticalAlign: "middle" }} />
                  Front End Developer | React Js , Next JS and Angular
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ mb: 3 }}
                >
                  <Chip
                    icon={<Email />}
                    label="moamenalswafiri@gmail.com"
                    variant="outlined"
                  />
                  <Chip
                    icon={<Phone />}
                    label="+972598817322"
                    variant="outlined"
                  />
                </Stack>

                {/* Social Links */}
                <Stack direction="row" spacing={2}>
                  <IconButton
                    color="primary"
                    href="https://github.com/yourusernamehttps://github.com/momen-x"
                    target="_blank"
                    sx={{
                      bgcolor: "primary.light",
                      "&:hover": { bgcolor: "primary.main", color: "white" },
                    }}
                  >
                    <GitHub />
                  </IconButton>
                  <IconButton
                    color="primary"
                    href="https://www.linkedin.com/in/mo%E2%80%99men-alswafiri-8b6491346?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                    target="_blank"
                    sx={{
                      bgcolor: "primary.light",
                      "&:hover": { bgcolor: "primary.main", color: "white" },
                    }}
                  >
                    <LinkedIn />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};
export default Home;
