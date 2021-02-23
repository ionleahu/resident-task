import { makeStyles } from "@material-ui/core";

const commonOption = {
  padding: "5px 10px",
  border: "1px solid",
};

export const useStyles = makeStyles({
  optionStyles: {
    ...commonOption,
    borderColor: "lightgray",
  },
  activeOption: {
    ...commonOption,
    borderColor: "red",
  },
  deleteBtn: {
    height: 18,
    marginLeft: 10,
  },
});
