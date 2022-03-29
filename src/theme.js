import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1882ff',
    },
    primaryDark: {
      backgroundColor:'#235FD8',
      color: '#fff',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    textNormal: {
      textTransfrom: 'initial',
    }
  },
});

export default theme;