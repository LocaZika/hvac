'use client'
import { createTheme } from "@mui/material"

declare module '@mui/material/styles'{
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

export const themeConfig = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
        fixed: true,
      },
      styleOverrides: {
        maxWidthSm: {
          maxWidth: 540,
        },
        maxWidthMd: {
          maxWidth: 720,
        },
        maxWidthLg: {
          maxWidth: 960,
        },
        maxWidthXl: {
          maxWidth: 1170,
        },
      },
    },
  },
});