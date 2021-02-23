import React, { useMemo } from "react";
import { Grid, useMediaQuery } from "@material-ui/core";

import { FilterItem } from "../filter-item";
import { useStyles } from "./styles";
import { filtersData } from "../../constants";
import { MoreFilters } from "../more-filters";

export const Filters = ({ selectedFilters, handleSelectedFilters }) => {
  const { container } = useStyles();
  const data = useMemo(
    () =>
      Object.keys(filtersData).reduce(
        (acc, key) => [...acc, { name: [key], options: filtersData[key] }],
        []
      ),
    []
  );

  const isXs = useMediaQuery(({ breakpoints: { down } }) => down("xs"));

  const items = useMemo(() => {
    if (isXs) {
      const newData = [...data];
      return newData.splice(0, 2);
    }
    return data;
  }, [isXs]);

  const moreItems = useMemo(() => {
    if (isXs) {
      const newData = [...data];
      return newData.splice(2);
    }
    return data;
  }, [isXs]);

  return (
    <Grid container spacing={1} className={container}>
      {items.map((filter) => (
        <Grid item xs={4} sm="auto" key={filter.name}>
          <FilterItem
            data={filter}
            initialSelected={selectedFilters[filter.name]}
            handleSelectedFilters={handleSelectedFilters}
          />
        </Grid>
      ))}
      {isXs && (
        <Grid item xs={4} sm="auto">
          <MoreFilters
            filters={moreItems}
            selectedFilters={selectedFilters}
            handleSelectedFilters={handleSelectedFilters}
          />
        </Grid>
      )}
    </Grid>
  );
};
