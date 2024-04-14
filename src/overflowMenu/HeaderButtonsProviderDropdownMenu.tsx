import { ReactNode, useCallback, useMemo, useState } from 'react';
import { Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { getDefaultSpaceAboveMenu } from './statusBarUtils';
import { ButtonsExtraMarginContext } from '../ButtonsWrapper';
import * as React from 'react';
import { OverflowMenuContext, PresentMenuParam } from './OverflowMenuContext';
import { HeaderButtonsProviderProps } from './HeaderButtonsProviderTypes';
import { Menu } from './vendor/Menu';

export const HeaderButtonsProviderDropdownMenu = ({
  children,
  spaceAboveMenu,
  stackType,
}: HeaderButtonsProviderProps) => {
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

  const closeMenu = useCallback(() => {
    setMenuState((prevState) => ({
      ...prevState,
      visible: false,
    }));
  }, []);

  const presentMenu = useCallback(
    (params?: PresentMenuParam) => {
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
          visible: true,
        };
      });
    },
    [spaceAboveMenu]
  );

  const value = useMemo(
    () => ({ presentMenu, closeMenu }),
    [presentMenu, closeMenu]
  );
  const extraMarginValue =
    stackType === 'native' ? 'alreadyHandled' : 'toBeHandled';

  const { visible, position, elements } = menuState;

  const contentStyle = useMemo(() => ({ backgroundColor: card }), [card]);

  return (
    <OverflowMenuContext.Provider value={value}>
      <ButtonsExtraMarginContext.Provider value={extraMarginValue}>
        {React.Children.only(children)}
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={position}
          contentStyle={contentStyle}
        >
          {elements}
        </Menu>
      </ButtonsExtraMarginContext.Provider>
    </OverflowMenuContext.Provider>
  );
};
