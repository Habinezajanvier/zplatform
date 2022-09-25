import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f1f1f1",
    },
    secondary: {
      main: "#0389FF",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Alef",
      textTransform: "none",
    },
  },
});

export default theme;
