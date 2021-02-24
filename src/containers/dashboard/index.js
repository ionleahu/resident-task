import React, { useMemo, useState } from "react";
import { Box, Button, Grid, Typography } from "@material-ui/core";

import { Header, Filters, OptionItem } from "../../components";
import { useStyles } from "./styles";

export const Dashboard = () => {
  const [selectedFilters, handleSelectedFilters] = useState({});
  const {
    container,
    buttonStyles,
    title,
    selectedFiltersContainer,
  } = useStyles();

  const activeHaveFilters = useMemo(
    () =>
      Object.keys(selectedFilters).reduce(
        (acc, key) => acc || Boolean(selectedFilters[key]?.length),
        false
      ),
    [selectedFilters]
  );

  const deleteFilter = ({ key, id }) => {
    handleSelectedFilters((state) => ({
      ...state,
      [key]: state[key].filter((filter) => filter.id !== id),
    }));
  };

  const clearAll = () => {
    handleSelectedFilters({});
  };

  return (
    <div className={container}>
      <Header />
      <Filters
        selectedFilters={selectedFilters}
        handleSelectedFilters={handleSelectedFilters}
      />
      <Box className={selectedFiltersContainer}>
        <Grid container spacing={1} wrap="wrap">
          <Typography variant="h5" className={title}>
            Applied Filters:&nbsp;
          </Typography>
          {activeHaveFilters ? (
            <>
              {Object.keys(selectedFilters).map((key) => (
                <React.Fragment key={key}>
                  {selectedFilters[key].map(({ id, title }) => (
                    <Grid item>
                      <OptionItem
                        title={title}
                        deleteAction={() => deleteFilter({ key, id })}
                      />
                    </Grid>
                  ))}
                </React.Fragment>
              ))}
              <Grid item>
                <Button
                  variant="outlined"
                  size="small"
                  className={buttonStyles}
                  onClick={clearAll}
                >
                  Clear All
                </Button>
              </Grid>
            </>
          ) : (
            <Typography variant="h5">-none-</Typography>
          )}
        </Grid>
      </Box>
    </div>
  );
};
