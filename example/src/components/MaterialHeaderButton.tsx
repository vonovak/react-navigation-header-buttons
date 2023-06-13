import {
  defaultRenderVisibleButton,
  HeaderButton,
  HeaderButtonsComponentType,
} from 'react-navigation-header-buttons';
import * as React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export const MaterialHeaderButton: HeaderButtonsComponentType = (props) => {
  // the `props` here come from <Item ... />
  // you may access them and pass something else to `HeaderButton` if you like
  return (
    <HeaderButton
      // the usual way to render:
      // IconComponent={MaterialIcons}
      // iconSize={23}
      // you can customize the colors, by default colors from React navigation theme will be used
      // pressColor="blue"
      {...props}
      // alternative way to customize what is rendered:
      renderButton={(itemProps) => {
        // access anything that was defined on <Item ... />
        const { color, iconName } = itemProps;

        return iconName ? (
          <MaterialIcons
            // @ts-expect-error typings for MaterialIcons are stricter than ours
            name={iconName}
            color={color}
            size={23}
          />
        ) : (
          // will render text with default styles
          defaultRenderVisibleButton(itemProps)
        );
      }}
    />
  );
};
