
import { Box , Typography } from '@mui/material';

import CharacterMoreDetail from "../../Components/CharacterMoreDetail";


const CharacterDetails = () => {


  return (
    <Box >
        <Typography sx={{ fontWeight:'pold',fontSize:'32px' }}>Know more about this Character : </Typography>
     <CharacterMoreDetail/>
    </Box>
  );
};

export default CharacterDetails;
