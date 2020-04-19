// @flow
import * as React from 'react';
import { Platform, ActionSheetIOS, UIManager, findNodeHandle, type View } from 'react-native';
import { HiddenItem } from './HeaderItems';
import invariant from 'invariant';

type OverflowButtonDescriptors = $ReadOnlyArray<{|
  title: string,
  onPress: () => void | Promise<void>,
|}>;

export const extractOverflowButtonData = (
  hiddenButtons: Array<React.Element<any>>,
  detectedElementTypes: Array<React.StatelessFunctionalComponent<any>> = [HiddenItem]
): OverflowButtonDescriptors => {
  if (!Array.isArray(hiddenButtons)) {
    return [];
  }
  // don't do this at home - this is not how React is meant to be used!
  const ret = hiddenButtons.filter(React.isValidElement).map((button) => {
    const { props, type } = button;
    if (detectedElementTypes.includes(type)) {
      return extract(button);
    }

    if (typeof type === 'function') {
      const nestedElement = type(props);
      if (nestedElement && detectedElementTypes.includes(nestedElement.type)) {
        return extract(nestedElement);
      }
    }
    return false;
  });
  // $FlowFixMe
  return ret.filter(Boolean);
};

const extract = (element: React.Element<any>) => {
  const {
    props: { title, onPress, disabled },
  } = element;
  return disabled === true ? false : { title, onPress };
};

export type OnOverflowMenuPressParams = {|
  hiddenButtons: OverflowButtonDescriptors,
  _private_toggleMenu: ({ elements: React.ChildrenArray<any>, x: number, y: number }) => void,
  overflowButtonRef: null | View,
  cancelButtonLabel?: string,
  children: React.Node,
|};

const checkParams = (hiddenButtons) => {
  invariant(Array.isArray(hiddenButtons), 'hiddenButtons must be an array');
};

export const overflowMenuPressHandlerActionSheet = ({
  hiddenButtons,
  cancelButtonLabel = 'Cancel',
}: OnOverflowMenuPressParams) => {
  checkParams(hiddenButtons);
  let actionTitles = hiddenButtons.map((btn) => btn.title);
  actionTitles.unshift(cancelButtonLabel);

  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: actionTitles,
      cancelButtonIndex: 0,
    },
    (buttonIndex: number) => {
      if (buttonIndex > 0) {
        hiddenButtons[buttonIndex - 1].onPress();
      }
    }
  );
};

export const overflowMenuPressHandlerPopupMenu = ({
  hiddenButtons,
  overflowButtonRef,
}: OnOverflowMenuPressParams) => {
  checkParams(hiddenButtons);

  UIManager.showPopupMenu(
    findNodeHandle(overflowButtonRef),
    hiddenButtons.map((btn) => btn.title),
    (err) => console.debug('overflowBtn error', err),
    (eventName: string, index?: number) => {
      if (eventName !== 'itemSelected' || typeof index !== 'number') {
        return;
      }
      hiddenButtons[index].onPress();
    }
  );
};

export const overflowMenuPressHandlerDropdownMenu = ({
  children,
  overflowButtonRef,
  _private_toggleMenu,
}: OnOverflowMenuPressParams) => {
  if (overflowButtonRef) {
    overflowButtonRef.measureInWindow((x, y, width, height) => {
      _private_toggleMenu({ elements: children, x: x + width, y: y + 24 });
    });
  } else {
    // TODO ignore or show?
  }
};

export const defaultOnOverflowMenuPress = Platform.select({
  ios: overflowMenuPressHandlerActionSheet,
  default: overflowMenuPressHandlerDropdownMenu,
});
