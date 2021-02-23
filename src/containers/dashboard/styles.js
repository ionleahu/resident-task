import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    padding: "0 15px",
    height: "100vh",
  },
  buttonStyles: {
    textTransform: "none",
    borderRadius: 0,
  },
  title: {
    whiteSpace: "nowrap",
  },
});
