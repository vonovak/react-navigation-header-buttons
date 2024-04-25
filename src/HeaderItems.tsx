import * as React from 'react';
import { HeaderButtonComponentContext } from './HeaderButtonComponentContext';
import { useOverflowMenu } from './overflowMenu/OverflowMenuContext';
import { defaultRenderVisibleButton, type ItemProps } from './HeaderButton';
import {
  MenuItem,
  type Props as MenuItemProps,
} from './overflowMenu/vendor/MenuItem';

export type HiddenItemProps = MenuItemProps & {
  destructive?: boolean;
};

export function HiddenItem<T extends HiddenItemProps>({
  onPress,
  ...otherProps
}: T) {
  const { closeMenu } = useOverflowMenu();

  // when rendering dropdown menu (e.g. android default), the return value is actually rendered
  // when we show action sheet, we do not render the returned value,
  // but just extract title, onPress and destructive passed to HiddenItem. HiddenItem() is not called
  const onMenuItemPress: MenuItemProps['onPress'] = (nativeEvent) => {
    closeMenu();
    onPress && onPress(nativeEvent);
  };

  return <MenuItem {...otherProps} onPress={onMenuItemPress} />;
}

// TODO check RTL
export function Item(props: ItemProps) {
  const HeaderButtonComponent = React.useContext(HeaderButtonComponentContext);
  // HeaderButtonComponent (HeaderButton by default) already is provided iconSize, icon color and etc.
  // Item itself will likely only have title, onPress and iconName
  // but also can override iconSize, icon color, etc. if needed
  return (
    <HeaderButtonComponent
      renderButton={defaultRenderVisibleButton}
      {...props}
    />
  );
}
