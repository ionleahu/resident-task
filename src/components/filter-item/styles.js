import { makeStyles } from "@material-ui/core";

const commonFilter = {
  padding: "5px 10px",
  border: "1px solid",
  cursor: "pointer",
  textAlign: "center",
};

export const useStyles = makeStyles({
  filterStyles: {
    ...commonFilter,
    borderColor: "lightgray",
  },
  activeFilter: {
    ...commonFilter,
    borderColor: "red",
  },
  title: {
    textTransform: "capitalize",
  },
  popoverContainer: {
    padding: 15,
    maxWidth: 221,
  },
  optionStyles: {
    cursor: "pointer",
  },

  buttonStyles: {
    textTransform: "none",
  },
});
