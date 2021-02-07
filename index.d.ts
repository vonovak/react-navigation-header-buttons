import { Component, ComponentType, ReactNode, ReactChild } from 'react';
import { TextStyle, ViewStyle, View, StyleProp } from 'react-native';

export interface CommonHeaderButtonProps {
  /**
   * Function to call on press.
   */
  onPress?: () => any;
  /**
   * Title for the button.
   */
  title: string;
  /**
   * Icon name, used together with the `IconComponent` property.
   */
  iconName?: string;
  /**
   * Style to apply to the button (icon and text).
   */
  buttonStyle?: StyleProp<TextStyle | ViewStyle>;
  /**
   * Style to apply to the touchable element that wraps the button.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * ID to locate the view in e2e tests.
   */
  testID?: string;
  disabled?: boolean;
  /**
   * Support additional properties, but loses type checking.
   */
  // NOTE @vonovak disabled this for v4 because he's not sure this is right
  // please open an issue if this is a problem
  // [prop: string]: any;
}

// From HeaderButton.js
export interface HeaderButtonProps extends CommonHeaderButtonProps {
  /**
   * Component to use for the icons, for example from `react-native-vector-icons`.
   */
  IconComponent?: ComponentType<any>;
  /**
   * Icon size.
   */
  iconSize?: number;
  /**
   * Color of icons and buttons.
   */
  color?: string;
}

export class HeaderButton extends Component<HeaderButtonProps> {}

export interface HeaderButtonsProps {
  /**
   * Whether the `HeaderButtons` are on the left from header title.
   * @default false
   */
  left?: boolean;
  /**
   * Component that renders the buttons.
   *
   * Typically, you'll want to provide a component that wraps `HeaderButton`
   * provided by this package, as seen in the quick example.
   * However, you're free to use your own component (see `HeaderButton` for reference).
   */
  HeaderButtonComponent?: ComponentType<any>;
  children: ReactNode;
}

declare class HeaderButtons extends Component<HeaderButtonsProps> {}

// From HeaderButtons.js as ItemProps
export interface HeaderItemProps extends HeaderButtonProps {}

declare class Item extends Component<HeaderItemProps> {}

declare class HiddenItem extends Component<{
  title: string;
  icon?: ReactNode;
  disabled?: boolean;
  onPress?: () => any;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  testID?: string;
  destructive?: boolean;
}> {}

declare class Divider extends Component<{
  inset?: boolean;
  style?: StyleProp<ViewStyle>;
}> {}

declare class OverflowMenuProvider extends Component<{
  children: ReactChild;
  spaceAboveMenu?: number;
}> {}

export interface OnOverflowMenuPressParams {
  hiddenButtons: Array<ReactNode>;
  overflowButtonRef?: View;
  cancelButtonLabel?: string;
}

declare class OverflowMenu extends Component<{
  children: ReactChild | Array<ReactNode>;
  onPress?: (parameter: OnOverflowMenuPressParams) => any;
  OverflowIcon: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}> {}

export function defaultOnOverflowMenuPress(parameter: OnOverflowMenuPressParams): void;
export function overflowMenuPressHandlerActionSheet(parameter: OnOverflowMenuPressParams): void;
export function overflowMenuPressHandlerPopupMenu(parameter: OnOverflowMenuPressParams): void;
export function overflowMenuPressHandlerDropdownMenu(parameter: OnOverflowMenuPressParams): void;
