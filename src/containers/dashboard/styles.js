import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(({ breakpoints: { down } }) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    padding: "0 10px",
    height: "100vh",
  },
  buttonStyles: {
    textTransform: "none",
    borderRadius: 0,
  },
  title: {
    whiteSpace: "nowrap",
  },
  selectedFiltersContainer: {
    margin: "0 50px",
    display: "flex",
    alignItems: "center",
    flex: 1,
    [down("xs")]: {
      margin: "10px",
    },
  },
}));
