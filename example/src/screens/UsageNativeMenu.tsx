import * as React from 'react';
import { Text, Platform, View } from 'react-native';
import {
  HeaderButtons,
  Item,
  HiddenItemProps,
  HiddenItem,
  extractHiddenItemProps,
} from 'react-navigation-header-buttons';
import type { ScreenProps } from '../NavTypes';
import { MenuView } from '@react-native-menu/menu';
import inspectElements from 'react-to-imperative';
import type { MenuAction } from '@react-native-menu/menu';
import { ScreenBody } from '../components/ScreenBody';
import { MaterialHeaderButton } from '../components/MaterialHeaderButton';

type ExtractedProps = MenuAction & {
  onPress?: HiddenItemProps['onPress'];
};

const extractOverflowButtonData = (
  hiddenButtons: React.ReactNode
): ExtractedProps[] => {
  const actions = inspectElements(hiddenButtons, extractHiddenItemProps);
  return actions.map((it, index) => ({ ...it, id: String(index) }));
};

type HiddenItemWithMenuProps = HiddenItemProps & MenuAction;

const RightHeader = () => {
  const actionElements = (
    <>
      <HiddenItem<HiddenItemWithMenuProps>
        title="title 1"
        onPress={() => alert('hidden 1')}
        image={Platform.select({
          ios: 'plus',
        })}
      />
      <HiddenItem<HiddenItemWithMenuProps>
        title="share"
        subtitle={'Share action'}
        imageColor={'#46F289'}
        onPress={() => alert('share')}
        image={Platform.select({
          ios: 'square.and.arrow.up',
        })}
        // @ts-expect-error
        unsupportedProp={'123'}
      />
    </>
  );
  const actions = extractOverflowButtonData(actionElements);

  return (
    <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
      <Item title="edit" onPress={() => alert('edit')} />
      <MenuView
        onPressAction={({ nativeEvent: { event } }) => {
          actions[parseInt(event)]?.onPress?.();
        }}
        actions={actions}
      >
        <Item title="edit" iconName="more-vert" iconSize={23} />
      </MenuView>
    </HeaderButtons>
  );
};

export function UsageNativeMenu({
  navigation,
}: ScreenProps<'UsageNativeMenu'>) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: RightHeader,
    });
  }, [navigation]);

  return (
    <ScreenBody>
      <View style={{ height: 250 }} />

      <MenuView
        title="Menu Title"
        onPressAction={({ nativeEvent }) => {
          console.warn(JSON.stringify(nativeEvent));
        }}
        actions={[
          {
            id: 'share',
            title: 'Share Action',
            titleColor: '#46F289',
            subtitle: 'Share action on SNS',
            image: Platform.select({
              ios: 'square.and.arrow.up',
              android: 'ic_menu_share',
            }),
            imageColor: '#46F289',
            state: 'on',
          },
        ]}
      >
        <Text>native menu overflow handler</Text>
      </MenuView>
    </ScreenBody>
  );
}
