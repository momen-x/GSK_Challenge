
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import Loading from "./userExperiance/Loading";
import { useEpisodes } from "../hooks/useCharacters";



const ListOfThEepisodesSharedByCharactters = ({
  episode,
}: {
  episode: string[];
}) => {

  const { data: episodes, isLoading: loadingEpisodes } = useEpisodes(
    episode || []
  );
  if (loadingEpisodes) {
    return <Loading />;
  }


  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Episodes Appeared In ({episode.length})
      </Typography>

      {episodes && episodes.length > 0 ? (
        <Paper
          variant="outlined"
          sx={{ maxHeight: 400, overflow: "auto", mt: 2 }}
        >
          <List>
            {episodes.map((episode, index) => (
              <ListItem
                key={episode.id}
                divider={index < episodes.length - 1}
                sx={{
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" fontWeight="medium">
                      {episode.episode} - {episode.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      Air Date: {episode.air_date}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        <Typography color="text.secondary">
          No episode information available
        </Typography>
      )}
    </Box>
  );
};
export default ListOfThEepisodesSharedByCharactters;
