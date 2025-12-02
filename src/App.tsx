import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.page";
import Characters from "./pages/Characters_Page/Characters.Page";
import Page404 from "./pages/404Page/404page";
import CharactersDetails from "./pages/Character_Details/Character_Details.page";
import Headder from "./Components/shared/Header/Header";
import Footer from "./Components/shared/Footer/Footer";
import { useState } from "react";
import { pageNumberContext } from "./Context/PageNumber.context";

const App = () => {
  const [pageNumber, setPageNumber] = useState(1);
  return (
    <Box>
      <pageNumberContext.Provider value={{ pageNumber, setPageNumber }}>
      <Headder />
        <Routes>
          <Route path="" Component={Home} />
          <Route path="/home" Component={Home} />
          <Route
            path={`/characters`}
            Component={Characters}
          />
          {/* I have two options, display the details in dialog or in another page, I chose the second option._. */}{" "}
          <Route path="/characters/:id" Component={CharactersDetails} />
          <Route path="*" Component={Page404} />
        </Routes>
      </pageNumberContext.Provider>

      <Footer />
    </Box>
  );
};

export default App;
