import { useEffect, useState } from "react";
import type { ICharacter, ICharacterInfo } from "../Interface/interface";
// import { fetchCharacters } from "../API/getCharacters";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CharactersList = () => {
  const [listOfCharacters, setListOfCharacters] = useState<ICharacter[]>([]);
  const [moreInfo, setMoreInfo] = useState<ICharacterInfo>({
    count: 100,
    next: null,
    pages: 0,
    prev: null,
  });
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };

  const handleNext = () => {
    if (moreInfo.next !== null) {
      setPageNumber((prev) => prev + 1);
    }
    scrollToTop();
  };
  const handlePrev = () => {
    if (moreInfo.prev !== null) {
      setPageNumber((prev) => prev - 1);
    }
    scrollToTop();
  };

  useEffect(() => {
    // const getCharacters = async () => {
    //   try {
    //     const data = await fetchCharacters();
    //     setListOfCharacters(data?.results || []);
    //     setMoreInfo(
    //       data?.info || {
    //         count: 100,
    //         next: null,
    //         pages: 0,
    //         prev: null,
    //       }
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // getCharacters();
    const fetchCharacters = async () => {
      try {
        const response = await axios.get<{
          info: ICharacterInfo;
          results: ICharacter[];
        } | null>(
          `https://rickandmortyapi.com/api/character?page=${pageNumber}`
        );
        setListOfCharacters(response.data?.results || []);
        setMoreInfo(
          response.data?.info || {
            count: 100,
            next: null,
            pages: 0,
            prev: null,
          }
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCharacters();
  }, [pageNumber]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography>
        A family of {moreInfo.count} characters, each with a unique , different
        story.{" "}
      </Typography>
      <Grid container spacing={2}>
        {listOfCharacters.map((character) => (
          <Grid key={character.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                boxShadow: 1,
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-4px)",
                  transition: "all 0.3s ease-in-out",
                },
              }}
            >
              {/* Character Image */}
              <CardMedia
                component="img"
                height="200"
                image={character.image}
                alt={character.name}
                sx={{ objectFit: "cover" }}
              />

              {/* Character Name and Origin */}
              <CardHeader
                title={
                  <Typography variant="h6" component="div" noWrap>
                    {character.name}
                  </Typography>
                }
                subheader={
                  <Typography variant="body2" color="text.secondary">
                    {character.origin.name}
                  </Typography>
                }
              />

              {/* Character Details */}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Species:</strong> {character.species}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Status:</strong> {character.status}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Gender:</strong> {character.gender}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  height: "75px",
                  marginBottom: "5px",
                }}
              >
                <Button
                  variant={"contained"}
                  color="primary"
                  onClick={() => navigate(`/characters/${character.id}`)}
                >
                  more info !
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mt: 3,
        }}
      >
        <Button
          size="small"
          onClick={handlePrev}
          disabled={moreInfo.prev === null}
          sx={{ minWidth: 40 }}
          variant={moreInfo.prev === null ? "outlined" : "contained"}
        >
          ←
        </Button>

        <Typography variant="body1" fontWeight="medium">
          Page {pageNumber}
        </Typography>

        <Button
          size="small"
          onClick={handleNext}
          disabled={moreInfo.next === null}
          sx={{ minWidth: 40 }}
          variant={moreInfo.next === null ? "outlined" : "contained"}
        >
          →
        </Button>
      </Box>
    </Box>
  );
};

export default CharactersList;
