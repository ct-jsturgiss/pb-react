import { generateColors } from "@mantine/colors-generator";
import type { MantineThemeOverride } from "@mantine/core";

export const themeOptions: MantineThemeOverride = {
  // palette: {
  //   mode: 'light',
  //   primary: {
  //     main: '#ED2426',
  //   },
  //   secondary: {
  //     main: '#4e8094',
  //   },
  //   warning: {
  //     main: '#ffc400',
  //   },
  // },
  spacing: {
    xs: "0.625rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "2rem"
  },
  colors: {
    "red": generateColors("#ED2426"),
  },
  primaryColor: "red",
  fontFamily: 'Montserrat',
};