// @flow
import * as React from 'react';
import { Platform, ActionSheetIOS, UIManager, findNodeHandle, type View } from 'react-native';
import { HiddenItem } from './HeaderItems';

type OverflowButtonDescriptors = Array<{
  title: string,
  onPress: () => void | Promise<void>,
  ...
}>;

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
  overflowButtonRef: null | View,
  cancelButtonLabel?: string,
|};

export const overflowMenuPressHandlerActionSheet = ({
  hiddenButtons,
  cancelButtonLabel = 'Cancel',
}: OnOverflowMenuPressParams) => {
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

export const defaultOnOverflowMenuPress = Platform.select({
  ios: overflowMenuPressHandlerActionSheet,
  android: overflowMenuPressHandlerPopupMenu,
  default: (params: OnOverflowMenuPressParams) => {},
});
