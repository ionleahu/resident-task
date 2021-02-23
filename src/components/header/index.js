import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useStyles } from "./styles";

export const Header = () => {
  const { logoImg } = useStyles();
  return (
    <Box
      display="flex"
      alignItems="center"
      marginTop="10px"
      marginBottom="15px"
    >
      <div className={logoImg} />
      <Typography variant="h5"> Logo</Typography>
    </Box>
  );
};
