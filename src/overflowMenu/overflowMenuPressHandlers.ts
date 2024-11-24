import type * as React from 'react';
import {
  Platform,
  ActionSheetIOS,
  UIManager,
  findNodeHandle,
  View,
} from 'react-native';
import { HiddenItem, HiddenItemProps } from '../HeaderItems';
import { OverflowMenuContextType } from './OverflowMenuContext';
import inspectElements, { type PropsExtractor } from 'react-to-imperative';

type OverflowButtonDescriptors = ReadonlyArray<{
  title: string;
  onPress?: HiddenItemProps['onPress'];
  destructive?: boolean;
  disabled?: boolean;
}>;

export const extractOverflowButtonData = (
  hiddenButtons: React.ReactNode
): OverflowButtonDescriptors => {
  return inspectElements(hiddenButtons, extractHiddenItemProps);
};

export const extractHiddenItemProps: PropsExtractor<HiddenItemProps> = ({
  props,
  type,
}) => {
  if (type === HiddenItem) {
    return props;
  }
  return true;
};

export type OnOverflowMenuPressParams = {
  hiddenButtons: OverflowButtonDescriptors;
  overflowButtonRef: null | View;
  cancelButtonLabel?: string;
  children: React.ReactNode;
} & OverflowMenuContextType;

export const overflowMenuPressHandlerActionSheet = ({
  hiddenButtons,
  cancelButtonLabel = 'Cancel',
}: OnOverflowMenuPressParams) => {
  let actionTitles = hiddenButtons.map((btn) => btn.title);
  actionTitles.unshift(cancelButtonLabel);

  const disabledButtonIndices: Array<number> = (() => {
    let result: number[] = [];
    hiddenButtons.forEach((it, index) => {
      if (it.disabled) {
        result.push(index + 1);
      }
    });
    return result;
  })();

  const destructiveButtonIndex: Array<number> = (() => {
    let result: number[] = [];
    hiddenButtons.forEach((it, index) => {
      if (it.destructive) {
        result.push(index + 1);
      }
    });
    return result;
  })();

  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: actionTitles,
      cancelButtonIndex: 0,
      disabledButtonIndices,
      destructiveButtonIndex,
    },
    (buttonIndex: number) => {
      if (buttonIndex > 0) {
        hiddenButtons[buttonIndex - 1]?.onPress?.();
      }
    }
  );
};

export const overflowMenuPressHandlerPopupMenu = ({
  hiddenButtons,
  overflowButtonRef,
}: OnOverflowMenuPressParams) => {
  const enabledButtons = hiddenButtons.filter((it) => it.disabled !== true);
  // @ts-expect-error TODO vonovak this was removed in RN 0.75
  const presenter = UIManager.showPopupMenu;
  const node = findNodeHandle(overflowButtonRef);
  if (!presenter || !node) {
    console.warn(
      'could not present overflow menu using showPopupMenu(). This is only available on Android with RN <= 0.75. See https://github.com/vonovak/react-navigation-header-buttons/issues/252'
    );
    return;
  }

  presenter(
    node,
    enabledButtons.map((btn) => btn.title),
    () => console.debug('overflowBtn error'),
    (eventName: string, index?: number) => {
      if (eventName !== 'itemSelected' || typeof index !== 'number') {
        return;
      }
      enabledButtons[index]?.onPress?.();
    }
  );
};

export const overflowMenuPressHandlerDropdownMenu = ({
  children,
  overflowButtonRef,
  presentMenu,
}: OnOverflowMenuPressParams) => {
  if (overflowButtonRef) {
    overflowButtonRef.measureInWindow((x, y, width) => {
      presentMenu({ elements: children, x: x + width, y });
    });
  } else {
    console.error('overflowButtonRef is null, cannot show overflow menu');
  }
};

export const defaultOnOverflowMenuPress: (
  params: OnOverflowMenuPressParams
) => void = Platform.select({
  ios: overflowMenuPressHandlerActionSheet,
  default: overflowMenuPressHandlerDropdownMenu,
});
