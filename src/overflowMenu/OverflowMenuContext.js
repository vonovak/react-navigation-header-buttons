import * as React from 'react';
import { Dimensions } from 'react-native';
import { Menu } from './vendor/Menu';

export const OverflowMenuContext = React.createContext();

type ToggleMenuParam = ?{|
  elements: Array<React.Element<any>>,
  x: number,
  y: number,
|};

type Props = {|
  children: React.Element<any>,
|};

export const OverflowMenuProvider = ({ children }: Props) => {
  const [visible, setVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ x: Dimensions.get('window').width - 10, y: 40 });
  const [elements, setElements] = React.useState([]);

  const hideMenu = React.useCallback(() => {
    setVisible(false);
  }, []);

  const toggleMenu = React.useCallback((params: ToggleMenuParam) => {
    setVisible((prevVisible) => !prevVisible);
    setElements(params?.elements || []);
    if (params) {
      setPosition({ x: params.x, y: params.y });
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
