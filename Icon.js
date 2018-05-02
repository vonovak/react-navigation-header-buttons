/*
* @flow
*/
import React from 'react';

let MaterialIcons;

try {
  // Optionally require vector-icons
  MaterialIcons = require('react-native-vector-icons/MaterialIcons').default;
} catch (e) {
  MaterialIcons = ({ name, color, size, style, ...rest }) => {
    // eslint-disable-next-line no-console
    console.warn(
      `Tried to use the icon '${name}' in a component from 'react-navigation-header-buttons', but 'react-native-vector-icons' is not installed. To remove this warning, install 'react-native-vector-icons'.`
    );

    return (
      <Text {...rest} style={[{ color, fontSize: size }, style]}>
        □
      </Text>
    );
  };
}

type Props = {
  name: string,
  color: string,
  size: number,
  style: Object,
};
const Icon = ({ name, color, size, style, ...rest }: Props) => {
  return (
    <MaterialIcons
      {...rest}
      name={name}
      color={color}
      size={size}
      style={style}
    />
  );
};

export default Icon;
