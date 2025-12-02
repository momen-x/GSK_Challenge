import { Box, TextField, Typography } from "@mui/material";
import CharactersList from "../../Components/CharactersList";
import { useState } from "react";

const Characters = () => {
  const [searchAboutCharacter, setSearchAboutCharacter] = useState<string>("");

  return (
    <Box>
      <h1>Our distinctive characters </h1>
      <Box
        sx={{
          width: "100vw",
          margin: "10px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Search 🔍 for characters"
          sx={{ width: "80%" }}
          id="standard-size-normal"
          value={searchAboutCharacter}
          onChange={(e) => setSearchAboutCharacter(e.target.value)}
          variant="filled"
        />
      </Box>

      <div>
        {searchAboutCharacter.length > 0 && (
          <Typography> the result of {searchAboutCharacter}</Typography>
        )}
        <CharactersList
          searchAboutCharacter={searchAboutCharacter}
          setSearchAboutCharacter={setSearchAboutCharacter}
        />
      </div>
    </Box>
  );
};

export default Characters;
