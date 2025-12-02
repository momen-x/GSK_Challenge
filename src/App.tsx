import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Home from "./pages/Home/Home.page";
import Characters from "./pages/Characters_Page/Characters.Page";
import Page404 from "./pages/404Page/404page";
import CharactersDetails from "./pages/Character_Details/Character_Details.page";
import Headder from "./Components/shared/Header/Header";
import Footer from "./Components/shared/Footer/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 2* 60 * 1000,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Box>
        <Headder />
        <Routes>
          <Route path="" Component={Home} />
          <Route path="/home" Component={Home} />
          <Route path="/characters" Component={Characters} />
          <Route path="/characters/:id" Component={CharactersDetails} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
      </Box>
      {/* to do remove the next line in production mode  */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
