import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Error = ({ error }: { error: any }) => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" p={4}>
      <Typography color="error" variant="h6">
        {error || "Character not found"}
      </Typography>
      <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
        Go Back
      </Button>
      <Button variant="outlined" onClick={() => navigate("/home")} sx={{ mt: 2,mx:2 }}  >
        Home Page
      </Button>
    </Box>
  );
};

export default Error;
