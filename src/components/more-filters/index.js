import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Popover,
  Box,
  Grid,
  Button,
} from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";

import { useStyles } from "./styles";
import { OptionItem } from "../option-item";

export const MoreFilters = ({
  filters,
  selectedFilters,
  handleSelectedFilters,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeAccordeons, handleActiveAccordeons] = useState([]);
  const {
    filterStyles,
    title,
    activeFilter,
    popoverContainer,
    optionStyles,
    buttonStyles,
  } = useStyles();

  const [selected, handleSelected] = useState({});

  useEffect(() => {
    if (selectedFilters) {
      handleSelected(selectedFilters);
    } else {
      handleSelected({});
    }
  }, [selectedFilters]);

  const toggleAccordeon = (name) => {
    if (activeAccordeons.includes(name)) {
      handleActiveAccordeons((state) =>
        state.filter((filter) => filter !== name)
      );
    } else {
      handleActiveAccordeons((state) => [...state, name]);
    }
  };

  const selectedFiltersCount = useMemo(
    () =>
      Object.keys(selectedFilters || {}).reduce(
        (acc, key) => acc + (selectedFilters[key]?.length || 0),
        0
      ),
    [selectedFilters]
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    handleSelected({});
  };

  const isOptionSelected = ({ key, id }) =>
    selected[key]?.findIndex((option) => option.id === id) > -1;

  const handleOption = (key, option) => {
    const isSelected = isOptionSelected({ key, id: option.id });
    if (isSelected) {
      handleSelected((state) => ({
        ...state,
        [key]: state[key]?.filter((item) => item.id !== option.id),
      }));
    } else {
      handleSelected((state) => ({
        ...state,
        [key]: [...(state[key] || []), option],
      }));
    }
  };

  const applyFilters = () => {
    handleSelectedFilters((state) => ({ ...state, ...selected }));
    setAnchorEl(null);
    handleActiveAccordeons([]);
  };

  const cancel = (key) => {
    setAnchorEl(null);
    handleSelected((state) => ({ ...state, [key]: [] }));
    handleSelectedFilters((state) => ({ ...state, [key]: [] }));
    handleActiveAccordeons([]);
  };

  const isActive = Boolean(anchorEl) || Boolean(selectedFiltersCount);

  return (
    <>
      <div
        className={isActive ? activeFilter : filterStyles}
        onClick={handleClick}
      >
        <div className={title}>
          More
          {Boolean(selectedFiltersCount) && ` (${selectedFiltersCount})`}
        </div>
      </div>
      <Popover
        classes={{ paper: popoverContainer }}
        id="more"
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
          {filters.map((filter) => (
            <Accordion
              key={filter.name}
              onChange={() => toggleAccordeon(filter.name)}
            >
              <AccordionSummary
                expandIcon={
                  activeAccordeons.indexOf(filter.name) > -1 ? "-" : "+"
                }
              >
                <div className={title}>
                  {filter.name}
                  {selectedFilters[filter.name]?.length > 0 &&
                    ` (${selectedFilters[filter.name]?.length})`}
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex" flexDirection="column">
                  <Grid container spacing={1} wrap="wrap">
                    {filter?.options.map((option) => (
                      <Grid item xs="auto" key={option.id}>
                        <OptionItem
                          onClick={() => handleOption(filter.name, option)}
                          className={optionStyles}
                          title={option.title}
                          isActive={isOptionSelected({
                            key: filter.name,
                            id: option.id,
                          })}
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
                      {Boolean(selected[filter.name]?.length) && (
                        <Button
                          variant="outlined"
                          className={buttonStyles}
                          onClick={() => cancel(filter.name)}
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
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Popover>
    </>
  );
};
