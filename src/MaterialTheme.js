import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#dc143c",
      dark: "#002884",
      contrastText: "#fff",
    },
    red: {
      light: "#ff7961",
      main: "#FF0000",
      dark: "#ba000d",
      contrastText: "#000",
    },
    orange: {
      light: "#ff7961",
      main: "#FFA500",
      dark: "#ba000d",
      contrastText: "#000",
    },
    hijau: {
      light: "#ff7961",
      main: "#2E8B57",
      dark: "#ba000d",
      contrastText: "#000",
    },
    putih: {
      light: "#ff7961",
      main: "	#F0FFFF",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },

  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h2",
          h2: "h2",
          h3: "h2",
          h4: "h2",
          h5: "h2",
          h6: "h2",
          subtitle1: "h2",
          subtitle2: "h2",
          body1: "span",
          body2: "span",
        },
      },
    },
  },
});

export default Theme;
