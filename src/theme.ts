import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(30, 215, 96)',
    },
    secondary: {
      main: 'rgb(41, 65, 171)',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontFamily: "Spotify Circular Black",
      color: "rgb(30, 215, 96)"
    },
    h2: {
      fontSize: '2rem',
      fontFamily: "Spotify Circular Bold",
      color: "rgb(30, 215, 96)"
    },
    h3: {
      fontSize: '1.2rem',
      fontFamily: "Spotify Circular Bold",
      color: "rgb(30, 215, 96)"
    },
    caption: {
      fontSize: '1rem',
      fontFamily: "Spotify Circular Book",
      color: "rgb(30, 215, 96)"
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true
      },
      styleOverrides: {
        text: {
          fontFamily: "Spotify Circular Bold",
          fontSize: "1rem",
          color: "white",
          textTransform: "none",
        },
        root: {
          borderRadius: "50px",
          padding: "0.5rem 2rem",
          backgroundColor: "rgb(30, 215, 96)",
          '&:hover': {
            backgroundColor: "rgb(45, 230, 111)",
          },
          disabled: {
            backgroundColor: "#333",
            color: "#111",
          },
        },
      }
    }
  }
});

export default theme;
