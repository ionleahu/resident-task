import React from "react";
import { Box, IconButton } from "@material-ui/core";
import { useStyles } from "./styles";

export const OptionItem = ({
  deleteAction,
  title,
  className = "",
  isActive,
  ...rest
}) => {
  const { optionStyles, activeOption, deleteBtn } = useStyles();
  return (
    <div
      className={`${isActive ? activeOption : optionStyles} ${className}`}
      {...rest}
    >
      <Box display="flex" alignItems="center">
        {title}
        {deleteAction && (
          <IconButton onClick={deleteAction} size="small" className={deleteBtn}>
            x
          </IconButton>
        )}
      </Box>
    </div>
  );
};
