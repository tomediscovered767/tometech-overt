import React from 'react';
import { styled, keyframes } from '@mui/system';



const GradientBackground = props => {

  const defaults = {
    color1: "#D4F0F7",
    color2: "#B399D4"
  };

  const gradientMove = keyframes`
    0%   { background-position: 0% 50%;   },
    50%  { background-position: 50% 100%; },
    100% { background-position: 0% 50%;   } `;

  const BG = styled('div')({
    position: "fixed",
    zIndex: -10,
    background: `linear-gradient(-45deg,
      ${props.color1 ? props.color1 : defaults.color1},
      ${props.color2 ? props.color2 : defaults.color2},
      ${props.color3 ? props.color3 : defaults.color1},
      ${props.color4 ? props.color4 : defaults.color2})`,
  	backgroundSize: "300% 300%",
    width: "100%",
    height: "100%",
    animation: `${gradientMove} 25s infinite ease`
  });

  return ( <BG/> );
};

export default GradientBackground;
