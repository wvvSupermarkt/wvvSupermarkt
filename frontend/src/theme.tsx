import { createMuiTheme } from '@material-ui/core/styles';

// declare module '@material-ui/core/styles/createMuiTheme' {
//   interface Theme {
//     thirdiary: {
//       danger: string;
//     };
//   }
//   interface ThemeOptions {
//     status?: {
//       danger?: string;
//     };
//   }
// }

// Create a theme instance.
const theme = createMuiTheme({
  spacing: 8,
  palette: {
    primary: {
      light: '#00e1ff',
      main: '#2294f2',
      A100: '#2ca3f5',
      A200: '#2fb3eb',
      A400: '#21cbf3',
      A700: '#00e1ff'
    },
    secondary: {
      light: '#ff6f8c',
      main: '#e53b63',
      A100: '#f33662',
      A200: '#fc3e6b',
      A400: '#fe567a',
      A700: '#ff6f8c',
    },
    contrastThreshold: 3, 
    tonalOffset: 0.2,
    background: {
      default: '#fff',
    },
  },
});

export default theme;
