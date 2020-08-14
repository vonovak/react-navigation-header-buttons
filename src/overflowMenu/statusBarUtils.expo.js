import { StatusBar } from 'react-native';

export const getSpaceAboveMenu = () => {
  // approximation
  return StatusBar.currentHeight + 3;
};
