import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const themes = () => {
  const main = createTheme({
    palette: {
      gradients: {
        color1: "#000",
        color2: "#FFF",
        color3: "#EEE",
        color4: "#000"
      }
    }
  });

  const light = () => {

  };
 
  const dark = () => {

  };

  return { main, light, dark }
};

export default themes;
