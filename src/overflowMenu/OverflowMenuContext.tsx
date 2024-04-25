import { createContext, useContext } from 'react';
import * as React from 'react';
import { Platform } from 'react-native';

export type PresentMenuParam = {
  elements: React.ReactNode;
  x: number;
  y: number;
};

export const OVERFLOW_TOP = 15;

const warn = () => {
  // the noop value will be replaced by HeaderButtonsProvider rendered in app root
  if (process.env.NODE_ENV !== 'production') {
    const message = Platform.select({
      android: ` - which is the default handler on android - but you forgot to wrap your root component in <HeaderButtonsProvider />. 
 Import it like this: "import {HeaderButtonsProvider} from 'react-navigation-header-buttons/HeaderButtonsProvider'.`,
      ios: `but you forgot to wrap your root component in <HeaderButtonsProviderDropdownMenu />. Import it like this: "import {HeaderButtonsProviderDropdownMenu} from 'react-navigation-header-buttons/HeaderButtonsProviderDropdownMenu'".`,
      default: `but you forgot to wrap your root component in <HeaderButtonsProvider />. 
Import it like this: "import {HeaderButtonsProvider} from 'react-navigation-header-buttons/HeaderButtonsProvider'.`,
    });
    console.warn(
      'It seems like you tried to open / close the overflow menu using the overflowMenuPressHandlerDropdownMenu, ' +
        message +
        '\nPlease check the installation instructions in the react-navigation-header-buttons readme :)'
    );
  }
};
export type OverflowMenuContextType = {
  presentMenu: (params?: PresentMenuParam) => void;
  closeMenu: () => void;
};
export const OverflowMenuContext = createContext<OverflowMenuContextType>({
  presentMenu: warn,
  closeMenu: warn,
});

export const useOverflowMenu = () => useContext(OverflowMenuContext);
