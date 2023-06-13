import { Dimensions } from 'react-native';
import { getDefaultSpaceAboveMenu } from './statusBarUtils';
import { Menu } from './vendor/Menu';
import { useTheme } from '@react-navigation/native';
import {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import * as React from 'react';

import { ButtonsExtraMarginContext } from '../ButtonsWrapper';

export type ToggleMenuParam = {
  elements: React.ReactNode;
  x: number;
  y: number;
};

export const OVERFLOW_TOP = 15;

const warn = () => {
  // the noop value will be replaced by HeaderButtonsProvider rendered in app root
  console.warn(
    'It seems like you tried to open the overflow menu using the overflowMenuPressHandlerDropdownMenu' +
      ' - which is the default handler on android - but you forgot to wrap your root component in <HeaderButtonsProvider />.' +
      'Please check the installation instructions in the react-navigation-header-buttons readme :)'
  );
};
const OverflowMenuContext = createContext<{
  toggleMenu: (params?: ToggleMenuParam) => void;
}>({
  toggleMenu: warn,
});

export const useOverflowMenu = () => useContext(OverflowMenuContext);

type Props = {
  children: ReactElement;
  stackType: 'native' | 'js';
  spaceAboveMenu?: number;
};

export const HeaderButtonsProvider = ({
  children,
  spaceAboveMenu,
  stackType,
}: Props) => {
  const [menuState, setMenuState] = useState({
    visible: false,
    position: {
      x: Dimensions.get('window').width - 10,
      y: 40,
    },
    elements: null as ReactNode | null,
  });

  const {
    colors: { card },
  } = useTheme();

  const hideMenu = useCallback(() => {
    setMenuState((prevState) => ({
      ...prevState,
      visible: false,
    }));
  }, []);

  const toggleMenu = useCallback(
    (params?: ToggleMenuParam) => {
      const extraDelta = spaceAboveMenu ?? getDefaultSpaceAboveMenu();

      setMenuState((prevState) => {
        const position = params
          ? { x: params.x, y: params.y + extraDelta }
          : prevState.position;
        const elements = params ? params.elements : prevState.elements;

        return {
          ...prevState,
          position,
          elements,
          visible: !prevState.visible,
        };
      });
    },
    [spaceAboveMenu]
  );

  const { visible, position, elements } = menuState;
  const value = useMemo(() => ({ toggleMenu }), [toggleMenu]);
  const extraMarginValue =
    stackType === 'native' ? 'alreadyHandled' : 'toBeHandled';

  return (
    <OverflowMenuContext.Provider value={value}>
      <ButtonsExtraMarginContext.Provider value={extraMarginValue}>
        {React.Children.only(children)}
        <Menu
          visible={visible}
          onDismiss={hideMenu}
          anchor={position}
          contentStyle={{ backgroundColor: card }}
        >
          {elements}
        </Menu>
      </ButtonsExtraMarginContext.Provider>
    </OverflowMenuContext.Provider>
  );
};
