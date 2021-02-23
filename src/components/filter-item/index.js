import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Popover } from "@material-ui/core";

import { OptionItem } from "../option-item";
import { useStyles } from "./styles";

export const FilterItem = ({
  data,
  initialSelected,
  handleSelectedFilters,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    filterStyles,
    title,
    activeFilter,
    popoverContainer,
    optionStyles,
    buttonStyles,
  } = useStyles();

  const [selected, handleSelected] = useState([]);

  useEffect(() => {
    if (initialSelected) {
      handleSelected(initialSelected);
    } else {
      handleSelected([]);
    }
  }, [initialSelected]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    handleSelected([]);
  };

  const isOptionSelected = (id) =>
    selected.findIndex((option) => option.id === id) > -1;

  const handleOption = (option) => {
    const isSelected = isOptionSelected(option.id);
    if (isSelected) {
      handleSelected((state) => state.filter((item) => item.id !== option.id));
    } else {
      handleSelected((state) => [...state, option]);
    }
  };

  const applyFilters = () => {
    handleSelectedFilters((state) => ({ ...state, [data.name]: selected }));
    setAnchorEl(null);
  };

  const cancel = () => {
    setAnchorEl(null);
    handleSelected([]);
    handleSelectedFilters((state) => ({ ...state, [data.name]: [] }));
  };

  const isActive = Boolean(anchorEl) || Boolean(initialSelected?.length);

  return (
    <>
      <div
        className={isActive ? activeFilter : filterStyles}
        onClick={handleClick}
      >
        <div className={title}>
          {data.name}
          {Boolean(initialSelected?.length) && ` (${initialSelected.length})`}
        </div>
      </div>
      <Popover
        classes={{ paper: popoverContainer }}
        id={data.name}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box display="flex" flexDirection="column">
          <Grid container spacing={1} wrap>
            {data?.options.map((option) => (
              <Grid item xs="auto" key={option.id}>
                <OptionItem
                  onClick={() => handleOption(option)}
                  className={optionStyles}
                  title={option.title}
                  isActive={isOptionSelected(option.id)}
                />
              </Grid>
            ))}
          </Grid>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            marginTop="15px"
          >
            <div>
              {Boolean(selected.length) && (
                <Button
                  variant="outlined"
                  className={buttonStyles}
                  onClick={cancel}
                >
                  Cancel
                </Button>
              )}
            </div>
            <Button
              variant="outlined"
              className={buttonStyles}
              onClick={applyFilters}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};
