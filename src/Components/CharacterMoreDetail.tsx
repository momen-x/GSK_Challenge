import Loading from "./userExperiance/Loading";
import Error from "./userExperiance/Err";
import ListOfThEepisodesSharedByCharactters from "./ListOfThEepisodesSharedByCharactters";
import { useCharacter } from "../hooks/useCharacters";
//Design Library
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Chip,
  Button,
  Divider,
  Paper,
  Stack,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
//Extra library
import { useParams, useNavigate } from "react-router-dom";

const CharacterMoreDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: character, isLoading, error } = useCharacter(id);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !character) {
    return (
      <Error
        error={
          error && error.message === "Request failed with status code 404"
            ? "this character doesn't exist"
            : "some thing went wrong"
        }
      />
    );
  }

  if (!character) {
    return <Error error={"Character not found"} />;
  }

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back to Characters
      </Button>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={4}>
          {/* Character Image */}
          <Grid>
            <Avatar
              src={character.image}
              alt={character.name}
              sx={{
                width: "100%",
                height: "auto",
                aspectRatio: "1/1",
                borderRadius: 2,
              }}
            />
          </Grid>

          {/* Character Details */}
          <Grid>
            {/* Name and Status */}
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <Typography variant="h3" component="h1">
                {character.name}
              </Typography>
              <Chip
                label={character.status}
                color={
                  character.status === "Alive"
                    ? "success"
                    : character.status === "Dead"
                    ? "error"
                    : "default"
                }
              />
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Basic Info Grid */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid>
                <Typography variant="subtitle2" color="text.secondary">
                  Species
                </Typography>
                <Typography variant="body1">{character.species}</Typography>
              </Grid>
              <Grid>
                <Typography variant="subtitle2" color="text.secondary">
                  Gender
                </Typography>
                <Typography variant="body1">{character.gender}</Typography>
              </Grid>
              {character.type && (
                <Grid>
                  <Typography variant="subtitle2" color="text.secondary">
                    Type
                  </Typography>
                  <Typography variant="body1">{character.type}</Typography>
                </Grid>
              )}
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Origin and Location */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid>
                <Typography variant="subtitle2" color="text.secondary">
                  Origin
                </Typography>
                <Typography variant="body1">{character.origin.name}</Typography>
              </Grid>
              <Grid>
                <Typography variant="subtitle2" color="text.secondary">
                  Current Location
                </Typography>
                <Typography variant="body1">
                  {character.location.name}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Additional Info */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Additional Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Character ID: {character.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Created: {new Date(character.created).toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Episodes Section */}
        <Divider sx={{ my: 4 }} />
        <ListOfThEepisodesSharedByCharactters episode={character.episode} />
      </Paper>
    </Box>
  );
};

export default CharacterMoreDetail;
