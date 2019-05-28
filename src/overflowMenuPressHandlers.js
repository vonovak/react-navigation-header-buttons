// @flow
import { Platform, ActionSheetIOS, UIManager, findNodeHandle } from 'react-native';

const overflowMenuPressHandlerIOS = ({ hiddenButtons, cancelButtonLabel = 'cancel' }) => {
  let actionTitles = hiddenButtons.map(btn => btn.props.title);
  actionTitles.push(cancelButtonLabel);

  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: actionTitles,
      cancelButtonIndex: actionTitles.length - 1,
    },
    (buttonIndex: number) => {
      if (buttonIndex !== actionTitles.length - 1) {
        hiddenButtons[index].props.onPress();
      }
    }
  );
};

const overflowMenuPressHandlerAndroid = ({ hiddenButtons, overflowButtonRef }) => {
  UIManager.showPopupMenu(
    findNodeHandle(overflowButtonRef),
    hiddenButtons.map(btn => btn.props.title),
    err => console.debug(`overflowBtn error`, err),
    (eventName: string, index: number) => {
      if (eventName !== 'itemSelected') return;
      hiddenButtons[index].props.onPress();
    }
  );
};

export const defaultOnOverflowMenuPress = Platform.select({
  ios: overflowMenuPressHandlerIOS,
  android: overflowMenuPressHandlerAndroid,
  default: () => {},
});
