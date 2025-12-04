import { useEffect, useState } from "react";

import Loading from "./userExperiance/Loading";
import Error from "./userExperiance/Err";

// Design Library
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
  Button,
} from "@mui/material";
//Extra Library
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCharacters, useSearchCharacters } from "../hooks/useCharacters";

const CharactersList = ({
  searchAboutCharacter,
  setSearchAboutCharacter,
}: {
  searchAboutCharacter: string;
  setSearchAboutCharacter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  // const [listOfCharacters, setListOfCharacters] = useState<ICharacter[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const isSearching = searchAboutCharacter.length > 0;
  const charactersQuery = useCharacters(pageNumber);
  const searchQuery = useSearchCharacters(searchAboutCharacter);

  //to determine which query to use based on the search state (useCharacters or useSearchCharacters)
  const activeQuery = isSearching ? searchQuery : charactersQuery;
  const { data, isLoading, error } = activeQuery;

  const listOfCharacters = data?.results || [];
  const moreInfo = data?.info || { count: 0, next: null, pages: 0, prev: null };
  // const maxPage = moreInfo.pages => the first time = 0 ._, ;
  const maxPage = 42;// this value from responce => postman 
  
  
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
    setSearchParams({ page: String(pageNumber + 1) });
    scrollToTop();
    setSearchAboutCharacter("");
  };
  const handlePrev = () => {
    if (moreInfo.prev !== null) {
      setPageNumber((prev) => prev - 1);
      setSearchParams({ page: String(pageNumber - 1) });
    }
    setSearchAboutCharacter("");
    scrollToTop();
  };

  useEffect(() => {
    const pageParam = searchParams.get("page");

    if (!pageParam) {
      setSearchParams({ page: "1" });
      return;
    }

    const num = Number(pageParam);

    if (isNaN(num) || num < 1 || num > maxPage) {
      setSearchParams({ page: "1" });
      return;
    }

    if (num !== pageNumber) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPageNumber(num);
    }
  }, [searchParams]);

  if (isLoading) {
    return <Loading />;
  }
  if (error || !CharactersList) {
    return (
      <Error
        error={
          error && error.message === "Request failed with status code 404"
            ? "the character you are looking for doesn't exist, try again with another name"
            : "some thing went wrong"
        }
      />
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
