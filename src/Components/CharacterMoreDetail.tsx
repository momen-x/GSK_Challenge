import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Chip,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import type { ICharacter } from "../Interface/interface";

const CharacterMoreDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<ICharacter>(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        setCharacter(data);
      } catch (err) {
        setError("Failed to load character details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCharacter();
    }
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !character) {
    return (
      <Box textAlign="center" p={4}>
        <Typography color="error" variant="h6">
          {error || "Character not found"}
        </Typography>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }
  //the design here by chatgpt
  return (
    <Box sx={{ maxWidth: 900, margin: "auto", p: { xs: 2, md: 4 } }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back to Characters
      </Button>

      <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Grid container>
          {/* Character Image */}
          <Grid>
            <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
              <Avatar
                src={character.image}
                alt={character.name}
                sx={{
                  width: 300,
                  height: 300,
                  borderRadius: 2,
                  border: "4px solid #f5f5f5",
                }}
                variant="rounded"
              />
            </Box>
          </Grid>

          {/* Character Details */}
          <Grid>
            <Box sx={{ p: 3 }}>
              {/* Name and Status */}
              <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                  {character.name}
                </Typography>
                <Chip
                  label={character.status}
                  color={
                    character.status === "Alive"
                      ? "success"
                      : character.status === "Dead"
                      ? "error"
                      : "warning"
                  }
                  size="medium"
                />
              </Stack>

              {/* Basic Info Grid */}
              <Grid container spacing={3} mb={3}>
                <Grid>
                  <Typography variant="subtitle2" color="text.secondary">
                    Species
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {character.species}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography variant="subtitle2" color="text.secondary">
                    Gender
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {character.gender}
                  </Typography>
                </Grid>
                {character.type && (
                  <Grid>
                    <Typography variant="subtitle2" color="text.secondary">
                      Type
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {character.type}
                    </Typography>
                  </Grid>
                )}
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Origin and Location */}
              <Grid container spacing={3} mb={3}>
                <Grid>
                  <Typography variant="subtitle2" color="text.secondary">
                    Origin
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {character.origin.name}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography variant="subtitle2" color="text.secondary">
                    Current Location
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {character.location.name}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Episodes */}
              <Box mb={3}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Episodes Appeared In
                </Typography>
                <Chip
                  label={`${character.episode.length} episodes`}
                  variant="outlined"
                  color="primary"
                />
                {character.episode.length > 0 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    First episode: {character.episode[0].split("/").pop()}
                  </Typography>
                )}
              </Box>

              {/* Additional Info */}
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Additional Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Character ID: {character.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Created: {new Date(character.created).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default CharacterMoreDetail;
