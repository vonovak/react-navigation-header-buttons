// @flow
import * as React from 'react';
import { Dimensions, Platform } from 'react-native';
import { Menu } from './vendor/Menu';
import { getSpaceAboveMenu } from './statusBarUtils';

export type ToggleMenuParam = ?{|
  elements: React.ChildrenArray<any>,
  x: number,
  y: number,
|};

export const OVERFLOW_TOP = 15;

const warn = () => {
  // the noop value will be replaced by OverflowMenuProvider rendered in app root
  console.warn(
    'It seems like you tried to open the overflow menu using the overflowMenuPressHandlerDropdownMenu' +
      ' - which is the default handler on android - but you forgot to wrap your root component in <OverflowMenuProvider />.' +
      'Please check the installation instructions in the react-navigation-header-buttons readme!'
  );
};
export const OverflowMenuContext = React.createContext<(ToggleMenuParam) => void>(warn);

type Props = {|
  children: React.Element<any>,
|};

export const OverflowMenuProvider = ({ children }: Props) => {
  const [visible, setVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ x: Dimensions.get('window').width - 10, y: 40 });
  const [elements, setElements] = React.useState(null);

  const hideMenu = React.useCallback(() => {
    setVisible(false);
  }, []);

  const toggleMenu = React.useCallback((params: ToggleMenuParam) => {
    setVisible((prevVisible) => !prevVisible);
    setElements(params?.elements || []);
    if (params) {
      const { x, y } = params;
      const heightApprox = getSpaceAboveMenu();
      const extraDelta = Platform.select({
        android: heightApprox,
        default: OVERFLOW_TOP,
      });
      setPosition({ x, y: y + extraDelta });
    }
  }, []);

  return (
    <OverflowMenuContext.Provider value={toggleMenu}>
      {React.Children.only(children)}
      <Menu visible={visible} onDismiss={hideMenu} anchor={position}>
        {elements}
      </Menu>
    </OverflowMenuContext.Provider>
  );
};
