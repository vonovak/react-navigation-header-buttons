import { StatusBar } from 'react-native';

export const getDefaultSpaceAboveMenu = () => {
  // approximation, expo draws views right from below the display edge
  // which is a different behavior from vanilla RN
  return StatusBar.currentHeight + 3;
};
